/**
 * Randox Nexus session keep-alive.
 *
 * Nexus authenticates through Azure AD B2C (MSAL, redirect flow). The access
 * token is short lived; the refresh token is what actually matters, and B2C
 * only rolls it forward when the app makes an authenticated request. Left idle
 * the refresh token ages out and the tab bounces to b2clogin, which is what
 * stranded the catalogue capture on 19 and 21 Aug.
 *
 * Loading an authenticated route makes MSAL run acquireTokenSilent, which
 * refreshes both tokens. Pinging every 20 minutes keeps the session warm
 * without ever touching the login form.
 *
 * Run alongside the persistent Chrome on :9223:
 *   node nexus-keepalive.js
 */
const puppeteer = require('puppeteer');

const PING_MS = 20 * 60 * 1000;
const PING_URL = 'https://nexus.randoxhealth.com/create-new-order-physician';

const stamp = () => new Date().toLocaleTimeString('en-GB');

async function ping() {
  const b = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9223', defaultViewport: null });
  try {
    const pages = await b.pages();
    const p = pages.find((x) => x.url().includes('randoxhealth')) || pages[0];

    await p.goto(PING_URL, { waitUntil: 'networkidle2', timeout: 45000 });

    // MSAL redirects to b2clogin from JS, after networkidle2 has already
    // resolved. Reading p.url() immediately reports a healthy session that is
    // in fact seconds away from the login page, so settle first.
    await new Promise((r) => setTimeout(r, 6000));
    const url = p.url();

    if (url.includes('b2clogin.com')) {
      console.log(`[${stamp()}] SESSION LOST. Log in once in the Nexus Chrome window, keep-alive will resume.`);
      return;
    }

    // MSAL keeps its token cache in localStorage on the nexus origin.
    const expiry = await p.evaluate(() => {
      const k = Object.keys(localStorage).find((x) => x.includes('accesstoken'));
      if (!k) return null;
      try {
        return JSON.parse(localStorage.getItem(k)).expiresOn || null;
      } catch {
        return null;
      }
    });
    const until = expiry
      ? new Date(parseInt(expiry, 10) * 1000).toLocaleTimeString('en-GB')
      : 'session';
    console.log(`[${stamp()}] alive, token now good until ${until}`);
  } catch (err) {
    console.log(`[${stamp()}] ping failed: ${err.message}`);
  } finally {
    b.disconnect();
  }
}

(async () => {
  console.log(`Nexus keep-alive started, pinging every ${PING_MS / 60000} minutes.`);
  await ping();
  setInterval(ping, PING_MS);
})();
