// Backend Logic

const myLibrary = [];

function Book(title, author, pages, comments) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = author;
  this.pages = pages;
  this.comments = comments;
  this.addDate = new Date();
  this.status = "new"; // Default value
}

function addBookToLibrary(title, author, pages, comments) {
  const book = new Book(title, author, pages, comments);
  myLibrary.push(book);
}

// Update DOM with books info
function displayBooks(library, booksContainer) {
  for (const book of library) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    // Book info
    for (bookProperty in book) {
      if (bookProperty === "id") {
        continue;
      }

      const value = book[bookProperty];
      const bookInfo = document.createElement("div");
      bookInfo.classList.add(bookProperty);

      if (bookProperty === "pages") {
        bookInfo.textContent = `${value} pages`;
      } else if (bookProperty === "addDate") {
        bookInfo.textContent = `Add date: ${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`;
      } else if (bookProperty === "status") {
        bookInfo.textContent = `Status: ${value}`;
      } else {
        bookInfo.textContent = value;
      }
      bookCard.appendChild(bookInfo);
    }
    booksContainer.appendChild(bookCard);
  }
}

// New book dialog
const newBookButton = document.getElementById("new-book");
const bookDialog = document.querySelector(".dialog");
const confirmButton = document.getElementById("confirmBtn");
const closeButton = document.getElementById("close");

newBookButton.addEventListener("click", () => {
  bookDialog.showModal();
});

closeButton.addeventlistener("click", (event) => {
  event.preventdefault();
  bookDialog.close();
});

// Get input values and add to array
confirmButton.addeventlistener("click", (event) => {
  event.preventdefault();
  const formInput = bookDialog.querySelectorAll("input, textarea");

  const title = formInput.item(0).value;
  const author = formInput.item(1).value;
  const pages = formInput.item(2).value;
  const comments = formInput.item(3).value;

  addBookToLibrary(title, author, pages, comments);
});

// addBookToLibrary("Grande Sertão", "Guimarães Rosa", 700);
// addBookToLibrary("Elric Saga", "M. Murcook", 450);
// addBookToLibrary("Volta ao Mundo em 80 Dias", "Julio Verne", 450);
//
// const booksContainer = document.querySelector(".books-container");
// displayBooks(myLibrary, booksContainer);
