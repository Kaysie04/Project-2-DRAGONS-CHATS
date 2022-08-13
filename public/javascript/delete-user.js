async function deleteFormHandler(event) {

    event.preventDefault();

    // use the delete route to delete user
    const id = document.querySelector('input[name="user-id"]').value;
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        // body: JSON.stringify(userUpdate),
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