# RMA utility functions


## Translations

Translationa are often done in `.properties` format. 

To convert json to properties:

```bash
node ./json-to-properties.js  /path/to/source/locales/en/translation.json5 ~/path/to/destination/en-translations.properties
```

To convert properties to json:

```bash
node properties-to-json.js /path/to/source/frontend_hu.properties /path/to/destination/locales/hu/translation.json5
```