//get container from html
const productContainer = document.getElementById("productCardsContainer");
const cartContainer = document.getElementById("cartContainer");
//bootstrap modal
const modal = document.getElementById("modalBody");
const closeButton = document.querySelector(".modal .btn-close");
//buttons
const viewDetailsButtons = document.querySelectorAll(".viewDetailsBtn");
const addToCartButtons = document.querySelectorAll(".addToCartBtn");
//footer
const footer = document.querySelector('footer');
/*In order to ensure the footer will always be at the bottom without overlapping content
apply padding-bottom to body based off the footers height. This ensures even if more content is added. the footer
will not overlap */

// Calculate the footer height
const footerHeight = footer.offsetHeight;

// Apply padding to the body equal to the footer height
document.body.style.paddingBottom = footerHeight + 'px';

//Products stored as objects in array
const productList = [
  {
    Name: "A9",
    Description: "Description for A9",
    Price: 12.99,
    smallThumbnail: "./images/A9_small.jpg",
    largeThumbnail: "./images/A9_large.jpg",
  },
  {
    Name: "A9S",
    Description: "Description for A9S",
    Price: 15.99,
    smallThumbnail: "./images/A9S_small.jpg",
    largeThumbnail: "./images/A9S_large.jpg",
  },
  {
    Name: "C9",
    Description: "Description for C9",
    Price: 25.99,
    smallThumbnail: "./images/C9_small.jpg",
    largeThumbnail: "./images/C9_large.jpg",
  },
  {
    Name: "C9S",
    Description: "Description for C9S",
    Price: 29.99,
    smallThumbnail: "./images/C9S_small.jpg",
    largeThumbnail: "./images/C9S_large.jpg",
  },
  {
    Name: "M9",
    Description: "Description for M9",
    Price: 19.99,
    smallThumbnail: "./images/M9_small.jpg",
    largeThumbnail: "./images/M9_large.jpg",
  },
  {
    Name: "S9",
    Description: "Description for S9",
    Price: 32.99,
    smallThumbnail: "./images/S9_small.jpg",
    largeThumbnail: "./images/S9_large.jpg",
  },
  {
    Name: "S9R",
    Description: "Description for S9R",
    Price: 34.99,
    smallThumbnail: "./images/S9R_small.jpg",
    largeThumbnail: "./images/S9R_large.jpg",
  },
  {
    Name: "T9",
    Description: "Description for T9",
    Price: 27.99,
    smallThumbnail: "./images/T9_small.jpg",
    largeThumbnail: "./images/T9_large.jpg",
  },
  {
    Name: "X9",
    Description: "Description for X9",
    Price: 39.99,
    smallThumbnail: "./images/X9_small.jpg",
    largeThumbnail: "./images/X9_large.jpg",
  },
  {
    Name: "X9X",
    Description: "Description for X9X",
    Price: 42.99,
    smallThumbnail: "./images/X9X_small.jpg",
    largeThumbnail: "./images/X9X_large.jpg",
  },
];

//set cart array
let cartList = [];
//retrieve cart data from localStorage if it exists
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  cartList = JSON.parse(storedCart);
}

//function to display product details in modal
const showProductDetails = (productName) => {
  //find what product was clicked on by matching the name to the products in array
  const product = productList.find((product) => product.Name === productName);
  //Modify modal content
  const modalContent = `
  <article class="row customBorder pb-3">
  
  <div class="col-md-6">
  <img src="${product.largeThumbnail}" alt="${product.Name}" class="img-fluid customSmallThumbnail" />
  </div>
  <div class="col-md-6 mb-2">
  <p class="mt-2">${product.Description}</p>
  <p class="mt-2">Price: $${product.Price}</p>
  <small class="customSmallText">In Stock</small>
  </div>
  </article>
  
  <article class="row pt-3">
  <div class="col-md-6">
  <h4 class="text-center"><i class="bi bi-star-fill starIcon"></i> Reviews</h4>

  <p><i class="bi bi-person-circle"></i> Lorem ipsum dolor sit.</p>
  <p><i class="bi bi-person-circle"></i> Lorem ipsum dolor sit.</p>
  </div>

  <div class="col-md-6">
  <h4 class="text-center"><i class="bi bi-bar-chart"></i> Specifications</h4>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci distinctio ad eveniet quaerat!</p>
  </div>

  </article>

  `;

  //set content to modal content
  modal.innerHTML = modalContent;
  // console.log(modalContent);

  //show modal
  const productModal = new bootstrap.Modal(
    document.getElementById("productModal")
  );
  productModal.show();
};

//add selected product name & price to cart
const addToCart = (productName, productPrice) => {
  // Find the clicked product by its name
  const productToAdd = productList.find(
    (product) => product.Name === productName
  );

  // Add the selected product to the cartList array if a match was found
  if (productToAdd) {
    cartList.push({
      Name: productToAdd.Name,
      Price: productPrice,
    });
    // Update the localStorage with the updated cartList
    localStorage.setItem("cart", JSON.stringify(cartList));

    console.log(`${productName} added to cart with ${productPrice} as price`);
  }
};

//generate productCards to display in product section
const createProductCards = (products) => {
  const productCardsHTML = products
    .map((product) => {
      return `
      <article class="productCard col-lg-4 col-md-6 mt-4">
        <div class="productHeader">
          <h3>${product.Name}</h3>
          <img src="${product.smallThumbnail}" alt="${product.Name}" class="img-fluid customSmallThumbnail" />
          <p class="mt-2">Price: $${product.Price}</p>
          <button class="addToCartBtn btn btn-primary mt-2" data-product-name="${product.Name}" data-product-price="${product.Price}">Add to Cart</button>
          <button class="btn btn-primary mt-2 viewDetailsBtn" data-bs-toggle="modal" data-bs-target="#productModal" data-product-name="${product.Name}">View Details</button>
        </div>
      </article>
    `;
    })
    .join(""); //Joins the strings together and removes the loose commas that appeared in the text

  // display the cards in productContainer
  productContainer.innerHTML = productCardsHTML;

  /*Listen for clicks on the entire container, then find what specific child element was clicked. 
Adding event listeners to all the buttons was not working since JS couldn't find them.
*/
  productContainer.addEventListener("click", function (event) {
    //if element clicked has class addToCartBtn run the AddToCart code
    if (event.target.classList.contains("addToCartBtn")) {
      //get name & price
      const productName = event.target.getAttribute("data-product-name");
      const productPrice = event.target.getAttribute("data-product-price");
      //run addToCart & pass it name&price
      addToCart(productName, productPrice);
    }
    //if element clicked on has viewDetailsBtn class, run viewDetails
    if (event.target.classList.contains("viewDetailsBtn")) {
      //get name
      const productName = event.target.getAttribute("data-product-name");
      //run function pass it name
      showProductDetails(productName);
    }
  });
};

//Display cartItems
// const displayCartItems = (cartItems) =>{
//   //get cartList from local storage
//   cartList = JSON.parse(storedCart);

//   //loop through & create HTML for each cartItem
//   const cartListHTML = cartItems.map((cartItem) =>{
//     return `
//       <article class="cartItem">
//       <div>
//       <h3>${cartItem.Name}</h3>
//       <p class="mt-2">Price: $${cartItem.Price}</p>
//       </div>
//       </article>
//     `
//   })
//   .join("");

//   cartContainer.innerHTML = cartListHTML;
// };

createProductCards(productList);
