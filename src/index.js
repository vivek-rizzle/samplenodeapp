// working 1
const arguments = process.argv.slice(2);
const childProcess = require('child_process');
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
    // const { exec } = require('child_process');
    // // Get the command to spawn.
    // const command = '../scripts/gitcommit.sh';
    // // Execute the command and store the output in a variable.
    // const outputPromise = exec(command);

    // // Wait for the promise to resolve and get the output of the command.
    // const output = outputPromise;
    // // console.log(currentHash)
    // // console.log(newHash)
    // console.log(output);
    // const gitlog = require('gitlog');
    // const commits = gitlog({
    //   repo: '/path/to/repository',
    //   since: currentHash,
    //   until: newHash,
    // });
    
    // // Print the commits to the console.
    // console.log(commits);
    // const command = `git rev-list ${currentHash}..${newHash} --format=%s`;
    // const output = exec(command, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }
    //   // Store the output in a variable.
    //   return stdout;
    // });
    const command = `git log ${currentHash}..${newHash}`;
    const message = childProcess.execSync(command).toString().trim();
    console.log(message);
    // Do something with the output.
    // console.log(output);
    // const command = `git rev-list ${currentHash}..${newHash} --format=%s`;
    // exec(command, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }
    //   console.log(stdout);
    // });
    // const commitMessages = getCommitMessagesBetweenHashes(currentHash, newHash);
    // console.log(commitMessages);
    // console.log('The current and new hash values are difcferent.so the LATEST_CODE is not in repo, Exiting the process....Server will be restarted automatically');
    const scriptArguments = isDev() ? ['../scripts/restart.sh'] : ['../scripts/restart.sh', 'production'];
    const scriptProcess = spawn('bash', scriptArguments, { detached: true});
    console.log('Triggering the bash script...');
    process.exit(1);
  }
  });
}

function isDev(){
  return true
}