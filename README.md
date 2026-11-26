# returnguards.com

Static site served by GitHub Pages with the custom domain in `CNAME`.

## Pages
- `index.html` – home (hand-written)
- `pricing.html`, `support.html`, `privacy-policy.html`, `terms-of-service.html`, `404.html` –
  generated from one template by `tool/build_website_pages.py`:
  `python tool/build_website_pages.py website_final`
- `styles.css`, `site.js` – shared styles and the menu / pricing toggle
- `assets/` – logo, favicons, social image (`og-image.png`) and app screenshots (`screens/*.webp`)

## Deploy
Published from https://github.com/osnijdersos-sudo/returnguards-site (GitHub Pages, custom
domain in `CNAME`). Copy the contents of this folder into that repo's root, commit and push.
Pages publishes within a minute or two.

## Before launch
- Add the operator's legal name and postal address to `privacy-policy.html`
  (see the TODO comment; required by GDPR).
- Replace the "coming soon" store badges with real store links once the app is live.
- Switch the contact address to a domain mailbox (e.g. support@returnguards.com) when available.
