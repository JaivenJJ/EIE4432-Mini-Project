function formatDate(date) {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const inThreeDays = new Date(today);
    inThreeDays.setDate(today.getDate() + 3);

    document.getElementById('today-link').textContent = formatDate(today);
    document.getElementById('tomorrow-link').textContent = formatDate(tomorrow);
    document.getElementById('day-after-tomorrow-link').textContent = formatDate(dayAfterTomorrow);
    document.getElementById('in-three-days-link').textContent = formatDate(inThreeDays);

    document.querySelectorAll('.date-slot').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.date-slot').forEach(item => {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    document.querySelectorAll('.time-slot').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(item => {
                item.classList.remove('selected');
            });
            this.classList.add('selected');

            // Get selected time and date
            const selectedDate = document.querySelector('.date-slot.selected').textContent;
            const selectedTime = this.textContent;
            const movieTitle = document.querySelector('.movie-title').textContent;
            const moviePoster = document.querySelector('.movie-poster').src;

            // Redirect to seats.html with URL parameters
            window.location.href = `../seats.html?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}&title=${encodeURIComponent(movieTitle)}&poster=${encodeURIComponent(moviePoster)}`;
        });
    });
});