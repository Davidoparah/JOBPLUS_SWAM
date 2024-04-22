// This script is designed to initialize the Strapi project with a predefined SQLite database state.
// It ensures that a fresh copy of the seed database (`data.db` from the `seed` folder)
// is copied into the `.tmp` directory at the start of the project. This process allows
// developers to have a consistent database state for development, testing, or demonstration purposes.

const fs = require('fs');
const path = require('path');

// Define the paths
const tmpDir = path.join(__dirname, '.tmp');
const seedFile = path.join(__dirname, 'seed', 'data.db');
const destinationFile = path.join(tmpDir, 'data.db');

// Ensure the .tmp directory exists
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
}

// Copy the seed file to the .tmp directory
fs.copyFileSync(seedFile, destinationFile);

console.log('Database seeded successfully.');
