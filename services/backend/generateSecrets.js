// Run this custom script to generate secrets for the .env file
// The secrets are printed to the console and can be copied to the .env file
// node generateSecrets.js

const crypto = require('crypto');

const generateSecret = (length = 32) => { // Adjusted length for base64
  return crypto.randomBytes(length).toString('base64');
}

console.log(`#=============================`);
console.log(`# Copy below to .env file`);
console.log(`#=============================`);

console.log(`# APP`);
console.log(`HOST=0.0.0.0`);
console.log(`PORT=1337`);

console.log('');

console.log(`# SECRET KEYS`);
console.log(`APP_KEYS=${generateSecret(16)},${generateSecret(16)},${generateSecret(16)},${generateSecret(16)}`);
console.log(`API_TOKEN_SALT=${generateSecret()}`);
console.log(`ADMIN_JWT_SECRET=${generateSecret()}`);
console.log(`JWT_SECRET=${generateSecret()}`);
console.log(`TRANSFER_TOKEN_SALT=${generateSecret()}`);

console.log('');

console.log(`# Database`);
console.log(`DATABASE_CLIENT=sqlite`);
console.log(`DATABASE_FILENAME=.tmp/data.db`);

console.log('');

console.log(`# Email`);
console.log(`# We need to send emails in this app`);
console.log(`# register at https://sendgrid.com/`);
console.log(`# fill in the following values in the .env file`);
console.log(`SENDGRID_API_KEY=`);
console.log(`SENDGRID_FROM_EMAIL=`);
