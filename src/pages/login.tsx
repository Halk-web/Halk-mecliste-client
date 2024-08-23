import React, { useState } from "react";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage=()=>{
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [err,setErr]=useState<string|null>(null);
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleEmailChange=(text:any)=>{
    setEmail(text);
  }

  const handlePasswordChange=(text:any)=>{
    setPassword(text);
  }

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(email,password);

    try{
      await login(email,password);
      navigate("/");
    }
    catch(error){
      setErr("Mecliste Böyle bir üye yok!");
    }
  }
  
    return (
        <>
        <div className="login-box">
        <h4 className="f-w-500 mb-1">Kullanıcı ismi ile giriş yap</h4>
        <h6 style={{color:"red"}}>{err ? err : ""}</h6>
        <p className="mb-3">Hesabın Yok mu?<a href="/signup" className="link-primary ms-1">Meclise Gir</a></p>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <input type="email" className="form-control"  placeholder="EMAIL" onChange={(e:any)=>handleEmailChange(e.target.value)} />
        </div>
        <div className="mb-3">
        <input type="password" className="form-control" id="floatingInput1" placeholder="ŞİFRE" onChange={(e:any)=>handlePasswordChange(e.target.value)}/>
        </div>
      <button type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        GIRIS YAP
      </button>
    </form>
  </div>
        </>
    )
}

export default LoginPage;


