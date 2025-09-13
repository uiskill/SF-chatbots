import React, { useState } from "react";

const API = "http://localhost/erp/register.php";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if(!username || !email || !password){
      alert("All fields required");
      return;
    }

    try{
      const res = await fetch(API, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({username,email,password})
      });

      const data = await res.json();
      alert(data.message);
      if(data.status === "success"){
        setUsername(""); setEmail(""); setPassword("");
      }
    }catch(err){
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="container p-5 card mt-5" style={{maxWidth:"400px"}}>
      <h3>Register</h3>
      <input className="form-control mb-2" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
