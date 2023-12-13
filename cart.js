//container from cart.html
const cartContainer = document.getElementById("cartContainer");
//Cart Sum holder
const cartSum = document.getElementById("cartSum");
//form
const checkoutForm = document.getElementById("checkoutForm");
//form checkoutButton
const checkoutButton = document.getElementById("checkoutBtn");

//footer
const footer = document.querySelector("footer");
/*In order to ensure the footer will always be at the bottom without overlapping content
apply padding-bottom to body based off the footers height. This ensures even if more content is added. the footer
will not overlap */
// Calculate the footer height
const footerHeight = footer.offsetHeight;

// Apply padding to the body equal to the footer height
document.body.style.paddingBottom = footerHeight + "px";

//retrieve cart data from localStorage if it exists
let storedCart = localStorage.getItem("cart");
let cartList = JSON.parse(storedCart) || []; //if no cart is stored, Initialize as empty

/**Checkout Form Validation */
function validateCheckout() {
  //checkout fields
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const cardNum = document.getElementById("cardNum").value;
  const cvv = document.getElementById("cvv").value;
  const expirationMonth = document.getElementById("expMonth").value;
  const expirationYear = document.getElementById("expYear").value;

  // Check if any field is empty
  if (
    firstName === "" ||
    lastName === "" ||
    cardNum === "" ||
    cvv === "" ||
    expirationMonth === "" ||
    expirationYear === ""
  ) {
    alert("All fields must be filled out!");
    return false; //prevents form submission
  }

  alert("Form submitted Successfully your order will not be on the way!");
  return true; //allows form submission
}

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
      <article class="cartItem customBorder mb-2">
      <div class="row">
      
        <div class="col-md-6">
          <h4>${cartItem.Name}</h4>
          <p class="mt-2">Price: $${cartItem.Price}</p>
        </div>

        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <button class="removeBtn" data-index="${index}">X</button>
        </div>
      </div>
    </article>
      `;
    })
    .join(""); //join strings

  cartContainer.innerHTML = cartListHTML;
};

const removeCartItem = (index) => {
  //use index to select the cartItem that needs the animation class applied
  const cartItemToRemove = document.querySelectorAll(".cartItem")[index];
  // Add the animation class to fade out selected item
  cartItemToRemove.classList.add("cartItemRemoved");

  // Wait for the animation to complete before removing item
  cartItemToRemove.addEventListener("animationend", () => {
    // Remove the cartItem from screen. Removing just one will cause the item to re-appear.
    cartItemToRemove.remove();
    // Remove the item from the cartList array
    cartList.splice(index, 1);

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cartList));

    // Update the display every time animation & removal is completed
    displaySum();
    displayCartItems(cartList);
  });
};

//add event listener to parent, then find what child was clicked on
cartContainer.addEventListener("click", function (event) {
  //if child element with removeBtn class is clicked
  if (event.target.classList.contains("removeBtn")) {
    //get the index
    const selectedIndex = event.target.getAttribute("data-index");
    //run remove & pass it the item to be removed
    removeCartItem(selectedIndex);

    // displaySum();
    // //render updated cartList
    // displayCartItems(cartList);
  }
});

//listen for form submission run validation
checkoutForm.addEventListener("submit", function (event) {
  //do not let the form submit, Prevent its normal behavior
  event.preventDefault();
  
  //if function returns true
  if (validateCheckout()) {
    //clear cartList
    cartList = [];
    //update cart & sum display
    displaySum();
    displayCartItems(cartList);
  } else {
    console.log("failed");
  }
});

//render
displayCartItems(cartList);
