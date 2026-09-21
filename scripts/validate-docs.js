#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

/**
 * Documentation validation script
 *
 * Validates documentation for consistency and accuracy:
 * - Checks if documentation matches actual project structure
 * - Validates workflow descriptions against actual workflow files
 * - Ensures dependency versions are consistent
 * - Checks for outdated information
 */

class DocumentationValidator {
  constructor() {
    this.rootDir = process.cwd();
    this.errors = [];
    this.warnings = [];
  }

  log(message) {
    console.log(`[DOCS-VALIDATE] ${message}`);
  }

  error(message) {
    this.errors.push(message);
    console.error(`[DOCS-VALIDATE ERROR] ${message}`);
  }

  warn(message) {
    this.warnings.push(message);
    console.warn(`[DOCS-VALIDATE WARNING] ${message}`);
  }

  async run() {
    this.log('Starting documentation validation...');

    try {
      await this.validateProjectStructure();
      await this.validateWorkflowDocumentation();
      await this.validateDependencyInfo();
      await this.validateTestDocumentation();
      await this.validateLinks();
      await this.validateMarkdownFormat();

      // Report results
      if (this.errors.length > 0) {
        this.log(`\nValidation failed with ${this.errors.length} errors:`);
        this.errors.forEach((error) => console.error(`  ❌ ${error}`));
      }

      if (this.warnings.length > 0) {
        this.log(`\nFound ${this.warnings.length} warnings:`);
        this.warnings.forEach((warning) => console.warn(`  ⚠️  ${warning}`));
      }

      if (this.errors.length === 0 && this.warnings.length === 0) {
        this.log('✅ All documentation validation checks passed!');
      }

      // Exit with error code if there are errors
      if (this.errors.length > 0) {
        process.exit(1);
      }
    } catch (error) {
      this.error(`Validation failed: ${error.message}`);
      process.exit(1);
    }
  }

  async validateProjectStructure() {
    this.log('Validating project structure documentation...');

    const readmePath = path.join(this.rootDir, 'README.md');
    if (!fs.existsSync(readmePath)) {
      this.error('README.md file not found');
      return;
    }

    const readme = fs.readFileSync(readmePath, 'utf8');

    // Check if project structure section exists
    const structureMatch = readme.match(/## 📁 Project Structure\n\n```\n(.*?)\n```/s);
    if (!structureMatch) {
      this.error('Project structure section not found in README.md');
      return;
    }

    const documentedStructure = structureMatch[1];

    // Validate key directories exist
    const keyDirectories = ['app', 'tests', '.github', 'public'];
    keyDirectories.forEach((dir) => {
      const dirPath = path.join(this.rootDir, dir);
      if (!fs.existsSync(dirPath)) {
        this.error(`Documented directory '${dir}' does not exist`);
      } else if (!documentedStructure.includes(dir)) {
        this.warn(`Directory '${dir}' exists but not documented in project structure`);
      }
    });

    // Validate key files exist
    const keyFiles = ['package.json', 'next.config.ts', 'playwright.config.ts'];
    keyFiles.forEach((file) => {
      const filePath = path.join(this.rootDir, file);
      if (!fs.existsSync(filePath)) {
        this.error(`Documented file '${file}' does not exist`);
      } else if (!documentedStructure.includes(file)) {
        this.warn(`File '${file}' exists but not documented in project structure`);
      }
    });
  }

  async validateWorkflowDocumentation() {
    this.log('Validating workflow documentation...');

    const workflowsDir = path.join(this.rootDir, '.github', 'workflows');
    if (!fs.existsSync(workflowsDir)) {
      this.error('Workflows directory not found');
      return;
    }

    const workflows = fs
      .readdirSync(workflowsDir)
      .filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'));

    const readmePath = path.join(this.rootDir, 'README.md');
    const readme = fs.readFileSync(readmePath, 'utf8');

    // Check if each workflow is documented
    workflows.forEach((workflowFile) => {
      const workflowPath = path.join(workflowsDir, workflowFile);
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');

      const nameMatch = workflowContent.match(/^name:\s*(.+)$/m);
      const workflowName = nameMatch ? nameMatch[1].trim() : workflowFile;

      // Check if workflow is mentioned in README
      if (
        !readme.includes(workflowName) &&
        !readme.includes(workflowFile.replace(/\.ya?ml$/, ''))
      ) {
        this.warn(`Workflow '${workflowName}' (${workflowFile}) is not documented in README`);
      }
    });

    // Validate workflow badges
    const badgeRegex = /\[\!\[.*?\]\(.*?workflows\/(.*?)\.yml.*?\)\]/g;
    let badgeMatch;

    while ((badgeMatch = badgeRegex.exec(readme)) !== null) {
      const workflowFile = badgeMatch[1] + '.yml';
      const workflowPath = path.join(workflowsDir, workflowFile);

      if (!fs.existsSync(workflowPath)) {
        this.error(`Workflow badge references non-existent workflow: ${workflowFile}`);
      }
    }
  }

  async validateDependencyInfo() {
    this.log('Validating dependency information...');

    const packagePath = path.join(this.rootDir, 'package.json');
    if (!fs.existsSync(packagePath)) {
      this.error('package.json not found');
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    // Check copilot instructions for dependency accuracy
    const copilotPath = path.join(this.rootDir, '.github', 'copilot-instructions.md');
    if (fs.existsSync(copilotPath)) {
      const copilotInstructions = fs.readFileSync(copilotPath, 'utf8');

      // Check if major dependencies are mentioned with correct versions
      const keyDeps = {
        React: packageJson.dependencies?.react,
        'Next.js': packageJson.dependencies?.next,
        Playwright: packageJson.devDependencies?.['@playwright/test'],
        TypeScript: packageJson.devDependencies?.typescript,
      };

      Object.entries(keyDeps).forEach(([name, version]) => {
        if (version && copilotInstructions.includes(name)) {
          // Extract version from instructions if mentioned
          const versionRegex = new RegExp(`${name}[^\\d]*([\\d\\.]+)`, 'i');
          const match = copilotInstructions.match(versionRegex);

          if (match) {
            const documentedVersion = match[1];
            const actualMajorVersion = version.replace(/[^\d\.]/g, '').split('.')[0];
            const documentedMajorVersion = documentedVersion.split('.')[0];

            if (actualMajorVersion !== documentedMajorVersion) {
              this.warn(
                `${name} version mismatch: documented ${documentedVersion}, actual ${version}`
              );
            }
          }
        }
      });
    }
  }

  async validateTestDocumentation() {
    this.log('Validating test documentation...');

    const testsDir = path.join(this.rootDir, 'tests');
    if (!fs.existsSync(testsDir)) {
      this.warn('Tests directory not found');
      return;
    }

    const testFiles = fs.readdirSync(testsDir).filter((file) => file.endsWith('.spec.ts'));

    const readmePath = path.join(this.rootDir, 'README.md');
    const readme = fs.readFileSync(readmePath, 'utf8');

    // Check if test files are documented
    testFiles.forEach((testFile) => {
      const testName = testFile.replace('.spec.ts', '');
      if (!readme.includes(testName) && !readme.includes(testFile)) {
        this.warn(`Test file '${testFile}' is not documented in README`);
      }
    });

    // Check if documented tests actually exist
    const testCoverageSection = readme.match(/### Test Coverage\n\n(.*?)(?=\n### |\n## |$)/s);
    if (testCoverageSection) {
      const documentedTests = testCoverageSection[1];

      // Look for test file patterns in documentation
      const testPattern = /- \*\*(.*?)\*\*/g;
      let testMatch;

      while ((testMatch = testPattern.exec(documentedTests)) !== null) {
        const testCategory = testMatch[1].toLowerCase();

        // Check if there's a corresponding test file
        const hasCorrespondingTest = testFiles.some((file) =>
          file.toLowerCase().includes(testCategory.replace(/\s+/g, '-'))
        );

        if (!hasCorrespondingTest) {
          this.warn(
            `Documented test category '${testMatch[1]}' may not have corresponding test files`
          );
        }
      }
    }
  }

  async validateLinks() {
    this.log('Validating links in documentation...');

    const markdownFiles = this.findMarkdownFiles();

    markdownFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.rootDir, filePath);

      // Find internal links (not starting with http)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let linkMatch;

      while ((linkMatch = linkRegex.exec(content)) !== null) {
        const linkText = linkMatch[1];
        const linkUrl = linkMatch[2];

        // Skip external links and anchors
        if (linkUrl.startsWith('http') || linkUrl.startsWith('#')) {
          continue;
        }

        // Check if internal file links exist
        const linkPath = path.resolve(path.dirname(filePath), linkUrl);
        if (!fs.existsSync(linkPath)) {
          this.error(`Broken link in ${relativePath}: "${linkText}" -> ${linkUrl}`);
        }
      }

      // Check for image links
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let imageMatch;

      while ((imageMatch = imageRegex.exec(content)) !== null) {
        const altText = imageMatch[1];
        const imagePath = imageMatch[2];

        // Skip external images
        if (imagePath.startsWith('http')) {
          continue;
        }

        const fullImagePath = path.resolve(path.dirname(filePath), imagePath);
        if (!fs.existsSync(fullImagePath)) {
          this.error(`Broken image link in ${relativePath}: "${altText}" -> ${imagePath}`);
        }
      }
    });
  }

  async validateMarkdownFormat() {
    this.log('Validating markdown format...');

    const markdownFiles = this.findMarkdownFiles();

    markdownFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.rootDir, filePath);

      // Check for proper heading structure
      const headings = content.match(/^#+\s+.+$/gm) || [];

      headings.forEach((heading, index) => {
        const level = heading.match(/^#+/)[0].length;

        // Check for proper heading spacing
        if (index > 0) {
          const prevHeading = headings[index - 1];
          const prevLevel = prevHeading.match(/^#+/)[0].length;

          // Skip more than one level
          if (level > prevLevel + 1) {
            this.warn(
              `${relativePath}: Heading level skips from ${prevLevel} to ${level}: "${heading.trim()}"`
            );
          }
        }
      });

      // Check for trailing whitespace
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.endsWith(' ') || line.endsWith('\t')) {
          this.warn(`${relativePath}:${index + 1}: Line has trailing whitespace`);
        }
      });

      // Check for multiple consecutive blank lines
      const multipleBlankLines = content.match(/\n\n\n+/g);
      if (multipleBlankLines) {
        this.warn(`${relativePath}: Contains multiple consecutive blank lines`);
      }
    });
  }

  findMarkdownFiles() {
    const markdownFiles = [];

    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      items.forEach((item) => {
        const itemPath = path.join(dir, item.name);

        if (
          item.isDirectory() &&
          !item.name.startsWith('.') &&
          item.name !== 'node_modules' &&
          item.name !== 'out' &&
          item.name !== 'playwright-report' &&
          item.name !== 'test-results'
        ) {
          scanDirectory(itemPath);
        } else if (item.isFile() && item.name.endsWith('.md')) {
          markdownFiles.push(itemPath);
        }
      });
    };

    scanDirectory(this.rootDir);
    return markdownFiles;
  }
}

// Run the validation
if (require.main === module) {
  const validator = new DocumentationValidator();
  validator.run().catch((error) => {
    console.error('Documentation validation failed:', error);
    process.exit(1);
  });
}

module.exports = DocumentationValidator;
