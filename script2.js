const productHtml = document.querySelector(".products-body");
const productsCart = JSON.parse(localStorage.getItem("data")) || [];
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    fetchDataObj = data.products;
    // console.log(fetchDataObj)
    fetchDataObj.forEach((e) => {
      const { id, title, description, images, rating, price } = e;
      productHtml.innerHTML += `
        <div class="card col shadow " id=poduct-id-${id} style="width: 18rem">
            <img
            src= ${images[0]} 
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">
              ${description}
              </p>
              <h3>Price <span class="price">$${price}</span></h3>
              <p>Rating : <span class="rating">${rating}</span>
              </p>
              <div class="cart-count row mx-auto input-group border border-dark rounded-3">
              <button data-id=${id} class="col btn btn-primary rmCount">-</button>
              <h4 class="col-8 text-center Itemquntity" id=${id}>0</h4>
              <button class="col btn btn-primary addCount"data-id=${id} data-image=${images[0]} data-price=${price} data-title=${title}>+</button>
              </div>
              </div>
              </div>`;
    });
    increment();
    decrement();
    cartPage();
    cartPageIncrement();
    cartPageDecrement();
  });

function increment() {
  const addCounts = document.querySelectorAll(".addCount");
  addCounts.forEach((e) => {
    e.addEventListener("click", () => {
      const itemData = {
        id: e.dataset.id,
        title: e.dataset.title,
        price: e.dataset.price,
        image: e.dataset.image,
        quantity: 1,
      };
      const search = productsCart.find((x) => x.id == itemData.id);
      if (search) {
        search.quantity += 1;
      } else {
        productsCart.push(itemData);
      }
      // console.log(productsCart);
      updateCart(itemData.id);
      cartPageLive();
      cartPage()
      localStorage.setItem("data", JSON.stringify(productsCart));
    });
    updateCart(e.dataset.id);
  });
}

function decrement() {
  const rmCounts = document.querySelectorAll(".rmCount");
  const cartproduct = document.querySelectorAll(".product-inCart");
  rmCounts.forEach((e) => {
    e.addEventListener("click", () => {
      const search = productsCart.find((x) => x.id == e.dataset.id);
      if (search) {
        if (search.quantity > 0) {
          search.quantity -= 1;
        } else {
          productsCart.pop(search);
          cartproduct[index].remove();
        }
      }
      updateCart(e.dataset.id);
      cartPageLive();
      // console.log(productsCart);
      localStorage.setItem("data", JSON.stringify(productsCart));
    });
  });
}

function updateCart(id) {
  const quant = document.getElementById(id);
  const search = productsCart.find((x) => x.id == id);
  updateCartIcon();
  if (search) return (quant.innerText = search.quantity);
}

function updateCartIcon() {
  const cartCountIcon = document.getElementById("cartCountIcon");
  const totalItmes = productsCart
    .map((x) => x.quantity)
    .reduce((a, c) => a + c, 0);
  cartCountIcon.textContent = totalItmes;
  // console.log(totalItmes)
}
function DisplayCartPage() {
  const cartPage = document.querySelector(".cart-page");
  const closeBtn = document.querySelector(".close-btn");
  const cartBtn = document.querySelector(".cart-btn");
  cartBtn.addEventListener("click", () => {
    cartPage.style.transform = "translateX(0)";
  });
  closeBtn.addEventListener("click", () => {
    cartPage.style.transform = "translateX(100%)";
  });
  totalBill()
}
DisplayCartPage();
function cartPage() {
  let cartPageBodyHtml = document.querySelector(".cart-page-body");
  // console.log(productsCart)
  cartPageBodyHtml.innerHTML = ''
  productsCart.forEach((x) => {
    const { id, title, price, image, quantity } = x;
    cartPageBodyHtml.innerHTML += `
        <div
          class="col cart-item d-flex gap-4 border align-items-center p-4 shadow product-inCart" data-id=${id}
        >
        <div class="cart-item-img col-4" style="width: 260px">
            <img
              src=${image}
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="cart-item-body col-8">
            <div class="cart-text">
              <h4 class="p-title">${title}</h4>
              <h3>Price : <span class="price">${price}</span></h3>
              <h4>Total : <span class="total-price" id=${id}>${(
      price * quantity
    ).toFixed(2)}</span></h4>
              <div
                class="cart-page-count row mt-4 input-group border border-dark rounded-3"
              >
                <button class="col-3 btn btn-primary rmCount1 " data-id=${id}>-</button>
                <h4 class="col text-center cartItems1" data-id=${id}>${quantity}</h4>
                <button class="col-3 btn btn-primary addCount1" data-id=${id}>+</button>
                </div>
                </div>
          </div>
        </div>
`;
  });
}
function cartPageLive() {
  const cartItems1 = document.querySelectorAll(".cartItems1");
  const totalPrice = document.querySelectorAll(".total-price");
  cartItems1.forEach((e) => {
    let search = productsCart.find((x) => x.id == e.dataset.id);
    if (search) {
      e.innerHTML = search.quantity;
    }
  });
  totalPrice.forEach((t) => {
    let search = productsCart.find((x) => x.id == t.id);
    if (search) {
      t.innerHTML = (search.quantity * search.price).toFixed(2);
    }
  });
  totalBill()
}

function cartPageIncrement() {
  const addCount1 = document.querySelectorAll(".addCount1");
  addCount1.forEach((e) => {
    e.addEventListener("click", () => {
      const search = productsCart.find((x) => x.id == e.dataset.id);
      if (search) {
        search.quantity += 1;
      }
      // console.log(productsCart);
      updateCart(e.dataset.id);
      cartPageLive();
      localStorage.setItem("data", JSON.stringify(productsCart));
    });
  });
}
function cartPageDecrement() {
  const rmCount1 = document.querySelectorAll(".rmCount1");
  const cartproduct = document.querySelectorAll(".product-inCart");
  rmCount1.forEach((e, index) => {
    e.addEventListener("click", () => {
      const search = productsCart.find((x) => x.id == e.dataset.id);
      if (search) {
        if (search.quantity > 0) {
          search.quantity -= 1;
        } else {
          productsCart.pop(search);
          cartproduct[index].remove();
        }
      }
      updateCart(e.dataset.id);
      cartPageLive();
      // console.log(productsCart);
      localStorage.setItem("data", JSON.stringify(productsCart));
    });
  });
}

function totalBill() {
  const totalBillElement = document.querySelector('.total-bill');
  if (productsCart.length > 0) {
    const totalAmount = productsCart
      .map((x) => x.price * x.quantity)
      .reduce((a, c) => a + c, 0); 

    totalBillElement.innerHTML = `$${totalAmount.toFixed(2)}`;
  } else {
    totalBillElement.innerHTML = '$0.00';
  }
}
