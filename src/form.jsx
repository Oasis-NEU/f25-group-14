import React from "react";
import "./form.css";

function Form(props){
    // let clicked = true;
    return (
        <form className = "input-field">
            <input type = "text" placeholder ="Prefered name"/>
            <input type = "text" placeholder="Email"/>
            <input type  = "password" placeholder="Password" />
            <button type = "submit">{props.isRegistered ? "Sign up": "Register"}</button>
        </form>
    );
}

export default Form;