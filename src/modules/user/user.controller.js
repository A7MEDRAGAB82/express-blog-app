const express = require('express')


const {signup , login ,  getUserProfile } = require('./user.service.js');

const router = express.Router()


router.post("/signup", signup);

router.post("/login",login );

router.get("/get-user-profile/:id",getUserProfile );


module.exports = router