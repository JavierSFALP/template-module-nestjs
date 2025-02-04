import { exec } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';

interface PackageJson {
  name: string;
  version: string;
}

const packageJsonPath = path.resolve(__dirname, '../package.json');
let packageJson: PackageJson;

// Function to get the package name from package.json
async function getPackageName(): Promise<string> {
  packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
  return packageJson.name;
}

// Function to get the latest version from npm
function getLatestVersion(packageName: string): Promise<string> {
  return new Promise((resolve) => {
    exec(`npm dist-tags ls ${packageName}`, (error, stdout) => {
      if (error) {
        resolve('1.0.0'); // Default version if error occurs
        return;
      }
      const lines = stdout.split('\n');
      const latestLine = lines.find(line => line.startsWith('latest:'));
      if (latestLine) {
        const latestVersion = latestLine.split(':')[1].trim();
        resolve(latestVersion);
      } else {
        resolve('1.0.0'); // Default version if latest version not found
      }
    });
  });
}

// Function to update the package.json file
async function updatePackageJson(version: string): Promise<void> {
  packageJson.version = version;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated package.json to version ${version}`);
}

// Main function to get the version and update package.json
async function main(): Promise<void> {
  try {
    const packageName = await getPackageName();
    const latestVersion = await getLatestVersion(packageName);
    await updatePackageJson(latestVersion);
  } catch (error) {
    console.error(error);
  }
}

main();