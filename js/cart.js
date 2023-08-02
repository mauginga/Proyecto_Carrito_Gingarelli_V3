let carrito = []

const productoContenedor = document.getElementById("producto-contenedor");

productoContenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar')) {
    validarProductoEnCarrito(e.target.id);
  }
})

const validarProductoEnCarrito = (id) => {
  const estaRepetido = carrito.some(producto => producto.id == id)

  if (!estaRepetido) {
    const producto = productos.find(producto => producto.id == id)
    carrito.push(producto)
    pintarProductoCarrito(producto)
    actualizarTotalesCarrito(carrito)
  } else {
    const producto = carrito.find(producto => producto.id == id)
    const cantidad = document.getElementById(`cantidad${producto.id}`)
    producto.cantidad++
    cantidad.innerText = `Cantidad: ${producto.cantidad}`
    actualizarTotalesCarrito(carrito)
  }
}

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor')
  const div = document.createElement('div')
  div.classList.add('productoEnCarrito')

  div.innerHTML = `
    <img src=${producto.imagen}>
    <p>${producto.nombre}</p>
    <p><strong>$ ${producto.precio}</strong></p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `
  contenedor.appendChild(div)
}
// Pinta los productos seleccionados en el carrito
const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById('carrito-contenedor')

  contenedor.innerHTML = ''

  carrito.forEach(producto => {
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')

    div.innerHTML = `
      <img src=${producto.imagen}>
      <p>${producto.nombre}</p>
      <p>$ ${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
  });
}

const eliminarProductoCarrito = (id) => {
  const productoIndex = carrito.findIndex(producto => producto.id == id)
  carrito.splice(productoIndex, 1)
  pintarCarrito(carrito)
  actualizarTotalesCarrito(carrito)
}

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  pintarTotalesCarrito(totalCantidad, totalCompra)
  guardarCarritoStorage(carrito)
}

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById('contador-carrito')
  const precioTotal = document.getElementById('precio-total')

  contadorCarrito.innerText = totalCantidad
  precioTotal.innerText = totalCompra
}

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}
//guardo 
const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
  return carritoStorage
}
// funcion cargar carrito guardado en el storage
const cargarCarrito = () => {
  if (localStorage.getItem('carrito')) {
    carrito = obtenerCarritoStorage()
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
  }
}

// // Obtener referencia al botón vaciar carrito
// const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

// // Agregar evento click al botón
// btnVaciarCarrito.addEventListener('click', () => {
//   // Mostrar confirmación al usuario
//   const confirmacion = confirm('¿Estás seguro de que quieres vaciar el carrito?');

//   if (confirmacion) {
//     vaciarCarrito();
//   }
// });

// // Función para vaciar el carrito
// const vaciarCarrito = () => {
//   // Vaciar el arreglo carrito
//   carrito = [];
//   // Vaciar el contenido del contenedor en el HTML
//   const contenedor = document.getElementById('carrito-contenedor');
//   contenedor.innerHTML = '';
//   // Actualizar totales del carrito
//   actualizarTotalesCarrito(carrito);
//   // Guardar el carrito vacío en el almacenamiento local
//   guardarCarritoStorage(carrito);
// };

// Después de cargar el carrito desde el almacenamiento y pintarlo
cargarCarrito();

// Agregar evento clic al botón "Vaciar Carrito"
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');
btnVaciarCarrito.addEventListener('click', () => {
  // const confirmacion = window.confirm('¿Está seguro de que quiere vaciar el carrito?');
  // if (confirmacion) {
  //   // Vaciar el carrito y actualizar la interfaz
  //   carrito = [];
  //   pintarCarrito(carrito);
  //   actualizarTotalesCarrito(carrito);
  //   localStorage.removeItem('carrito'); // Limpiar el almacenamiento local también
  // }
  // reemplazo la ventana Confirm con un sweetAlert
  // tipos de Iconos: error, success, warning, info, question
  // swal.fire({
  //   title: "¿Está seguro de que quiere vaciar el carrito?",
  //   icon: "question",
  //   buttons: {
  //     cancel: "Cancelar",
  //     confirm: "Vaciar",
  //   },
  //   dangerMode: true,
  // })
  // .then((willVaciar) => {
  //   if (willVaciar) {
  //     // Vaciar el carrito y actualizar la interfaz
  //     carrito = [];
  //     pintarCarrito(carrito);
  //     actualizarTotalesCarrito(carrito);
  //     localStorage.removeItem('carrito'); // Limpiar el almacenamiento local también
  //   }
  // });
  Swal.fire({
    title: '¿Desea vaciar el carrito de Compras?',
    showDenyButton: true,
    confirmButtonText: 'Vaciar',
    denyButtonText: `Cancelar`, // utilizo la opción Deny para que el usuario sepa que cancelo y reciba otro SweetAlert
  }).then((result) => {
    if (result.isConfirmed) {//     // Vaciar el carrito y actualizar la interfaz
          carrito = [];
          pintarCarrito(carrito);
          actualizarTotalesCarrito(carrito);
          localStorage.removeItem('carrito'); // Limpiar el almacenamiento local también
        } else if (result.isDenied) {
      Swal.fire('Cancelo la eliminacion del carrito')
    }
  })
});

