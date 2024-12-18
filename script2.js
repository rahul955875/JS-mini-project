const productsBody = document.querySelector(".products-body");
const productsCart = [];
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    fetchDataObj = data.products;
    // console.log(fetchDataObj)
    fetchDataObj.forEach((e) => {
      const { id, title, description, images, rating, price } = e;
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
              <h3>Price <span class="price">$${price}</span></h3>
              <p>Rating : <span class="rating">${rating}</span>
              </p>
              <div class="cart-count row mx-auto input-group border border-dark rounded-3">
              <button class="col btn btn-primary ${id} rmCount">-</button>
              <h4 class="col-8 text-center Itemquntity">0</h4>
              <button class="col btn btn-primary ${id} addCount">+</button>
              </div>
              </div>
              </div>`;
              increment(title,images,price);
    });
  });
function increment(title,images,price) {
  const addCounts = document.querySelectorAll(".addCount");
  addCounts.forEach((e) => {
    const addProductDeatils = {
        ptitle : title,
        pimg : images[0],
        pprice : price 
    }
    console.log(addProductDeatils)
  });
}
