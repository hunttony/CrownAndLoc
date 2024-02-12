// Write a JSON file
const fs = require('fs');

const data = {
  name: 'John Doe',
  age: 30,
  occupation: 'Software Engineer'
};

fs.writeFile('data.json', JSON.stringify(data), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File written successfully');
  }
});

// Read a JSON file
fs.readFile('data.json', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
  }
});