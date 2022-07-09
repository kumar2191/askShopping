import React from "react";
import "./nav.css";
import {Input} from 'reactstrap';
function SearchBar() {
  return (
    <div className="searchBar">
      <Input className="search-bar" 
      type="text" 
      name="text" 
      id="exampleText" 
      placeholder="Search for products, brands and more"
       />
    </div>
  );
}
export default SearchBar;
