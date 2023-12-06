//container from cart.html
const cartContainer = document.getElementById("cartContainer");
//Cart Sum holder
const cartSum = document.getElementById("cartSum");

//retrieve cart data from localStorage if it exists
const storedCart = localStorage.getItem("cart");
const cartList = JSON.parse(storedCart) || []; //if no cart is stored, Initialize as empty

const displaySum = () => {
    let sum = 0;
  //loop through cartList
  cartList.forEach((cartItem) => {
    //add each cartList Item's price to sum.
    sum += parseFloat(cartItem.Price); //takes string & convert into a floating Num.
    
  });
  //display sum in cart.html
  cartSum.innerHTML = "Total $" + sum.toFixed(2);
};

//Display cartItems
const displayCartItems = (cartItems) => {
    displaySum();
  //loop through & create HTML for each cartItem
  //as each btn is generated, set data attribute to the cartItem index.
  //Having the index makes it easier to remove the selected item from the array.
  const cartListHTML = cartItems
    .map((cartItem, index) => {
      return `
        <article class="cartItem">
        <div class="row">

        <div class="col-md-6">
        <h4>${cartItem.Name}</h4>
        </div>

        <div class="col-md-6">
        <button class="btn btn-danger removeBtn" data-index"${index}">X</button>
        </div>
        </div>
       
        <p class="mt-2">Price: $${cartItem.Price}</p>
        </div>
        </article>
      `;
    })
    .join(""); //join strings

  cartContainer.innerHTML = cartListHTML;
};

const removeCartItem = (index) => {
  //splice out of array
  cartList.splice(index, 1);

  //update local storage
  localStorage.setItem("cart", JSON.stringify(cartList));
};

//add event listener to parent, then find what child was clicked on .
cartContainer.addEventListener("click", function (event) {
  //if child element with removeBtn class is clicked
  if (event.target.classList.contains("removeBtn")) {
    //get the index
    const selectedIndex = event.target.getAttribute("data-index");
    //run remove & pass it the item to be removed
    removeCartItem(selectedIndex);

    displaySum();
    //render updated cartList
    displayCartItems(cartList);
  }
});

//render
displayCartItems(cartList);
