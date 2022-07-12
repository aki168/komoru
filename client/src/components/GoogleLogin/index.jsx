// 300310047900-4tgg9ie5rgbi5anu4qbkjne3t4ip8get.apps.googleusercontent.com
// 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
const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: './client_secret_300310047900-4tgg9ie5rgbi5anu4qbkjne3t4ip8get.apps.googleusercontent.com.json',
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});
