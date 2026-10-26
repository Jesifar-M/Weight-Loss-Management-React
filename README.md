# Weight Loss Management Site

## Project Description

A React-based Weight Loss Management website that allows users to create an account, login, add and manage weight records, and calculate weight loss between two dates.

## Technologies Used

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap
* React Router DOM
* JSON Server
* JSON

## Features

### 1. User Signup

Users can signup by providing:

* Name
* Email
* Password

### 2. Add Weight

Logged-in users can add their weight.

The current date is automatically added when the weight is saved.

The added time is also recorded.

### 3. One Weight Per Day

A logged-in user can add only one weight per day.

If the user tries to add another weight on the same day, an error message is displayed.

**Error Message:**

`You can add only one weight per day.`

### 4. View Weight List

Logged-in users can view the list of weights they have added.

Each weight record displays:

* Weight
* Date
* Added Time

### 5. Pagination

The weight listing page has pagination.

Five weight records are displayed per page.

Example:

`Previous  1  2  Next`

### 6. Find Weight Loss Between Two Dates

Users can find the weight loss between two selected dates.

**Formula:**

`Weight Loss = Starting Weight - Ending Weight`

Example:

Starting Weight: 70 kg
Ending Weight: 65 kg

Weight Loss: 5 kg

### 7. Edit and Delete Weight

Logged-in users can:

* Edit weight details
* Delete weight details

### 8. Logout

Logged-in users can logout from the website.

After logout, the user is redirected to the Login page.

## Demo Login

**Name:** Rahul
**Email:** [rahul@gmail.com](mailto:rahul@gmail.com)
**Password:** Rahul@123
