const productsBody = document.querySelector('.products-body')
const fetchUrl = fetch('https://dummyjson.com/products')
fetchUrl.then(res => res.json())
.then(data => {/* console.log(data) */
    const arrayOfData = data.products;
    let showData;
    arrayOfData.forEach((e,index )=> {
        // console.log(e)
        const {title, description, category, images,price, rating, stock} = e;
        // console.log(brand, description, category, images,price, rating, stock)
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
                <button class="col btn btn-primary addCount">+</button>
                <h4 class="col-8 text-center">0</h4>
                <button class="col btn btn-primary rmCount">-</button>
              </div>
            </div>
          </div>
        `
        
    });
    // productsBody.append(showData)
}
)