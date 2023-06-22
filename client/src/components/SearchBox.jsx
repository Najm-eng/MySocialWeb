import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3001/users/search?query=${encodeURIComponent(query)}`
      );
      const users = response.data;

      if (users.length > 0) {
        navigate(`/profile/${users[0]._id}`);
      } else {
        console.log('No results found.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="d-flex me-auto" onSubmit={submitHandler}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InputBase
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          aria-label="Search Users"
          aria-describedby="button-search"
        />
        <Button
          variant=""
          color="primary"
          type="submit"
          id="button-search"
        >
          <i className="fas fa-search"></i>
        </Button>
      </Box>
    </form>
  );
};

export default SearchBox;
