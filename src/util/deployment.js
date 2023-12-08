const childProcess = require('child_process');
const fs = require('fs');
const { spawn } = require('child_process');
const smsg = require('./slack-messages');

/**
 * Checks the hash values in the deployment.properties file and takes appropriate action.
 *
 * This function reads the contents of the deployment.properties file, parses it
 * compares the values of CURRENT_HASH and NEW_HASH.
 * If the values are equal, it logs a message indicating that the hash values are equal.
 * If the values are different, it logs a message indicating that the hash values are different
 * it triggers a bash script for server update and restart.
 * Finally, it exits the current process.
 *
 * @returns {void}
 */
function checkHashAndRestartServer(env) {
  // Read the deployment.properties file
  fs.readFile('../deployment.properties', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    // Parse the contents of the file
    const lines = data.split('\n');
    const properties = {};
    lines.forEach((line) => {
      const [key, value] = line.split('=');
      properties[key] = value;
    });
    // Compare the values of CURRENT_HASH and NEW_HASH
    const currentHash = properties.CURRENT_HASH;
    const newHash = properties.NEW_HASH;

    if (currentHash === newHash) {
      console.log('The current and new hash values are equal.');
    } else {
      const command = `git log ${currentHash}..${newHash}`;
      const message = childProcess.execSync(command).toString().trim();
      console.log(message);
      console.log('The current and new hash values are different.so the LATEST_CODE is not in repo, Exiting the process....Server will be restarted automatically');
      const scriptArguments = env
        ? ['../scripts/restart.sh']
        : ['../scripts/restart.sh', 'production'];
      const scriptProcess = spawn('bash', scriptArguments, {
        detached: true,
        stdio: 'ignore',
      });
      console.log('Triggering the bash script...');
      process.exit(1);
    }
  });
}
module.exports = {
  checkHashAndRestartServer,
};
