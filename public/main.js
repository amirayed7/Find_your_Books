const searchButton = document.querySelector('#search-button');
const input = document.querySelector('input');
const deleteButton = document.getElementById('deleteButton');

if (searchButton) {
  searchButton.addEventListener('click', getBooks);
}

if (input) {
  input.addEventListener('keypress', event => {
    if (event.key === 'Enter') getBooks();
  });
}

if (deleteButton) {
    deleteBook()
}

function getBooks() {    
    let book = document.querySelector('input').value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
    .then(res => res.json())
    .then(data => {
        document.querySelector(".information").innerHTML = ''

        data.items.forEach(element => {
            console.log(element.volumeInfo)
            let title = element.volumeInfo.title;
            let image = element.volumeInfo.imageLinks.thumbnail
            let author = element.volumeInfo.authors[0]
            let link = element.volumeInfo.previewLink

            document.querySelector(".information").innerHTML += `
            <div class="info" onclick="location.href='${link}';">
                <h2 id="title">${title}</h2>
                <h3 id="author">By: ${author}</h3>
                <img id="image" src="${image}"/>
                <form action="/bookmark" method="POST">
                    <input type="hidden" name="title" value="${title}">
                    <input type="hidden" name="author" value="${author}">
                    <input type="hidden" name="image" value="${image}">
                    <input type="hidden" name="link" value="${link}">
                    <button id="book-button">bookmark</button>
                </form>
            </div>
            `
        })
    })
}

function deleteBook(){
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
}