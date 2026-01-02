import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1️⃣ Statik dosyaları sun
app.use(express.static("."));  // "." → kök dizin, tüm HTML, CSS, JS’leri sunar

// 2️⃣ Login endpoint
const users = [
  { username:"user", password:"1234", role:"user" },
  { username:"admin", password:"admin", role:"admin" }
];

app.post("/login", (req,res)=>{
  const {username,password} = req.body;
  const user = users.find(u => u.username===username && u.password===password);
  if(user) res.json({success:true, role:user.role});
  else res.json({success:false});
});

// 3️⃣ API endpoint (sipariş)
app.post("/api", async (req,res)=>{
  res.json({status:"ok", msg:"Sipariş kaydedildi"});
});

// 4️⃣ Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
