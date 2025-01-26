import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const generateAndMoveModule = (moduleName: string) => {
    const srcDir = path.join(__dirname, '../src', moduleName);
    const newLibDir = path.join(__dirname, '../libs', moduleName);
    const newLibSrcDir = path.join(newLibDir, 'src');

    // Check if the source directory exists
    if (!fs.existsSync(srcDir)) {
        console.error(`Module ${moduleName} not found in src directory.`);
        return;
    }

    // Generate the new library using Nest CLI
    try {
        execSync(`nest g lib ${moduleName}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to generate library: ${error.message}`);
        return;
    }

    // Create the src directory if it doesn't exist
    fs.mkdirSync(newLibSrcDir, { recursive: true });

    // Remove existing files in the new library's src directory
    fs.readdirSync(newLibSrcDir).forEach(file => {
        const filePath = path.join(newLibSrcDir, file);
        fs.unlinkSync(filePath);
    });

    // Move files from the existing module to the new library's src directory
    fs.readdirSync(srcDir).forEach(file => {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(newLibSrcDir, file);
        fs.renameSync(srcFile, destFile);
    });

    console.log(`Moved files from ${moduleName} to the new library ${moduleName} in libs directory.`);
};

// Get module name from command line arguments
const moduleName = process.argv[2];
if (!moduleName) {
    console.error('Please provide a module name as a parameter.');
    process.exit(1);
}

generateAndMoveModule(moduleName);
