$(document).ready(function() {
    $('#ticketingBtn').addClass('active');

    $('#ticketingBtn').click(function() {
        $('#moviePosters').show();
        $('#comingSoonPosters').hide();
        $('.btn').removeClass('active');
        $(this).addClass('active'); 
    });

    $('#comingSoonBtn').click(function() {
        $('#comingSoonPosters').show();
        $('#moviePosters').hide();
        $('.btn').removeClass('active');
        $(this).addClass('active'); 
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/auth/me', {
            method: 'GET',
            credentials: 'include' // Important for sending cookies with the request
        });
        
        console.log('Response from /auth/me:', response);

        if (!response.ok) {
            const errorMessage = await response.text(); // Get error details
            console.error('Failed to fetch user info:', errorMessage);
            alert('Please login to use our website. Thanks.');
            window.open('/login.html', '_self');
            return;
        }

        const result = await response.json();
        console.log('User info fetched successfully:', result);
/*
        const greetingElement = document.getElementById('greeting');
        greetingElement.innerText = `Welcome back! ${result.user.username} (${result.user.role})`;
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', () => {
            const confirmLogout = confirm('Confirm to logout?');
            if (confirmLogout) {
                fetch('/auth/logout', {
                    method: 'POST',
                    credentials: 'include' // Include credentials for logout as well
                })
                .then(() => {
                    window.open('/login.html', '_self'); // Redirect to login page after logout
                })
                .catch((error) => {
                    alert('Error during logout. Please try again.');
                    console.error('Logout error:', error);
                });
            }
        });*/
    } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Please login');
        window.open('/login.html', '_self');
    }
});
