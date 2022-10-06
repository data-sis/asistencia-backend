const db = require('../config/database')

const administrador = {}

administrador.create = async (user) => {
    return await db.query('insert into administrador set ?', [user])
}

/*administrador.getAdmin = async(user) => {
    return await db.query('select * from administrador where user = $1', [user])
}*/
administrador.getAdmin = async(user) => {
    return await db.query('select * from administrador where user = ?', [user])
}

/*administrador.updateAdmin = async(id, newAdmin) => {
    return await db.query('update administrador set $1 where id = $2', [newAdmin, id])
}*/
administrador.updateAdmin = async(id, newAdmin) => {
    return await db.query('update administrador set ? where id = ?', [newAdmin, id])
}

/*administrador.findUser = async(user) => {
    return await db.query('select * from administrador where user = $1', [user])
}*/
administrador.findUser = async(user) => {
    return await db.query('select * from administrador where user = ?', [user])
}

/*administrador.verify = async(user, pass) => {
    return await db.query('select * from administrador where user = $1 and pass = $2', [user, pass])
}*/
administrador.verify = async(user, pass) => {
    return await db.query('select * from administrador where user = ? and pass = ?', [user, pass])
}

/*administrador.semester = async(gestion) => {
    return await db.query('insert into semestre set $1', [gestion])
}*/
administrador.semester = async(gestion) => {
    return await db.query('insert into semestre set ?', [gestion])
}

/*administrador.getSemester = async() => {
    return await db.query('select * from semestre order by id desc')
}*/
administrador.getSemester = async() => {
    return await db.query('select * from semestre order by id desc')
}

/*administrador.getPracticantesBySemestre = async(idSemestre) => {
    return await db.query('select practicante.id as idPracticante, nombre, foto, hora, carrera, mencion from practicante, registro where idPracticante = practicante.id and idSemestre = $1 group by nombre', [idSemestre])
}*/
administrador.getPracticantesBySemestre = async(idSemestre) => {
    return await db.query('select practicante.id as idPracticante, nombre, foto, hora, carrera, mencion from practicante, registro where idPracticante = practicante.id and idSemestre = ? group by nombre', [idSemestre])
}

/*administrador.getFechaPracticante= async(idPracticante) => {
    return await db.query('select nombre, fecha, registro.estado from registro, practicante where idPracticante = $1 and registro.idPracticante = practicante.id order by fecha asc', [idPracticante])
}*/
administrador.getFechaPracticante= async(idPracticante) => {
    return await db.query('select nombre, fecha, registro.estado from registro, practicante where idPracticante = ? and registro.idPracticante = practicante.id order by fecha asc', [idPracticante])
}

module.exports = administrador