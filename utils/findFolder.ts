import * as fs from 'fs';
import * as path from 'path';

const findFolder = (dir: string, folderName: string): void => {
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
        if (err) return console.error(err);
        for (const entry of entries) {
            if (entry.isDirectory() && entry.name === folderName) {
                console.log(path.join(dir, entry.name));
            }
            if (entry.isDirectory()) {
                findFolder(path.join(dir, entry.name), folderName);
            }
        }
    });
};

const folderName: string = process.argv[2];
const startDir: string = process.argv[3] || '.';

findFolder(startDir, folderName);
