import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Demo kullanıcılar
const users = [
  { username: "user", password: "1234", role: "user" },
  { username: "admin", password: "admin", role: "admin" }
];

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if(user){
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false });
  }
});

// SMM API endpoint (demo)
app.post("/api", (req, res) => {
  console.log("Sipariş geldi:", req.body);
  res.json({ status: "ok", msg: "Sipariş kaydedildi" });
});

// Opsiyonel: root'a gelen istekler
app.get("/", (req,res)=>{
  res.send("SMM Panel Backend çalışıyor. API kullanmak için /login veya /api");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server çalışıyor port ${PORT}`));
