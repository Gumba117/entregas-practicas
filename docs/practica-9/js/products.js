const $listaProductos = document.querySelector("#lista-productos");


async function fetchProducts() {
  try {
    $loader.classList.remove("hidden");
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    $loader.classList.add("hidden");
  }
}

function displayProducts(products) {
  $listaProductos.innerHTML = "";
  products.forEach(product => {
    const $productItem = document.createElement("li");
    $productItem.classList.add("producto");
    $productItem.setAttribute("data-id", product.id);
    $productItem.setAttribute("data-nombre", product.title);
    $productItem.setAttribute("data-precio", product.price);
    $productItem.textContent = `${product.title} - $${product.price}`;
    $listaProductos.appendChild($productItem);
  });
}

fetchProducts();
