// Usage example
// ❯ node ./properties-to-json.js ~/Downloads/nl.properties ~/Downloads/nl.json
//

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const fs = require('fs');

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) throw err;

  //   const flatData = flattenObject(JSON.parse(data));
  const obj = propertiesToObject(data, outputFile);
  const unflattenedObj = unFlattenObject(obj);
  const jsonFile = JSON.stringify(unflattenedObj, null, '\t');

  fs.writeFile(outputFile, jsonFile, (err) => {
    if (err) throw err;
    console.log(`Properties successfully written to: ${outputFile}`);
  });
});

function unFlattenObject(data) {
  let result = {};
  for (let i in data) {
    const keys = i.split('.');
    keys.reduce(function (r, e, j) {
      return (
        r[e] ||
        (r[e] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 == j
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
}

function propertiesToObject(data, filePath) {
  const output = data.split('\n').reduce((acc, item) => {
    const [key, ...tail] = item.split('=');
    const value = tail.join('=');
    return { ...acc, [key]: value };
  }, {});

  return output;
}
