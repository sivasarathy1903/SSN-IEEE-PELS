import fs from 'fs';
const file = 'C:\\Users\\sivas\\.gemini\\antigravity\\brain\\54ff4537-0694-4b3d-af42-5a5e22281fc2\\.system_generated\\steps\\74\\content.md';
console.log(fs.readFileSync(file, 'utf8').substring(0, 1000));
