const fs = require('fs');
const path = require('path');

const cssPagesDir = path.join(__dirname, 'assets/css/pages');
const vueDir = __dirname; // root of project to search for .vue files

// Get all css files in assets/css/pages/*/*.css
function getCssFilesToMove() {
  const filesToMove = [];
  const pages = fs.readdirSync(cssPagesDir).filter(p => !p.startsWith('.'));
  for (const page of pages) {
    const pagePath = path.join(cssPagesDir, page);
    if (!fs.statSync(pagePath).isDirectory()) continue;
    
    const cssFiles = fs.readdirSync(pagePath).filter(f => f.endsWith('.css'));
    for (const file of cssFiles) {
      const compName = file.replace('.css', '');
      filesToMove.push({
        page,
        compName,
        oldRelativePath: `assets/css/pages/${page}/${file}`,
        newRelativePath: `assets/css/pages/${page}/${compName}/${file}`
      });
    }
  }
  return filesToMove;
}

const moves = getCssFilesToMove();

// Move files
for (const move of moves) {
  const oldPath = path.join(__dirname, move.oldRelativePath);
  const newDirPath = path.join(__dirname, `assets/css/pages/${move.page}/${move.compName}`);
  const newPath = path.join(__dirname, move.newRelativePath);
  
  if (!fs.existsSync(newDirPath)) {
    fs.mkdirSync(newDirPath, { recursive: true });
  }
  fs.renameSync(oldPath, newPath);
  console.log(`Moved: ${move.oldRelativePath} -> ${move.newRelativePath}`);
}

// Update imports
function updateVueFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.nuxt') {
        updateVueFiles(itemPath);
      }
    } else if (item.endsWith('.vue') || item.endsWith('.js')) {
      let content = fs.readFileSync(itemPath, 'utf8');
      let changed = false;
      for (const move of moves) {
        // e.g., ~/assets/css/pages/issues/IssueBubbleChart/IssueBubbleChart.css
        // -> ~/assets/css/pages/issues/IssueBubbleChart/IssueBubbleChart.css
        const oldImport1 = `~/assets/css/pages/${move.page}/${move.compName}.css`;
        const newImport1 = `~/assets/css/pages/${move.page}/${move.compName}/${move.compName}.css`;
        
        const oldImport2 = `@/assets/css/pages/${move.page}/${move.compName}.css`;
        const newImport2 = `@/assets/css/pages/${move.page}/${move.compName}/${move.compName}.css`;
        
        if (content.includes(oldImport1)) {
          content = content.replace(new RegExp(oldImport1, 'g'), newImport1);
          changed = true;
        }
        if (content.includes(oldImport2)) {
          content = content.replace(new RegExp(oldImport2, 'g'), newImport2);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(itemPath, content, 'utf8');
        console.log(`Updated imports in: ${itemPath}`);
      }
    }
  }
}

updateVueFiles(vueDir);
