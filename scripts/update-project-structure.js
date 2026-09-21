#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

/**
 * Project structure update script
 *
 * Generates and updates project structure documentation
 * based on the actual file system structure
 */

class ProjectStructureUpdater {
  constructor() {
    this.rootDir = process.cwd();
  }

  log(message) {
    console.log(`[STRUCTURE-UPDATE] ${message}`);
  }

  error(message) {
    console.error(`[STRUCTURE-UPDATE ERROR] ${message}`);
  }

  async run() {
    this.log('Updating project structure documentation...');

    try {
      const structure = this.generateDetailedStructure();
      await this.updateReadme(structure);
      await this.updateCopilotInstructions(structure);

      this.log('✅ Project structure documentation updated successfully!');
    } catch (error) {
      this.error(`Update failed: ${error.message}`);
      process.exit(1);
    }
  }

  generateDetailedStructure() {
    const structure = [];
    const visited = new Set();

    const addDirectory = (dirPath, indent = '') => {
      if (visited.has(dirPath)) return;
      visited.add(dirPath);

      const items = fs
        .readdirSync(dirPath, { withFileTypes: true })
        .filter((item) => this.shouldIncludeItem(item.name))
        .sort((a, b) => {
          // Directories first, then files
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          return a.name.localeCompare(b.name);
        });

      items.forEach((item, index) => {
        const isLastItem = index === items.length - 1;
        const prefix = indent + (isLastItem ? '└── ' : '├── ');
        const itemPath = path.join(dirPath, item.name);
        const nextIndent = indent + (isLastItem ? '    ' : '│   ');

        if (item.isDirectory()) {
          structure.push(`${prefix}${item.name}/`);

          // Add special handling for important directories
          this.addDirectoryDetails(item.name, itemPath, nextIndent, structure);

          // Recursively add subdirectories for important ones
          if (this.shouldExploreDeeply(item.name)) {
            addDirectory(itemPath, nextIndent, isLastItem);
          }
        } else {
          const description = this.getFileDescription(item.name);
          structure.push(`${prefix}${item.name}${description ? ` # ${description}` : ''}`);
        }
      });
    };

    addDirectory(this.rootDir);
    return structure.join('\n');
  }

  shouldIncludeItem(itemName) {
    const excludePatterns = [
      /^\./, // Hidden files/directories (except .github, .nvmrc, etc.)
      /^node_modules$/,
      /^out$/,
      /^dist$/,
      /^build$/,
      /^playwright-report$/,
      /^test-results$/,
      /^coverage$/,
      /\.log$/,
      /\.tmp$/,
      /~$/,
    ];

    // Special inclusions for important hidden files
    const importantHidden = [
      '.github',
      '.nvmrc',
      '.gitignore',
      '.prettierrc',
      '.prettierignore',
      '.husky',
    ];

    if (importantHidden.includes(itemName)) {
      return true;
    }

    return !excludePatterns.some((pattern) => pattern.test(itemName));
  }

  shouldExploreDeeply(dirName) {
    const deepExploreDirectories = ['app', 'tests', '.github', 'scripts', 'public'];

    return deepExploreDirectories.includes(dirName);
  }

  addDirectoryDetails(dirName, dirPath, indent, structure) {
    switch (dirName) {
      case 'app':
        this.addAppDirectoryDetails(dirPath, indent, structure);
        break;
      case 'tests':
        this.addTestsDirectoryDetails(dirPath, indent, structure);
        break;
      case '.github':
        this.addGithubDirectoryDetails(dirPath, indent, structure);
        break;
      case 'scripts':
        this.addScriptsDirectoryDetails(dirPath, indent, structure);
        break;
      case 'public':
        this.addPublicDirectoryDetails(dirPath, indent, structure);
        break;
    }
  }

  addAppDirectoryDetails(dirPath, indent, structure) {
    if (fs.existsSync(path.join(dirPath, 'page.tsx'))) {
      structure.push(
        `${indent}├── page.tsx              # Main layout: Navigation → Hero → Features → TourStats → ItineraryEnhanced → Footer`
      );
    }

    const componentsDir = path.join(dirPath, 'components');
    if (fs.existsSync(componentsDir)) {
      structure.push(`${indent}├── components/           # React components`);

      const components = fs
        .readdirSync(componentsDir)
        .filter((file) => file.endsWith('.tsx'))
        .sort();

      components.forEach((component, index) => {
        const isLast = index === components.length - 1;
        const componentPrefix = `${indent}│   ${isLast ? '└── ' : '├── '}`;
        const description = this.getComponentDescription(component);
        structure.push(`${componentPrefix}${component}${description ? ` # ${description}` : ''}`);
      });
    }

    if (fs.existsSync(path.join(dirPath, 'globals.css'))) {
      structure.push(`${indent}└── globals.css           # Global styles`);
    }
  }

  addTestsDirectoryDetails(dirPath, indent, structure) {
    const testFiles = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.spec.ts'))
      .sort();

    testFiles.forEach((testFile, index) => {
      const isLast = index === testFiles.length - 1;
      const testPrefix = `${indent}${isLast ? '└── ' : '├── '}`;
      const description = this.getTestDescription(testFile);
      structure.push(`${testPrefix}${testFile}${description ? ` # ${description}` : ''}`);
    });
  }

  addGithubDirectoryDetails(dirPath, indent, structure) {
    const workflowsDir = path.join(dirPath, 'workflows');
    if (fs.existsSync(workflowsDir)) {
      structure.push(`${indent}├── workflows/           # GitHub Actions`);

      const workflows = fs
        .readdirSync(workflowsDir)
        .filter((file) => file.endsWith('.yml'))
        .sort();

      workflows.forEach((workflow, index) => {
        const isLast = index === workflows.length - 1;
        const workflowPrefix = `${indent}│   ${isLast ? '└── ' : '├── '}`;
        const description = this.getWorkflowDescription(workflow);
        structure.push(`${workflowPrefix}${workflow}${description ? ` # ${description}` : ''}`);
      });
    }

    const instructionsDir = path.join(dirPath, 'instructions');
    if (fs.existsSync(instructionsDir)) {
      structure.push(`${indent}└── instructions/        # Development guidelines`);
    }
  }

  addScriptsDirectoryDetails(dirPath, indent, structure) {
    const scripts = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.js'))
      .sort();

    scripts.forEach((script, index) => {
      const isLast = index === scripts.length - 1;
      const scriptPrefix = `${indent}${isLast ? '└── ' : '├── '}`;
      const description = this.getScriptDescription(script);
      structure.push(`${scriptPrefix}${script}${description ? ` # ${description}` : ''}`);
    });
  }

  addPublicDirectoryDetails(dirPath, indent, structure) {
    const items = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((item) => this.shouldIncludeItem(item.name))
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      const itemPrefix = `${indent}${isLast ? '└── ' : '├── '}`;

      if (item.isDirectory()) {
        const description = this.getPublicDirectoryDescription(item.name);
        structure.push(`${itemPrefix}${item.name}/${description ? ` # ${description}` : ''}`);
      } else {
        const description = this.getFileDescription(item.name);
        structure.push(`${itemPrefix}${item.name}${description ? ` # ${description}` : ''}`);
      }
    });
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
      '.prettierrc': 'Prettier configuration',
      '.prettierignore': 'Prettier ignore rules',
      'eslint.config.mjs': 'ESLint configuration',
      'postcss.config.mjs': 'PostCSS configuration',
      'tailwind.config.ts': 'Tailwind CSS configuration',
      LICENSE: 'License file',
    };

    return descriptions[filename] || '';
  }

  getComponentDescription(componentFile) {
    const descriptions = {
      'ItineraryEnhanced.tsx': 'Primary itinerary component with complete schedule data',
      'Itinerary.tsx': 'Alternative/legacy itinerary view with compact grid layout',
      'QRCodeDisplay.tsx': 'Canvas-based QR generation with bubble tea emoji overlay',
      'StravaRouteEmbed.tsx': 'Third-party Strava embed integration with placeholder handling',
      'TourStats.tsx': 'Animated statistics with intersection observer',
      'Hero.tsx': 'Hero section component',
      'Features.tsx': 'Features showcase component',
      'Navigation.tsx': 'Main navigation component',
      'Footer.tsx': 'Footer component',
    };

    return descriptions[componentFile] || '';
  }

  getTestDescription(testFile) {
    const descriptions = {
      'smoke.spec.ts': 'Smoke tests (PRIMARY for CI/CD)',
      'homepage.spec.ts': 'Basic homepage tests',
      'homepage-exploration.spec.ts': 'Core website functionality tests',
      'itinerary.spec.ts': 'Itinerary feature tests',
      'strava-integration.spec.ts': 'Strava route integration tests',
    };

    return descriptions[testFile] || '';
  }

  getWorkflowDescription(workflowFile) {
    const descriptions = {
      'deploy.yml': 'GitHub Pages deployment',
      'playwright.yml': 'Playwright CI/CD testing',
      'docs-sync.yml': 'Documentation synchronization',
      'dependabot-auto-merge.yml': 'Dependabot auto-merge workflow',
    };

    return descriptions[workflowFile] || '';
  }

  getScriptDescription(scriptFile) {
    const descriptions = {
      'sync-docs.js': 'Main documentation synchronization',
      'validate-docs.js': 'Documentation validation',
      'check-links.js': 'Link validation',
      'update-project-structure.js': 'Project structure update',
    };

    return descriptions[scriptFile] || '';
  }

  getPublicDirectoryDescription(dirName) {
    const descriptions = {
      images: 'Static images and assets',
    };

    return descriptions[dirName] || '';
  }

  async updateReadme(structure) {
    const readmePath = path.join(this.rootDir, 'README.md');

    if (!fs.existsSync(readmePath)) {
      this.error('README.md not found');
      return;
    }

    let readme = fs.readFileSync(readmePath, 'utf8');

    // Find and replace the project structure section
    const structureRegex = /(## 📁 Project Structure\n\n```\n)(.*?)(\n```)/s;
    const match = readme.match(structureRegex);

    if (match) {
      const updatedReadme = readme.replace(structureRegex, `$1${structure}$3`);

      if (match[2] !== structure) {
        fs.writeFileSync(readmePath, updatedReadme);
        this.log('Updated project structure in README.md');
      } else {
        this.log('Project structure in README.md is already up to date');
      }
    } else {
      this.log('Project structure section not found in README.md - skipping update');
    }
  }

  async updateCopilotInstructions(structure) {
    const copilotPath = path.join(this.rootDir, '.github', 'copilot-instructions.md');

    if (!fs.existsSync(copilotPath)) {
      this.log('Copilot instructions not found - skipping update');
      return;
    }

    let copilotInstructions = fs.readFileSync(copilotPath, 'utf8');

    // Update the component structure section
    const componentRegex = /(### Component Structure & Data Flow\n\n```\napp\/\n)(.*?)(\n```)/s;
    const match = copilotInstructions.match(componentRegex);

    if (match) {
      // Extract just the app directory structure
      const appStructure = structure
        .split('\n')
        .filter(
          (line) =>
            line.includes('app/') ||
            line.includes('├── page.tsx') ||
            line.includes('└── components/') ||
            line.includes('├── components/') ||
            line.match(/│\s+[├└]──.*\.tsx/)
        )
        .join('\n');

      if (appStructure && match[2] !== appStructure) {
        const updatedInstructions = copilotInstructions.replace(
          componentRegex,
          `$1${appStructure}$3`
        );

        fs.writeFileSync(copilotPath, updatedInstructions);
        this.log('Updated component structure in copilot instructions');
      } else {
        this.log('Component structure in copilot instructions is already up to date');
      }
    }
  }
}

// Run the structure update
if (require.main === module) {
  const updater = new ProjectStructureUpdater();
  updater.run().catch((error) => {
    console.error('Project structure update failed:', error);
    process.exit(1);
  });
}

module.exports = ProjectStructureUpdater;
