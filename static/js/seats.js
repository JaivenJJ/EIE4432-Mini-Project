const MAX_SEATS = 5; // Maximum number of seats a user can select
let selectedSeats = [];

// Event listener for seat selection
document.querySelectorAll('.seat').forEach(button => {
    button.addEventListener('click', function() {
        const seatId = `${this.getAttribute('data-row')}${this.getAttribute('data-seat')}`;

        if (this.classList.contains('selected')) {
            // Deselect the seat
            this.classList.remove('selected');
            selectedSeats = selectedSeats.filter(seat => seat !== seatId);
        } else {
            // Check if the user can select more seats
            if (selectedSeats.length < MAX_SEATS) {
                this.classList.add('selected');
                selectedSeats.push(seatId);
            } else {
                alert(`You can only select up to ${MAX_SEATS} seats.`);
            }
        }
    });
});

// Event listener for the Buy Ticket button
document.querySelector('.button-BUY').addEventListener('click', function() {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat before proceeding to payment.');
        return; // Exit if no seats are selected
    }

    const totalPrice = selectedSeats.length * 10; // Assuming each seat costs $10
    const params = new URLSearchParams({
        seats: selectedSeats.join(','),
        total: totalPrice
    });

    window.location.href = `pay.html?${params.toString()}`;
});