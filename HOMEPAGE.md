# Opening and updating the portfolio

Open `index.html` directly in your browser to view the complete portfolio. The React code and styles are bundled into this file, so a local server is not required. The same standalone page is available at `dist/index.html` for publishing.

Edit `src/App.jsx` for content and `src/index.css` for styling, then run `npm.cmd run build` to regenerate both homepage files. Avoid editing the generated `index.html` directly, since building replaces it.

Google Fonts requires an internet connection; the page uses fallback fonts when offline.

## Enquiry delivery

Both forms POST name, phone, and project details to FormSubmit's free AJAX endpoint for `priyankakalla@outlook.com`. No email application is needed. The visitor sees success only when the provider accepts the request; failed submissions keep the entered details for retry.

Submit an initial enquiry, then check Outlook (including spam) for FormSubmit's activation email and follow its activation link. Submit a second enquiry to verify delivery after activation. Provider acceptance alone does not confirm inbox delivery. A live internet connection and access to FormSubmit are required; if a browser or provider blocks submissions from a directly opened file, serve the portfolio with `npm.cmd run dev` or publish it over HTTPS.
