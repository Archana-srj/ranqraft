RANQRAFT WEBSITE — SOURCE FILES

Files:
- index.html: homepage shell and shared navigation
- sections/: individual homepage, top header, navigation header and footer HTML files
- assets/css/style.css: custom CSS3 styles and responsive design
- assets/js/sections.js: loads the individual section files
- assets/js/main.js: navigation, current year, back-to-top and WhatsApp form behavior

Stack: HTML5, CSS3, Bootstrap 5.3.3, Font Awesome, vanilla JavaScript.

How to preview: use VS Code Live Server or another local HTTP server with the project folder as its root. The section files are loaded with `fetch`, so opening index.html directly from the file system will not load them. Internet is required for CDN libraries and Google Fonts.

Before publishing: verify phone, address, working hours, team details and client names. Replace social profile placeholders and add your genuine portfolio work. The contact form opens WhatsApp and does not save data or send email. For email/database submissions, connect a secure backend or form provider.
