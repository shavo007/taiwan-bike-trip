#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Link checking script for documentation
 *
 * Validates that all links in documentation files work:
 * - Checks internal file links exist
 * - Validates external HTTP/HTTPS links
 * - Reports broken or slow links
 * - Provides suggestions for fixes
 */

class LinkChecker {
  constructor() {
    this.rootDir = process.cwd();
    this.brokenLinks = [];
    this.slowLinks = [];
    this.checkedUrls = new Map(); // Cache for external URL checks
    this.timeout = 10000; // 10 second timeout
  }

  log(message) {
    console.log(`[LINK-CHECK] ${message}`);
  }

  error(message) {
    console.error(`[LINK-CHECK ERROR] ${message}`);
  }

  warn(message) {
    console.warn(`[LINK-CHECK WARNING] ${message}`);
  }

  async run() {
    this.log('Starting link validation...');

    try {
      const markdownFiles = this.findMarkdownFiles();
      this.log(`Found ${markdownFiles.length} markdown files to check`);

      for (const filePath of markdownFiles) {
        await this.checkLinksInFile(filePath);
      }

      // Report results
      if (this.brokenLinks.length > 0) {
        this.log(`\n❌ Found ${this.brokenLinks.length} broken links:`);
        this.brokenLinks.forEach((link) => {
          console.error(`  ${link.file}: "${link.text}" -> ${link.url}`);
          if (link.error) {
            console.error(`    Error: ${link.error}`);
          }
          if (link.suggestion) {
            console.log(`    Suggestion: ${link.suggestion}`);
          }
        });
      }

      if (this.slowLinks.length > 0) {
        this.log(`\n⚠️  Found ${this.slowLinks.length} slow links (>5s):`);
        this.slowLinks.forEach((link) => {
          console.warn(`  ${link.file}: ${link.url} (${link.responseTime}ms)`);
        });
      }

      if (this.brokenLinks.length === 0 && this.slowLinks.length === 0) {
        this.log('✅ All links are working correctly!');
      }

      // Exit with error code if there are broken links
      if (this.brokenLinks.length > 0) {
        process.exit(1);
      }
    } catch (error) {
      this.error(`Link checking failed: ${error.message}`);
      process.exit(1);
    }
  }

  async checkLinksInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(this.rootDir, filePath);

    this.log(`Checking links in ${relativePath}...`);

    // Find all markdown links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;

    while ((linkMatch = linkRegex.exec(content)) !== null) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];

      await this.checkLink(filePath, linkText, linkUrl);
    }

    // Find all image links
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let imageMatch;

    while ((imageMatch = imageRegex.exec(content)) !== null) {
      const altText = imageMatch[1];
      const imageUrl = imageMatch[2];

      await this.checkLink(filePath, altText || 'image', imageUrl, true);
    }
  }

  async checkLink(filePath, linkText, linkUrl, isImage = false) {
    const relativePath = path.relative(this.rootDir, filePath);

    try {
      // Skip anchor links
      if (linkUrl.startsWith('#')) {
        return;
      }

      // Check external links
      if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
        await this.checkExternalLink(relativePath, linkText, linkUrl);
        return;
      }

      // Check internal links
      await this.checkInternalLink(filePath, relativePath, linkText, linkUrl, isImage);
    } catch (error) {
      this.brokenLinks.push({
        file: relativePath,
        text: linkText,
        url: linkUrl,
        error: error.message,
      });
    }
  }

  async checkInternalLink(filePath, relativePath, linkText, linkUrl, isImage) {
    // Resolve relative path
    const targetPath = path.resolve(path.dirname(filePath), linkUrl);

    // Check if file exists
    if (!fs.existsSync(targetPath)) {
      // Try to suggest alternatives
      const suggestion = this.suggestAlternative(targetPath, linkUrl);

      this.brokenLinks.push({
        file: relativePath,
        text: linkText,
        url: linkUrl,
        error: `File not found: ${targetPath}`,
        suggestion,
      });
      return;
    }

    // Additional checks for images
    if (isImage) {
      const stats = fs.statSync(targetPath);

      // Check if it's actually a file (not directory)
      if (!stats.isFile()) {
        this.brokenLinks.push({
          file: relativePath,
          text: linkText,
          url: linkUrl,
          error: 'Path points to directory, not file',
        });
        return;
      }

      // Check if it's an image file
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
      const ext = path.extname(targetPath).toLowerCase();

      if (!imageExtensions.includes(ext)) {
        this.brokenLinks.push({
          file: relativePath,
          text: linkText,
          url: linkUrl,
          error: `Not an image file (extension: ${ext})`,
        });
      }
    }
  }

  async checkExternalLink(relativePath, linkText, linkUrl) {
    // Use cache to avoid checking the same URL multiple times
    if (this.checkedUrls.has(linkUrl)) {
      const cachedResult = this.checkedUrls.get(linkUrl);
      if (!cachedResult.success) {
        this.brokenLinks.push({
          file: relativePath,
          text: linkText,
          url: linkUrl,
          error: cachedResult.error,
        });
      } else if (cachedResult.responseTime > 5000) {
        this.slowLinks.push({
          file: relativePath,
          url: linkUrl,
          responseTime: cachedResult.responseTime,
        });
      }
      return;
    }

    try {
      const startTime = Date.now();
      await this.makeHttpRequest(linkUrl);
      const responseTime = Date.now() - startTime;

      // Cache successful result
      this.checkedUrls.set(linkUrl, { success: true, responseTime });

      // Report slow links
      if (responseTime > 5000) {
        this.slowLinks.push({
          file: relativePath,
          url: linkUrl,
          responseTime,
        });
      }
    } catch (error) {
      // Cache failed result
      this.checkedUrls.set(linkUrl, { success: false, error: error.message });

      this.brokenLinks.push({
        file: relativePath,
        text: linkText,
        url: linkUrl,
        error: error.message,
      });
    }
  }

  makeHttpRequest(url) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol === 'https:' ? https : http;

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: 'HEAD', // Use HEAD to avoid downloading full content
        timeout: this.timeout,
        headers: {
          'User-Agent': 'Link-Checker/1.0 (Documentation Validation)',
        },
      };

      const req = protocol.request(options, (res) => {
        // Consider 2xx and 3xx as success
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(res);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Request timeout (${this.timeout}ms)`));
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  suggestAlternative(targetPath, originalUrl) {
    const dir = path.dirname(targetPath);
    const filename = path.basename(targetPath);

    try {
      // If directory doesn't exist, can't suggest alternatives
      if (!fs.existsSync(dir)) {
        return null;
      }

      const files = fs.readdirSync(dir);

      // Look for similar filenames
      const similarFiles = files.filter((file) => {
        const similarity = this.calculateSimilarity(filename.toLowerCase(), file.toLowerCase());
        return similarity > 0.7; // 70% similarity threshold
      });

      if (similarFiles.length > 0) {
        const bestMatch = similarFiles[0];
        const suggestedPath = path.join(path.dirname(originalUrl), bestMatch);
        return `Did you mean "${suggestedPath}"?`;
      }

      // Look for files with same extension
      const ext = path.extname(filename);
      if (ext) {
        const sameExtFiles = files.filter((file) => path.extname(file) === ext);
        if (sameExtFiles.length > 0) {
          return `Available ${ext} files: ${sameExtFiles.slice(0, 3).join(', ')}${sameExtFiles.length > 3 ? '...' : ''}`;
        }
      }
    } catch {
      // Ignore errors in suggestion generation
    }

    return null;
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) {
      return 1.0;
    }

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
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

// Run the link checking
if (require.main === module) {
  const checker = new LinkChecker();
  checker.run().catch((error) => {
    console.error('Link checking failed:', error);
    process.exit(1);
  });
}

module.exports = LinkChecker;
