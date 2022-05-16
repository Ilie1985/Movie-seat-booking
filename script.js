const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
//===============================

//invoke populateUI function
// populateUI();
//=========================

// the bellow "+" changes the type of ticketPrice from a string to a number
let ticketPrice = +movieSelect.value;
// console.log(typeof ticketPrice);
//it ends here
//========================================

//Save selected movie index and price functionality
//localStorage is built into the browser
//setItem is a method that localStorage has access to
//setItem takes in key value pairs
//selectedMovieIndex/Price is the value
//movieIndex/Price is the key
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedmoviePrice", moviePrice);
};
//===========================================

//Update total price and count of seats selected,functionality
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // console.log(selectedSeats); --> //we get a NodeList with all thedives with the class .seat.selected;

  // Copy selected seats into an array
  //Map through array
  //Return a new array indexes
  //with the help of the spread operator we get acces to everything that is in selectedSeats into the bellow array
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //localStorage is built into the browser
  //setItem is a method that localStorage has access to
  //setItem takes in key value pairs
  //selectedSeats is the value
  //seatsIndex is the key
  // i use JSON.stringify to transform seatsIndex in a string
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  //the bellow gives us the length of the NodeList
  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};
//=====================================

//Get data from local storage and populate UI functionality
//extract the data from the local storage with the help of a variable
//getItem is a method that localStorage has access to
//JSON.parse does the oposite of JSON stringify it transforms the item into an array
//parse is a method that JSON has access to
//classList.add is how we add a class
//check if selectedSeats is not null ,if its in local storage
//check if selectedSeats.length is > 0
//seats.forEach means that we`re looping through all the unoccupied seats
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};
populateUI();
//======================================================

//Movie select event listener
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  //to get the index of the selected movie i use e.target.selectedIndex
  // to get the price of each movie i use e.target.value
  // invoke the setMovieData function
  // console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
});
//======================================

// Seat click Event listener
container.addEventListener("click", (e) => {
  // e.target gives us the whole clicked element
  // console.log(e.target);

  //console.log(e.target) means that in the console we get logged only the elements with the class of seat and not the ones with the class of occupied ,when clicked
  //e.target.classList.toggle we can click and unclick a wanted seat
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
//============================

//Initial count and total set
updateSelectedCount()