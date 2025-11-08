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



//====serverscript

// import frappe

// @frappe.whitelist()
// def get_overdue_stories():
//     return frappe.get_all(
//         "Project Task",
//         filters={
//             "status": "Open",
//             "due_date": ("<", frappe.utils.nowdate())
//         },
//         fields=["name", "subject", "due_date"]
//     )
//========================================================================bpmn

// ┌─────────────────────────────┐
// │          START EVENT        │
// └──────────────┬──────────────┘
//                │
//                ▼
//      ┌─────────────────────┐
//      │ Oclif Command Start │  (user runs command:  lens pr:overdue )
//      └───────────┬─────────┘
//                  │
//                  ▼
//      ┌──────────────────────────────┐
//      │ Load config.json (auth info) │
//      └───────┬──────────────────────┘
//              │
//      ┌───────┴───────────┐
//      │ Config exists?     │─── No ───→ ❌  THROW ERROR: "Config missing"
//      └───────┬───────────┘
//              │ Yes
//              ▼
//      ┌──────────────────────────────┐
//      │ Build Frappe API request URL │
//      │ + Add Filters:               │
//      │   status = "Open"            │
//      │   due_date < today           │
//      └────────┬─────────────────────┘
//               │
//               ▼
//      ┌──────────────────────────────┐
//      │  Send HTTP Fetch Request     │
//      │  with Auth header (API key)  │
//      └─────────┬────────────────────┘
//                │
//      ┌─────────┴──────────┐
//      │ API Response 200?   │── No → ❌  SHOW ERROR: "API Failure"
//      └─────────┬──────────┘
//                │ Yes
//                ▼
//      ┌─────────────────────────────┐
//      │ Parse JSON → extract Story  │
//      │ fields: id, title, due_date │
//      └────────┬────────────────────┘
//               │
//               ▼
//      ┌─────────────────────────────┐
//      │ Display in CLI in table     │
//      │ formatting (pretty output)  │
//      └──────────┬──────────────────┘
//                 │
//                 ▼
//      ┌─────────────────────────────┐
//      │      END EVENT (Success)    │
//      └─────────────────────────────┘


//=======
──────────────────────────────────────────────────────────────────────────────
LANE: Developer (CLI User)
──────────────────────────────────────────────────────────────────────────────
  ● Start Event: User triggers command
        │
        ▼
  Task: Run CLI Command → `lens story:overdue`

──────────────────────────────────────────────────────────────────────────────
LANE: OCLIF CLI Application
──────────────────────────────────────────────────────────────────────────────
        │
        ▼
  Task: Load `config.json` (contains base URL + API keys)
        │
        ▼
  Decision Gateway: Config exists?
        ├── No → Error Event → Display: "❌ Configuration missing"
        │              ↓
        │          End (Failure)
        │
        └── Yes → continue
        ▼
  Task: Build Fetch URL for Frappe API  
        `/api/resource/Task?filters=[["status","=","Open"],["exp_end_date","<","today"]]`
        │
        ▼
  Task: Send HTTP Request (fetch)  
       Authentication header: `Authorization: token <key>:<secret>`
        │
        ▼

──────────────────────────────────────────────────────────────────────────────
LANE: Frappe ERP Backend
──────────────────────────────────────────────────────────────────────────────
  Intermediate Event (API received)
        │
        ▼
  Task: Validate authentication token
        │
        ▼
  Decision Gateway: Authentication valid?
        ├── No → API Response → 401 Unauthorized
        │          ↓
        │     Error Event → CLI displays "Invalid Token"
        │
        └── Yes → continue
        ▼
  Task: Apply filter on Task DocType:
        status = "Open"
        exp_end_date < current_date
        │
        ▼

──────────────────────────────────────────────────────────────────────────────
LANE: Frappe Database (MariaDB)
──────────────────────────────────────────────────────────────────────────────
  Task: Query table `tabTask`
        SELECT name, subject, exp_end_date
        WHERE status = 'Open' AND exp_end_date < TODAY
        │
        ▼
  Return result set to Backend (JSON)

──────────────────────────────────────────────────────────────────────────────
LANE: Frappe ERP Backend
──────────────────────────────────────────────────────────────────────────────
        │
        ▼
  Task: Format result into JSON API response
  Response Example:
        {
            "data": [
                { "name": "US-2024-001", "subject": "Fix bug...", "exp_end_date": "2025-11-02" }
            ]
        }
        │
        ▼
  Send Response → Back to CLI

──────────────────────────────────────────────────────────────────────────────
LANE: OCLIF CLI Application
──────────────────────────────────────────────────────────────────────────────
        │
        ▼
  Decision Gateway: Does response contain stories?
        ├── No → Display: "✅ No overdue stories found"
        └── Yes → continue
        ▼
  Task: Format output into table
  Task: Display in terminal:
        | Story ID | Title       | Due Date |
        |----------|-------------|----------|
        | US-2024  | Fix Button  | 2025-11-02 |

        │
        ▼
  ● End Event (Success): CLI task completed
──────────────────────────────────────────────────────────────────────────────

