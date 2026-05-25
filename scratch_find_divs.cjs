const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('flex items-center') && line.includes('<div')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
