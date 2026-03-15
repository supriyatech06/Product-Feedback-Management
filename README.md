# Product Feedback Management

Resume-ready full-stack starter for collecting product feedback, prioritizing requests, and tracking delivery status.

## What is included

- `client/`: React + Vite frontend with a dashboard layout, filters, and feedback submission form
- `server/`: Node.js + Express backend with MongoDB-ready models and APIs
- MongoDB integration through Mongoose
- Seed data so the app is not empty on first run

## Suggested features for your resume

- Feedback board with category, priority, and status filters
- Create feedback requests from the UI
- Product summary cards for roadmap visibility
- REST APIs with Express and MongoDB
- Clean folder structure that is easy to extend with auth, voting, comments, and admin workflows

## Project structure

```text
Product-Feedback-Management/
  client/
    src/
      api/
      components/
  server/
    src/
      config/
      controllers/
      data/
      middleware/
      models/
      routes/
```

## Step 1: Install dependencies

Run these commands from the project root:

```bash
npm install
npm install --workspace client
npm install --workspace server
```

If your npm version supports workspaces correctly, `npm install` at the root is usually enough.

## Step 2: Set up MongoDB

You have two common options:

### Option A: MongoDB Atlas

1. Create a free cluster in MongoDB Atlas
2. Create a database user
3. Add your IP address in Network Access
4. Copy the connection string
5. Replace the password and database name in the URI

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/product-feedback-management?retryWrites=true&w=majority
```

### Option B: Local MongoDB

Install MongoDB Community Server and use:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/product-feedback-management
```

## Step 3: Create environment files

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/product-feedback-management
CLIENT_URL=http://localhost:5173
```

Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 4: Start the app

Start the backend:

```bash
npm run dev:server
```

Start the frontend in a second terminal:

```bash
npm run dev:client
```

Open:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`

## Current API endpoints

- `GET /api/health`
- `GET /api/feedback`
- `GET /api/feedback/summary`
- `POST /api/feedback`
- `PATCH /api/feedback/:id/status`
- `POST /api/feedback/:id/comments`

## What to build next

These are the best next steps if you want this project to look strong on your resume:

1. Add authentication with JWT and role-based access
2. Add upvoting and duplicate detection
3. Create feedback detail pages with comments and history
4. Add charts for category and status analytics
5. Add unit tests for API routes and frontend components
6. Deploy frontend and backend separately

## Recommended build order

1. Get the current scaffold running locally
2. Confirm MongoDB connection works
3. Add authentication
4. Add a feedback details page
5. Add admin actions for changing status and priority
6. Add tests
7. Deploy

## Notes

- The server seeds starter records automatically when the collection is empty
- If the frontend cannot reach the backend, check `CLIENT_URL`, `VITE_API_URL`, and the Vite proxy config
- This starter uses JavaScript to keep setup simple; you can migrate to TypeScript later if you want
