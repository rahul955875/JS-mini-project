const productHtml = document.querySelector(".products-body");
const productsCart = [];
fetch("https://dummyjson.com/products")
.then((res) => res.json())
.then((data) => {
    fetchDataObj = data.products;
    // console.log(fetchDataObj)
    fetchDataObj.forEach((e) => {
      const { id, title, description, images, rating, price } = e;
      productHtml.innerHTML += `
        <div class="card col" id=${id} style="width: 18rem">
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
              <button class="col btn btn-primary rmCount">-</button>
              <h4 class="col-8 text-center Itemquntity">0</h4>
              <button class="col btn btn-primary addCount">+</button>
              </div>
              </div>
              </div>`;
    });
    const addCounts = document.querySelectorAll(".addCount");
    updateCartItme(addCounts);
  });

function updateCartItme(addCounts) {
  addCounts.forEach((e) => {
    e.addEventListener("click", (x) => {
      const positionItem = x.target.parentElement.parentElement.parentElement;
      const isAvailable = productsCart.find((p)=>{
        return p.id == positionItem.id
      })
      console.log(isAvailable)
      
      const itemTocart = {
          id: positionItem.id,
          quantity: 1,
        };
        productsCart.push(itemTocart)
      console.log(productsCart)
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
DisplayCartPage();
