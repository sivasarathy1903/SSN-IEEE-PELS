import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = 'C:\\Users\\sivas\\.gemini\\antigravity\\brain\\54ff4537-0694-4b3d-af42-5a5e22281fc2\\.system_generated\\steps\\74\\content.md';
const destPath = path.join(__dirname, '..', 'public', 'ieee_logo_white.svg');

try {
  const content = fs.readFileSync(srcPath, 'utf8');
  const match = content.match(/<svg[\s\S]*?<\/svg>/);
  if (match) {
    let svg = match[0];
    svg = svg.replace(/fill="#0a70a3"/g, 'fill="#ffffff"');
    // Ensure the folder exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, svg, 'utf8');
    console.log('Successfully extracted and saved white SVG to:', destPath);
  } else {
    console.error('No SVG found in the content file');
  }
} catch (err) {
  console.error('Error reading/writing file:', err);
}
