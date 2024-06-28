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
 


//// categorias

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


///// categorias

app.post('/subir_imagenes', upload.single('imagen'), (req, res) =>{
    const {nombreProducto, marca, precio, stock, proveedor} = req.body;
    const imagen = req.file.filename;
    const sql = 'INSERT INTO productos (nombreProducto, IdMarca, imagen, precio, stock, IdProveedor) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nombreProducto, marca, imagen, precio, stock, proveedor], (err) =>{
        if(err) throw err;
        res.redirect('/registrarProductos.html');
    });
});
app.post('/registrarUsuario',(req,res)=>{
    const {nombre, correo, contraseña, rol } = req.body;

    const query = 'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, correo, contraseña, rol], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            res.send('Error al registrar el usuario');
        } else {
            console.log('Usuario registrado exitosamente:', result);
            res.redirect('/iniciarSesion.html');
        }
    });
});
app.post('/iniciar_sesion', (req, res) => { 
    const { correo, contraseña } = req.body; 

    const query = 'SELECT rol FROM usuarios WHERE correo = ? AND contraseña = ?';

    connection.query(query, [correo, contraseña], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            res.send('Error al iniciar sesión'); 
        } else if (results.length > 0) { 
            const rol = results[0].rol; 
            if (rol === 1) { 
                res.redirect('/vistaAdmin.html'); 
            } else if (rol === 2) { 
                res.redirect('/vistaUsuario.html'); 
            }
        } else { 
            res.send('Correo o clave incorrectos'); 
        }
    });
});

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
    res.status(200).send('Imagen subida correctamente');
  });


app.delete('/eliminarProducto/:IdProducto', (req, res) => {
    const IdProducto = req.params.IdProducto;
    console.log(`Intentando eliminar el producto con IdProducto: ${IdProducto}`);
    
    const query = 'DELETE FROM productos WHERE IdProducto = ?';

    connection.query(query, [IdProducto], (error, results) => {
        if (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).send('Error al eliminar producto.');
        } else {
            console.log('Resultados de la eliminación:', results);
            if (results.affectedRows > 0) {
                res.send('Producto eliminado correctamente.');
            } else {
                res.status(404).send('Producto no encontrado.');
            }
        }
    });
});


app.post('/modificar_producto', (req, res) => {
    const { IdProducto, nombreProducto, IdMarca, precio, stock, IdProveedor } = req.body;
    const sql = 'UPDATE productos SET nombreProducto = ?, IdMarca = ?, precio = ?, stock = ?, IdProveedor = ? WHERE IdProducto = ?';
    
    connection.query(sql, [nombreProducto, IdMarca, precio, stock, IdProveedor, IdProducto], (err) => {
        if (err) {
            console.error('Error al modificar el producto:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        console.log('Producto modificado correctamente.');
        res.redirect('/gestionProductos.html');
    });
});

app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM productos WHERE IdProducto = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al obtener los datos del producto:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('producto no encontrado');
            return;
        }
        res.json(result[0]);
    });
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
