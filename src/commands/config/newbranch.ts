import {Command} from '@oclif/core'
import inquirer from 'inquirer'
import {execSync} from 'child_process'

export default class BranchCreate extends Command {
  static description = 'Create a new branch from a given base branch'

  async run(): Promise<void> {
    try {
      // Ask user inputs
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'baseBranch',
          message: 'Enter the base branch name:',
          validate: input => input ? true : 'Base branch is required',
        },
        {
          type: 'input',
          name: 'newBranch',
          message: 'Enter the new branch name:',
          validate: input => input ? true : 'New branch name is required',
        },
      ])

      const {baseBranch, newBranch} = answers

      // Checkout base branch
      this.log(` Checking out base branch: ${baseBranch}...`)
      execSync(`git checkout ${baseBranch}`, {stdio: 'inherit'})

      // Create new branch
      this.log(` Creating new branch: ${newBranch}...`)
      execSync(`git checkout -b ${newBranch}`, {stdio: 'inherit'})

      this.log(` Branch '${newBranch}' created from '${baseBranch}'`)
    } catch (error) {
      this.error(' Failed to create branch. Make sure branch names are correct.')
    }
  }
}
