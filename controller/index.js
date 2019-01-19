module.exports = function (fs, data) {
    const Controllers = {};

    fs.readdirSync(__dirname).forEach(file => {
        if (file.endsWith('-controller.js')) {
            let name = file.substring(0, file.length - '-controller.js'.length);
            Controllers[name+ 'Controller'] = require('./' + file)(data);
        }
    })

    return Controllers;
}