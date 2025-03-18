const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $loader = d.querySelector("#loader");

$btnCompra.addEventListener("click", function (e) {
  if ($listaCarrito.children.length > 0) {
    $loader.classList.remove("hidden");
    setTimeout(function () {
      $loader.classList.add("hidden");
      $mensajeCompra.classList.remove("hidden");
      setTimeout(function () {
        $mensajeCompra.classList.add("hidden");
        $totalCarrito.textContent = "0";
        $listaCarrito.innerHTML = "";
        carrito = {};
        actualizarCarrito();
      }, 3000);
    }, 5000);
  } else {
    alert("El carrito está vacío");
  }
});

d.addEventListener("click", function (e) {
  if (e.target.matches(".producto")) {
    const $producto = e.target;
    let nombre = $producto.getAttribute("data-nombre");
    let id = $producto.getAttribute("data-id");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    if (carrito[id]) {
      carrito[id].cantidad++;
    } else {
      carrito[id] = {
        nombre: nombre,
        precio: precio,
        cantidad: 1
      };
    }
    actualizarCarrito();
  }
});

let carrito = {};

function actualizarCarrito() {
  $listaCarrito.innerHTML = "";

  let total = 0;

  for (let id in carrito) {
    const producto = carrito[id];

    const $itemCarrito = d.createElement("li");
    $itemCarrito.textContent = `${producto.nombre} - $${producto.precio} x `;

    const $cantidadSpan = d.createElement("span");
    $cantidadSpan.textContent = producto.cantidad;
    $cantidadSpan.classList.add("cantidad");

    const $btnIncrementar = d.createElement("button");
    $btnIncrementar.textContent = "+";
    $btnIncrementar.addEventListener("click", () => {
      carrito[id].cantidad++;
      actualizarCarrito();
    });

    const $btnDecrementar = d.createElement("button");
    $btnDecrementar.textContent = "-";
    $btnDecrementar.addEventListener("click", () => {
      if (carrito[id].cantidad > 1) {
        carrito[id].cantidad--;
      } else {
        delete carrito[id];
      }
      actualizarCarrito();
    });

    $listaCarrito.appendChild($itemCarrito);
    $itemCarrito.appendChild($btnIncrementar);
    $itemCarrito.appendChild($cantidadSpan);
    $itemCarrito.appendChild($btnDecrementar);

    total += producto.precio * producto.cantidad;
  }

  $totalCarrito.textContent = total;
}