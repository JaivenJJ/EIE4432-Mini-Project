document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('/auth/me', {
          method: 'GET',
          credentials: 'include',
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to fetch user info:', errorMessage);
          alert('Please login');
          window.open('/login.html', '_self');
          return;
      }

      const result = await response.json();
      const greetingElement = document.getElementById('greeting');
      greetingElement.classList.add('greeting', 'bg-secondary'); // Add Bootstrap background class
      greetingElement.innerHTML = `Welcome back, <strong>${result.user.username}</strong>! You are logged in as <em>${result.user.role}</em>.`;

      const logoutButton = document.getElementById('logoutButton');
      logoutButton.addEventListener('click', () => {
          const confirmLogout = confirm('Confirm to logout?');
          if (confirmLogout) {
              fetch('/auth/logout', {
                  method: 'POST',
                  credentials: 'include',
              })
              .then(() => {
                  window.open('/login.html', '_self');
              })
              .catch((error) => {
                  alert('Error during logout. Please try again.');
                  console.error('Logout error:', error);
              });
          }
      });
  } catch (error) {
      console.error('Error fetching user info:', error);
      alert('Please login');
      window.open('/login.html', '_self');
  }
});
  