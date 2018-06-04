"use strict";
// Require the file system
const fs = require('fs');
// Require the request-promise-native package
const req = require('request-promise-native');

const options = {
  uri: 'https://api.github.com/users/section11',
  headers:{
    'User-Agent': 'Request-Promise'
  }
};

req(options)
  .then(function(data){
    // TODO: Handle the returned JSON data and write it to a file called
    // `response.json` in your `week-two/` directory
    fs.writeFile('response.json', data, function(err){
      if(err){
        throw err;
      }
      console.log("File saved!");
    });
  })
  .catch(function(err) {
    console.log(err);
  });
