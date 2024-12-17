const productsBody = document.querySelector(".products-body");
const cartCountIcon = document.querySelector("#cartCountIcon");
const cartPageBody = document.querySelector(".cart-page-body");
let cartIconCountNum = 0;

const fetchUrl = fetch("https://dummyjson.com/products");
fetchUrl
  .then((res) => res.json())
  .then((data) => {
    // console.log(data)
    const arrayOfData = data.products;
    arrayOfData.forEach((e, index) => {
      // console.log(e)
      const { title, description, category, images, price, rating, stock } = e;
      // console.log(images[0])

      productsBody.innerHTML += `
        <div class="card col" style="width: 18rem">
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
              <p>Category : <span class="category">${category}</span></p>
              <p>Availble Stock : <span class="availble-stock">${stock}</span></p>
              <h3>Price <span class="price">$${price}</span></h3>
              <p>Rating : <span class="rating">${rating}</span>
              </p>
              <div class="cart-count row mx-auto input-group border border-dark rounded-3">
              <button class="col btn btn-primary rmCount">-</button>
              <h4 class="col-8 cartItems text-center">0</h4>
              <button class="col btn btn-primary addCount">+</button>
              </div>
              </div>
              </div>`;

      addCountTracker();
      rmCountTracker();
    });
  });

function addCountTracker() {
  const addCounts = document.querySelectorAll(".addCount");
  let cartItems = document.querySelectorAll(".cartItems");
  addCounts.forEach((e, index) => {
    e.addEventListener("click", () => {
      let cartCountValue = Number(++cartItems[index].textContent);
      cartItems[index].textContent = cartCountValue;
      cartCountIcon.textContent = ++cartIconCountNum;

      if (cartCountValue) {
        cartPageBody.innerHTML += `<div class="col cart-item d-flex gap-4 w-75 border align-items-center p-4 shadow">
          <div class="cart-item-img col-4" style="width: 260px">
            <img
              src=${images[0]}
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="cart-item-body col-8">
            <div class="cart-text">
              <h4 class="p-title">${title}</h4>
              <h3>Price : <span>$${price}</span></h3>
              <h4>Total : <span></span></h4>
              <div
                class="cart-page-count row mt-4 input-group border border-dark rounded-3"
              >
              <button class="col-3 btn btn-primary rmCount1">-</button>
              <h4 class="col text-center cartItems1">1</h4>
              <button class="col-3 btn btn-primary addCount1">+</button>
              </div>        
            </div>
          </div>
        </div>`;
      }
    });
  });
}
function rmCountTracker() {
  const rmCounts = document.querySelectorAll(".rmCount");
  let cartItems = document.querySelectorAll(".cartItems");
  rmCounts.forEach((e, index) => {
    e.addEventListener("click", () => {
      if (cartItems[index].textContent > 0) {
        let cartCountValue = Number(--cartItems[index].textContent);
        cartItems[index].textContent = cartCountValue;
        cartCountIcon.textContent = --cartIconCountNum;
      }
    });
  });
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
}
DisplayCartPage()