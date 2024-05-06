import React from "react"
import './Input.css'

function Input(props){
    return(
        <div>
            <p>{props.label}</p>
            <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.className}/>
        </div>
    )
}

export default Input