const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('className="flex items-center') && line.includes('<div')) {
    // If it has text-xs or text-[12px], it's already 12px
    if (!line.includes('text-xs') && !line.includes('text-[12px]') && !line.includes('text-[10px]') && !line.includes('text-xxs')) {
      console.log(`${idx + 1}: ${line.trim()}`);
    }
  }
});
