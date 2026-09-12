// Backend Logic

const myLibrary = [];

function Book(title, author, pages, comments) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = author;
  this.pages = pages;
  this.addDate = new Date();
  this.status = "new"; // Default value
  this.comments = comments;
}

function addBookToLibrary(title, author, pages, comments) {
  const book = new Book(title, author, pages, comments);
  myLibrary.push(book);
}

// Update DOM with books info
function displayBooks(library, booksContainer) {
  for (const book of library) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

    // Skip display book ID
    for (bookProperty in book) {
      if (bookProperty === "id") {
        continue;
      }

      // Don't create div for empty property
      const value = book[bookProperty];
      if (value === "") {
        continue;
      }

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

// New Book popup
// <form> inside <dialog> witdout send to server
const bookDialog = document.querySelector(".dialog");
const bookInputs = document.querySelectorAll("dialog input, textarea");
const bookForm = document.querySelector("form");
const feedback = document.querySelector(".feedback");
const booksContainer = document.querySelector(".books-container");

displayBooks(myLibrary, booksContainer);

// Close the dialog modal by Esc key
bookDialog.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    feedback.style.display = "none";
    bookDialog.close();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  switch (target.id) {
    case "new-book-btn":
      bookDialog.showModal();
      break;
    case "close-btn":
      feedback.style.display = "none";
      bookDialog.close();
      break;
    case "confirm-btn":
      event.preventDefault();

      const title = bookInputs.item(0).value;

      // Add client-side validation
      if (title === "") {
        feedback.style.display = "block";
        break;
      }

      const author = bookInputs.item(1).value;
      const pages = bookInputs.item(2).value;
      const comments = bookInputs.item(3).value;

      // Add book entries to array and manualy clean the form
      addBookToLibrary(title, author, pages, comments);
      feedback.style.display = "none";
      bookForm.reset();
      bookDialog.close();
      displayBooks(myLibrary, booksContainer);
      break;
  }
});
