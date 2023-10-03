const chokidar = require('chokidar');
const { Queue } = require('better-queue');

// Create a priority queue
const queue = new Queue((filePath, cb) => {
  processFile(filePath)
    .then(() => cb(null))
    .catch((err) => cb(err));
}, { concurrent: 1 });

// Watch for file changes in the specified folder
const watcher = chokidar.watch('/path/to/downloads/folder');

// Handle new file creation or addition
watcher.on('add', (filePath) => {
  console.log(`New file added: ${filePath}`);

  // Add the file name to the priority queue
  queue.push(filePath, (err) => {
    if (err) {
      console.error(`Error processing file: ${filePath}`, err);
    }
  });
});

// Process the file with a 1-minute delay
function processFile(filePath) {
  console.log(`Processing file: ${filePath}`);

  return new Promise((resolve, reject) => {
    // Simulate a 1-minute delay using setTimeout
    setTimeout(() => {
      console.log(`File processed: ${filePath}`);
      resolve();
    }, 60000);
  });
}