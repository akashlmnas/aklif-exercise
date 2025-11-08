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
    const hiddenDir = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.mycli')
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

// import { Command, Flags } from '@oclif/core';
// import fetch from 'node-fetch';

// export default class TaskList extends Command {
//   static description = 'Fetch tasks from local site with filter support';

//   static flags = {
//     status: Flags.string({ char: 's', description: 'Filter by status' }),
//     assignee: Flags.string({ char: 'a', description: 'Filter by assignee name' }),
//     limit: Flags.integer({ char: 'l', description: 'Limit results', default: 10 }),
//   }

//   async run() {
//     const { flags } = await this.parse(TaskList);

//     // Build filter string
//     const params = new URLSearchParams();

//     if (flags.status) params.append('status', flags.status);
//     if (flags.assignee) params.append('assignee', flags.assignee);
//     params.append('limit', flags.limit.toString());

//     try {
//       const response = await fetch(`http://localhost:8000/api/tasks?${params.toString()}`);
//       const data = await response.json();

//       if (!data.length) {
//         this.log('No results found ✅');
//         return;
//       }

//       this.log('Fetched tasks:');
//       data.forEach((task: any, index: number) => {
//         this.log(`${index + 1}. ${task.title} - ${task.status}`);
//       });

//     } catch (error: any) {
//       this.error(`API request failed → ${error.message}`);
//     }
//   }
// }

