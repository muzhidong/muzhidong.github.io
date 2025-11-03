const { a } = require('./main');
console.log(`submodule.js a：`, a); // undefined

var b = 2;
module.exports = { b } 

// (node: 45224) Warning: Accessing non - existent property 'a' of module exports inside circular dependency
setTimeout(() => {
  console.log(`submodule.js setTimeout a：`, a) // undefined
}, 0)

