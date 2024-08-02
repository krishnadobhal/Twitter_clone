# Twitter_clone

A FullStack clone of the popular social media platform Twitter built with Next.js and GraphQL.

<div>
  
<p><img align="left" src="https://github.com/user-attachments/assets/3f0f113d-7035-48fd-adcd-24b05a8596c5" width="435" height="300"/></p>
<p><img align="right" src="https://github.com/user-attachments/assets/2921ec1c-99c7-4163-bbb1-2275198739bf" width="435" height="300"/></p>

</div>

# Table of Content
  - [Features](#features)
  - [Tech Stack](#tech)
  - [Installation](#installation)
  - [Usage](#use)
    
<a name="features"><a/>
# Features

- User authentication (Sign up, Log in, Log out)
- Create, read tweets 
- Follow and unfollow users 
- Like and unlike tweets 
- User profile pages
- Posting Comment to a Specific tweet 
- Infinite scrolling for tweets feed

<a name="tech"><a/>
## Tech Stack

* Client

  * Next.js
  * React
  * Apollo Client
  * Tailwind CSS
  * Typescript
  * TanStack Query

* Server
 
  * Node.js
  * Express
  * Apollo Server
  * Prisma
  * GraphQL
  * PostgreSQL

* Authentication
  
  * JWT

<a name="installation"><a/>
# Installation

## Prerequisites
 * Node.js
 * PostgreSQL

## Backend Setup

1. Clone the repository:
```bash
  https://github.com/krishnadobhal/Twitter_clone.git
  cd Twitter_clone/server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a .env file in the backend directory with the following content:

```bash
DATABASE_URL = "postgresql://user:password@localhost:5432/twitter_clone "
AWS_SECRET_ACCESS_KEY = "your AWS_SECRET_ACCESS_KEY"
AWS_ACCESS_KEY_ID = " your AWS_ACCESS_KEY_ID"
AWS_DEFAULT_REGION = "your AWS_DEFAULT_REGION"

AWS_S3_BUCKET = "your AWS_S3_BUCKET key"
```
4. Run database migrations:
```bash
npx prisma migrate dev
```
5. Start the backend server
```bash
npm run dev
```

## Frontend Setup
1. Navigate to the frontend directory:
```bash
cd client
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm run dev
```
<a name="use"><a/>
## Usage
1. Open your browser and navigate to http://localhost:3000 to view the application.
2. Sign up for a new account or log in with an existing one.
3. Start tweeting!
