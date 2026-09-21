#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

/**
 * Main documentation synchronization script
 *
 * This script ensures documentation files stay up-to-date with code changes:
 * - Updates project structure in README.md
 * - Syncs workflow descriptions with actual workflow files
 * - Updates dependency information from package.json
 * - Validates copilot instructions against actual project structure
 */

class DocumentationSyncer {
  constructor() {
    this.rootDir = process.cwd();
    this.changes = [];
  }

  log(message) {
    console.log(`[DOCS-SYNC] ${message}`);
  }

  error(message) {
    console.error(`[DOCS-SYNC ERROR] ${message}`);
  }

  addChange(file, description) {
    this.changes.push({ file, description });
    this.log(`Updated: ${file} - ${description}`);
  }

  async run() {
    this.log('Starting documentation synchronization...');

    try {
      await this.updateProjectStructure();
      await this.syncWorkflowDocumentation();
      await this.updateDependencyInfo();
      await this.validateCopilotInstructions();
      await this.updateTestingDocumentation();

      if (this.changes.length > 0) {
        this.log(`\nCompleted with ${this.changes.length} changes:`);
        this.changes.forEach((change) => {
          this.log(`  - ${change.file}: ${change.description}`);
        });
      } else {
        this.log('No documentation updates needed - everything is in sync!');
      }
    } catch (error) {
      this.error(`Sync failed: ${error.message}`);
      process.exit(1);
    }
  }

  async updateProjectStructure() {
    this.log('Updating project structure documentation...');

    const readmePath = path.join(this.rootDir, 'README.md');
    const readme = fs.readFileSync(readmePath, 'utf8');

    // Generate actual project structure
    const actualStructure = this.generateProjectStructure();

    // Find and replace the project structure section
    const structureRegex = /## 📁 Project Structure\n\n```\n(.*?)\n```/s;
    const match = readme.match(structureRegex);

    if (match && match[1] !== actualStructure) {
      const updatedReadme = readme.replace(
        structureRegex,
        `## 📁 Project Structure\n\n\`\`\`\n${actualStructure}\n\`\`\``
      );

      fs.writeFileSync(readmePath, updatedReadme);
      this.addChange('README.md', 'Updated project structure');
    }
  }

  generateProjectStructure() {
    const structure = [];
    const visited = new Set();

    const addDirectory = (dirPath, indent = '') => {
      if (visited.has(dirPath)) return;
      visited.add(dirPath);

      const items = fs
        .readdirSync(dirPath, { withFileTypes: true })
        .filter(
          (item) =>
            !item.name.startsWith('.') &&
            item.name !== 'node_modules' &&
            item.name !== 'out' &&
            item.name !== 'playwright-report' &&
            item.name !== 'test-results'
        )
        .sort((a, b) => {
          // Directories first, then files
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          return a.name.localeCompare(b.name);
        });

      items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const prefix = indent + (isLast ? '└── ' : '├── ');

        if (item.isDirectory()) {
          structure.push(`${prefix}${item.name}/`);

          // Add important subdirectories with descriptions
          if (item.name === 'app') {
            structure.push(
              `${indent}${isLast ? '    ' : '│   '}├── page.tsx              # Main layout`
            );
            structure.push(
              `${indent}${isLast ? '    ' : '│   '}└── components/         # React components`
            );
          } else if (item.name === 'tests') {
            structure.push(
              `${indent}${isLast ? '    ' : '│   '}├── smoke.spec.ts        # Smoke tests`
            );
            structure.push(
              `${indent}${isLast ? '    ' : '│   '}└── *.spec.ts           # Feature tests`
            );
          } else if (item.name === '.github') {
            structure.push(
              `${indent}${isLast ? '    ' : '│   '}├── workflows/          # GitHub Actions`
            );
            structure.push(
              `${indent}${isLast ? '    ' : '│   '}└── instructions/       # Development guidelines`
            );
          }
        } else if (this.isImportantFile(item.name)) {
          const description = this.getFileDescription(item.name);
          structure.push(`${prefix}${item.name}${description ? ` # ${description}` : ''}`);
        }
      });
    };

    addDirectory(this.rootDir);
    return structure.join('\n');
  }

  isImportantFile(filename) {
    const importantFiles = [
      'package.json',
      'next.config.ts',
      'playwright.config.ts',
      'tsconfig.json',
      'README.md',
      'LICENSE',
      '.nvmrc',
      '.gitignore',
    ];

    return importantFiles.includes(filename) || filename.endsWith('.md');
  }

  getFileDescription(filename) {
    const descriptions = {
      'package.json': 'Dependencies and scripts',
      'next.config.ts': 'Next.js configuration (static export)',
      'playwright.config.ts': 'Playwright test configuration',
      'tsconfig.json': 'TypeScript configuration',
      'README.md': 'Project documentation',
      '.nvmrc': 'Node.js version specification',
      '.gitignore': 'Git ignore rules',
    };

    return descriptions[filename] || '';
  }

  async syncWorkflowDocumentation() {
    this.log('Synchronizing workflow documentation...');

    const workflowsDir = path.join(this.rootDir, '.github', 'workflows');
    const workflows = fs
      .readdirSync(workflowsDir)
      .filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'));

    // Update workflow descriptions in README
    const readmePath = path.join(this.rootDir, 'README.md');
    let readme = fs.readFileSync(readmePath, 'utf8');
    let updated = false;

    workflows.forEach((workflowFile) => {
      const workflowPath = path.join(workflowsDir, workflowFile);
      const workflowContent = fs.readFileSync(workflowPath, 'utf8');

      // Extract workflow name for potential future use
      const nameMatch = workflowContent.match(/^name:\s*(.+)$/m);
      // const name = nameMatch ? nameMatch[1].trim() : workflowFile;

      // Update workflow references in README if needed
      if (workflowFile === 'docs-sync.yml' && !readme.includes('docs-sync')) {
        // Add documentation about the new docs-sync workflow
        const workflowSection = readme.match(/(## 🚀 Deployment.*?)## /s);
        if (workflowSection) {
          const deploymentSection = workflowSection[1];
          if (!deploymentSection.includes('Documentation Sync')) {
            const updatedSection =
              deploymentSection +
              `
### Documentation Sync

This project includes an automated documentation sync workflow that:

- **Detects changes** to project structure, dependencies, and workflows
- **Auto-updates** documentation files to keep them in sync
- **Validates** documentation consistency and accuracy
- **Creates PRs** for documentation updates when needed

The workflow runs automatically when relevant files are modified and can also be triggered manually.

`;
            readme = readme.replace(workflowSection[1], updatedSection);
            updated = true;
          }
        }
      }
    });

    if (updated) {
      fs.writeFileSync(readmePath, readme);
      this.addChange('README.md', 'Added documentation sync workflow description');
    }
  }

  async updateDependencyInfo() {
    this.log('Updating dependency information...');

    const packagePath = path.join(this.rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    // Update copilot instructions with current dependencies
    const copilotPath = path.join(this.rootDir, '.github', 'copilot-instructions.md');
    let copilotInstructions = fs.readFileSync(copilotPath, 'utf8');

    // Update key dependencies in the instructions
    const keyDeps = {
      React: packageJson.dependencies.react,
      'Next.js': packageJson.dependencies.next,
      Playwright: packageJson.devDependencies['@playwright/test'],
      TypeScript: packageJson.devDependencies.typescript,
      'Tailwind CSS': packageJson.devDependencies.tailwindcss,
    };

    // Update the dependencies section if it exists
    const depsRegex = /(### Critical Dependencies & Compatibility\n\n)(.*?)(?=\n### |\n## |$)/s;
    const depsMatch = copilotInstructions.match(depsRegex);

    if (depsMatch) {
      const currentDepsText = Object.entries(keyDeps)
        .map(([name, version]) => `- **${name} ${version}**`)
        .join('\n');

      const updatedDepsSection = depsMatch[1] + currentDepsText + '\n\n';

      if (depsMatch[2].trim() !== currentDepsText.trim()) {
        copilotInstructions = copilotInstructions.replace(depsRegex, updatedDepsSection);
        fs.writeFileSync(copilotPath, copilotInstructions);
        this.addChange('.github/copilot-instructions.md', 'Updated dependency versions');
      }
    }
  }

  async validateCopilotInstructions() {
    this.log('Validating copilot instructions...');

    // Check if component structure in instructions matches actual structure
    const appDir = path.join(this.rootDir, 'app');
    const componentsDir = path.join(appDir, 'components');

    if (fs.existsSync(componentsDir)) {
      const actualComponents = fs
        .readdirSync(componentsDir)
        .filter((file) => file.endsWith('.tsx'))
        .map((file) => file.replace('.tsx', ''));

      const copilotPath = path.join(this.rootDir, '.github', 'copilot-instructions.md');
      let copilotInstructions = fs.readFileSync(copilotPath, 'utf8');

      // Update component list in instructions if needed
      const componentSection = copilotInstructions.match(
        /(### Component Structure & Data Flow.*?```\napp\/.*?```)/s
      );

      if (componentSection) {
        const currentComponents = actualComponents.join(', ');
        this.log(`Current components: ${currentComponents}`);
        // Additional validation logic can be added here
      }
    }
  }

  async updateTestingDocumentation() {
    this.log('Updating testing documentation...');

    const testsDir = path.join(this.rootDir, 'tests');
    if (!fs.existsSync(testsDir)) return;

    const testFiles = fs
      .readdirSync(testsDir)
      .filter((file) => file.endsWith('.spec.ts'))
      .map((file) => file.replace('.spec.ts', ''));

    // Update test file references in README if needed
    const readmePath = path.join(this.rootDir, 'README.md');
    let readme = fs.readFileSync(readmePath, 'utf8');

    // Check if all test files are documented
    const testSection = readme.match(/(### Test Coverage.*?)(### |## |$)/s);

    if (testSection) {
      testFiles.forEach((testName) => {
        if (!testSection[1].includes(testName)) {
          this.log(`Test file ${testName}.spec.ts not documented in README`);
          // Could add automatic documentation generation here
        }
      });
    }
  }
}

// Run the synchronization
if (require.main === module) {
  const syncer = new DocumentationSyncer();
  syncer.run().catch((error) => {
    console.error('Documentation sync failed:', error);
    process.exit(1);
  });
}

module.exports = DocumentationSyncer;
