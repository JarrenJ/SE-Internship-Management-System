Internship Management System
---

#### Initial Project setup
- Install Node.js (https://nodejs.org/en/download/)
- Install yarn (run in a terminal window) - `npm install --global yarn`
- Clone this project
- Open terminal window **in the project directory** and run `yarn install`
  - This will install all the dependencies and packages

## Test Users
- Admin account:
  - user: admin
  - password: admin
- Faculty account:
  - user: neloe
  - password: password
- Student:
  - user: S528544
  - password: password

## MySQL
- Server.js reaches out to a .env file for MySQL server credentials. Run the setup.sql file to create default schema and load default values
.env layout
```
NODE_PATH=src
MYSQL_HOST=
MYSQL_USER=
MYSQL_PWD=
MYSQL_DB=ims
TOKEN_SECRET=12345
```

## Setting Up Local Dev Environment

**Option A** will require 2 terminal windows.

**Option B** only requires 1 terminal window.

**Option A** lets you see the output from the backend and the frontend in 2 seperate windows.

**Option B** lets you see the output from the backend and the frontend in 1 window.

---

### Option A
- Run `yarn server` to start a local express server (defaults to port 8000)
- Run `yarn client` to start a local client web server (default to port 3000)

### Option B
- Run `yarn dev` to start both the local server and local web server
