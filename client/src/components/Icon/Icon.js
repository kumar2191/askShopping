import React from "react";

function Icon(props){
    return(
        <i className={props.className} id={props.id} onMouseOver={props.onMouseOver} />
    )
}
 export default Icon;