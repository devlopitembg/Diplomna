module.exports = function (fs, models) {
    const Data = {};

    fs.readdirSync(__dirname).forEach(file => {
        if (file.endsWith('-data.js')) {
            let name = file.substring(0, file.length - '-data.js'.length);
            Data[name + 'Service'] = require('./' + file)(models);
        }
    })

    return Data;
}