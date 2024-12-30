<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon Authorize + Supertokens Demo (SQL from the backend)

This demo aims to show off Supertokens and Neon Authorize together. In particular this shows how you can use Neon Authorize to run Drizzle queries from your backend!

## The Stack

- Drizzle ORM
- Nest.js
- Solid.js

## Setup

🚨🚨🚨 FOLLOWING THESE STEPS WILL EXPOSE YOUR LOCALHOST BACKEND API ON THE PUBLIC INTERNET 🚨🚨🚨

Supertokens exposes your JWKS URL via your localhost which means we need to expose that so Neon can request it. But keep in mind that your backend will be exposted on the public Internet as long as the localtunnel process is running.

1. Clone this repo
2. Sign up and create a new database on [Neon.tech](https://neon.tech).
3. Choose AWS for the cloud
4. Sign up for [Supertokens](https://supertokens.com).
5. Get your Supertokens Core connectionURI and Core API key. Put these in backend/.env.
6. Run npm install in the root directory, frontend, and backend directory (you need to run npm install three times).
7. Run `npm run start`. This will start the backend, frontend, and tunnel.
8. This will pop up both your frontend and another for your tunnel. On the tunnel page, go through the instructions to set up tunnel (you'll have to click a link and copy/paste a code.)
9.  Once you have done that, copy/paste the JWKS URL from your commandline and navigate to the Authorize tab in the Neon Console. Click Add Provider and copy/paste that JWKS URL into the text field, the correct provider will be chosen automatically.
10. From the get started drawer that pops out (which you can get back to from the Neon Authorize page later if you close it) – run all the blocks under Setup Roles header.
11. From the "Setup Environment Variables" heading, copy the authenticated URL and paste that into your backend/.env/. Notice this connection string has no password.
12. You also need to copy/paste the DATABASE_URL from the dashboard that does have the full password. You'll end up with two Postgres connection strings in you backend .env file.
13. Run `npm run migrate` from your backend directory.
