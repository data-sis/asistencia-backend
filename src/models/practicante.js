const db = require('../config/database')

const practicante = {}

practicante.test = async() => {
    return await db.query('select * from administrador')
}

/*practicante.getAll = async() => {
    return await db.query(`select practicante.id, carrera, mencion, nombre, ci, foto, hora, cel, practicante.estado, idSemestre, codigo, gestion from practicante, semestre where estado = 'activo' and practicante.idSemestre = semestre.id`)
}*/
practicante.getAll = async() => {
    return await db.query(`select practicante.id, carrera, mencion, nombre, ci, foto, hora, cel, practicante.estado, idSemestre, codigo, gestion from practicante, semestre where estado = 'activo' and practicante.idSemestre = semestre.id`)
}

/*practicante.update = async(id, practicante) => {
    return await db.query('update practicante set $1 where id = $2', [practicante, id])
}*/
practicante.update = async(id, practicante) => {
    return await db.query('update practicante set ? where id = ?', [practicante, id])
}

/*practicante.deletePracticante = async(id) => {
    return await db.query(`update practicante set estado = 'inactivo' where id = $1`, [id])
}*/
practicante.deletePracticante = async(id) => {
    return await db.query(`update practicante set estado = 'inactivo' where id = ?`, [id])
}

/*practicante.getNameById = async(id) => {
    return await db.query('select nombre from practicante where id = $1', [id])
}*/
practicante.getNameById = async(id) => {
    return await db.query('select nombre from practicante where id = ?', [id])
}

/*practicante.getById = async(id) => {
    return await db.query('select * from practicante where id = $1', [id])
}*/
practicante.getById = async(id) => {
    return await db.query('select * from practicante where id = ?', [id])
}

/*practicante.updateHora = async(id, hora) => {
    return await db.query('update practicante set hora = $1 where id = $2', [hora, id])
}*/
practicante.updateHora = async(id, hora) => {
    return await db.query('update practicante set hora = ? where id = ?', [hora, id])
}

/*practicante.find = async (codigo) => {
    return await db.query('select * from practicante where codigo = $1', [codigo])
}*/
practicante.find = async (codigo) => {
    return await db.query('select * from practicante where codigo = ?', [codigo])
}

/*practicante.create = async (user) => {
    return await db.query('insert into practicante set $1', [user])
}*/
practicante.create = async (user) => {
    return await db.query('insert into practicante set ?', [user])
}

/*practicante.cant = async() => {
    return await db.query('select count(*) as cantidad from practicante')
}*/
practicante.cant = async() => {
    return await db.query('select count(*) as cantidad from practicante')
}

/*practicante.lastSemester = async() => {
    return await db.query('select * from semestre order by id desc')
}*/
practicante.lastSemester = async() => {
    return await db.query('select * from semestre order by id desc')
}

/*practicante.setAssistance = async(registro) => {
    return await db.query('insert into registro set $1', [registro])
}*/
practicante.setAssistance = async(registro) => {
    return await db.query('insert into registro set ?', [registro])
}

/*practicante.logs = async() => {
    return await db.query('select idPracticante, fecha, nombre, foto, hora, registro.estado from registro, practicante where idPracticante = practicante.id order by registro.fecha desc limit 5')
}*/
practicante.logs = async() => {
    return await db.query('select idPracticante, fecha, nombre, foto, hora, registro.estado from registro, practicante where idPracticante = practicante.id order by registro.fecha desc limit 5')
}

/*practicante.getLastRegister = async(idPracticante) => {
    return await db.query('select * from registro where idPracticante = $1 order by id desc', [idPracticante])
}*/
practicante.getLastRegister = async(idPracticante) => {
    return await db.query('select * from registro where idPracticante = ? order by id desc', [idPracticante])
}

module.exports = practicante