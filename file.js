const fs = require('fs');
// fs -> file system

// fs.writeFileSync('hello.txt', 'Hello from Node.js');


// fs.readFile(path[, options], callback)
//                 en-coding format | get the result

fs.readFile('hello.txt', 'utf8', function(err, dataStr){
    // if failed -> err == null
    // else dataStr = undefined
    console.log(err);
    console.log('----------');
    console.log(dataStr);
});
