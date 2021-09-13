const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");

const loaders = async (expressApp) => {
    await mongooseLoader()
    await expressLoader(expressApp)
}

module.exports = loaders