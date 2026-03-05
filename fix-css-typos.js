const fs = require('fs');
const path = require('path');

// 재귀적으로 CSS 파일 찾기
function findCSSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findCSSFiles(filePath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// CSS 파일들에서 찾아서 수정할 오타 패턴들
const replacements = [
  { from: /justify-betwen/g, to: 'justify-between' },
  { from: /transition-al(\s|;|})/g, to: 'transition-all$1' },
  { from: /\bupercase\b/g, to: 'uppercase' },
  { from: /rounded-ful(\s|;|})/g, to: 'rounded-full$1' },
  { from: /w-ful(\s|;|max)/g, to: 'w-full$1' },
  { from: /overflow-hiden/g, to: 'overflow-hidden' },
  { from: /border-colapse/g, to: 'border-collapse' },
  { from: /\bscrol-/g, to: 'scroll-' },
  { from: /\bfoter\b/g, to: 'footer' },
  { from: /shadow-iner/g, to: 'shadow-inner' },
  { from: /cursor-not-alowed/g, to: 'cursor-not-allowed' },
  { from: /ring-ofset/g, to: 'ring-offset' },
  { from: /\bmesage\b/g, to: 'message' },
  { from: /\bsumary\b/g, to: 'summary' },
  { from: /\bbulet\b/g, to: 'bullet' },
  { from: /\bgren-/g, to: 'green-' },
  { from: /break-kep/g, to: 'break-words' },
  { from: /duration-30(\s|;|})/g, to: 'duration-300$1' },

  // bg-slate-500 for subtle backgrounds/hovers -> bg-slate-50
  { from: /hover:bg-slate-500(?!\d)/g, to: 'hover:bg-slate-50' },
  { from: /bg-slate-500\/50/g, to: 'bg-slate-50/50' },
  { from: /bg-slate-500\/30/g, to: 'bg-slate-50/30' },

  // Broken hex color references
  { from: /border-\[\[id="[^"]*"\][^\]]*EAEAEA\]/g, to: 'border-slate-200' },
  { from: /text-\[\[id="[^"]*"\][^\]]*F6F6F\]/g, to: 'text-slate-600' },
  { from: /bg-\[\[id="[^"]*"\][^\]]*FEE50\]/g, to: 'bg-yellow-100' },
  { from: /hover:bg-\[\[id="[^"]*"\][^\]]*FEE50\]/g, to: 'hover:bg-yellow-100' },
  { from: /text-\[\[id="[^"]*"\][^\]]*modal\]/g, to: 'text-yellow-600' },
  { from: /bg-\[\[id="[^"]*"\][^\]]*F59E0B\]/g, to: 'bg-amber-500' },
];

// CSS 디렉토리 경로
const cssDir = path.join(__dirname, 'AI_FAPRO/assets/css');

// 모든 CSS 파일 찾기
const cssFiles = findCSSFiles(cssDir);

console.log(`Found ${cssFiles.length} CSS files to process...\n`);

let totalFixed = 0;
let filesModified = 0;

cssFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let fileFixed = 0;

  replacements.forEach(({ from, to }) => {
    const matches = newContent.match(from);
    if (matches) {
      fileFixed += matches.length;
      newContent = newContent.replace(from, to);
    }
  });

  if (fileFixed > 0) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    filesModified++;
    totalFixed += fileFixed;
    console.log(`✓ ${path.relative(cssDir, filePath)}: Fixed ${fileFixed} issues`);
  }
});

console.log(`\n===========================================`);
console.log(`Summary:`);
console.log(`- Files modified: ${filesModified}`);
console.log(`- Total fixes: ${totalFixed}`);
console.log(`===========================================`);
