# Restaurant Bolognese

The project aims to provide “Restaurant Bolognese” website to serve its customers for food orders and table reservation.

## Live Site

Web site is deployed into "https://****\*\*****.com" and can be accessible through [this link]("https://localhost:3000").

## Users

Users can sign-up to the restaurant web site, order dishes, save favorite dishes in their profile and see order history.

### Sign Up

User needs to register to the web site to be able to give order and/or make reservation. User needs to provide the following information:

- Name and Surname
- Email
- Password
- Address
- Phone Number

#### Name and Surname

1. Name of a user is mandatory during Sign Up.

#### Email

1. User needs to provide a valid email address.
2. Email can be changed in "User Profile" page.
3. Email should be unique in the database.

#### Password

1. password can be consist of combination of _Upper_ characters, _Lower_ characters, _digits_, and the following characters: "\_-?!=+-.".
2. password should be minimum 6 charactes.
3. password should contain at least 1 uppercase, 1 lowercase and 1 digit.
4. password can be changed through "User Profile" page.

### Sign In

After sign up, user is able to authenticate via username/password fields.

After 3 failure attempts, Captcha will appears for the user to prevent robot attacks.

### Profile

Every registered user has own Profile page. It provides information about the users likes, dislikes, history of orders.

User can change some personal information through Profile page like Email, Password and Address.

User can upload pictures or choose avatars provided by the system in Profile page.

## Tech-Stack

Web site is implemented in MVC design. The project is deployed into Node environment and having the tech stack of **Express**, **HBS**, **Mongoose**, **Bootstrap** and **MongoDB**. It also has middlewares for **authentication**, **authorisation**, **error_handling**, **session** and **cookies**.
