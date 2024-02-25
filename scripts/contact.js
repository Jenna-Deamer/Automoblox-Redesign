function validateForm(){
    //get fields
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    //check if fields are empty
    if (firstName === '' || lastName === '' || email === '' || message === '' ){
        alert('Error: All fields must be filled out');
        return false; //prevent form submission
    }
    return true; //allow form submission
};