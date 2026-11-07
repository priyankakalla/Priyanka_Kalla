# Opening and updating the portfolio

Open `index.html` directly in your browser to view the complete portfolio. The React code and styles are bundled into this file, so a local server is not required. The same standalone page is available at `dist/index.html` for publishing.

Edit `src/App.jsx` for content and `src/index.css` for styling, then run `npm.cmd run build` to regenerate both homepage files. Avoid editing the generated `index.html` directly, since building replaces it.

Google Fonts requires an internet connection; the page uses fallback fonts when offline.

## Enquiry delivery

Both forms use the official `@formspree/react` integration with form ID `mjyydekn` and endpoint `https://formspree.io/f/mjyydekn`. Name and phone are required. The detailed contact form also accepts an optional email address, service selection, and message. Submissions include their location on the page and a spam honeypot. No email application is needed.

In the Formspree dashboard, confirm that this form's notification recipient is `priyankakalla@outlook.com`, complete any required email verification, and allow the published website domain if domain restrictions are enabled. Submit an enquiry from the published site and check both the Formspree submissions dashboard and Outlook (including spam) to verify delivery. Provider acceptance alone does not confirm inbox delivery. A live internet connection and access to Formspree are required; if submissions from a directly opened file are blocked, serve the portfolio with `npm.cmd run dev` or publish it over HTTPS.

Each form has its own sending, success, and error state. Submit buttons are disabled while sending; failed submissions retain entered details. Successful submissions show a confirmation and a button to start another enquiry.
