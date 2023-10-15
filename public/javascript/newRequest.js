const newPostHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#newposttext').value.trim();

//need to change this for requests
  if (text) {
    console.log("posted")
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({text}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

   if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create post');
    }
  }
};

document.querySelector('#postSub').addEventListener('click', newPostHandler);