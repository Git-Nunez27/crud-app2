# Deploy ไปที่ Render.com

## 📋 ขั้นตอนการ Deploy

### 1️⃣ เตรียมโปรเจคสำหรับ Deploy

#### สร้าง `.gitignore` ถ้ายังไม่มี:
```
node_modules/
.env
.DS_Store
*.log
```

#### ตรวจสอบ `package.json` มี script `start` แล้ว:
```json
"scripts": {
  "start": "node src/server.js"
}
```

### 2️⃣ Push Code ไปยัง GitHub

1. สร้าง repository บน GitHub (https://github.com/new)
2. ชื่อ repo เช่น `crud-app-supabase`
3. ใน terminal:

```bash
# ถ้ายังไม่ได้ init git
git init

# Add files
git add .
git commit -m "Initial commit - CRUD app with Supabase"

# Add remote origin (เปลี่ยน username และ repo-name)
git remote add origin https://github.com/YOUR-USERNAME/crud-app-supabase.git

# Push
git branch -M main
git push -u origin main
```

### 3️⃣ สมัครและเชื่อมต่อ Render

1. เข้า https://render.com
2. Click **Sign up** (สามารถใช้ GitHub account ได้)
3. ยืนยัน Email
4. Click **Authorize Render** เพื่อให้สิทธิ์ GitHub

### 4️⃣ สร้าง Web Service บน Render

1. ไปที่ Dashboard → **+ New** → **Web Service**
2. **Connect a repository:**
   - เลือก repo `crud-app-supabase` (ถ้าไม่เห็น ให้ Click "Connect account" ใหม่)
   - Click **Connect**

3. **Configure:**
   - **Name:** `crud-app` (ชื่อของ service)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** เลือก **Free** (ฟรี)

4. **Environment Variables:**
   - Click **Add Environment Variable**
   - เพิ่มตัวแปร 2 อย่าง:

   ```
   SUPABASE_URL = https://uweqguynhbtucnqfxfmk.supabase.co
   SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   (คัดลอกจาก .env ของคุณ)

5. Click **Create Web Service**

### 5️⃣ รอ Deploy เสร็จ

- Render จะ build และ deploy โปรเจคโดยอัตโนมัติ
- ดู **Logs** ด้านล่าง ถ้าสำเร็จจะเห็น:
  ```
  ✓ Supabase เชื่อมต่อสำเร็จ
  ✓ เซิร์ฟเวอร์รัน port 3000
  ```

- ได้ URL เช่น: `https://crud-app-xxxxx.onrender.com`

### 6️⃣ ทดสอบ App

เปิด URL ที่ได้จาก Render → ควรเห็นหน้า CRUD Demo ✅

## 🔧 หากมีปัญหา

### Build Failed
- ตรวจสอบ Logs ใน Render Dashboard
- ตรวจสอบว่า `package.json` ถูกต้อง
- ตรวจสอบ Node version

### App crash หลัง deploy
- ดู Logs หา error message
- ตรวจสอบ Environment Variables ถูกต้องไหม
- ตรวจสอบ Supabase URL และ Key ถูกต้อง

### Cold start (ช้า)
- Free tier ของ Render จะ sleep เมื่อไม่ใช้งาน
- ครั้งแรกจะโหลดช้า แต่ปกติหลังจากนั้นจะเร็ว

## 📝 การ Update Code

ทุกครั้งที่แก้ไขโค้ด:

```bash
git add .
git commit -m "Update: เพิ่มฟีเจอร์ใหม่"
git push origin main
```

Render จะ **auto-deploy** โดยอัตโนมัติ 🚀

## 🔒 วิธีอื่นใน Production

**ถ้าต้องการ Domain เป็นของตัวเอง:**
- ใช้ Paid Plan ของ Render (~$7/month)
- หรือ redirect จาก Render URL ไป Custom Domain

**ถ้าต้องการ Performance ดีกว่า:**
- Railway.app (ตัวเลือกที่ดี)
- Vercel (สำหรับ Node.js API)
- Heroku (ปลด free tier แต่ยังใช้ได้ paid)

---

ลองเลย แล้วบอกผมว่า URL ที่ได้มาค่ะ! 🎉
