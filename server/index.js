require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur.' })
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[T-Rage Studios] ${subject}`,
      html: `
        <h3>Yeni İletişim Mesajı</h3>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Mail gönderilemedi:', err)
    res.status(500).json({ error: 'Mail gönderilemedi.' })
  }
})

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API sunucusu çalışıyor: ${PORT}`))
