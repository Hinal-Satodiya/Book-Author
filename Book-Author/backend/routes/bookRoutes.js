const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

const { getAllBooks, addBook, updateBoook, deleteBook } = require("../controller/bookController");
const express = require('express');
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin } = require("../controller/loginController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

//login
router.post('/login',checkLogin)

//all user
router.get('/allBooks' ,getAllBooks)

//add book
router.post('/addBook',addBook)

//update book 
router.put('/updateBook/:id',updateBoook)

//delete book
router.delete('/deleteBook/:id',deleteBook)

//get all authors
router.get('/allAuthors', getAllAuthors)

//add author
router.post('/addAuthor', verifyToken,addAuthor) 

//update author
router.put('/updateAuthor/:id',verifyToken,updateAuthor)

//delete author
router.delete('/deleteAuthor/:id',verifyToken,deleteAuthor)

//search
router.get('/search',searchBooksAndAuthors)

module.exports = router;