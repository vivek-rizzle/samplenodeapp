// working 1
const arguments = process.argv.slice(2);

if (arguments.length === 0) {
  process.env.NODE_ENV = 'development';
} else if (!['development', 'production'].includes(arguments[0])) {
  throw Error('Possible environments: development and production. Example: node src/index.js development');
} else {
  process.env.NODE_ENV = arguments[0];
}

setInterval(() => {
  checkHashAndRestartServer()
}, 5000);

function checkHashAndRestartServer() {
  const fs = require('fs');
  const { spawn } = require('child_process');
  // Read the deployment.properties file
  fs.readFile('../deployment.properties', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
  // Parse the contents of the file
  const lines = data.split('\n');
  const properties = {};
  lines.forEach(line => {
    const [key, value] = line.split('=');
    properties[key] = value;
  });
  // Compare the values of CURRENT_HASH and NEW_HASH
  const currentHash = properties['CURRENT_HASH'];
  const newHash = properties['NEW_HASH'];

  if (currentHash === newHash) {
    console.log('The current and new hash values are equal.');
  } else {
    console.log('The current and new hash values are different.so the LATEST_CODE is not in repo, Exiting the process....Server will be restarted automatically');
    const scriptArguments = isDev() ? ['../scripts/restart.sh'] : ['../scripts/restart.sh', 'production'];
    const scriptProcess = spawn('bash', scriptArguments, { detached: true, stdio: 'ignore' });
    console.log('Triggering the bash script...');
    process.exit(1);
  }
  });
}
