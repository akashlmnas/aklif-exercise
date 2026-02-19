import { Command } from '@oclif/core';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

export default class GitBranchCreate extends Command {
  static description = 'Create a new branch from a specified base branch';

  async run() {
    try {
      // Prompt user for base branch
      const { baseBranch } = await inquirer.prompt([
        {
          type: 'input',
          name: 'baseBranch',
          message: 'Enter the base branch name:',
          validate: (input) => !!input || 'Base branch name cannot be empty.',
        },
      ]);

      // Prompt user for new branch
      const { newBranch } = await inquirer.prompt([
        {
          type: 'input',
          name: 'newBranch',
          message: 'Enter the new branch name:',
          validate: (input) => !!input || 'New branch name cannot be empty.',
        },
      ]);

      // Checkout to base branch and update
      this.log(`Checking out to base branch: ${baseBranch}...`);
      execSync(`git checkout ${baseBranch}`, { stdio: 'inherit' });
      execSync(`git pull`, { stdio: 'inherit' });

      // Create new branch
      this.log(`Creating new branch: ${newBranch}...`);
      execSync(`git checkout -b ${newBranch}`, { stdio: 'inherit' });

      this.log(`✅ Successfully created and switched to branch "${newBranch}"`);
    } catch (error: any) {
      this.error(`❌ Failed to create branch: ${error.message}`);
    }
  }
}
