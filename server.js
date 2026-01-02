import express from "express";
import fetch from "node-fetch"; // Eğer Node 18+ kullanıyorsan fetch native
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const users = [
  { username:"user", password:"1234", role:"user" },
  { username:"admin", password:"admin", role:"admin" }
];

app.post("/login", (req,res)=>{
  const {username,password} = req.body;
  const user = users.find(u=>u.username===username && u.password===password);
  if(user) res.json({success:true, role:user.role});
  else res.json({success:false});
});

const API_KEY = "a5158807d5c76e4595cf502fd313b742";

app.post("/api", async (req,res)=>{
  const { service, link, quantity } = req.body;

  try{
    const url = `https://smmturk.org/api/v2?key=${API_KEY}&action=add&service=${service}&link=${link}&quantity=${quantity}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json({status:"ok", smm:data});
  }catch(err){
    res.json({status:"error", msg:err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server çalışıyor port ${PORT}`));
