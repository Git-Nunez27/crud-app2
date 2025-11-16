exports.errorHandler = (err, req, res, next) => {
  console.error("❌ ข้อผิดพลาด:", err.message);

  // จัดการข้อผิดพลาด Supabase
  if (err.code) {
    return res.status(400).json({ error: err.message || "ข้อผิดพลาดฐานข้อมูล" });
  }

  const status = err.status || 500;
  const message = err.message || "ข้อผิดพลาดภายใน";

  res.status(status).json({ error: message });
};
