# Weight Loss Management Site

**Project Type:** React Web Application

## 1. Project Description

A React-based web application that helps users record daily weight, view weight history, calculate weight loss, and manage weight records.

## 2. Technologies Used

* React.js
* JavaScript
* HTML5 and CSS3
* Bootstrap
* React Router DOM
* JSON Server
* JSON

## 3. Features

* User Signup and Login
* Add Weight with Automatic Date and Time
* One Weight Entry Per Day
* View Weight Records
* Pagination
* Find Weight Loss Between Two Dates
* Edit and Delete Weight Records
* Logout
* Input Validation and Error Messages

## 4. GitHub Repository

**Source Code:**
https://github.com/Jesifar-M/Weight-Loss-Management-React

## 5. Prerequisites

* Node.js
* npm
* Web browser

## 6. How to Run the Project

**Step 1: Open the project folder**

```bash
cd weight-loss-management-react
```

**Step 2: Install dependencies**

```bash
npm install
```

**Step 3: Start JSON Server**

```bash
npx json-server --watch db.json --port 5000
```

**Step 4: Start React in a second terminal**

```bash
npm start
```

**React Application:** http://localhost:3000

## 7. Demo Login

Use these credentials if the account exists in `db.json`.

* **Name:** Rahul
* **Email:** [rahul@gmail.com](mailto:rahul@gmail.com)
* **Password:** Rahul@123

If the account is unavailable, register through the Signup page.

## 8. Weight Loss Calculation

**Formula:** Weight Loss = Starting Weight − Ending Weight

**Example:** 60 kg − 50 kg = **10 kg weight loss**

At least two matching weight records are required.

## 9. Testing

| Test Case             | Expected Result              |
| --------------------- | ---------------------------- |
| Signup                | Account created              |
| Valid Login           | Login successful             |
| Invalid Login         | Error displayed              |
| Add Weight            | Weight, date, and time saved |
| Duplicate Daily Entry | Error displayed              |
| View Weight Records   | Records displayed            |
| Pagination            | Navigate between pages       |
| Find Weight Loss      | Weight loss calculated       |
| Edit Weight           | Record updated               |
| Delete Weight         | Record removed               |
| Logout                | Redirected to login          |

## 10. Troubleshooting

* If React does not open, check whether `npm start` is running.
* If data does not load, check whether JSON Server is running.
* If login fails, verify the credentials and database.
* If dependencies are missing, run `npm install`.

## 11. Conclusion

This project demonstrates a React-based weight management application with user authentication, weight tracking, pagination, weight-loss calculation, and weight record management.
