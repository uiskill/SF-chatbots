import React, { useState } from "react";

const API = "http://localhost/erp/loginclient.php";

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if(!email || !password){
      alert("Email & password required");
      return;
    }

    try{
      const res = await fetch(API,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
      });

      const data = await res.json();
      if(data.status==="success"){
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        alert(data.message);
      }
    }catch(err){
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="container card p-5  mt-5" style={{maxWidth:"400px"}}>
      <h3 className="text-center">Login</h3>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
