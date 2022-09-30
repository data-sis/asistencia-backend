const express = require('express')

const { create, login, verifyToken, createSemester, getSemester, getPracticantesBySemestre, getFechaPracticante } = require('../controllers/administradorController')

const router = express.Router()

router.route('/create')
    .post(create)

router.route('/login')
    .post(login)

router.route('/practicante/:idPracticante')
    .get(getFechaPracticante)

router.route('/verify')
    .get(verifyToken)

router.route('/semester')
    .get(getSemester)
    .post(createSemester)

router.route('/logs/:idSemestre')
    .get(getPracticantesBySemestre)

module.exports = router