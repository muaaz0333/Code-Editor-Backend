import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class CodeExecutionService {
  // async executeJavaScript(code: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     exec(`node -e "${code}"`, (error, stdout, stderr) => {
  //       if (error) {
  //         return reject(`Error: ${stderr}`);
  //       }
  //       resolve(stdout);
  //     });
  //   });
  // }
  async executeJavaScript(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Escape only double quotes in the code
      const escapedCode = code.replace(/"/g, '\\"'); // Only escape double quotes

      // Construct the command properly using backticks for the exec
      const command = `node -e "${escapedCode}"`; // Ensure command is properly formatted
      console.log('Executing command:', command);

      exec(command, (error, stdout, stderr) => {
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        if (error) {
          console.error('JavaScript Error:', stderr || error.message);
          return reject(`Error: ${stderr || error.message}`);
        }
        resolve(stdout.trim());
      });
    });
  }

  async executePython(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Get the Python path from environment variable
      const pythonPath = process.env.PYTHON_PATH || 'python'; // Fallback to "python" if env var not set

      // Escape quotes and handle newlines
      const escapedCode = code
        .replace(/"/g, '\\"') // Escape double quotes
        .replace(/\n/g, '; '); // Replace newlines with semicolons

      // Construct the command
      const command = `"${pythonPath}" -c "${escapedCode}"`;
      console.log('Executing command:', command);

      exec(command, (error, stdout, stderr) => {
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);

        if (error) {
          console.error('Python Error:', stderr || error.message);
          return reject(`Error: ${stderr || error.message}`);
        }
        resolve(stdout.trim());
      });
    });
  }

  async executeCode(code: string, language: string): Promise<string> {
    if (language === 'javascript') {
      return this.executeJavaScript(code);
    } else if (language === 'python') {
      return this.executePython(code);
    } else {
      throw new Error('Unsupported language');
    }
  }
}
