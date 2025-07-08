const express = require('express');
const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
    return res.status(200).json({message:"hello api"})
});

module.exports = routerAPI;
