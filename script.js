const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seats:not(.occupied)');
const movieName = document.getElementById('movieName');
const NoOfSeats = document.getElementById('NoOfSeats');
const price = document.getElementById('price');

populateUI();

let moviePrice = +movieName.value;

function changeSeatsAndPrice(){
    selectedSeats = document.querySelectorAll('.row .seats.selected');
    const num = selectedSeats.length;
    NoOfSeats.innerText = num;
    price.innerText = num*moviePrice;
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
}

function storeMovieIndexAndPrice(movieIndex,PriceOfMovie){
    localStorage.setItem('movieIndex',movieIndex);
    localStorage.setItem('moviePrice',PriceOfMovie);
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const movieIndex = localStorage.getItem('movieIndex');
    if (movieIndex !== null) {
        movieName.selectedIndex = movieIndex;
    }
}

movieName.addEventListener('change',(e) =>{
    moviePrice = +e.target.value;
    changeSeatsAndPrice();
    storeMovieIndexAndPrice(e.target.selectedIndex,e.target.value);
})

container.addEventListener('click',(e) => {
    if (e.target.classList.contains('seats') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        changeSeatsAndPrice();
    }
})

changeSeatsAndPrice();