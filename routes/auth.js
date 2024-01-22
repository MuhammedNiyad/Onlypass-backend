const express = require('express');
const router = express();
const Cusotmer = require("./model/customer.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../model/customer.model');


//Customer-Register..!
router.post('/customer/register', async (req, ser)=>{
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const  newCustomer = new Customer
})