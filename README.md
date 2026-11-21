# Samarkandi Hajj Kafela Travels & Tours: Website

A plain static website: **HTML + CSS + a little JavaScript**. No build step, no framework, no database, no npm.
Double-click `index.html` to see it. To publish, upload the whole folder to any static host
(cPanel `public_html`, Netlify, Vercel, GitHub Pages, Cloudflare Pages, Nginx...).

## Folder map
```
index.html       Home
about.html       About us
packages.html    Packages, 14-day plan, preparation checklist, FAQ
contact.html     Contact details + enquiry form
404.html         "Page not found" (set as the error page on your host)
css/styles.css   ALL styling + animations. Colours are variables at the top (:root)
js/config.js     Settings: WhatsApp number, default language
js/i18n.js       ALL text in Bangla + English (single place to edit wording)
js/main.js       Language switch, checklist, contact form
assets/          favicon.svg, logo.svg (placeholder logo)
robots.txt, sitemap.xml   SEO (replace YOUR-DOMAIN.com)
```

## Common edits
| I want to... | Do this |
|---|---|
| Change any text | Find it in `js/i18n.js`, edit both `bn` and `en`. Also edit the Bangla default inside the matching HTML tag (found via its `data-i18n="key"`). |
| Change colours | `css/styles.css` → `:root{ --blue, --sky, --green, --navy ... }` |
| Change the WhatsApp number | `js/config.js` → `whatsapp` (country code first, digits only) |
| Change phone numbers | Search the number in the HTML files (appears as `tel:` links and text) |
| Add a page | Copy `about.html`, edit, and add a link in the nav of every page |
| Replace the logo | Put the real logo in `assets/` and swap the small `<svg>` inside `<a class="brand">` in each page |

## How the language switch works
Each translatable element looks like `<h2 data-i18n="key">বাংলা</h2>`. The Bangla text is the default.
`main.js` looks up `key` in `i18n.js` and swaps the text. The choice is remembered in the browser. `?lang=en` in the URL forces English.

## Placeholders to fill before launch
Search `js/i18n.js` for square brackets: `[PRICE]`, `[LICENCE NO.]`, `[YEAR]`, `[OFFICE HOURS]`, `[NAME]` / `[নাম]` (team member names).
Also: the real logo, the domain in `sitemap.xml` / `robots.txt`, and confirm the WhatsApp number is active.
The Arabic Talbiyah line and the Bangla/English plan, FAQ and checklist wording should be reviewed by the agency.

## Notes
- Fonts load from Google Fonts (needs internet); fallbacks are set. To self-host, download them and edit the `<link>` in each page.
- Animations are CSS-only and turn off for visitors with "reduce motion" enabled.
- The contact form has no server: it opens WhatsApp with the message pre-filled. For email delivery, add a form service (Formspree, Netlify Forms) later.
# samarkandi-hajj-kafela-demo-website
