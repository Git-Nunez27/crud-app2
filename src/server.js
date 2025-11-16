const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const itemRoutes = require("./routes/item.route");
const { errorHandler } = require("./middlewares/error.handler");

const app = express();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_URL หรือ SUPABASE_SERVICE_KEY ไม่ได้ตั้งค่า");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // เสิร์ฟ frontend จาก /public

// ส่ง supabase client ไปให้ routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// API routes
app.use("/api/items", itemRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "ไม่พบเส้นทาง" });
});

// Error handler
app.use(errorHandler);

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✓ Supabase เชื่อมต่อสำเร็จ");
  console.log(`✓ เซิร์ฟเวอร์รัน port ${PORT}`);
  console.log(`✓ Frontend: http://localhost:${PORT}`);
  console.log(`✓ API: http://localhost:${PORT}/api/items`);
});
