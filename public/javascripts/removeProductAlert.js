const formDelete = document.getElementById('form-delete');

formDelete.addEventListener('submit', function(event) {
    event.preventDefault()

    Swal.fire({
        title: '¿Estás seguro de eliminar este producto?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7F00FF',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminalo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          formDelete.submit()
        }
      })
})