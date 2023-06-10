const genreCheckboxes = document.getElementById('genre-checkboxes');
const genreCheckboxes12 = document.getElementById('genre-checkboxes');
      bookList = document.getElementById('book-list');
      sortSelect = document.getElementById('sort-select');

// Функция для обновления списка книг
function updateBookList() {
  // Получаем выбранные жанры
  const selectedGenres1 = Array.from(genreCheckboxes.querySelectorAll("input[type='checkbox']:checked")).map(input => input.value);
  
  // Получаем выбранный тип сортировки
  const sortType = sortSelect.value;

   // Получаем отфильтрованный и отсортированный список книг
  let filteredAndSortedBooks;

  if (selectedGenres1.length === 0 && sortType === "non-sorting") {
    filteredAndSortedBooks = books;
  }else{
      // Получаем отфильтрованный и отсортированный список книг
      filteredAndSortedBooks = books.filter(book => selectedGenres1.includes(book.genre)).sort((a, b) => {
        if (sortType === "title-up") {
          return parseFloat(a.popularity) - parseFloat(b.popularity);
        } else if (sortType === "title-desc") {
          return parseFloat(b.popularity) - parseFloat(a.popularity);
        } else {
          return 0;
        }
      });
  }
  
  // Очищаем список книг
  bookList.innerHTML = "";
  
  // Добавляем книги в список
  filteredAndSortedBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `<h3>Название: ${book.title}</h3><p>Автор: ${book.author}</p><p>Жанр: ${book.genre}</p><p>Год издания: ${book.year}</p><p>Издание: ${book.publisher}</p><p>Рейтинг: ${book.popularity}</p>`;
    bookList.appendChild(bookDiv);
  });
}
   
// Функция загрузки жанров и книг
function loadGenresAndBooks() {
  // Получаем список книг с API
  fetch('http://zapretimne.ru:8085/bookslist')
    .then(response => response.json())
    .then(data => {
        books = data;
        updateBookList();
      })
      .catch(error => console.error(error));

      // Загружаем список жанров с API
    fetch('http://zapretimne.ru:8085/genreslist')
      .then(response => response.json())
      .then(genres => {
        // Отображаем список жанров на странице
        genres.forEach(genre => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = 'selectedGenres';
          checkbox.value = genre.genres;
            
          const label = document.createElement('label');
          label.textContent = genre.genres;
          label.addEventListener('click', updateBookList);

          genreCheckboxes12.appendChild(checkbox);
          genreCheckboxes12.appendChild(label);
        });    
      })
      .catch(error => console.error(error));
}
// Загружаем список жанров и книг при загрузке страницы
loadGenresAndBooks();

genreCheckboxes.addEventListener('change', updateBookList);
sortSelect.addEventListener('change', updateBookList);