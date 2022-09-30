const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const fileupload = require( 'express-fileupload' )

const { port } = require('./config/keys')
require('./config/database')

//settings
app.set('port', port)

//middleware
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))
app.use(express.json())
app.use( fileupload( {
    tempFileDir: '/temp'
} ) )
app.use( express.static( "files" ) )

//routes
app.use(require('./routes/index'))
app.use('/api/practicante', require('./routes/practicante'))
app.use('/api/administrador', require('./routes/administrador'))


http.listen(app.get('port'), () => {
    console.log(`Server listening on ${app.get('port')}`);
});
