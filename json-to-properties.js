// Example usage
// ❯ node ./json-to-properties.js ~/Downloads/nl.json ~/Downloads/nl.properties
//

const inputFile = process.argv[2];
const outputFile = process.argv[3];

// console.log("inputFile", inputFile);
// console.log("outputFile", outputFile);

const fs = require('fs');
const JSON5 = require('json5');

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) throw err;

  const flatData = flattenObject(readInputFile(inputFile, data));
  const properties = objectToProperties(flatData, outputFile);
  fs.writeFile(outputFile, properties, (err) => {
    if (err) throw err;
    console.log(`Properties successfully written to: ${outputFile}`);
  });
});

function readInputFile(fileName, data) {
  if (fileName.includes('json5')) {
    return JSON5.parse(data);
  }
  // else return
  return JSON.parse(data);
}

function flattenObject(ob) {
  let toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object') {
      let flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

function objectToProperties(data, filePath) {
  let output = ``;

  Object.keys(data).map((item) => {
    output += `${item}=${data[item]}\n`;
  });

  return output;
}
