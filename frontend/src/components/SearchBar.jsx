import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (e) => {
          setSearchQuery(e.target.value)
    }

    const handleSearch = () => {
        fetch(`/api/users/search?query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
            setSearchResults(data)
            setShowResults(true)
            setSearchQuery('')
            // console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSearchClick = () => {
        setShowResults(false)
    }
  return (
    <Container>
    <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
             
       {showResults && (      
        <ul>
        {searchResults.map((user) => (
          <li key={user._id}>
          <Link to={`/profile/${user._id}`} onClick={handleSearchClick}>{user.name}</Link>
          </li>
        ))}
      </ul>  
      )}
    </div>
    </Container>
  )
}


const Container =  styled.div`
    input{
        border-radius: .5rem;
        margin: 0 5px;
        padding: 5px;
    }
    button{
        border-radius: .5rem;
        padding: 7px;
        background-color:#3f97a6 ;
        border: none;
        color: #fff;
    }
`
export default SearchBar
