import React from 'react';
import {MdSearch} from 'react-icons/md';

const SearchNote =(props)=>{
    return(
       <div className="search-note">
            <MdSearch size="1.2rem"/>
            <input onChange={(event)=>props.handleSearch(event.target.value)} type='text' placeholder='Search here...'/>    
       </div>
    )
}


export default SearchNote;