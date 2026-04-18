const SESSION_KEY = 'trs_session'

function getSessionId() {
  let sid = sessionStorage.getItem(SESSION_KEY)
  if (!sid) {
    sid = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, sid)
  }
  return sid
}

async function track(event_type, data = {}) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type,
        page: window.location.pathname + window.location.hash,
        referrer: document.referrer || null,
        session_id: getSessionId(),
        ...data,
      }),
    })
  } catch {
    // sessizce geç
  }
}

export function initTracker() {
  // Sayfa görüntüleme
  track('pageview')

  // Buton ve link tıklamaları
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a, [data-track]')
    if (!el) return

    const label =
      el.dataset.track ||
      el.innerText?.trim().slice(0, 100) ||
      el.getAttribute('aria-label') ||
      el.tagName.toLowerCase()

    track('click', { element: label, extra: { href: el.href || null } })
  })

  // Sekmeyi kapatma / sayfa terk
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      track('page_exit')
    }
  })
}
