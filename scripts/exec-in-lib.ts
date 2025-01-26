import * as path from 'path';
import { exec } from 'child_process';

const libFolder = process.argv[2];

if (!libFolder) {
  console.error('Please provide the library folder name as an argument.');
  process.exit(1);
}

const libPath = path.resolve(__dirname, `../libs/${libFolder}`);
const command = 'npm publish';

exec(command, { cwd: libPath }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});