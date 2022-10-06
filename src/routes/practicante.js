const express = require('express')

const { test, create, find, uploadDrive, assistance, semester, logs, getAll, deletePracticante, update } = require('../controllers/practicanteController')

const router = express.Router()

router.route('/test')
    .get(test)

router.route('/:id')
    .get()
    .delete(deletePracticante)
    .put(update)

router.route('/all')
    .get(getAll)

router.route('/')
    .get(logs)

router.route('/assistance')
    .post(assistance)
    .get(semester)

router.route('/create')
    .post(create)

router.route('/:codigo')
    .get(find)

router.route('/upload')
    .post(uploadDrive)

module.exports = router