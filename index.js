// working 1

const fs = require('fs');
const file = './values.txt';

setInterval(() => {

  let value = fs.readFileSync(file, 'utf8');

  console.log(value);
  if(value === 'true' || JSON.parse(value) === true){
    console.log('LATEST_CODE not in repo ,Exiting the process....Server will be restarted automatically');
    const { spawn } = require('child_process');
    const scriptProcess = spawn('bash', ['restart.sh'], { detached: true, stdio: 'ignore' });
    console.log('Triggering the bash script...');
    process.exit(1);
  }else{
    console.log("running")
  }
}, 5000);
