const jwt = require('jsonwebtoken')

const controller = {}

const administrador = require('../models/administrador')

const helpers = require('../config/helpers')

controller.create = async (req, res) => {
    let { nombre, cargo, user, pass } = req.body
    pass = await helpers.encrypt(pass)
    const newAdmin = { nombre, cargo, user, pass }
    const query = await administrador.create(newAdmin)
    res.json({ "msg": "ok" })
}

controller.verifyToken = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null)
        res.status(401).send('Token requerido')
    jwt.verify(token, 'blablabla', (err, usr) => {
        if(err) res.status(403).send('token invalido')
        res.status(200).json(usr)
    })
}

controller.getAdmin = async(req, res) => {
    const {user} = req.params
    const admin = await administrador.getAdmin(user)
    res.json(admin)
}

controller.updateAdmin = async(req, res) => {
    const id = req.params.user
    const pass = await helpers.encrypt(req.body.pass)
    const {nombre, cargo, user} = req.body
    const newAdmin = {id, nombre, cargo, user, pass}
    const query = await administrador.updateAdmin(id, newAdmin)
    res.json(query)
}

controller.login = async(req, res) => {
    let {admin, pass} = req.body
    await administrador.findUser(admin)
        .then(async resp => {
            if(resp[0]) {
                const validPass = await helpers.decrypt(pass, resp[0].pass)
                const verify = async () => {
                    if (validPass) {
                        const datos = {admin, pass}
                        const token = jwt.sign({admin, pass},'blablabla',{expiresIn: "2h"})
                        const dato = {...datos, token}
                        res.status(200).json(dato)
                    }
                    else res.json({"error": "Contraseña incorrecta"})
                }
                verify()
            }
            else {
                res.json({"error": "Usuario no encontrado"})
            }
        })
}

controller.createSemester = async(req, res) => {
    const {gestion} = req.body
    const nuevoSemestre = {gestion}
    const query = await administrador.semester(nuevoSemestre)
    res.json({"msg": "ok"})
}

controller.getSemester = async(req, res) => {
    const data = await administrador.getSemester()
    res.json(data)
}

controller.getPracticantesBySemestre = async(req, res) => {
    const {idSemestre} = req.params
    const data = await administrador.getPracticantesBySemestre(idSemestre)
    res.json(data)
}

const getInicioFinSemana = (fecha) => {
    return {
        inicio: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - fecha.getDay() + 1),
        fin: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 6 - fecha.getDay()),
    }
}

controller.getFechaPracticante = async(req, res) => {
    const {idPracticante} = req.params
    const data = await administrador.getFechaPracticante(idPracticante)
    let fecha = new Date(data[0].fecha)
    const ahora = new Date()
    ahora.setDate(ahora.getDate() + (14 * 7))
    const semanas = []
    let cont = 0
    while(fecha < ahora) {
        const inicioFin = getInicioFinSemana(fecha)
        const fechas = []
        data.forEach(element => {
            if(element.fecha.getTime() >= inicioFin.inicio.getTime() && element.fecha.getTime() <= inicioFin.fin.getTime()){
                fechas.push({"fecha": element.fecha, "estado": element.estado})
            }
        })
        semanas.push({inicioFin, fechas, cont, nombre: data[0].nombre})
        cont+=1
        fecha.setDate(fecha.getDate() + 7)
    }
    res.json(semanas)
}

module.exports = controller