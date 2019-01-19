module.exports = function (fs, mongoose) {
    const Models = {};

    fs.readdirSync(__dirname).forEach(file => {
        if (file.endsWith('-model.js')) {
            let str = file.substring(0, file.length - '-model.js'.length);
            let name = str.charAt(0).toUpperCase() + str.slice(1)
            Models[name] = require('./' + file)(mongoose);
        }
    })

    return Models;
}