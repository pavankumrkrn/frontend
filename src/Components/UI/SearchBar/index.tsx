import { SearchOutlined } from '@mui/icons-material'
import React, { useCallback, useEffect, useState } from 'react'
import './index.css'
import { SearchBarProps } from '../../../Interfaces/interfaces';

const SearchBar = ({
  callBackFunction
}:SearchBarProps) => {

  const [search, setsearch] = useState('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  }
  const handleSearch = useCallback(() => {
    callBackFunction(search)
  },[search]);

  useEffect(() => {
    
  }, [handleSearch])
  return (
    <div className="search_bar_wrapper">
      <SearchOutlined/>
      <input type="text" value={search} onChange={handleOnChange} />
    </div>
  )
}

export default SearchBar
