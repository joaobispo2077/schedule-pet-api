const express = require('express');
const consign = require('consign');


module.exports = () => {

    const app = express();

    consign()
        .include('./src/app/controllers')
        .into(app);

    return app;
}