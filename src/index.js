const app = require('./app');

// CODIGO ASINCRONO
async function main () {
    await app.listen(app.get('port'));
    console.log('Servidor en el puerto: ', app.get('port'));
}

main();

// app.listen(3000, () =>{
//     console.log('Servidor en el puerto 3000');
//     console.log('Servidor en el puerto 3000');
// })