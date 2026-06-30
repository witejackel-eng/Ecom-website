const fs = require('fs');
const path = 'src/data/products.ts';

let content = fs.readFileSync(path, 'utf8');

// Step 1: DA41L3C-Q — official page 404'd, null all specs
content = content.replace(
  /"Image Sensor": "1\/2\.9\\" 4MP Progressive Scan CMOS",\n      "Max Resolution": "2688 × 1520 @ 25\/30fps",\n      "Lens": "3\.6mm Fixed, F2\.0",\n      "IR Range": "30 metres \(Smart IR\)",\n      "Night Vision": "IR Day\/Night \(ICR\)",\n      "Video Compression": "Instastream, H\.265, H\.264, MJPEG",\n      "WDR": "120dB",\n      "IP Rating": "IP67",\n      "Power": "PoE \(802\.3af\)",\n      "Protocol": "ONVIF Profiles S\/G\/T",\n      "Audio": "No built-in mic",\n      "Warranty": "2 Years"/,
  ' "Image Sensor": null,\n      "Max Resolution": null,\n      "Lens": null,\n      "IR Range": null,\n      "Night Vision": null,\n      "Video Compression": null,\n      "WDR": null,\n      "IP Rating": null,\n      "Power": null,\n      "Protocol": null,\n      "Audio": null,\n      "Warranty": null  // not verified — official page cpplusworld.com/cp-unc-da41l3c-q 404 as of 2026-06-30'
);

fs.writeFileSync(path, content);
console.log('Done step 1');
