fs = require('fs');
prompt = requirte('prompt')



fs.readdir('src/public/data/storms', (err, files) => {
    console.log(files);
});