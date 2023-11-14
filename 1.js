const backdrop = document.getElementById('backdrop')
const gridLibrary = document.getElementById('grid-library');
const myLibrary = [];
const popUp = document.getElementById('pop-up');
const addButton = document.getElementById('add-button');
const submitButton = document.getElementById('submit-button');
function Book(title,author,pages,readYet) {
     this.title = title;
     this.author = author;
     this.pages = pages;
     this.readYet = readYet;
}


function togglePopUp() {
  popUp.classList.toggle('display'); 
}
function addBookToLibrary() {  
  const title  =document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages =  document.getElementById('pages-input').value;
  const readYet= document.getElementById('readYet-input').checked ? true : false;
   const book = new Book(title,author,pages,readYet); 

   myLibrary.push(book);
}


addButton.addEventListener('click',() => {  
  togglePopUp();  
  backdrop.style.display = 'block';
});
submitButton.addEventListener('click', (event) =>{ // after click not thing happen
 event.preventDefault();
   togglePopUp();
   backdrop.style.display = 'none';
   
  addBookToLibrary();
  const newIndex = myLibrary.length - 1;

  createCard(myLibrary[newIndex], newIndex) // how to get index link with the card in here
})



function createCard(book,index) { 
    const card = document.createElement('div');
     card.dataset.index = index;
     const cardIdex = card.dataset.index;
    card.classList.add('card');
    const status =  book.readYet ? "Have already read" : "Haven't read"
    card.innerHTML = ` <header>${book.title}</header>
    <main>
        <div>Name: ${book.title}  </div>
      <div>Author: ${book.author} </div>
      <div>Pages:  ${book.pages}</div>
    </main>`;
    
    if (book.readYet) {
      card.innerHTML  +=  `   <button class=" yesStatus status-button"> ${status}</button> 
      <button class="delete-button" > Delete</button> `;

    } else if(!book.readYet) {
      card.innerHTML +=   `   <button class=" noStatus status-button"> ${status}</button> 
      <button class="delete-button" > Delete</button> `;

    }

          
        
      gridLibrary.appendChild(card);
}








const readButton = document.getElementsByClassName ('status-button');
const deleteButton = document.getElementsByClassName('delete-button')



Book.prototype.toggleReadStatus = function() {
 this.readYet = !this.readYet; 
};
function updateStatusButton(button, book) {
  if (book.readYet) {
    button.innerHTML = 'Have already read';
    button.classList.add('yesStatus');
    button.classList.remove('noStatus');
  } else {
    button.innerHTML = "Haven't read";
    button.classList.add('noStatus');
    button.classList.remove('yesStatus');
  }
}


gridLibrary.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (card) {
    const cardIndex = card.dataset.index;
    const book = myLibrary[cardIndex];

    if (event.target.classList.contains('status-button')) {
      // Toggle the read status
      book.toggleReadStatus();

      // Update the status button appearance
      updateStatusButton(event.target, book);
    }

    if (event.target.classList.contains('delete-button')) {
      // Remove the card from the library and the DOM
      myLibrary.splice(cardIndex, 1);
      card.remove();
    }
  }
});

