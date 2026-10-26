# Weight Loss Management Site

**Project Name:** Weight Loss Management Site
**Prepared By:** Jesifar M
**Project Type:** React Web Application

---

## 1. Project Description

The Weight Loss Management Site is a web application developed using React.js and JSON Server. It allows users to register, log in, add their daily weight, view weight records, calculate weight loss between two dates, and edit or delete their weight details.

The application helps users track their weight changes over time.

## 2. Technologies Used

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap
* JSON Server
* React Router DOM
* JSON

## 3. Project Features

### 3.1 User Signup

* Users can create a new account by entering their details.
* User information is stored in the database.
* Duplicate email registration should be prevented.

### 3.2 User Login

* Registered users can log in using their email and password.
* Invalid login details should display an error message.
* Only logged-in users should be able to access protected pages.

### 3.3 Add Weight

* Logged-in users can add their weight in kilograms.
* The current date is automatically added.
* The time of the weight entry is recorded.
* Weight details are stored in the database.

### 3.4 One Weight Entry Per Day

* Each user can add only one weight record per day.
* If the user tries to add another weight on the same day, an error message is displayed.

**Example error message:**

`You can add only one weight per day.`

### 3.5 View Weight List

* Users can view their previously added weight records.
* Each record displays the weight, date, and time.
* Users should only be able to view their own weight records.

### 3.6 Pagination

* Weight records are displayed across multiple pages when necessary.
* Users can navigate between pages to view additional records.

### 3.7 Find Weight Loss Between Two Dates

* Users can select a starting date and an ending date.
* The application retrieves the weight records within the selected date range.
* The weight loss is calculated using the starting and ending weights.
* At least two matching weight records are required for the calculation.

**Formula:**

Weight Loss = Starting Weight − Ending Weight

**Example:**

Starting Date: 2026-10-25
Ending Date: 2026-10-26
Starting Weight: 60 kg
Ending Weight: 50 kg

**Total Weight Loss: 10 kg**

### 3.8 Edit Weight Details

* Users can edit their existing weight records.
* Updated details are saved to the database.
* The weight list displays the updated information.

### 3.9 Delete Weight Details

* Users can delete their existing weight records.
* Deleted records are removed from the weight list.
* Users should only be able to delete their own records.

### 3.10 Logout

* Users can log out of the application.
* After logout, users are redirected to the login page.
* Protected pages should not be accessible without logging in.

---

## 4. Project Structure

```text
weight-loss-management-react/
│
├── public/
├── src/
│   ├── pages/
│   │   ├── AddWeight.js
│   │   ├── FindWeightLoss.js
│   │   └── WeightList.js
│   │
│   ├── App.js
│   └── index.js
│
├── db.example.json
├── package.json
└── README.md
```

*Note: This is an example structure. Actual filenames and folders may differ depending on the project implementation.*

---

## 5. Installation and Execution

### Prerequisites

* Node.js
* npm
* Visual Studio Code or another code editor
* A web browser

### Step 1: Open the Project Folder

Open Command Prompt or the VS Code terminal and execute:

```bash
cd C:\REACT-Node.js\weight-loss-management-react
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start JSON Server

Create a local database file from the example:

```powershell
Copy-Item db.example.json db.json
```

Open a terminal in the project folder and execute:

```bash
npx json-server --watch db.json --port 5000
```

Keep this terminal running.

**JSON Server URL:**

`http://localhost:5000`

### Step 4: Start the React Application

Open a second terminal in the project folder and execute:

```bash
npm start
```

**Application URL:**

`http://localhost:3000`

If the browser does not open automatically, open the application URL manually.

---

## 6. Sample Login Details

Create an account using the signup page before logging in. The local database file is excluded from Git because it may contain private account and weight data.

| Field | Value |
| --- | --- |
| Name | Demo User |
| Email | `demo@example.com` |
| Password | Create your own password when signing up |

These are example details only; no preconfigured demo account is included in the repository.

---

## 7. Testing

The following test cases should be checked to verify the application.

| No. | Test Case                            | Expected Result                      |
| --- | ------------------------------------ | ------------------------------------ |
| 1   | Register a new user                  | Account is created successfully      |
| 2   | Register with an existing email      | Error message is displayed           |
| 3   | Log in with valid credentials        | Login is successful                  |
| 4   | Log in with invalid credentials      | Error message is displayed           |
| 5   | Add a weight record                  | Weight, date, and time are saved     |
| 6   | Add another weight on the same day   | Duplicate-entry error is displayed   |
| 7   | View the weight list                 | User's weight records are displayed  |
| 8   | Check weight dates and times         | Correct date and time are displayed  |
| 9   | Navigate through pagination          | Records can be viewed across pages   |
| 10  | Find weight loss between two dates   | Weight loss is calculated correctly  |
| 11  | Edit a weight record                 | Updated weight is displayed          |
| 12  | Delete a weight record               | Record is removed from the list      |
| 13  | Log out                              | User is redirected to the login page |
| 14  | Access a protected page after logout | User is redirected to login          |

### Example Weight Loss Calculation

Starting Weight = 60 kg
Ending Weight = 50 kg

Weight Loss = 60 − 50

**Result: 10 kg weight loss**

---

## 8. Conclusion

The Weight Loss Management Site is designed to help users record and monitor their daily weight. The application includes user registration, login, automatic date and time recording, daily duplicate-entry prevention, weight-list pagination, weight-loss calculation between two dates, editing and deleting records, and logout functionality.

The project demonstrates the use of React.js for frontend development and JSON Server for data storage and API operations.
