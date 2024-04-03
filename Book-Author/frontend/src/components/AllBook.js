import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addBook');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleEdit = (bookId) => {
    console.log('Edit book with ID:', bookId);
    navigate('/updateBook')
    console.log('Edit book with ID:', bookId);
  };

  const handleDelete = (bookId) => {
    // try {

    console.log(bookId)
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `http://localhost:5000/deleteBook/${bookId}`)
      xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
            console.log("Hello")
          }
        }
        else{
          console.log("Error", xhr.statusText)
        }
      };
      xhr.send(AllBook);
    //   const response = await axios.delete(`http://localhost:5000/deleteBook/${bookId}`);
    //   if (response.status === 200) {
    //     console.log('Book deleted successfully');
    //     // After deletion, fetch updated book list
    //     fetchBooks();
    //   } else {
    //     console.error('Failed to delete book. Status:', response.status);
    //   }
    // } catch (error) {
    //   console.error('Error deleting book:', error);
    // }
  };
  
  

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/allBooks?page=${page}&pageSize=${pageSize}`);
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, pageSize]);

  return (
    <div className="container-fluid mt-5 mt-0">
      <h2 className='text-center text-info'>Books</h2>
      <div className='col text-center'>
      <button className="btn btn-outline-info btn-sm text-center" type="button" onClick={handleClick}>Add Book</button>
      <button className="btn btn-outline-info btn-sm mx-4" type="button" onClick={handleSearch}>Search Book</button>
      </div>
      <table className="table table-hover table-sm ">
        <thead>
          <tr className='bg-primary'>
            <th>Book ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Published Year</th>
            <th>Quantity Available</th>
            <th>Author Name</th>
            <th>Genre ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider border-info">
          {Array.isArray(books) && books.map((book, index) => (
            <tr key={index}>
              <td>{book.book_id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.published_year}</td>
              <td>{book.quantity_available}</td>
              <td>{book.author_name}</td>
              <td>{book.genre_id}</td>
              <td>
                <button className="btn btn-outline-info btn-sm" onClick={() => handleEdit(book.book_id)}>Edit</button>
              </td>
              <td>
              <button className="btn btn-outline-info btn-sm" onClick={() => handleDelete(book.book_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-center'>
      <button className="btn btn-outline-info btn-sm" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
      <span className="mx-2">Page {page}</span>
      <button className="btn btn-outline-info btn-sm" type="button" onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default AllBook;
