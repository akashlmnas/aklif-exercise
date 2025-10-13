import { Command } from '@oclif/core'
import { execSync } from 'child_process'

export default class BranchList extends Command {
  static description = 'List all branches in the git repo'
  static example=[' dbranch_listview']

  async run(): Promise<void> {
    try {
      const result = execSync('git branch -a', { encoding: 'utf-8' })
      this.log('Branches in repository:')
      this.log(result)
    } catch (error: any) {
      this.error('Failed to list branches: ' + error.message)
    }
  }
}