import fs from 'fs';
import path from 'path';

const dir = './public/frames';

// 1. Create directory if it doesn't exist
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const totalFrames = 48;

console.log(`Generating ${totalFrames} placeholder frames for your 3D viewer...`);

// 2. Write simple SVG text elements disguised as PNG text files
for (let i = 1; i <= totalFrames; i++) {
  const frameStr = String(i).padStart(3, '0');
  const filePath = path.join(dir, `hero_${frameStr}.png`);
  
  // Calculate a mock horizontal motion shift based on frame index
  const boxX = 50 + (i * 8); 
  
  // Create an interactive mock SVG wrapper layout
  const mockSvg = `
    <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://w3.org">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <!-- Grid Lines to visualize depth rotation -->
      <line x1="100" y1="400" x2="700" y2="400" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Mock 3D Moving Target Object -->
      <rect x="${boxX}" y="200" width="120" height="120" rx="15" fill="#3b82f6" transform="rotate(${i * 7.5} ${boxX + 60} 260)" />
      <!-- Frame Telemetry Overlay -->
      <text x="50%" y="90" font-family="sans-serif" font-size="28" font-weight="bold" fill="#1e293b" text-anchor="middle">
        3D Rotation Test System
      </text>
      <text x="50%" y="450" font-family="monospace" font-size="18" fill="#64748b" text-anchor="middle">
        Frame Index: hero_${frameStr}.png (${i}/${totalFrames})
      </text>
    </svg>
  `;

  fs.writeFileSync(filePath, mockSvg);
}

console.log('✅ Success! Test sequence written safely into ./public/frames/');
