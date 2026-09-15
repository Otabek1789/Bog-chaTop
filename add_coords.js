import fs from 'fs';
import { kindergartens } from './src/data/mockData.js';

kindergartens.forEach(kg => {
  if (!kg.coordinates) {
    const lat = 41.22 + Math.random() * (41.38 - 41.22);
    const lng = 69.18 + Math.random() * (69.35 - 69.18);
    kg.coordinates = [parseFloat(lat.toFixed(6)), parseFloat(lng.toFixed(6))];
  }
});

const newContent = `export const kindergartens = ${JSON.stringify(kindergartens, null, 2)};\n`;
fs.writeFileSync('./src/data/mockData.js', newContent);
console.log('Coordinates added successfully.');
