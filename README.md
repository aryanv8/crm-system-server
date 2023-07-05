# crm-system-server

This repository contains the server side of the CRM system. It is a REST API built with Node.js, Express.js and MongoDB.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following variables:
   ```js
   PORT = 4000;
   MONGO_URI = "mongodb://localhost:27017/crm-system";
   ```
4. Run `npm start` to start the server

## API Endpoints

- ### User - `/user`

  | API                 | Type   | Description                                 |
  | ------------------- | ------ | ------------------------------------------- |
  | `/register`         | POST   | Creates a new user account                  |
  | `/all`              | GET    | Returns all the users                       |
  | `/image/:filename`  | GET    | Returns the file specified by `filename`    |
  | `/profile?id={_id}` | GET    | Returns the user with the specified `id`    |
  | `/login`            | POST   | Checks the credentials and returns the user |
  | `/update`           | PUT    | Updates user information                    |
  | `/delete/:id`       | DELETE | Deletes the user with the specified `id`    |
  | `/check-email`      | POST   | Check if the user with email exists, if yes then returns the userid |
  | `/update-password`  | PUT    | Changes the password using the email. Use md5 in password before sending the request (check Signup Page / Login Page) otherwise login will not be successful |
  | `/submit-feedback`    | POST  | Submits the feedback. Product id and user id are required to track who posted the feedback and about which product |

- ### Admin - `/admin`
  | API | Type | Description |
  | --- | --- | --- |
  | `/update-insights` | PATCH | Updates the insights data in the database |
  | `/insights` | GET | Fetches the insights stored in the database. **Does Not Fetch The Latest Data** |

- ### Product - `/product`
  | API                | Type   | Description                                  |
  | ------------------ | ------ | -------------------------------------------- |
  | `/add`             | POST   | Adds a new product                           |
  | `/`                | GET    | Returns all the products                     |
  | `/:id`             | GET    | Returns the product with the specified `id`  |
  | `/update/:id`      | PUT    | Updates the details of the product with `id` |
  | `/delete/:id`      | DELETE | Deletes the product with the specified `id`  |
  | `/image/:filename` | GET    | Returns the file specified by `filename`     |

## Team Members

| S. No. |       Name        | Reg. No.  |   Campus    |
| :----: | :---------------: | :-------: | :---------: |
|  1\.   |    Gokulnath V    | 20BIT0314 | VIT Vellore |
|  2\.   |   Poovarasan S    | 20BIT0315 | VIT Vellore |
|  3\.   |   Sudhankumar R   | 20BIT0316 | VIT Vellore |
|  4\.   | Aryan Vishwakarma | 20BKT0057 | VIT Vellore |
