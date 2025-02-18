//get container from html
const productContainer = document.getElementById("productCardsContainer");
//buttons
const viewDetailsButtons = document.querySelectorAll(".viewDetailsBtn");
const addToCartButtons = document.querySelectorAll(".addToCartBtn");

//Products stored as objects in array
const productList = [
  {
    Name: "A9",
    Description: "Description for A9",
    Price: 17.99,
    smallThumbnail: "./images/A9_small.jpg",
    largeThumbnail: "./images/A9_large.jpg",
    color: "orange",
  },
  {
    Name: "A9S",
    Description: "Description for A9S",
    Price: 19.99,
    smallThumbnail: "./images/A9S_small.jpg",
    largeThumbnail: "./images/A9S_large.jpg",
    color: "black",
  },
  {
    Name: "C9",
    Description: "Description for C9",
    Price: 25.99,
    smallThumbnail: "./images/C9_small.jpg",
    largeThumbnail: "./images/C9_large.jpg",
    color: "red",
  },
  {
    Name: "C9S",
    Description: "Description for C9S",
    Price: 28.99,
    smallThumbnail: "./images/C9S_small.jpg",
    largeThumbnail: "./images/C9S_large.jpg",
    color: "brown",
  },
  {
    Name: "M9",
    Description: "Description for M9",
    Price: 22.99,
    smallThumbnail: "./images/M9_small.jpg",
    largeThumbnail: "./images/M9_large.jpg",
    color: "lightblue",
  },
  {
    Name: "S9",
    Description: "Description for S9",
    Price: 29.99,
    smallThumbnail: "./images/S9_small.jpg",
    largeThumbnail: "./images/S9_large.jpg",
    color: "blue",
  },
  {
    Name: "S9R",
    Description: "Description for S9R",
    Price: 30.99,
    smallThumbnail: "./images/S9R_small.jpg",
    largeThumbnail: "./images/S9R_large.jpg",
    color: "darkblue",
  },
  {
    Name: "T9",
    Description: "Description for T9",
    Price: 27.99,
    smallThumbnail: "./images/T9_small.jpg",
    largeThumbnail: "./images/T9_large.jpg",
    color: "green",
  },
  {
    Name: "X9",
    Description: "Description for X9",
    Price: 24.99,
    smallThumbnail: "./images/X9_small.jpg",
    largeThumbnail: "./images/X9_large.jpg",
    color: "purple",
  },
  {
    Name: "X9X",
    Description: "Description for X9X",
    Price: 28.99,
    smallThumbnail: "./images/X9X_small.jpg",
    largeThumbnail: "./images/X9X_large.jpg",
    color: "green",
  },
];


//retrieve cart data from localStorage if it exists
const storedCart = localStorage.getItem("cart");
const cartList = JSON.parse(storedCart) || []; //if no cart is stored, Initialize as empty

//function to display product details in modal
const showProductDetails = (productName) => {
  //find what product was clicked on by matching the name to the products in array
  const product = productList.find((product) => product.Name === productName);
  //set car color to var & use inline style to update color to car color
  const carColor = product.color;

 // Modify modal content
 const modalContent = `
 <section class="row customBorder pb-3" style="border-color: ${carColor};">
   <div class="col-md-6">
     <img src="${product.largeThumbnail}" alt="${product.Name}" class="img-fluid" />
   </div>
   <div class="col-md-6 mb-2">
     <h3>${product.Name}</h3>
     <p class="mt-2">${product.Description}</p>
     <p class="mt-2">Price: $${product.Price}</p>
     <p class="mt-2">Color: ${product.color}</p>
     <small class="customSmallText">In Stock</small>
   </div>
 </div>

   <div>
     <h4 class="text-center"><i class="bi bi-bar-chart"></i> Specifications</h4>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
     <ul>
    <li><strong>Dimensions:</strong> 10" x 5" x 3"</li>
    <li><strong>Weight:</strong> 1.5 lbs</li>
    <li><strong>Material:</strong> High-quality plastic</li>
    <li><strong>Recommended Age:</strong> 3 years and up</li>
    </li>
    <li><strong>Warranty:</strong> 1-year limited warranty</li>
  </ul>
   </div>
 </section>
`;

   // Update the content of the modal body with the new modalContent
   document.getElementById("productDetails").innerHTML = modalContent;

   // Show the modal
   $('#productModal').modal('show');
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

    //select button by looking for addToCartBtn class & a stored data-product name that
    //matches the stored productName variable.
    const clickedButton = document.querySelector(
      `.addToCartBtn[data-product-name="${productName}"]`
    );

    //add animation to selected button if querySelector found it
    if (clickedButton) {
      clickedButton.classList.add("addedToCartShake");

      //remove the class so next time this button is clicked it shakes again
      setTimeout(() => {
        clickedButton.classList.remove("addedToCartShake");
      }, 500); //remove after .5s
    }
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
          <p class="mt-2 fw-bold">Price: $${product.Price}</p>
          <button class="addToCartBtn btn btn-primary mt-2" data-product-name="${product.Name}" data-product-price="${product.Price}"><i class="bi bi-cart"></i> Add to Cart</button>
          <button class="btn btn-primary mt-2 viewDetailsBtn" data-bs-toggle="modal" data-bs-target="#productModal" data-product-name="${product.Name}"><i class="bi bi-file-bar-graph"></i> View Details</button>
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
//render
createProductCards(productList);
