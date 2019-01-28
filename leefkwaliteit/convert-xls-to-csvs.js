const fs = require("fs");
const xlsx = require("xlsx");

// config
const outDir = "./output";

if (fs.existsSync(outDir)) {
  console.log("The output directory already exists...");
  console.log("Convert process exit");
  return 0;
}
fs.mkdirSync(outDir);

const wb = xlsx.readFile("./analyse-indicatoren.xlsx");
wb.SheetNames.forEach(sheetName => {
  const csvData = xlsx.utils.sheet_to_csv(wb.Sheets[sheetName]);

  console.log(`Convert sheet to "${outDir}/${sheetName}.csv"`);
  fs.writeFileSync(`${outDir}/${sheetName}.csv`, csvData);
});

console.log("Convert process done");
