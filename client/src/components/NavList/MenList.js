import React from "react";
import Cards from '../Card/Card';
// import Card from '../Card/Card2';
import './men.css';
function Men(props){
    const names = ['T-Shirts','Formal Shirts','Casual Shirts','SweatShirts','Sweaters'];

      var list = names.map(x => <li>{x}</li>)

      var list2 = ["Elax", "Naveen", "logesh", "Ashok", "Arun", "Keerthana"].map(x => (<li>{x}</li>));
        
    return (
      <div
        className="menDropdown"
      >
        <Cards
          heading1="Top Wears"
          heading2="Bottom Wears"
          heading3="Foot Wears"
          heading4="Innerwear & sleepwear"
          heading5="Sports & Active wear"
          heading6="TopWears"
          heading7="TopWears"
          heading8="TopWears"
          list1={list}
          list2={list}
          list3={list}
          list4={list}
          list5={list2}
          list6={list2}
          list7={list2}
          list8={list2}
          class="List"
        />
      </div>
    );
}

export default Men;