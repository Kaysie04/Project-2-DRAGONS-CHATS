async function deleteFormHandler(event) {
    event.preventDefault();

   // Get the user name, user id, email, and password from the form
   let username = document.querySelector('input[name="user-name"]').value.trim();
   if(username.length) username = '"username": "' + username + '"';
   let email = document.querySelector('input[name="email"]').value.trim();
   if(email.length) email = '"email": "' + email + '"';
   let password = document.querySelector('input[name="password"]').value.trim();
   if (!password.length) {
       alert('You must enter your current password to confirm changes or enter a new password.');
       return
   } else {
       password = '"password": "' + password + '"';
   }
   const id = document.querySelector('input[name="user-id"]').value;


   let userUpdate = '{' + [username, email, password].filter(value => value).join(',') + '}';
   // Create the JSON parsed object
   userUpdate = JSON.parse(userUpdate)


    // use the delete route to delete the post
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(userUpdate),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    // if the delete action is successful, redirect to the login page, otherwise display the error
    if (response.ok) {
        document.location.replace('/');
        // display the error
        } else {
        alert(response.statusText);
        }

  }
  
  document.querySelector('.delete-user-form').addEventListener('submit', deleteFormHandler);