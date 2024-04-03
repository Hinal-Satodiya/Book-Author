import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllAuthor = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allAuthors');
      setAuthors(response.data.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleEditAuthor = (authorId) => {
    // Implement edit author functionality
    console.log('Edit author with ID:', authorId);
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteAuthor/${authorId}`);
      console.log('Author deleted successfully');
      // After deletion, you may want to refresh the author list by fetching again
      fetchAuthors();
    } catch (error) {
      console.error('Failed to delete author:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Authors</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Author ID</th>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={index}>
              <td>{author.author_id}</td>
              <td>{author.name}</td>
              <td>{author.birth_year}</td>
              <td>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleEditAuthor(author.author_id)}>Edit</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDeleteAuthor(author.author_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAuthor;
