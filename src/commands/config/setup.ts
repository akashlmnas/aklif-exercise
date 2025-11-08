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
//================
// ✅ Best Practice — Use ENV Variables (Recommended)
// 🔧 .env file (never commit this to Git)
// API_BASE_URL=http://localhost:5000
// API_TOKEN=ghp_xxxxxx


// Note: Add .env to .gitignore

//OCLIF Command Example (fetch API using env)
// import { Command, Flags } from "@oclif/core";
// import fetch from "node-fetch";
// import * as dotenv from "dotenv";

// dotenv.config();  // loads .env

// export default class FetchData extends Command {
//   static description = "Fetch data with token auth (without hardcoding token)";

//   static flags = {
//     id: Flags.string({ char: "i", description: "Record ID", required: true }),
//   };

//   async run() {
//     const { flags } = await this.parse(FetchData);

//     const BASE_URL = process.env.API_BASE_URL;
//     const TOKEN = process.env.API_TOKEN;

//     if (!TOKEN) {
//       this.error("❌ Missing API_TOKEN in .env file");
//     }

//     const response = await fetch(`${BASE_URL}/record/${flags.id}`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) {
//       this.error(`API request failed: ${response.statusText}`);
//     }

//     const data = await response.json();
//     this.log(JSON.stringify(data, null, 2));
//   }
// }



// ✅ Step 1: .env (never commit to git)
// API_BASE_URL=https://your-api-url.com/api
// API_TOKEN=YOUR_AUTH_TOKEN_HERE


// Make sure .env is in .gitignore.

// ✅ Step 2: OCLIF Command — Fetch Open + Overdue Story IDs
// 📌 src/commands/story/overdue.ts
// import { Command } from "@oclif/core";
// import fetch from "node-fetch";
// import * as dotenv from "dotenv";

// dotenv.config();

// interface Story {
//   id: string;
//   title: string;
//   status: string;
//   due_date: string;
// }

// export default class OverdueStories extends Command {
//   static description = "Fetch opened & overdue story IDs from server";

//   async run() {
//     const BASE_URL = process.env.API_BASE_URL;
//     const TOKEN = process.env.API_TOKEN;

//     if (!BASE_URL || !TOKEN) {
//       this.error("❌ Missing API_BASE_URL or API_TOKEN in .env");
//     }

//     try {
//       this.log("⏳ Fetching overdue stories...");

//       const response = await fetch(`${BASE_URL}/stories?status=open`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         this.error(`❌ API error: ${response.statusText}`);
//       }

//       const stories: Story[] = await response.json();

//       // 🔍 Filter overdue stories
//       const today = new Date();

//       const overdueStories = stories.filter(
//         (story) => new Date(story.due_date) < today
//       );

//       if (overdueStories.length === 0) {
//         this.log("✅ No overdue opened stories found.");
//         return;
//       }

//       const storyIds = overdueStories.map((story) => story.id);

//       this.log("\n🚨 Overdue Stories Found:");
//       storyIds.forEach((id) => console.log(`🔹 Story ID: ${id}`));

//       this.log("\n✅ Extraction completed successfully.");
//     } catch (err: any) {
//       this.error(`💥 Error fetching stories: ${err.message}`);
//     }
//   }
// }

//=======
// ✅ Example 1 — REST API (filter params)
// GET /stories?status=open&due_date_lt=2024-11-07

// OCLIF Code (story/overdue.ts)
// import { Command } from "@oclif/core";
// import fetch from "node-fetch";
// import * as dotenv from "dotenv";

// dotenv.config();

// export default class OverdueStories extends Command {
//   static description = "Fetch overdue stories using API filter logic";

//   async run() {
//     const BASE_URL = process.env.API_BASE_URL;
//     const TOKEN = process.env.API_TOKEN;

//     if (!BASE_URL || !TOKEN) {
//       this.error("❌ Missing API_BASE_URL or API_TOKEN in .env");
//     }

//     const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

//     try {
//       this.log("⏳ Fetching filtered overdue stories from API...");

//       const response = await fetch(
//         `${BASE_URL}/stories?status=open&due_date_lt=${today}`, // <-- API filter logic
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         this.error(`❌ API Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (!data.length) {
//         this.log("✅ No overdue stories found");
//         return;
//       }

//       this.log("\n🚨 Overdue Open Stories:");
//       data.forEach((story: any) => this.log(`🔹 ${story.id}`));
//     } catch (err: any) {
//       this.error(`💥 API request failed: ${err.message}`);
//     }
//   }
// }


