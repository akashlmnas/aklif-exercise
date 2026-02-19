import {Command} from '@oclif/core'
import {execSync} from 'child_process'

export default class BranchList extends Command {
  static description = 'List all git branches in the current repo'

  async run(): Promise<void> {
    try {
      const result = execSync('git branch --all', {encoding: 'utf-8'})
      this.log('📂 Git Branches:\n')
      this.log(result)
    } catch (error) {
      this.error('❌ Failed to list branches. Make sure you are inside a Git repo.')
    }
  }
}
