# LeadDesk Mini

A modern lead-capture and lead-management dashboard built with **Next.js, Tailwind CSS, Prisma, and PostgreSQL**.

LeadDesk Mini allows visitors to submit their project requirements through a public landing page, while administrators can manage, search, and update incoming leads from a dedicated dashboard.

---

## Features

### Public Landing Page

* Modern responsive landing page
* Glassmorphism UI
* Light and dark mode
* Lead capture form
* Client-side validation
* Server-side validation
* Name validation
* Email validation
* Budget range selection
* Message validation
* Success and error feedback
* Leads stored in PostgreSQL

### Admin Dashboard

* View all submitted leads
* Search leads by:

  * Name
  * Email
  * Message
  * Budget range
  * Status
* View lead statistics:

  * Total Leads
  * New Leads
  * Contacted Leads
  * Closed Leads
* Update lead status:

  * New
  * Contacted
  * Closed
* Loading states
* Refresh leads
* Responsive dashboard
* Light and dark mode
* Glassmorphism interface

---

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Lucide React

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL

### Database

* PostgreSQL

### Deployment

* Vercel
* Cloud PostgreSQL provider such as Neon

---

## Project Structure

```text
leaddesk-mini/
│
├── app/
│   ├── admin/
│   │   └── page.jsx
│   │
│   ├── api/
│   │   └── leads/
│   │       ├── route.js
│   │       │
│   │       └── [id]/
│   │           └── status/
│   │               └── route.js
│   │
│   ├── page.jsx
│   ├── layout.jsx
│   └── globals.css
│
├── components/
│   ├── AdminDashboard.jsx
│   ├── LeadForm.jsx
│   ├── LeadTable.jsx
│   ├── SearchBar.jsx
│   ├── StatCard.jsx
│   ├── StatusBadge.jsx
│   └── ThemeToggle.jsx
│
├── lib/
│   └── prisma.js
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│
├── .env
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

---

## Database Schema

The application uses a `Lead` model.

```prisma
model Lead {
  id           String   @id @default(cuid())
  name         String
  email        String
  budgetRange  String
  message      String
  status       Status   @default(NEW)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum Status {
  NEW
  CONTACTED
  CLOSED
}
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/leaddesk-mini.git
```

Move into the project directory:

```bash
cd leaddesk-mini
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
```

For a cloud PostgreSQL database, your connection string may look like:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

> Never commit your `.env` file to GitHub.

---

### 4. Generate Prisma Client

```bash
npx prisma generate
```

---

### 5. Run Database Migrations

For local development:

```bash
npx prisma migrate dev --name init
```

For production:

```bash
npx prisma migrate deploy
```

---

### 6. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Application Routes

### Public Landing Page

```text
/
```

Visitors can submit a lead through the lead form.

---

### Admin Dashboard

```text
/admin
```

The dashboard allows administrators to:

* View leads
* Search leads
* View statistics
* Change lead status

---

## API Routes

### Get All Leads

```http
GET /api/leads
```

Returns all leads.

---

### Create a Lead

```http
POST /api/leads
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "budgetRange": "$5,000 - $10,000",
  "message": "I need a modern business website."
}
```

---

### Update Lead Status

```http
PATCH /api/leads/:id/status
```

Example:

```http
PATCH /api/leads/cms0gwqip0000u5v04qnltihy/status
```

Request body:

```json
{
  "status": "CONTACTED"
}
```

Supported statuses:

```text
NEW
CONTACTED
CLOSED
```

---

## Validation

The lead form uses both client-side and server-side validation.

### Name

* Required
* Must not be empty

### Email

* Required
* Must be a valid email address

### Budget

* Required
* Must use one of the available budget ranges

### Message

* Required
* Must contain meaningful content

Server-side validation ensures that invalid requests cannot be inserted directly into the database.

---

## User Flow

```text
Visitor
   │
   ▼
Landing Page
   │
   ▼
Submit Lead Form
   │
   ▼
Client-Side Validation
   │
   ▼
Next.js API Route
   │
   ▼
Server-Side Validation
   │
   ▼
PostgreSQL Database
   │
   ▼
Admin Dashboard
   │
   ├── Search Lead
   ├── View Statistics
   └── Update Status
```

---

## Environment Variables

| Variable       | Description                           |
| -------------- | ------------------------------------- |
| `DATABASE_URL` | PostgreSQL database connection string |

Example:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

---

## Build for Production

Run:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Deployment

LeadDesk Mini can be deployed using:

* Vercel for the Next.js application
* Neon or another cloud PostgreSQL provider for the database

Production deployment flow:

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Next.js Application
   │
   ▼
Cloud PostgreSQL
```

Add the following environment variable in your deployment platform:

```text
DATABASE_URL
```

Then run the production migration:

```bash
npx prisma migrate deploy
```

---

## Future Improvements

Possible future features include:

* Admin authentication
* Role-based access control
* Lead assignment
* Email notifications
* Lead notes
* Lead activity history
* CSV export
* Pagination
* Advanced filters
* Analytics dashboard
* CRM integrations

---

## Assignment Requirements

This project fulfills the following requirements:

* [x] Public landing page
* [x] Lead capture form
* [x] Name field
* [x] Email field
* [x] Budget range field
* [x] Message field
* [x] Client-side validation
* [x] Server-side validation
* [x] Real PostgreSQL database
* [x] Admin dashboard at `/admin`
* [x] Lead listing
* [x] Lead search
* [x] Status management
* [x] New status
* [x] Contacted status
* [x] Closed status
* [x] Responsive UI
* [x] Light and dark mode

---

## Author

**Vaibhav Srivastava**

MCA Graduate | Full-Stack Developer

Built with Next.js, React, Tailwind CSS, Prisma, and PostgreSQL.

---

## License

This project is available for educational and portfolio purposes.
