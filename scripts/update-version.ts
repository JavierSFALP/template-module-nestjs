// filepath: /c:/Users/administradorlocal/Desktop/Trabajo/template-module-nestjs-1/template-module-nestjs/scripts/update-version.ts
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';

interface PackageJson {
  name: string;
  version: string;
}

const packageJsonPath = path.resolve(__dirname, '../package.json');

// Function to get the latest version from npm
function getLatestVersion(packageName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`npm dist-tags ls ${packageName}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
        return;
      }
      const lines = stdout.split('\n');
      const latestLine = lines.find(line => line.startsWith('latest:'));
      if (latestLine) {
        const latestVersion = latestLine.split(':')[1].trim();
        resolve(latestVersion);
      } else {
        reject('Latest version not found');
      }
    });
  });
}

// Function to update the package.json file
async function updatePackageJson(version: string, packageJson: PackageJson): Promise<void> {
  packageJson.version = version;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated package.json to version ${version}`);
}

// Main function to get the version and update package.json
async function main(): Promise<void> {
  try {
    const packageJson: PackageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    const latestVersion = await getLatestVersion(packageJson.name);
    await updatePackageJson(latestVersion, packageJson);
  } catch (error) {
    console.error(error);
  }
}

main();