# Weight Loss Management Site


## Project Description

The Weight Loss Management Site is a web application developed using React.js and JSON Server. It allows users to register, log in, record daily weight, view weight history, calculate weight loss between dates, and manage their weight records.

## Technologies Used

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap
* React Router DOM
* JSON Server

## Features

1. User Signup
2. User Login
3. Add Daily Weight
4. Automatically Record Date and Time
5. Allow Only One Weight Entry Per User Per Day
6. Display an Error for Duplicate Daily Entries
7. View Weight History with Date and Time
8. Pagination for Weight Listing
9. Find Weight Loss Between Two Dates
10. Edit Weight Details
11. Delete Weight Records
12. Logout

## Installation and Setup

### Step 1: Open the Project Folder and Create a Local Database

```cmd
cd C:\Weight-Loss-Management-React
copy db.example.json db.json
```

The local `db.json` is ignored by Git so user accounts and weight records are not uploaded.

### Step 2: Install Dependencies

```cmd
npm install
```

### Step 3: Start JSON Server

Open a separate Command Prompt window and run:

```cmd
npx json-server db.json --port 5000
```

JSON Server runs at:

```text
http://localhost:5000
```

API endpoints:

* http://localhost:5000/users
* http://localhost:5000/weights

Keep this terminal open.

### Step 4: Start React Application

Open another Command Prompt window and run:

```cmd
set PORT=3000
npm start
```

Wait until React compiles successfully.

### Step 5: Open the Website

Open the following address in your browser:

http://localhost:3000

## Database

The application uses a local `db.json` to store user accounts and weight records. Start with the empty `db.example.json` template; the local database is not committed.

### Users

Each user record contains an ID, name, email, and password.

### Weights

Each weight record contains an ID, user ID, weight, date, and time.

## Author

**Jesifar M**
