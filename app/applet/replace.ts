import fs from 'fs';
import path from 'path';

function replaceInDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('bg-[#F9F9F8]')) {
        content = content.replace(/bg-\[#F9F9F8\]/g, 'bg-gray-50 bg-opacity-100');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir('./src');
console.log('Done');
