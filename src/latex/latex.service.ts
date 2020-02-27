import { ExecException, exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

const BASE_PATH = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(BASE_PATH, 'output');
const TEMPLATE_DIR = path.join(BASE_PATH, 'templates');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

export enum LatexTemplates {
  test = 0,
}

@Injectable()
export class LatexService {
  async generate (template: LatexTemplates, args: { [key: string]: string } = {}) {
    const TEMPLATE_FILE = `${path.join(TEMPLATE_DIR, LatexTemplates[template])}.tex`;
    const OUTPUT_FILE = path.join(OUTPUT_DIR, `${LatexTemplates[template]}.tex`);

    let data = (await this.readFile(TEMPLATE_FILE)).toString();
    for (const key of Object.keys(args)) {
      data = data.replace(`{{{${key.toUpperCase()}}}}`, args[key].toString());
    }

    fs.writeFileSync(OUTPUT_FILE, data);
    await this.exec(`pdflatex -output-directory=${OUTPUT_DIR} ${OUTPUT_FILE}`);
  }

  private async readFile (path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  private async exec (command: string): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) return reject(error);
        resolve({ stdout, stderr });
      });
    });
  }
}
