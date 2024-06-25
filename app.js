const express = require('express');
const multer = require('multer');
const mysql = require ('mysql');
const path = require('path');

const app = express();
const port = 3000;

const upload = multer({dest: 'public/imagenes/'});
 
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'Tecnologia'

});

connection.connect(err => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos.');
});

app.use(express.urlencoded({extended: true}));
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
 


//// a

app.get('/marcas', (req, res) => {
    connection.query('SELECT * FROM marcas', (error, results) => {
        if (error) {
            console.error('Error al obtener la marca: ' + error.message);
            res.status(500).send('Error en el servidor al obtener la marca');
            return;
        }
        res.json(results);
    });
});

app.get('/proveedores', (req, res) => {
    connection.query('SELECT * FROM proveedores', (error, results) => {
        if (error) {
            console.error('Error al obtener proveedores: ' + error.message);
            res.status(500).send('Error en el servidor al obtener proveedores');
            return;
        }
        res.json(results);
    });
});


/////a

app.post('/subir_imagenes', upload.single('imagen'), (req, res) =>{
    const {nombreProducto, marca, precio, stock, proveedor} = req.body;
    const imagen = req.file.filename;
    const sql = 'INSERT INTO productos (nombreProducto, IdMarca, imagen, precio, stock, IdProveedor) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nombreProducto, marca, imagen, precio, stock, proveedor], (err) =>{
        if(err) throw err;
        res.redirect('/registrarProductos.html');
    });
});
 
//Ruta para obtener las imagenes
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err.stack);
        res.status(500).json({ error: 'Error querying database' });
        return;
      }
      res.json(results);
    });
  });

app.post('/subir_imagenes', upload.single('imagen'), (req, res) => {
    // Aquí puedes manejar la carga de imágenes si lo necesitas
    res.status(200).send('Imagen subida correctamente');
  });


/*app.post('/actualizarProducto/', (req, res) => {
    // Desestructura los datos del cuerpo de la solicitud (req.body)
    const {nombreProducto, marca, precio, stock, proveedor} = req.body;
    const imagen = req.file.filename;
    // Consulta SQL para actualizar los datos de la película en la base de datos
    const sql = 'UPDATE productos SET nombreProducto = ?, marca = ?, imagen = ?, precio = ?, stock = ?, proveedor = ? WHERE id = ?';
    // Ejecuta la consulta SQL
    connection.query(sql, [nombreProducto, marca, imagen, precio, stock, proveedor], (err) =>{
        if (err) {
            // Si ocurre un error, muestra un mensaje en la consola y envía una respuesta de error al cliente
            console.error('Error al modificar el producto:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Si la actualización es exitosa, muestra un mensaje en la consola
        console.log('Producto modificado correctamente.');
        // Redirecciona al usuario a la página de listado de películas
        res.redirect('/gestionProductos.html');
    });

    app.get('/productos/:id',(req,res)=>{
        const id = req.params.id;
        connection.query('Select * from productos Where IdProducto = ?',[id], (err, result)=>{
            if(err){
                console.error('Error al obtener los datos del producto:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            if (result.length === 0){
                res.status(404).send('Producto no encontrado');
                return;
            }
            res.json(result[0]);
        });
    });
});*/


app.delete('/eliminarProducto/:idProducto', (req, res) => {
    //Obtiene el parámetro 'id' de la URL para eliminar la pelicula en especifico
    const id = req.params.id;
    //Define la consulta SQL para eliminar una película donde el ID coincida
    const sql = 'DELETE FROM productos WHERE id = ?';
    //Ejecuta la consulta SQL, utilizando el Id que se enviara a la consulta SQL
    connection.query(sql, [id], (err, result) => {
        // Si ocurre un error durante la ejecución de la consulta, lanza una excepción
        if (err) throw err;
        // Imprime un mensaje en la consola indicando que la película fue eliminada correctamente
        console.log('Película eliminada correctamente.');
        // Envía una respuesta HTTP 200 OK al cliente, indicando que la eliminación fue exitosa
        res.sendStatus(200); 
    });
});
// GET para obtener un producto por su ID
app.get('/productos/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;
  
    const sql = 'SELECT * FROM productos WHERE idProducto = ?';
    connection.query(sql, [idProducto], (err, results) => {
      if (err) {
        console.error('Error al obtener los datos del producto:', err);
        res.status(500).json({ error: 'Error al obtener los datos del producto' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
  
      const producto = results[0];
      res.json({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        idMarca: producto.idMarca,
        imagen: producto.imagen, // Suponiendo que esto es el nombre del archivo de imagen en tu servidor
        precio: producto.precio,
        stock: producto.stock,
        idProveedor: producto.idProveedor
        // Agrega más campos según sea necesario
      });
    });
  });

// POST para actualizar un producto
app.post('/modificar_producto', upload.single('imagen'), (req, res) => {
    const { idProducto, nombreProducto, precio, stock } = req.body;

    const sql = 'UPDATE productos SET nombreProducto = ?, precio = ?, stock = ? WHERE idProducto = ?';
    
    connection.query(sql, [nombreProducto, precio, stock, idProducto], (err) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            return res.status(500).send('Error al actualizar producto en la base de datos');
        }
        res.redirect('/registrarProductos.html');
    });
});














app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
