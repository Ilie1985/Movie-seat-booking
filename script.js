const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// the bellow "+" changes the type of ticketPrice from a string to a number
let ticketPrice = +movieSelect.value;
console.log(typeof ticketPrice);
//it ends here

//Update total price and count of seats selected,functionality
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  console.log(selectedSeats); //we get a NodeList with all thedives with the class .seat.selected;

  //the bellow gives us the length of the NodeList
  const selectedSeatsCount = selectedSeats.length;
  console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

//Movie select event listener
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click Event listener
container.addEventListener("click", (e) => {
  // e.target gives us the whole clicked element
  // console.log(e.target);

  //the bellow means that in the console we get logged only the elements with the class of seat and not the ones with the class of occupied ,when clicked
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
    //it ends here
  ) {
    console.log(e.target);
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
