const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'mockData.js');
let content = fs.readFileSync(filePath, 'utf8');

// The file exports a variable `export const kindergartens = [ ... ]`
// Let's replace it by requiring, modifying, and stringifying.
// Actually, it's easier to use regex or string manipulation, but since it's an export we can parse it by stripping `export const kindergartens = `

const jsonStr = content.replace('export const kindergartens = ', '').trim().replace(/;$/, '');
let kindergartens = JSON.parse(jsonStr);

kindergartens = kindergartens.map(kg => {
  if (!kg.coordinates) {
    // Tashkent approx bbox: lat 41.22 to 41.38, lng 69.18 to 69.35
    const lat = 41.22 + Math.random() * (41.38 - 41.22);
    const lng = 69.18 + Math.random() * (69.35 - 69.18);
    kg.coordinates = [parseFloat(lat.toFixed(6)), parseFloat(lng.toFixed(6))];
  }
  return kg;
});

const newContent = `export const kindergartens = ${JSON.stringify(kindergartens, null, 2)};\n`;
fs.writeFileSync(filePath, newContent);
console.log('Coordinates added successfully.');
