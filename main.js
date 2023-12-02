//get container from html
const productContainer = document.getElementById("productCardsContainer");
//Products stored as objects in array
const productList = [
  {
    Name: "A9",
    Description: "Description for A9",
    Price: 12.99,
    smallThumbnail: "./images/A9_small.jpg",
    largeThumbnail: "./images/A9_large.jpg",
  },
  // {
  //     Name: "A9S",
  //     Description: "Description for A9S",
  //     Price: 15.99,
  //     smallThumbnail: "./images/A9S_small.jpg",
  //     largeThumbnail: "./images/A9S_large.jpg"
  // },
  {
    Name: "C9",
    Description: "Description for C9",
    Price: 25.99,
    smallThumbnail: "./images/C9_small.jpg",
    largeThumbnail: "./images/C9_large.jpg",
  },
  // {
  //     Name: "C9S",
  //     Description: "Description for C9S",
  //     Price: 29.99,
  //     smallThumbnail: "./images/C9S_small.jpg",
  //     largeThumbnail: "./images/C9S_large.jpg"
  // },
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
  // {
  //     Name: "S9R",
  //     Description: "Description for S9R",
  //     Price: 34.99,
  //     smallThumbnail: "./images/S9R_small.jpg",
  //     largeThumbnail: "./images/S9R_large.jpg"
  // },
  // {
  //     Name: "T9",
  //     Description: "Description for T9",
  //     Price: 27.99,
  //     smallThumbnail: "./images/T9_small.jpg",
  //     largeThumbnail: "./images/T9_large.jpg"
  // },
  // {
  //     Name: "X9",
  //     Description: "Description for X9",
  //     Price: 39.99,
  //     smallThumbnail: "./images/X9_small.jpg",
  //     largeThumbnail: "./images/X9_large.jpg"
  // },
  // {
  //     Name: "X9X",
  //     Description: "Description for X9X",
  //     Price: 42.99,
  //     smallThumbnail: "./images/X9X_small.jpg",
  //     largeThumbnail: "./images/X9X_large.jpg"
  // },
];
//generate productCards to display in product section
function createProductCards(products) {
  return products
    .map((product) => {
      return `
        <article class="productCard col-md-6 mt-4">
        <div class="productHeader">
            <h3>${product.Name}</h3>
            <img src="${product.smallThumbnail}" alt="${product.Name}" class="img-fluid" />
            <p>Price: $${product.Price}</p>
            <button onclick="addToCart('${product.Name}')">Add to Cart</button>
            <button onclick="viewDetails('${product.Name}')">View Details</button>
        </div>
    </article>
        `;
    })
    .join(""); /*.join removes the loose commas displaying in product cards 
  By concatenating all HTML strings returned by createProductCards into a single string*/
}
// Display cards
productContainer.innerHTML = createProductCards(productList);

//view Details function

//Listen for details click

//open window with details for that car loaded with JS same as above different styles, different data

//add to cart button

//add selectedProduct to cart array. 

//display cart array items on cart.html

//allow deletion of items on cart.html

//fake checkout
