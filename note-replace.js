const fs = require('fs');
const path = require('path');

function traverse(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
        var filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
        traverse(filepath, callback);
        } else {
        callback(filepath);
        }
    });
    }

traverse('./content', function(filepath) {
    if (filepath.endsWith('.md')) {
        console.log(filepath);
        let file = fs.readFileSync(filepath, 'utf8');
        // find content using the regex "s/!!! Note ([^\n])+\n/{{% notice %}}$1{{% /notice %}}/"
        let newFile = file.replace(/!!! Note ([^\n])+\n/g, "{{% notice %}}$1{{% /notice %}}\n");
        fs.writeFileSync(filepath, newFile, 'utf8');
    }
});



