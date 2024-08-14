const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const certificateController = require('../controllers/certificate');
const ownerController = require('../controllers/owner');

router.get('/', async (req, res) => {
    try {
        const products = await productController.getSomeProducts(); // Fetch limited products
        const certificates = await certificateController.getSomeCertificates(); // Fetch limited certificates
        const owners = await ownerController.getSomeOwners(); // Fetch limited owners
        res.render('home.ejs', { products, certificates, owners, currUser: req.user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
