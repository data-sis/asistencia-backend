const path = require('path')

const fs = require('fs');
const {google} = require('googleapis');

const controller = {}

const practicante = require('../models/practicante')

const KEYFILEPATH = path.join(__dirname, '../public/key/key-361014-3676d2d1fb2a.json')

const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

controller.deletePracticante = async(req, res) => {
    const {id} = req.params
    const query = await practicante.deletePracticante(id)
    res.json(query)
}

controller.create = async (req, res) => {
    const { nombre, ci, carrera, mencion, foto, hora, cel, estado, codigo, idSemestre } = req.body
    const newPracticante = { nombre, ci, carrera, mencion, foto, hora, cel, estado, codigo, idSemestre }
    const query = await practicante.create(newPracticante)
    res.json({ "msg": query })
}

controller.find = async (req, res) => {
    const {codigo} = req.params
    const query = await practicante.find(codigo)
    res.json({"user": query[0]})
}

controller.update = async(req, res) => {
    const {id} = req.params
    const {nombre, ci, carrera, mencion, hora, cel, estado, codigo, idSemestre, foto} = req.body
    const newPracticante = {id, nombre, ci, carrera, mencion, hora, cel, estado, codigo, idSemestre, foto}
    const query = await practicante.update(id, newPracticante)
    res.json({"msg": query})
}

async function createAndUploadFile(auth, foto) {
    const driveService = google.drive({version: 'v3', auth})

    let fileMetaData = {
        'name': foto.name,
        'parents': ['1KDf3fMO-jKxuWu4AeVu-sQ0PfJ2Y1WtP']
    }

    let media = {
        mimeType: foto.mimeType,
        body: fs.createReadStream('./src/public/practicantes/' + foto.name)
    }

    let response = await driveService.files.create({
        resource: fileMetaData,
        media: media,
        fields: 'id'
    })

    switch(response.status) {
        case 200:
            return response.data.id
            break
        default:
            return response.errors
    }

}

controller.uploadDrive = async (req, res) => {
    const {foto} = req.files
    const cant = await practicante.cant()
    foto.name = cant[0].cantidad + foto.name

    const pathFile = path.join(__dirname,'../public/practicantes/' + foto.name)
    await foto.mv(pathFile);

    const uploadFoto = await createAndUploadFile(auth, foto)
    res.json({"foto": uploadFoto})
}

controller.assistance = async(req, res) => {
    const {idPracticante} = req.body
    const registro = {idPracticante}
    const last = await practicante.getLastRegister(idPracticante)
    registro.estado = (last.length === 0 || last[0]?.estado === 'Salida')?'Ingreso':'Salida'
    if(registro.estado === 'Salida') {
        const user = await practicante.getById(idPracticante)
        let hora = user[0].hora
        const fecha1 = new Date(last[0].fecha)
        const fecha2 = new Date()
        let newHora = ((Math.abs(fecha1.getTime() - fecha2.getTime()))/(1000 * 60))+hora
        await practicante.updateHora(idPracticante, newHora)
    }
    const data = await practicante.setAssistance(registro)
    res.json({"msg": "ok"})
}

controller.semester = async(req, res) => {
    const data = await practicante.lastSemester()
    res.json({"semestre": data[0]})
}

controller.logs = async(req, res) => {
    const data = await practicante.logs()
    res.json(data)
}

controller.getAll = async (req, res) => {
    const data = await practicante.getAll()
    res.json(data)
}

module.exports = controller