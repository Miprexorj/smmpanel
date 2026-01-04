const express = require("express");
const router = express.Router();

/* 🔌 CONNECT */
router.get("/connect", (req, res) => {
  res.json({ status: "ok", message: "API aktif" });
});

/* 📋 SERVICES */
router.get("/services", (req, res) => {
  res.json({ message: "services endpoint" });
});

/* 💰 BALANCE */
router.get("/balance", (req, res) => {
  res.json({ message: "balance endpoint" });
});

/* 🛒 ORDER */
router.post("/order", (req, res) => {
  res.json({ message: "order endpoint" });
});

/* 📦 STATUS */
router.post("/status", (req, res) => {
  res.json({ message: "status endpoint" });
});

module.exports = router;
