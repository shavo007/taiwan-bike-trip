import { test as baseTest, expect } from '@playwright/test';

// Extend the base test with project-specific setup
export const test = baseTest.extend({
  // Add custom fixtures if needed
});

export { expect };
