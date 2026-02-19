import { Command } from '@oclif/core';
import axios from 'axios';
import https from 'https';
import Table from 'cli-table3';

export default class GetIssues extends Command {
  static description = 'Fetch all open issues';

  async run() {
    const agent = new https.Agent({ rejectUnauthorized: false });

    try {
      // Correct API endpoint — doctype names in Frappe are case-sensitive
      const response = await axios.get(
        'https://lens.docker.localhost/api/resource/Issue',
        {
          httpsAgent: agent,
          headers: {
            Authorization: `Basic M2Y0ZmEzNGExNTQ1MzI5OjllZjhkOWY0MTViMDJlMA==`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Log only the relevant data, not the full response object
      const issues = response.data?.data || [];

      if (issues.length === 0) {
        this.log('No issues found.');
        return;
      }

      //  Pretty print results using cli-table3
      const table = new Table({
        head: ['Name', 'Subject', 'Status'],
        colWidths: [20, 40, 20],
      });

      issues.forEach((issue: any) => {
        table.push([issue.name, issue.subject, issue.status]);
      });

      this.log(table.toString());
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        this.error(
          ` Failed to fetch issues: ${err.response?.status} - ${err.response?.statusText}`
        );
      } else {
        this.error(` Failed to fetch issues: ${err.message}`);
      }
    }
  }
}
