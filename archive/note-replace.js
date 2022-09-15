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
        let file = fs.readFileSync(filepath, 'utf8');

        // find all strings that start with "!!! note" and grab the it plus all of the following indented lines

        let regex = /^!!! Note[\s\S]*?(?=\n\n)/gm;
        let matches = file.match(regex);
        console.log(matches);
        // wrap the matches in "{{% notice %}} ... {{% /notice %}}"
        if (matches) {
            matches.forEach(match => {
                let notice = `{{% notice note %}}\n${match}\n{{% /notice %}}`;
                // remove "!!! note" from the beginning
                notice = notice.replace(/^!!! Note/gm, '');
                file = file.replace(match, notice);
            });
            fs.writeFileSync(filepath, file, 'utf8');
        }

    }

         
});



