        // Función para eliminar una película
        function eliminarPelicula(id) {
            fetch('/eliminar_pelicula/' + id, {
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
    