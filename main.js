// Login
async function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if(data.success){
    if(data.role === "admin") window.location.href="admin.html";
    else window.location.href="dashboard.html";
  } else {
    document.getElementById("error").innerText="Kullanıcı adı veya şifre yanlış!";
  }
}

// Dashboard Sipariş + TL kâr hesaplama
function order(){
  const sel = document.getElementById("service");
  const ratePer1k = parseFloat(sel.selectedOptions[0].dataset.rate); // 1k TL
  const quantity = parseInt(document.getElementById("quantity").value);
  const margin = parseFloat(document.getElementById("margin").value);

  const cost = ratePer1k * (quantity / 1000);
  const profit = cost * (margin / 100);
  const total = cost + profit;

  document.getElementById("result").innerHTML = 
    `Maliyet: ₺${cost.toFixed(2)} <br> Kâr: ₺${profit.toFixed(2)} <br> Toplam: ₺${total.toFixed(2)}`;

  // API sipariş gönder
  fetch("/api", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      action:"add",
      service: sel.value,
      link: document.getElementById("link").value,
      quantity
    })
  }).then(res => res.json())
    .then(data => console.log("API Cevap:", data));
}
