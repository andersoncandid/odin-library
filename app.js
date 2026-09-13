const myLibrary = [];

function Book(title, author, pages, comments) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = author;
  this.pages = pages;
  this.addDate = new Date();
  this.status = "New"; // Default value
  this.comments = comments;
}

function addBookToLibrary(title, author, pages, comments) {
  const book = new Book(title, author, pages, comments);
  myLibrary.push(book);
}

// Buttons for edit book
function createBookButtons(bookCard) {
  const container = document.createElement("div");
  container.classList.add("book-buttons");

  const statusButton = document.createElement("button");
  statusButton.id = "status-book-btn";
  statusButton.dataset.command = "update";
  statusButton.innerText = "Read ☑";
  container.appendChild(statusButton);

  const removeButton = document.createElement("button");
  removeButton.id = "remove-book-btn";
  removeButton.dataset.command = "remove";
  removeButton.innerText = "Remove 🗑";
  container.appendChild(removeButton);

  bookCard.appendChild(container);
}

// Remove or modify status of a book
function modifyBook(command, bookId, library) {
  for (const book of library) {
    if (book.id === bookId) {
      const bookIndex = library.indexOf(book);

      // only modify library when item is found
      if (bookIndex > -1) {
        switch (command) {
          case "remove":
            library.splice(bookIndex, 1);
            break;
          case "update":
            book.status = "Read";
            break;
        }
      }
    }
  }
}

// Update DOM with books info
function displayBooks(library, booksContainer) {
  // First clean books display
  booksContainer.replaceChildren();

  for (const book of library) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    // Skip display book ID
    for (bookProperty in book) {
      const value = book[bookProperty];

      // Added id to book card
      if (bookProperty === "id") {
        bookCard.id = value;
        continue;
      }

      // Don't create div for empty property
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
    createBookButtons(bookCard);
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

// Events of all buttons
document.addEventListener("click", (event) => {
  const target = event.target;

  // Modify the target book in the array
  if (target.parentElement.className === "book-buttons") {
    const bookId = target.closest(".book").id;
    const command = target.dataset.command;
    modifyBook(command, bookId, myLibrary);
  }

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
      break;
  }
  displayBooks(myLibrary, booksContainer);
});
