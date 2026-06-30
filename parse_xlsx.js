const XLSX = require('xlsx');

// File A - CCTV / CP Plus
const fileA = 'C:\\Users\\Aditya\\Downloads\\Mr_Abhiskek_Revised_quote_for_CCTV,_PBX_&_Networking_06_05_26_.xlsx';
// File B - Ecommerce / eSSL
const fileB = 'C:\\Users\\Aditya\\Downloads\\Ecommerce..xlsx';

console.log('=== FILE A: CCTV (CP Plus) ===');
const wbA = XLSX.readFile(fileA);
const wsA = wbA.Sheets[wbA.SheetNames[0]];
const dataA = XLSX.utils.sheet_to_json(wsA, { header: 1 });
console.log('Headers:', JSON.stringify(dataA[0]));
for (let i = 1; i < dataA.length; i++) {
  const row = dataA[i];
  if (row && row.length > 1) {
    console.log(JSON.stringify(row));
  }
}

console.log('\n=== FILE B: Ecommerce (eSSL) ===');
const wbB = XLSX.readFile(fileB);
const wsB = wbB.Sheets[wbB.SheetNames[0]];
const dataB = XLSX.utils.sheet_to_json(wsB, { header: 1 });
console.log('Headers:', JSON.stringify(dataB[0]));
for (let i = 1; i < dataB.length; i++) {
  const row = dataB[i];
  if (row && row.length > 1) {
    console.log(JSON.stringify(row));
  }
}
