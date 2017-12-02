const prompt = require('prompt');
const path = require('path');
const { ncp } = require('ncp');

const destinations = {
  datasource: path.join('app', 'scripts', 'datasource.schema.json'),
  form: path.join('app', 'scripts', 'form.schema.json'),
  table: path.join('app', 'scripts', 'table.schema.json'),
  pages: path.join('static', 'pages'),
  data: path.join('db.json')
};

function copyFiles(options) {
  const commands = Object.keys(options);

  return Promise.all(commands.map((command) => {
    const source = options[command];
    const destination = destinations[command];
    if (source === destination) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const prefixPath = p => path.join(__dirname, p);
      return ncp(prefixPath(source), prefixPath(destination), { stopOnErr: true }, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }));
}

const options = {
  properties: {
    datasource: {
      required: true,
      description: 'Please provide a path to your datasource schema',
      type: 'string',
      default: destinations.datasource,
      before: value => (console.info(`${value}\n`) || value)
    },
    form: {
      description: 'If you wish to provide special form types, please provide a path to your form schema (optional)',
      type: 'string',
      default: destinations.form,
      before: value => (console.info(`${value}\n`) || value)
    },
    table: {
      description: 'If you wish to provide entity relation mapping for tables, please provide a path to your table schema (optional)',
      type: 'string',
      default: destinations.table,
      before: value => (console.info(`${value}\n`) || value)
    },
    pages: {
      description: 'Please provide a path to your static pages data.',
      type: 'string',
      default: destinations.pages,
      before: value => (console.info(`${value}\n`) || value)
    },
    data: {
      description: 'If you wish to maintain your application data locally, please provide a path to your json data.',
      type: 'string',
      default: destinations.data,
      before: value => (console.info(`${value}\n`) || value)
    }
  }
};

prompt.message = '';
prompt.start();

prompt.get(options, (err, result) => {
  if (err) return console.error(err);

  copyFiles(result)
    .then(() => console.info('Generation process completed!'))
    .catch(copyError => console.error(copyError));
});

