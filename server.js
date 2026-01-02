const express = require("express");
const app = express();

app.use(express.json());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","*");
  if(req.method==="OPTIONS") return res.sendStatus(200);
  next();
});

let users = { admin: { pass:"miprexsmmx911", balance:9999, role:"miprex" } };

app.post("/register",(req,res)=>{
  const {u,p}=req.body;
  if(!u||!p) return res.json({ok:false,msg:"Eksik"});
  if(users[u]) return res.json({ok:false,msg:"Var"});
  users[u]={pass:p,balance:250,role:"user"};
  res.json({ok:true,msg:"Kayıt başarılı"});
});

app.post("/login",(req,res)=>{
  const {u,p}=req.body;
  if(!users[u]||users[u].pass!==p) return res.json({ok:false});
  res.json({ok:true,role:users[u].role,balance:users[u].balance});
});

app.get("/admin/users",(req,res)=>{
  res.json(users);
});

app.get("/",(req,res)=>res.send("SMM BACKEND AKTIF 🚀"));

app.listen(process.env.PORT||3000,()=>console.log("Server çalışıyor"));
