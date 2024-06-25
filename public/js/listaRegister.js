document.addEventListener('DOMContentLoaded', () => {
    fetch('/marcas')
      .then(response => response.json())
      .then(data => {
        const selectMarca = document.getElementById('marca');
        data.forEach(marca => {
          const option = document.createElement('option');
          option.value = marca.IdMarca; 
          option.textContent = marca.nombreMarca;
          selectMarca.appendChild(option);
        });
      });

    fetch('/proveedores')
      .then(response => response.json())
      .then(data => {
        const selectProveedor = document.getElementById('proveedor');
        data.forEach(proveedor => {
          const option = document.createElement('option');
          option.value = proveedor.IdProveedor; 
          option.textContent = proveedor.nombreProveedor;
          selectProveedor.appendChild(option);
        });
      });

    document.getElementById('marca').addEventListener('change', function() {
      document.getElementById('idMarca').value = this.value;
    });

    document.getElementById('proveedor').addEventListener('change', function() {
      document.getElementById('idProveedor').value = this.value;
    });

  });