import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const { users } = location.state || {};

  return (
    <div>
      <h1>Search Results</h1>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              {/* Display only the name */}
              <p>{`${user.firstName} ${user.lastName}`}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
