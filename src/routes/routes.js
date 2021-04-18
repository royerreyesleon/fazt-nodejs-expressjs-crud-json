const {Router} = require('express');
const router = Router();
const fs = require('fs');
// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');

// LEER EL ARCHIVO JSON
const json_books = fs.readFileSync('src/books.json', 'utf-8');
// const books = []; // REEMPLAZABA LOS DATOS POR QUE EMPEZABA COMO VACIO EL ARREGLO
let books = JSON.parse(json_books); // CONVERTIR A JSON. AHORA INICIA CON DATOS

// LISTAR
router.get('/' , (req , res)=>{
   // res.send('hello from simple server :)')
   // res.render('index.ejs');
   res.render('index.ejs', {books});
});

// REDIRECCIONAR
router.get('/new-entry' , (req , res)=>{

   res.render('new-entry');
   // res.send('hello from simple server :)')

});

// GUARDAR
router.post('/new-entry' , (req , res)=>{

   // ALMACENAR LOS DATOS EN CONSTANTES
   const { title, author, image, descripcion} = req.body;

   // VALIDAR
   if (!title || !author || !image || !descripcion) {
      res.status(400).send('Los datos deberian tener todos los campos');
      return;
   }

   let newBook = {
      // id: uuid(),
      id: uuidv4(),
      title,
      author,
      image,
      descripcion
   }
   
   books.push(newBook);

   // CONVERTIR A CADENA
   const json_books = JSON.stringify(books);
   // ESCRIBIR EN EL ARCHIVO.
   fs.writeFileSync('src/books.json', json_books, 'utf-8');

   // REDIRECCIONAR AL INICIO
   res.redirect('/');

})

// ELIMINAR
router.get('/delete/:id' , (req , res)=>{
   console.log(req.params);

   // QUITA DEL ARREGLO EL ID QUE LE ESTOY PASANDO Y ME DEVUELVE UN NUEVO ARREGLO.
   books = books.filter(book => book.id != req.params.id);

   // CONVERTIR A CADENA.
   const json_books = JSON.stringify(books);
   // ESCRIBIR EN EL ARCHIVO.
   fs.writeFileSync('src/books.json', json_books, 'utf-8');

   // REDIRECCIONAR AL INICIO
   res.redirect('/');
})

module.exports = router;