# KIC Web Application Starter

A small message board starter project for learning how a frontend and backend
work together. It uses only Node.js built-in modules, so there are no packages
to install.

## Start the server

You need Node.js installed. In the project directory, run:

```bash
npm start
```

The server listens on port 3000. Keep this terminal open while using the
application. Press `Ctrl+C` to stop the server.

## Open the application

Open `http://localhost:3000` in your browser. In GitHub Codespaces, use the
Ports tab to open forwarded port 3000. Codespaces may show a notification when
the server starts; you can open the application from that notification too.

The page requests the sample messages from `GET /api/messages` and displays
them. The messages are held in server memory and reset when the server restarts.
There is no message submission feature yet; that is an exercise for students.

You can also visit `http://localhost:3000/api/messages` to see the raw JSON
response (use the forwarded port URL in Codespaces).

## Project structure

```text
.
├── .devcontainer/
│   └── devcontainer.json  # Codespaces configuration and forwarded port
├── public/
│   ├── app.js             # Fetches messages from the API and updates the page
│   ├── index.html         # Page content
│   └── style.css          # Page appearance
├── package.json           # Project metadata and the npm start command
├── server.js              # HTTP server, API endpoint, and static file server
└── .gitignore             # Files Git should ignore
```

## How it works

`server.js` creates an HTTP server using Node.js's built-in `http` module. A
request to `/api/messages` receives JSON. Other requests are served from the
`public` directory, with `/` showing `index.html`.

The browser runs `public/app.js`, which asks the server for messages with
`fetch()` and creates a list on the page. `public/index.html` provides the
structure, and `public/style.css` provides the styling.
