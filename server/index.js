require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const { getPool, sql } = require('./db')

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

// ── Contact ──────────────────────────────────────────────────
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

// ── Event Tracker ─────────────────────────────────────────────
app.post('/api/track', async (req, res) => {
  const { event_type, page, element, session_id, referrer, extra } = req.body

  if (!event_type) return res.status(400).json({ error: 'event_type zorunlu.' })

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    null

  const user_agent = req.headers['user-agent'] || null
  const project = process.env.PROJECT_NAME || 'unknown'

  try {
    const pool = await getPool()
    await pool.request()
      .input('project',    sql.NVarChar(100),      project)
      .input('event_type', sql.NVarChar(100),      event_type)
      .input('page',       sql.NVarChar(500),      page       || null)
      .input('element',    sql.NVarChar(300),      element    || null)
      .input('ip',         sql.NVarChar(50),       ip)
      .input('user_agent', sql.NVarChar(1000),     user_agent)
      .input('referrer',   sql.NVarChar(500),      referrer   || null)
      .input('session_id', sql.NVarChar(100),      session_id || null)
      .input('extra',      sql.NVarChar(sql.MAX),  extra ? JSON.stringify(extra) : null)
      .query(`
        INSERT INTO events
          (project, event_type, page, element, ip, user_agent, referrer, session_id, extra)
        VALUES
          (@project, @event_type, @page, @element, @ip, @user_agent, @referrer, @session_id, @extra)
      `)

    res.json({ success: true })
  } catch (err) {
    console.error('Track hatası:', err)
    res.status(500).json({ error: 'Kayıt başarısız.' })
  }
})

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API sunucusu çalışıyor: ${PORT}`))
