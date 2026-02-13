# 📊 Digital Store Lab — Ecommerce Analytics Project

> A hands-on learning project built to practice real-world analytics implementation:  
> **GTM → DataLayer → GA4 → Consent Mode → Server-side tracking**

🌐 Live site: [ekukarskiy.github.io/digital-store-lab](https://ekukarskiy.github.io/digital-store-lab/)  
📁 Repository: [github.com/EKukarskiy/digital-store-lab](https://github.com/EKukarskiy/digital-store-lab)

---

## 🗂 Project Structure

| Page | Purpose |
|---|---|
| `/index.html` | Homepage |
| `/shop.html` | Product catalog (Ecwid) |
| `/product.html` | Product detail page |
| `/cart.html` | Shopping cart |
| `/checkout.html` | Checkout |
| `/thankyou.html` | Purchase confirmation |
| `/blog/` | Blog (scroll & traffic events) |

---

## ⚙️ Technical Stack

- **Hosting:** GitHub Pages (free, publicly accessible)
- **Ecommerce:** Simulated via JS + localStorage (or Ecwid integration)
- **Tag Management:** Google Tag Manager (GTM) — installed on all pages
- **Analytics:** Google Analytics 4 (GA4)
- **Consent:** Advanced Consent Mode (CoMo v2)

---

## 📡 DataLayer Events

All events are pushed from the **frontend** via `dataLayer.push()`.  
GTM does not parse the DOM — ecommerce data is passed strictly through the `ecommerce` object.

**Rule:** one event = one GA4 tag.

| Event | Status |
|---|---|
| `view_item` | ✅ |
| `add_to_cart` | ✅ |
| `view_cart` | ✅ |
| `begin_checkout` | ✅ |
| `purchase` | ✅ |
| `scroll_events` | ✅ |
| `video_events` | ✅ |
| `form_submits` | ✅ |

---

## 🔒 Web Analytics & Consent Governance

In this project, I implemented a **Consent Management Framework** to ensure compliance with GDPR and DMA (Digital Markets Act) while maintaining data integrity in GA4.

### Key Implementation Details

**Advanced Consent Mode (CoMo v2)**  
GTM is configured to respect user privacy signals. By default, all tracking tags are in a denied state until explicit user interaction — ensuring no unauthorized data collection occurs.

**GTM Tag Governance**  
Used the Consent Overview feature in GTM to audit and control tag behavior. Tags are mapped to specific consent types (`ad_storage`, `analytics_storage`), allowing for "cookieless pings" even when cookies are rejected.

**State Management & DataLayer**  
Designed a custom `dataLayer` architecture that synchronizes the Consent Banner UI with the GTM environment in real-time — without requiring a page reload.

**Privacy-First Attribution**  
Configured the setup to maintain high-quality attribution data while honoring the user's right to opt-out — a critical skill for modern digital measurement.

### How to Audit the Setup

1. **GTM Preview Mode** — Open the Summary pane. The initial `Consent` event must show **denied** for all categories as the very first action.
2. **Consent Update** — Upon clicking "Accept," a `Consent Update` event is triggered, switching tag behavior from restricted to active.
3. **GCS Parameter** — Verify the `gcs` parameter in outgoing GA4 hits (e.g., `G100` for denied, `G111` for granted) via the Network tab or GTM Debugger.

---

## 🎯 Why This Project

This project was built as a **portfolio piece** combining learning with real, employer-ready skills:

- ✅ GTM + ecommerce tracking
- ✅ GA4 (correct Measurement Protocol)
- ✅ Server-side event handling
- ✅ Consent Mode & privacy-first analytics

> Skills directly requested in job listings for analytics roles.

---

## 📬 Contact

Built by **Evgeny Kukarskiy**  
[github.com/EKukarskiy](https://github.com/EKukarskiy)
