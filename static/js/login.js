document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  loginButton.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
      console.log('Attempting to login with username:', username);
      
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Login response status:', response.status);
      console.log('Login response:', response);
      
      const result = await response.json();
      console.log('Login result:', result);
      
      if (response.ok) {
        alert(`Logged as \`${result.user.username}\` (${result.user.role})`);
        window.location.href = '/index.html'; // Redirect on success
      } else {
        alert(result.message || 'Unknown error');
      }
    } catch (error) {
      alert('Unknown error');
      console.error('Error during login:', error);
    }
  });
});