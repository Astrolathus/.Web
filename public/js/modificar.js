/*document.addEventListener('DOMContentLoaded', () => {
    const formModificarProducto = document.getElementById('formModificarProducto');

    formModificarProducto.addEventListener('submit', function(event) {
        event.preventDefault();

        const idProducto = document.getElementById('IdProducto').value;
        const nombreProducto = document.getElementById('nombreProducto').value;
        const idMarca = document.getElementById('marca').value; // Aquí deberías obtener el ID de la marca seleccionada
        const imagen = document.getElementById('imagen').value; // Aquí deberías obtener la imagen seleccionada
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;
        const idProveedor = document.getElementById('proveedor').value; // Aquí deberías obtener el ID del proveedor seleccionado

        // Realizar la solicitud POST para actualizar el producto
        fetch(`/actualizarProducto/${idProducto}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreProducto: nombreProducto,
                idMarca: idMarca,
                imagen: imagen,
                precio: precio,
                stock: stock,
                idProveedor: idProveedor
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            return response.json();
        })
        .then(data => {
            console.log('Producto actualizado:', data);
            // Redirigir o mostrar mensaje de éxito
            window.location.href = '/gestionProductos.html'; // Ejemplo de redirección
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error, mostrar mensaje al usuario, etc.
        });
    });
});*/



/*const urlParams = new URLSearchParams(window.location.search); // Crea un objeto URLSearchParams para trabajar con los parámetros de la URL
const IdProducto = urlParams.get('IdProducto'); // Obtiene el valor del parámetro 'id' de la URL
const idProductoInput = document.getElementById('IdProducto').value;
const nombreProductoInput = document.getElementById('nombreProducto').value;
const idMarcaInput = document.getElementById('marca').value; // Aquí deberías obtener el ID de la marca seleccionada
const imagenInput = document.getElementById('imagen').value; // Aquí deberías obtener la imagen seleccionada
const precioInput = document.getElementById('precio').value;
const stockInput = document.getElementById('stock').value;
const idProveedorInput = document.getElementById('proveedor').value; // Aquí deberías obtener el ID del proveedor seleccionado

fetch('/productos/' + IdProducto) 
    .then(response => response.json())
    .then(producto => {
        idProductoInput.value = producto.id;
        nombreProductoInput.value = producto.nombre;
        idMarcaInput.value = producto.idMarca;
        imagenInput.value = producto.imagen;
        precioInput.value = producto.precio;
        stockInput.value = producto.stock;
        idProveedorInput.value = producto.idProveedor;

    })*/


/*const urlParams = new URLSearchParams(window.location.search); // Crea un objeto URLSearchParams para trabajar con los parámetros de la URL
const IdProducto = urlParams.get('IdProducto'); // Obtiene el valor del parámetro 'IdProducto' de la URL

const idProductoInput = document.getElementById('IdProducto');
const nombreProductoInput = document.getElementById('nombreProducto');
const idMarcaInput = document.getElementById('marca');
const imagenInput = document.getElementById('imagen');
const precioInput = document.getElementById('precio');
const stockInput = document.getElementById('stock');
const idProveedorInput = document.getElementById('proveedor');

fetch('/productos/' + IdProducto)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo obtener el producto.');
        }
        return response.json();
    })
    .then(producto => {
        idProductoInput.value = producto.id;
        nombreProductoInput.value = producto.nombre;
        imagenInput.src = producto.imagen;
        precioInput.value = producto.precio;
        stockInput.value = producto.stock;

        // Asignación para el campo 'marca' (select)
        idMarcaInput.value = producto.idMarca; // Suponiendo que producto.idMarca es el valor de la opción en el select

        // Asignación para el campo 'proveedor' (select)
        idProveedorInput.value = producto.idProveedor; // Suponiendo que producto.idProveedor es el valor de la opción en el select

    })
    .catch(error => {
        console.error('Error al obtener el producto:', error);
        // Aquí puedes manejar el error de manera adecuada, como mostrar un mensaje al usuario o realizar alguna acción específica
    });
*/

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const IdProducto = urlParams.get('IdProducto');

    // Asegúrate de que los elementos del DOM existen antes de usarlos
    const idProductoInput = document.getElementById('IdProducto');
    const nombreProductoInput = document.getElementById('nombreProducto');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');

    if (!IdProducto) {
        console.error('No se proporcionó un ID de producto válido.');
        return;
    }

    // Cargar datos del producto
    fetch('/productos/' + IdProducto)
        .then(response => response.json())
        .then(producto => {
            idProductoInput.value = producto.idProducto;
            nombreProductoInput.value = producto.nombreProducto;
            precioInput.value = producto.precio;
            stockInput.value = producto.stock;
        })
        .catch(error => {
            console.error('Error al obtener los detalles del producto:', error);
        });
});

