# NS3DW Glossary

**Purpose:** A running, alphabetized, searchable reference of every acronym and technical term used across the NS3DW project.

**How to use:** Ctrl+F / Cmd+F to search. Terms added as they come up. If you see a term in a conversation and it's not here, that's a bug — tell me.

**Last updated:** April 17, 2026

---

## A

**A1-Mini**
One of NS3DW's 4 printers. Bambu Lab A1 Mini — a small-format FDM (Fused Deposition Modeling) 3D printer. Good for small parts like keychains, tags.

**ABS (Acrylonitrile Butadiene Styrene)**
A type of plastic filament used in 3D printing. Tougher and more heat-resistant than PLA; what LEGO bricks are made of. Used for the Connected Athletic Pass because it survives wallets, keychains, and summer heat.

**Adderall**
Prescription stimulant used to treat ADHD. Not a tech term — included because it's in your personal context.

**ADHD (Attention-Deficit/Hyperactivity Disorder)**
Neurodevelopmental condition affecting focus, impulse control, and task management. Not tech, but relevant because it shapes how we scope work (chunked, shippable pieces, not 6-month monoliths).

**API (Application Programming Interface)**
A defined way for one piece of software to talk to another. If a website is a restaurant, the API is the waiter: you don't go into the kitchen yourself, you tell the waiter what you want and they bring it back. Every integration in your dashboard (Sheets, Square, QuickBooks) works through an API.

**API key**
A secret password that identifies your app to another service's API. Like a hotel keycard — the service checks it before letting you in. Keys should never be committed to public GitHub repos because anyone who finds them can impersonate you.

**Apps Script (Google Apps Script)**
Google's scripting language (JavaScript-flavored) that runs inside Google's servers and lets your code access Sheets, Drive, Gmail, etc. Your current NS3DW dashboard backend is built on this. Pro: free, no server to manage. Con: slow, quota-limited, hard to debug, locks you into Google.

**Artifact**
In Claude, a sandboxed file that renders in the chat (a document, a piece of HTML, an SVG diagram). Your dashboard HTML was built as an artifact before being deployed.

**AOV (Average Order Value)**
The average dollar amount of a single order. High AOV (wholesale, bulk orders) = fewer sales needed to hit revenue goals. Low AOV (single Etsy keychain) = need lots of volume.

**AWS (Amazon Web Services)**
Amazon's cloud hosting platform. Massive, powerful, and overwhelming for beginners — it's basically a hardware store the size of Texas where every aisle assumes you already know what you're building. Recommended you NOT start here; learn on a smaller VPS first.

---

## B

**B2B (Business-to-Business)**
Selling to other businesses. Your wholesale to schools, FRGs, and corporate accounts is B2B.

**B2B2C (Business-to-Business-to-Consumer)**
A sale where you sell to a business that resells to consumers. The Connected Pass is B2B2C: NS3DW → Rogers Public Schools → parents.

**B2C (Business-to-Consumer)**
Selling directly to individual customers. Your Etsy shop is B2C.

**Backend**
The server-side half of an app — the part users don't see, which stores data, handles logic, and talks to other services. Your Google Apps Script + Sheets setup is the backend.

**Backfill**
Going back and filling in missing historical data. Cheap to design correctly up front, expensive to do later ("expensive to backfill") because you have to touch every existing record.

**Bambu Labs**
The printer manufacturer that makes your P1S, X1C, and A1-Mini printers. They have an API that could theoretically connect to your dashboard for live job status — listed as a possible future integration.

**Base64**
A way of encoding binary data (like images or PDFs) as plain text so it can be sent through APIs that only accept text. Your dashboard uses this to send receipt PDFs to Apps Script.

**Branch (git)**
A parallel version of your code where you can try changes without breaking the main version. "main" is usually the stable branch; "dev" or feature branches are where work happens.

---

## C

**Cache / Caching**
Storing a copy of data locally so you don't have to re-fetch it every time. Your dashboard uses `localStorage` to cache orders and inventory between page loads.

**CDN (Content Delivery Network)**
A network of servers around the world that serves your website from whichever location is closest to each visitor. Makes sites load fast globally. Cloudflare is a CDN (among other things).

**Chart.js**
An open-source JavaScript library for drawing charts (line, bar, pie, etc.). Your dashboard uses it for the revenue and order-status charts.

**Claude Code**
Anthropic's command-line tool for agentic coding. Lets you (or Claude on your behalf) work on code directly from a terminal instead of copy-pasting between a chat UI and a file.

**Cloudflare**
A company that offers CDN, DNS, security, and serverless hosting services. Your Athletics Hub landing page is hosted here. Cloudflare Pages is their static-site host; Cloudflare Workers lets you run code at the edge (near your users).

**Cloud Run**
Google's service for running containerized apps in the cloud without managing servers. Was considered for the full-stack version of the dashboard before the lighter Apps Script approach won out.

**CMS (Content Management System)**
Software that lets non-developers edit website content (WordPress, Squarespace, Webflow). Squarespace is a CMS.

**CNAME record**
A DNS record that points one domain to another ("www.ns3dw.com points to ns3dw.pages.dev"). Comes up when connecting a custom domain to Cloudflare or Squarespace.

**CORS (Cross-Origin Resource Sharing)**
A browser security rule that stops website A from reading data from website B unless B explicitly allows it. You'll bump into this when your dashboard tries to fetch from your own backend on a different domain.

**COGS (Cost of Goods Sold)**
The direct cost of producing what you sell — filament, packaging, printer wear, labor. Your pricing calculator estimates COGS. QuickBooks tracks it for tax purposes.

**Credential**
Anything that proves who you are to a system — password, API key, token, certificate. The Connected Pass is a physical credential (proves you paid for access to games).

**CRUD (Create, Read, Update, Delete)**
The four basic things any app does with data. When someone says "CRUD operations," they mean "can the app add records, look them up, change them, and remove them?" Your Orders module is full CRUD.

**CSS (Cascading Style Sheets)**
The language that tells a browser how to style HTML — colors, fonts, layout, spacing. Your dashboard's dark theme is CSS.

**CSV (Comma-Separated Values)**
A plain-text spreadsheet format where rows are lines and columns are separated by commas. Exports from Sheets and Square commonly come as CSV.

---

## D

**Database**
Structured storage for data, designed for fast search, filtering, and updates. Your current "database" is a Google Sheet (technically a spreadsheet, but it's playing the role of a database until you outgrow it).

**Dashboard**
In your context, the NS3DW Operations Dashboard — the HTML/JS app that shows orders, inventory, KPIs, etc. Generally, any UI that summarizes business data at a glance.

**DigitalOcean**
A cloud hosting provider that's simpler and cheaper than AWS. Rents you a virtual server (a "Droplet") for ~$5/month. Good first place to learn server ops.

**DNS (Domain Name System)**
The internet's phonebook. Translates "naturalstate3dworks.com" into the IP address of the server hosting it. When you move hosts, you update DNS records.

**Docker**
Software that packages an app plus everything it needs to run (OS libraries, dependencies) into a "container" that behaves the same on any computer. Eliminates "works on my machine" problems. Cloud Run uses Docker containers.

**Domain**
The human-readable web address (naturalstate3dworks.com, ns3dw.com). You own two.

**doGet() / doPost()**
In Google Apps Script, these are the special functions that run when your script receives an HTTP GET or POST request. Your dashboard frontend calls these to fetch/save data.

**DXA**
A unit of measurement in Word/docx files. 1440 DXA = 1 inch. Only relevant if you're programmatically generating Word documents (which you might for pitch decks).

---

## E

**E-commerce**
Selling stuff online. Your Etsy shop is e-commerce; the planned Square partner storefront will be too.

**Edge (computing)**
Running code geographically close to the user instead of in one central server. Cloudflare Workers run at the "edge" — faster response times, great for simple logic.

**Electron**
A framework that wraps a web app (HTML/CSS/JS) into a desktop application for Mac/Windows/Linux. VS Code, Slack, Discord — all Electron apps. This is the path we discussed for turning your dashboard into a desktop app without rewriting it.

**Endpoint**
A specific URL where an API can be called. `https://script.google.com/macros/s/XYZ/exec?action=getOrders` is an endpoint.

**Etsy**
The online marketplace where your retail shop (NaturalState3Dworks) lives. They have an API you could integrate with eventually.

**Express (Express.js)**
A popular, minimal framework for building web servers in Node.js. If you ever move off Apps Script, Express is the likely next stop.

---

## F

**FDM (Fused Deposition Modeling)**
The 3D printing process your printers use — melts plastic filament and extrudes it layer by layer. Also called FFF (Fused Filament Fabrication).

**Filament**
The plastic string fed into an FDM printer. Comes on spools, tracked in your Inventory module.

**Firestore**
Google's cloud database (NoSQL — stores documents, not rows and columns). Was considered for the full-stack dashboard version.

**Framework**
A pre-built scaffolding of code that gives you a starting structure for an app (React, Vue, Express, etc.). Your dashboard uses NO framework — that's intentional; it's "vanilla" HTML/JS.

**FRG (Family Readiness Group)**
A military unit's family support network. You sell bulk merch to FRGs. Your dashboard has a dedicated FRG_Orders sheet.

**Frontend**
The user-facing half of an app — what runs in the browser. HTML, CSS, JavaScript. Your dashboard's UI is frontend; the Apps Script is backend.

---

## G

**Git**
Version control software. Tracks every change to your code, lets you roll back mistakes, and lets multiple people work on the same codebase. Invented by Linus Torvalds (the Linux guy) because he hated all the existing options.

**GitHub**
A website that hosts Git repositories. Your dashboard code lives at `naturalstation3dworks-gif/ns3dw-dashboard`. Think of Git as the filing cabinet and GitHub as the public library that hosts your cabinet.

**GitHub Pages**
Free static website hosting that comes with any public GitHub repo. You can point a domain at it. One deployment option for the dashboard.

**GoFan**
A ticketing company for school sports. Mentioned in the pitch deck as the competitor whose $1 + 5% per-ticket fee you're undercutting with flat-fee wholesale cards.

**Google Apps Script**
See "Apps Script" above.

**Google Drive**
Google's cloud file storage. Your dashboard stores receipt PDFs and gallery photos here.

**Google Sheets**
Google's cloud spreadsheet. Currently functioning as the NS3DW database.

---

## H

**Hetzner**
A German cloud hosting provider. Ridiculously cheap VPS ($4-5/month for solid specs). Comparable alternative to DigitalOcean.

**Hosting**
Paying someone to run a server that makes your website available to the public. Cloudflare, Squarespace, GitHub Pages, AWS, Hetzner — all hosting providers at different levels.

**HTML (HyperText Markup Language)**
The language that describes what's ON a webpage — the text, images, buttons, forms. CSS styles it, JavaScript makes it interactive.

**HTTPS**
HTTP with encryption. The "S" means your browser's connection to the server is encrypted so no one between you can eavesdrop. Every modern site uses HTTPS. Cloudflare gives you HTTPS for free.

---

## I

**Inventory hierarchy**
In your dashboard: Category → Brand → Type. E.g., "Filament → Bambu → PLA Basic Black." Lets you browse stock from broad to specific.

**IRS**
The Internal Revenue Service. When they audit, they want to see QuickBooks, not a Google Sheet full of guesses. This is why we're keeping QBO as the accounting source of truth.

---

## J

**JavaScript (JS)**
The programming language that runs in every web browser and also on servers (via Node.js). Your entire dashboard is JavaScript.

**JSON (JavaScript Object Notation)**
A plain-text format for structured data. Looks like `{ "name": "Anthony", "printers": 4 }`. How APIs almost always send/receive data.

---

## K

**KPI (Key Performance Indicator)**
A metric that measures how well the business is doing at something. Your dashboard's top cards (Active Orders, Revenue, Profit, FRG Count) are KPIs.

---

## L

**Library (code library)**
A pre-written bundle of code someone else made that you can drop into your app to avoid reinventing the wheel. Chart.js, Quagga.js, Tesseract.js, QRCode.js — all libraries.

**localStorage**
A small (~5-10 MB) chunk of browser storage where your dashboard caches data so the page loads fast even before it syncs with Sheets.

**Low-code / No-code**
Tools that let you build apps without writing code (Squarespace, Zapier, Airtable). Fast to start, hard to escape once you outgrow them.

---

## M

**MaxPreps**
A high school sports stats and schedule site. Your Athletics Hub links to team pages there.

**MCP (Model Context Protocol)**
A standard (made by Anthropic) for connecting AI assistants to outside tools and data sources in a consistent way. Your project has a QuickBooks MCP connector available — that's the bridge we'll use to push receipts from the dashboard to QBO.

**Microsoft Word**
Makes .docx files. Pitch decks, letters, proposals.

**MileSplit**
Like MaxPreps but for track and cross-country specifically. Linked in your Athletics Hub.

**MVP (Minimum Viable Product)**
The smallest version of a product that's still useful. Your current dashboard is roughly the MVP for NS3DW operations.

---

## N

**NAICS (North American Industry Classification System)**
The U.S. government's code for categorizing what kind of business you run. Matters for benchmarking, tax forms, and industry reports. Your QuickBooks benchmarking tools need this.

**Node.js**
JavaScript that runs on a server instead of a browser. Most modern custom backends use it (including the likely future NS3DW backend).

---

## O

**OCR (Optical Character Recognition)**
Software that reads text out of an image. Your dashboard uses Tesseract.js to extract receipt data from uploaded photos/PDFs.

**OpenAPI**
A standard format for describing what an API does. You'll see `openapi.yaml` or `swagger.json` files. Not critical yet but worth knowing the name.

**OS (Operating System)**
Windows, macOS, Linux, iOS, Android. The base software a device runs.

---

## P

**P1S / P1S-1 / P1S-2**
Two of your printers — Bambu Lab P1S models. Enclosed, fast, reliable. Your workhorses.

**Packaging (npm package)**
A publishable bundle of code someone else wrote, installable via `npm install <name>`. Every library you use gets installed this way in a Node.js project.

**Pandoc**
A tool that converts documents between formats (docx to markdown, markdown to PDF, etc.). Handy for pitch decks and reports.

**PCI (Payment Card Industry) compliance**
The rules you have to follow to handle credit card data. Strict, expensive to comply with, and audited. By NOT storing payment info yourself, you stay "out of PCI scope" — your decision from this conversation.

**PLA (Polylactic Acid)**
A type of 3D printing filament. Made from plant starch, biodegradable-ish, easy to print, but softer than ABS. Fine for indoor/desk items, not great for car dashboards in summer.

**Port**
A numbered "door" on a server where a service listens for connections. Web servers usually use port 80 (HTTP) or 443 (HTTPS). SSH (remote terminal) uses port 22.

**Postgres (PostgreSQL)**
An open-source, heavy-duty database. The grown-up answer to Google Sheets. If you move off Apps Script to a real backend, Postgres is the most likely database.

**PR (Pull Request)**
In Git/GitHub, a proposed set of changes that someone can review before merging into the main branch. Not critical for solo work but useful when you bring on help.

**Production / Prod**
The live, real version of software that customers actually use (as opposed to development or staging, which are sandbox versions). "Push to prod" = make it live.

**PVC (Polyvinyl Chloride)**
The plastic that commodity athletic passes are made from. Cheap, flat, boring. The thing your Connected Pass outclasses.

---

## Q

**QBO (QuickBooks Online)**
Intuit's cloud accounting software. Your books live here. The plan is for the dashboard to push receipts/expenses to QBO weekly.

**QR code (Quick Response code)**
A 2D barcode that phones can scan instantly. Your Connected Pass cards have QR codes that link to the Athletics Hub. "Quick Response" is the original name; almost nobody remembers that.

**Quagga.js**
A JavaScript library that reads barcodes through a phone's camera. Powers your dashboard's barcode scanner.

**QuickBooks MCP connector**
The bridge (mentioned above under MCP) that lets AI tools push data into your QuickBooks Online account. Already available in this project.

---

## R

**React**
A JavaScript framework for building UIs. Very popular. Your dashboard deliberately does NOT use React — it's plain HTML/JS. You could rewrite in React later but there's no rush.

**React Native**
React for mobile apps. Lets you build iOS and Android apps using the same web skills you already have. Likely path when you build the mobile companion.

**Repo (repository)**
A Git project's folder. Your NS3DW dashboard repo lives on GitHub at `naturalstation3dworks-gif/ns3dw-dashboard`.

**Responsive (responsive design)**
Web design that adapts to screen size — looks good on desktop, tablet, and phone. Your dashboard is responsive.

**REST API**
The most common style of API on the web. Uses plain HTTP verbs (GET, POST, PUT, DELETE). Opinionated but very well-understood. Most APIs you'll meet are REST-ish.

**RPS (Rogers Public Schools)**
The Arkansas school district you're pitching the Connected Pass to. You're Approved Vendor #20847.

---

## S

**Schema**
The shape of your data — what fields a record has, what types they are. "Order schema = {id, customer, product, status, total}." Designing schema well up front saves pain later.

**Serverless**
Running code on someone else's server without managing the server yourself. Cloudflare Workers, AWS Lambda, Google Cloud Functions — all serverless. Apps Script is serverless too.

**Sheet ID**
A unique identifier for a specific Google Sheet. Yours is `13LQZmRfbF5oZUU-jC-fCq5HN_VdBRkJLpIWZpB174TY`. Found in the Sheet's URL.

**Slack**
Team chat software. You don't currently use it for NS3DW, but mentioned as a potential future team communication channel.

**SKU (Stock Keeping Unit)**
A unique code for a specific product (e.g., "KEYCHAIN-BLK-LRG"). Your Inventory module uses these to track spools and products.

**Source of truth**
The one system that's considered authoritative for a given piece of data. For payments: Square. For accounting: QuickBooks. For operational data: your dashboard.

**Square**
The payments + POS (point of sale) company. Handles your in-person payments and some of your online payments. Also owns Weebly (their e-commerce arm). Has an API your dashboard already pulls from.

**SRO (School Resource Officer)**
Your current role as a police officer. Not tech, but part of your context.

**Squarespace**
A low-code website builder. You own `naturalstate3dworks.com` through them but haven't built the site yet.

**SSH (Secure Shell)**
Encrypted remote terminal access to a server. How you'd log into a VPS from your own computer to run commands. Uses port 22.

**SSL / TLS certificate**
The cryptographic document that lets a server prove it really is who it claims to be, enabling HTTPS. Cloudflare gives these out free.

**SSR (Server-Side Rendering)**
Generating HTML on the server before sending it to the browser (vs. sending JS and letting the browser build the HTML). Better for SEO and first-load speed. Not relevant yet for your dashboard.

**Static site**
A website made of pre-built HTML files that don't change per visitor. Fast, cheap, no server needed. Your Athletics Hub is a static site on Cloudflare.

**Stripe**
A payments company (competitor to Square). Mostly online-focused. Used by Shopify and most modern e-commerce platforms. You don't use it yet but might.

**Subdomain**
A prefix on a domain. `dashboard.ns3dw.com`, `shop.ns3dw.com`, `api.ns3dw.com` — all subdomains of `ns3dw.com`. Useful for separating services.

---

## T

**Tesseract.js**
A JavaScript library that does OCR (reading text from images). Powers your receipt-scanning feature. Based on Google's Tesseract project.

**Token**
Like an API key but more commonly used for temporary credentials (e.g., your login session expires after 24 hours — that's a token).

**TOC (Table of Contents)**
In a Word document, the clickable list of section headings. Relevant when generating pitch decks.

---

## U

**UI (User Interface)**
The part of software you see and click. Buttons, forms, menus.

**UX (User Experience)**
How it feels to use something. A UI can be pretty (good UI) but still confusing to use (bad UX).

**UPC (Universal Product Code)**
The 12-digit barcode standard in North America. Your barcode scanner reads these.

---

## V

**Vanilla (vanilla JS)**
Plain JavaScript with no framework. Your dashboard is vanilla. The opposite of React/Vue/Angular.

**Version control**
Tracking changes to code over time so you can see history and roll back. Git is the dominant version control system.

**VPS (Virtual Private Server)**
A chunk of a physical server rented out to you. Feels like your own computer, lives in a data center. DigitalOcean Droplets and Hetzner Cloud machines are VPS.

---

## W

**WESN (War Eagle Sports Network)**
Heritage High School's student-run broadcast network. One of the two streams embedded in the Athletics Hub.

**Wholesale**
Selling in bulk at a discount, usually to a business that resells. Your Connected Pass sales to RPS are wholesale.

**Workers (Cloudflare Workers)**
Cloudflare's serverless compute. Lets you run small pieces of JavaScript code at the edge (near the user). Where your future URL redirects (ns3dw.com/wesn) should probably live.

---

## X

**X1C**
One of your printers — Bambu Lab X1 Carbon. Your flagship: fully enclosed, AI camera, high-speed. Best for ABS and advanced materials.

**XML (eXtensible Markup Language)**
An older structured-data format with lots of `<tags>`. Most modern APIs use JSON instead, but XML lives on inside Word/docx files and some legacy systems.

---

## Y

**YAML**
A structured-data format designed to be human-friendly (no curly braces, uses indentation). You'll see it in config files and OpenAPI specs.

**YouTube**
Hosts the WESN and RHS TV embedded streams on the Athletics Hub.

---

## Z

**Zapier**
A no-code integration tool that connects apps via "if this, then that" recipes. Can act as a lightweight bridge between Google Sheets, Square, Etsy, QBO etc. An alternative to writing your own integrations — useful but leaves you dependent on Zapier.

---

*End of current glossary. Terms get added as they come up in conversation.*
