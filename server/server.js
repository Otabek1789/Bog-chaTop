require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for OTPs (In production, use Redis or Database)
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: "Elektron pochta manzili kiritilmadi" });
  }

  // Generate a 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { code, expires: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiration

  const mailOptions = {
    from: `"Bog'chaTop" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'BogchaTop tizimiga kirish uchun tasdiqlash kodi',
    text: `Sizning tasdiqlash kodingiz: ${code}\nBu kod 5 daqiqa davomida amal qiladi.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Kod ${email} manziliga yuborildi: ${code}`);
    res.json({ success: true, message: "Kod pochtangizga yuborildi!" });
  } catch (error) {
    console.error('Xat yuborishda xatolik:', error);
    res.status(500).json({ success: false, error: "Xat yuborishda xatolik yuz berdi. Pochtani yoki sozlamalarni tekshiring." });
  }
});

app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ success: false, error: "Ma'lumotlar to'liq emas" });
  }

  const storedData = otpStore[email];

  if (!storedData) {
    return res.status(400).json({ success: false, error: "Kod yuborilmagan yoki muddati o'tgan" });
  }

  if (Date.now() > storedData.expires) {
    delete otpStore[email];
    return res.status(400).json({ success: false, error: "Kodning muddati tugagan. Qaytadan so'rang." });
  }

  if (storedData.code === code) {
    delete otpStore[email]; // Clear code after successful verification
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Kod noto'g'ri. Qaytadan tekshiring." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
