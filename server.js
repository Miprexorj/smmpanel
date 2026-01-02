import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));

// ⚠️ Buraya kendi SMMTurk API key’inizi koyun
const API_KEY = "a5158807d5c76e4595cf502fd313b742";

// Basit demo kullanıcı verisi
const users = [
  { username: "user", password: "1234", role: "user", balance: 100 },
  { username: "admin", password: "admin", role: "admin", balance: 1000 }
];

// Login endpoint
app.post("/login", (req,res)=>{
  const { username, password } = req.body;
  const user = users.find(u => u.username===username && u.password===password);
  if(user) res.json({ success:true, role:user.role });
  else res.json({ success:false });
});

// API endpoint (sipariş / status / balance)
app.post("/api", async (req,res)=>{
  const { action, service, link, quantity } = req.body;

  const params = new URLSearchParams();
  params.append("key", API_KEY);
  params.append("action", action);

  if(action==="add"){
    params.append("service", service);
    params.append("link", link);
    params.append("quantity", quantity);
  }

  try{
    const apiRes = await fetch("https://smmturk.org/api/v2",{
      method:"POST",
      body: params
    });
    const data = await apiRes.json();
    res.json(data);
  } catch(err){
    res.json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
