import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = ()=>{
    const [email , setEmail] = React.useState("");
    const [password , setPassword] = React.useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })
    const handleLogin = async()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:4000/login',{
            method:"post",
            body: JSON.stringify({password,email}),
            headers:{
                "Content-Type":"application/json"
            }
           
        })
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
             navigate("/")
        }else{
            alert("No user is found in this email")
        }
    
       
    };
    return(
        <div className="login">
            <form className="form">
                <input className="inputBox" type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="inputButton" type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );

};
export default Login;