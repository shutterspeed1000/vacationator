const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/admin');
      } else {
        alert('Failed to delete user');
      }
    }
  };

  document
  .querySelector('.delete_user')
  .addEventListener('click', delButtonHandler);