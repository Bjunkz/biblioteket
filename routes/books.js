var express = require('express');
var router = express.Router();

let books = [{title: "Pippi", author: "Astrid Lindgren", year: 1956, rented: false},
{title: "The art of war", author: "Sun zi", year: 300, rented: false},
{title: "Bible", author: "Jesus", year: 0, rented: false},
{title: "Pippi", author: "Astrid Lindgren", year: 1956, rented: false}]


/* GET home page. */
router.get('/', function(req, res, next) {

    let welcome = `<h1>Welcome to Björns Library</h1>`
    let freeBooks = "";

    for (book in books){
      console.log(books[book])
        freeBooks += `<div> <a href="/books/${books[book].title}">${books[book].title} </a> <a href="">${books[book].rented ? "borrowed":"available"} </a>`
    }

    res.send(welcome + freeBooks + `<br><a href="/books/add">Add books</a>`);
  });

router.get('/add', function(req, res, next) {

    let addBook = `
                <form action="/books/add" method="post">
                <div><input type="text" name="title">Book title</div>
                <div><input type="text" name="author">Author</div>
                <div><input type="text" name="year">Release year</div>
                <button type="submit">add book</button>
                
                `;
    res.send(addBook);
  });

  router.get('/:bookname', function(req, res, next) {

    let currentBook = req.params.bookname;
    let bookInfo = books.find(el => el.title === currentBook)

    res.send(`<h1>a book about...${bookInfo.author} published year ${bookInfo.year}</h1>
              <a href="/books"><button>back</button></a>`);
  });



  router.post('/add', function(req, res){
      console.log(req.body)

      let newBook = { title: req.body.title, author: req.body.author, year: req.body.year }
      books.push(newBook)

      res.redirect('/books')

  });

module.exports = router;
