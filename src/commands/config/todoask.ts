import { Command } from '@oclif/core';
import inquirer from 'inquirer';
import axios from 'axios';
import https from 'https';

export default class CreateTodo extends Command {
  static description = 'Create a new todo';

  async run() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Enter todo description:',
      },
    ]);

    const { description } = answers;

    // Step 2: Ask user for Basic Auth token (or use environment variable)
    const authAnswers = await inquirer.prompt([
      {
        type: 'input',
        name: 'basicToken',
        message: 'Enter your Basic Auth token:',
        default: process.env.LENS_BASIC_AUTH || '', // Optional default from env
      },
    ]);

    const { basicToken } = authAnswers;

    // Step 3: Create HTTPS agent to ignore self-signed certificates
    const agent = new https.Agent({ rejectUnauthorized: false });

    try {
      // Step 4: POST the todo
      const response = await axios.post(
        'https://lens.docker.localhost/api/resource/ToDo',
        { description },
        {
          httpsAgent: agent,
          headers: {
            'Authorization': `Basic ${basicToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      this.log(`✅ Todo created successfully! ID: ${response.data.id}`);
    } catch (err) {
    this.error("Failed")
    }
  }
}
