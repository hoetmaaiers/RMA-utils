// Usage example
// ❯ node ./csv-to-json.js ~/Downloads/nl.properties ~/Downloads/nl.json
//

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const fs = require('fs');
const papaparse = require('papaparse');

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) throw err;

  papaparse.parse(data, {
    header: true,
    encoding: 'utf8',
    complete: (results) => {
      const obj = xlsxToObject(results.data);
      console.log('🌀 ~ file: csv-to-json.js ~ line 19 ~ obj', obj);
      const unflattenedObj = unFlattenObject(obj);
      const jsonFile = JSON.stringify(unflattenedObj, null, '\t');

      fs.writeFile(outputFile, jsonFile, (err) => {
        if (err) throw err;
        console.log(`Properties successfully written to: ${outputFile}`);
      });
    },
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

function xlsxToObject(data) {
  return data.reduce((reducingObj, item) => {
    const [key, value] = Object.keys(item);
    return {
      ...reducingObj,
      [item[key]]: item[value],
    };
  }, {});
}
