// Sign up form handler
async function signupFormHandler(event) {
  event.preventDefault();

  // get the info from sign up form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();


  if (username && email && password) {
      // POST new user to user table
      const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
              username,
              email,
              password
          }),
          headers: {'Content-Type': 'application/json'}
      });
    
      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText)
      }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

