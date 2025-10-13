import { Command } from '@oclif/core';
import { execSync } from 'child_process';

export default class GitChangedFiles extends Command {
  static description = 'Show only changed files in the repo';

  async run(): Promise<void> {
    try {
      const result = execSync('git diff --name-only', { encoding: 'utf-8' });
      if (result.trim()) {
        this.log('Changed files:');
        this.log(result);
      } else {
        this.log('No changed files found.');
      }
    } catch (error: any) {
      this.error('Failed to get changed files: ' + error.message);
    }
  }
}
