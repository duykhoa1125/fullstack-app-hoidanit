const express = require('express');
const { createUser, handleLogin, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
    return res.status(200).json({message:"hello api"})
});
routerAPI.use(auth)

routerAPI.post('/register',createUser)
routerAPI.post('/login', handleLogin)

routerAPI.get('/user',getUser)


module.exports = routerAPI;
