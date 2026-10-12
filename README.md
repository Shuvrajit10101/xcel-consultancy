# Xcel Consultancy — Website

A single-page marketing and lead-capture site for Xcel Consultancy, an investment
and financial advisory firm in India. It is hand-written static HTML, CSS and
JavaScript: no framework, no build step and no backend. The enquiry form validates
input in the browser and then hands the details to a pre-filled WhatsApp chat or a
`mailto:` draft, so the whole site can be hosted as plain files.

Live at https://moni-hazel.vercel.app (set as this repo's homepage).

## Stack

- HTML5 — one page, `index.html`
- CSS — `css/styles.css`, written by hand with CSS custom properties as design
  tokens (dark navy + gold theme) and three breakpoints: 1024px, 768px, 480px
- Vanilla JavaScript — `js/main.js`, no dependencies
- Google Fonts (Playfair Display, Inter), pulled in via `@import` at the top of
  the stylesheet
- No `package.json`, bundler, or server-side code

## Running it

Static files, so there is nothing to install or build:

```sh
open index.html          # or just double-click it
```

Or serve the folder if you prefer a local HTTP origin:

```sh
python -m http.server 8000
```

## Structure

```
index.html       the whole page: nav, hero, 9 service cards, why-us, stats,
                 how-it-works, testimonials, FAQ, contact form, footer
css/styles.css   design tokens and all styling
js/main.js       mobile nav, FAQ accordion, scroll-reveal, animated stat
                 counters, form validation, WhatsApp / mailto handoff
assets/logo.png  logo, also used as the favicon
```

### Contact handling

`js/main.js` holds the WhatsApp number and email address as constants at the top —
change them there. The form checks for a name, a 10-digit Indian mobile number and
a valid email, then opens a `wa.me` link or a `mailto:` draft with the details
formatted into the message body. Nothing is submitted to or stored on a server.