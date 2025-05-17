const fs = require("fs");
const path = require("path");
const url = require("url");

module.exports = function importESM(moduleName) {
  const modulePath = require.resolve(moduleName);
  const moduleContent = fs.readFileSync(modulePath, "utf8");

  // Extract default export using basic parsing
  const match = moduleContent.match(/export\s+default\s+([^;]+)/);
  if (match) {
    const exportName = match[1].trim();
    // Try to find the export in the file
    const declaration = moduleContent.match(new RegExp(`const\\s+${exportName}\\s*=\\s*([^;]+)`));
    if (declaration) {
      try {
        // Very basic evaluation
        return eval(`(${declaration[1]})`);
      } catch (e) {
        console.error(`Could not evaluate ${moduleName} export`);
      }
    }
  }

  // Fallback to a basic plugin object
  return {};
};
