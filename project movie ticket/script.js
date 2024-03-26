/*
Step 1: Get reference to DOM elements
*/ 
//Get reference to the main container.
const container = document.querySelector(".container");
//Reference of all available seats.
const seats = document.querySelectorAll(".row .seat:not(.sold)");
//Reference of count and total elements.
const count = document.getElementById("count");
const total = document.getElementById("total");

//Reference of the movie dropdown.
const movieSelect = document.getElementById("movie");

// console.log(ticketPrice);

/*
Step 2: Adding event listener.
*/ 
//event listener for movieselection change.

/*movie change krne ke liye*/ 
movieSelect.addEventListener("change", e => {
//update ticketprice and store selected movie data.
  ticketPrice = +e.target.value;
  // console.log(ticketPrice)
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();//update displayed count and total.
})

//Event listerner for seats clicks.
container.addEventListener("click", e => {
//check if a seat is clicked and not sold
if (
  e.target.classList.contains("seat") &&
  !e.target.classList.contains("sold")
) {
  //toggle seat selection.
  e.target.classList.toggle("selected");
  //update displayed count and total
  updateSelectedCount();//update displayed count and total.
}
});
/*
Step 3:define function to update selected count and total.
*/
function updateSelectedCount() {
  //get all selected seats.
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
// get an array of selected seats index
const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
// console.log(seatsIndex)
//store selected seat index into local storage .
localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));
//calculate selected seats and count.
const selectedSeatsCounts = selectedSeats.length;

//update UI with selected seats count and total price.
count.innerText = selectedSeatsCounts;
total.innerText = selectedSeatsCounts * ticketPrice;
// console.log(total.innerTEXT)
// console.log(count.innerText)
setMovieData(movieSelect.selectedIndex,movieSelect.value);
}

/*
Step 4: Define function to set selected movie data,in local storage.
*/ 
function setMovieData(movieIndex,moviePrice){
  localStorage.setItem("selectedMovieIndex",movieIndex);
  localStorage.setItem("selectedMoviePrice",moviePrice);
}

/*
Step 5: define function to populate UI with local storage data.
*/
//function to populate ui from local storage data.
function populateUI() {
  //Get selected seats from local storage.
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  // console.log(selectedSeats);
// if there are are selected seats ,mark them as selected in the UI.
  if(selectedSeats!=null && selectedSeats.length>0){
    seats.forEach((seat,index)=>{
      if(selectedSeats.indexOf(index)>-1){
        seat.classList.add("selected");
      }
    })
  }
  //get selected movie data from local storage.
  const selectedMovieIndex=localStorage.getItem("selectedMovieIndex");
  //if there's a selected movie index,then set it in the dropdown.
  if (selectedMovieIndex!=null){
    movieSelect.selectedIndex=selectedMovieIndex;
  }
}
populateUI();
//Initialise ticket price.
let ticketPrice = +movieSelect.value;
updateSelectedCount();