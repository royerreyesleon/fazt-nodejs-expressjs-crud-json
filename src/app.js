// console.log('Test');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// CONFIGURACIONES
app.set('port', process.env.PORT || 3003); // PUERTO
app.set('views', path.join(__dirname, 'views')); // VISTAS
app.set('view engine', 'ejs'); // ESTABLECER EL MOTOR DE PLANTILLA


// MIDDLEWARES (FUNCIONES QUE SE VAN EJECUTANDO ANTES QUE LLGUEN A LAS RUTAS)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // ENTENDER LO QUE VIENE DEL FORMULARIO LO CONVIERTE A JSON


// RUTAS
app.use(require('./routes/routes'))


// STATIC (ARCHIVOS ESTATICOS) 
app.use(express.static(path.join(__dirname, 'public')));

// MANEJADOR DE 404
app.use((req, res, next) => {
    res.status(404).send('404 Recurso no encontrado');
})


module.exports = app;