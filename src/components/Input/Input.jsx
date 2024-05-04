import React from "react"
import './Input.css'

function Input(props){
    return(
        <input 
        type={props.type}
        name={props.value}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}/>
    )
}

export default Input