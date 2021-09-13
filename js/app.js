// loading data
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// show all product in web UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product m-3 p-3">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4 class = "mt-4 fs-4 primary fst-italic">${product.title.slice(0, 15)}</h4>
      <span class="fs-6 text ">Ratings: </span>
      <span class="text-warning fs-6 fw-bold">${iconShow(product.rating.rate)} <span class="text-secondary ">(${product.rating.rate})</span></span>
      <h6 class= " mt-2">
        <span class = "text-success">Counts: ${product.rating.count}</span> 
     </h6>
      <p class= "danger fst-italic">Category: ${product.category}</p>
      <h3 class="mb-3"><span class = "price">Price:</span> <span class = "span">$ ${product.price}</span></h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">Add to cart</button>
      <button id="details-btn" onclick="getDetail('${product.id}')" class="btn clickbtn">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// add to cart show
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
// get input data
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// details single product id api
const getDetail = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => productDetail(data));
}
// detail single product show
const productDetail = (detail) => {
  const singleProduct = document.getElementById("details-products");
  singleProduct.innerHTML = `
  <div class="col">
    <div class="card ">
      <img src="${detail.image}" class="card-img-top image-style " alt="...">
      <div class="card-body">
        <h5 class="card-title fs-3 title">${detail.title.slice(0, 20)}</h5>
        <p class="card-text descrip">${detail.description.slice(0, 150)}</p>
      </div>
    </div>
  </div>
  `;
}
// rating star show for client feedback
const iconShow = (rate) => {
  const rateIcon = Math.floor(rate);
  let iconStore = "";

  for (let i = 0; i < rateIcon; i++) {
    iconStore += `<i class="bi bi-star-fill"></i>`;
  }
  iconStore += `<i class="bi bi-star-half"></i>`;

  if (5 - rateIcon > 1) {
    for (let i = 0; i < 5 - rateIcon - 1; i++) {
      iconStore += `<i class="bi bi-star"></i>`;
    }
  }

  return iconStore;
};

