import { ExecException, exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

export enum LatexTemplates {
  test = 0,
}

@Injectable()
export class LatexService {
  async generate (template: LatexTemplates) {
    const BASE_PATH = path.join(__dirname, '..');
    const TEMPLATE_DIR = path.join(BASE_PATH, 'templates');
    const OUTPUT_DIR = path.join(BASE_PATH, 'output');

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    await this.exec(`pdflatex -output-directory=${OUTPUT_DIR} ${path.join(TEMPLATE_DIR, LatexTemplates[template])}.tex`);
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
