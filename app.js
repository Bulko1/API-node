const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

//mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'spider'
});
 
//rutas
app.get('/', (req, res) => {
    res.send('Hola');
});

// todos los Cientes 
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        }else{
            res.send('Sin resultado');
        }
    });


    // res.send('Lista de clientes');
});
app.get('/clientes/:id', (req, res) => {
const { id } = req.params;	
const sql = `SELECT * FROM clientes WHERE id = ${id}`;
connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
        res.json(result);
    }else{
        res.send('Sin resultado');
    }
});
    // res.send('Lista de clientes por ID');
});
app.post('/add',(req, res) => {
    const sql = 'INSERT INTO clientes SET ?';

    const clienteObj = {
Nombre: req.body.Nombre,
Direccion: req.body.Direccion
    }
    connection.query(sql, clienteObj, (error, results) => {
        if (error) throw error;
        res.send('Cliente agregado');
    });
    // res.send('nuevo cliente');
});
app.put('/update/:id',(req, res) => {
   const { id } = req.params;
   const {Nombre, Direccion} = req.body;
const sql = `UPDATE clientes SET Nombre = '${Nombre}', Direccion = '${Direccion}' WHERE id = ${id}`;
   
connection.query(sql, error => {
    if (error) throw error;
    res.send('Cliente Actualizado!');
});
   
    // res.send('actualiza cliente');
});
app.delete('/delete/:id',(req, res) => {
   const { id } = req.params;
    const sql = `DELETE FROM clientes WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Cliente Eliminado!');
    });
});

//prueba de conexion
connection.connect(error=>{
    
    if(error) throw error;
        console.log("BD ok ");
    });

app.listen(PORT, () => console.log("server running on port " + PORT));


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();