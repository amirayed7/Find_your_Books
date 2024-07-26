document.querySelectorAll(".deleteButton").forEach(button => {
  button.addEventListener('click', () => {
    const _id = button.dataset.id;
    console.log(_id);
    fetch("/bookmark", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: _id })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      location.reload()
    })
    .catch(error => {
      console.error(error);
    });
  });
});