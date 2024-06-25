/*document.addEventListener('DOMContentLoaded', () => {
    fetch('/productos')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('product-container');
            data.forEach(producto => {
                const cardHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="/imagenes/${producto.imagen}" class="card-img-top" alt="${producto.nombreProducto}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombreProducto}</h5>
                                <p class="card-text">Precio: $${producto.precio}</p>
                                <p class="card-text">Stock: ${producto.stock}</p>
                                <button class="btn btn-primary" onclick="modificarProducto(${producto.id})">Modificar</button>
                                <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += cardHTML;
            });
        });
});

function modificarProducto(idProducto) {
    console.log('Modificar producto con ID:', idProducto);
    window.location.href='/modificarProducto.html'
}

function eliminarProducto(idProducto) {
    console.log('Eliminar producto con ID:', idProducto);
}*/



document.addEventListener('DOMContentLoaded', () => {
    fetch('/productos/')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('product-container');
            data.forEach(producto => {
                const cardHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="/imagenes/${producto.imagen}" class="card-img-top" alt="${producto.nombreProducto}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombreProducto}</h5>
                                <p class="card-text">Precio: $${producto.precio}</p>
                                <p class="card-text">Stock: ${producto.stock}</p>
                                <button class="btn btn-primary" onclick="modificarProducto(${producto.IdProducto})">Modificar</button>
                                <button class="btn btn-danger" onclick="eliminarProducto(${producto.IdProducto})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += cardHTML;
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de productos:', error);
        });
});

function modificarProducto(IdProducto) {
    console.log('Modificar producto con ID:', IdProducto);
    if (idProducto) {
        window.location.href = `/modificarProducto.html?IdProducto=${IdProducto}`;
        
    } else {
        console.error('ID de producto no válido:', IdProducto);
    }
}

function eliminarProducto(IdProducto) {
    console.log('Eliminar producto con ID:', IdProducto);
    // Aquí puedes implementar la lógica para eliminar el producto si es necesario
    function eliminar(id) {
        fetch('/eliminarProducto/' + IdProducto, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                console.log('Película eliminada correctamente.');
                // Actualizar la tabla después de eliminar la película
                window.location.reload();
            } else {
                console.error('Error al eliminar película.');
            }
        })
        .catch(function(error) {
            console.error('Error en la solicitud:', error);
        });
    }

}

