import {Command} from '@oclif/core'
import inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'

export default class Setup extends Command {
  static description = 'Store URL and Basic Key interactively'

  async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'What is your URL?',
      },
      {
        type: 'input',
        name: 'basicKey',
        message: 'What is your Basic Key?',
      },
    ])

    // Define hidden folder path (example: ~/.mycli/)
    const hiddenDir = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.akash')
    const configFile = path.join(hiddenDir, 'config.json')

    // Ensure folder exists
    if (!fs.existsSync(hiddenDir)) {
      fs.mkdirSync(hiddenDir, {recursive: true})
    }

    // Save answers into JSON
    fs.writeFileSync(configFile, JSON.stringify(answers, null, 2))

    this.log(`✅ Config saved in ${configFile}`)
  }
}
