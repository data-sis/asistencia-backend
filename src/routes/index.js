const express = require('express')

const { index } = require('../controllers/indexController')

const router = express.Router()

router.route('/')
    .get(index)

module.exports = router