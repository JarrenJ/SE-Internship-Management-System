Internship Management System
---

#### Initial Project setup
- Install Node.js (https://nodejs.org/en/download/)
- Install yarn (run in a terminal window) - `npm install --global yarn`
- Clone this project
- Open terminal window **in the project directory** and run `yarn install`
  - This will install all the dependencies and packages
  
## MySQL
- We are using a `.env` file. If you do not have this, reach out to Aaron or Jarren, they can explain what you need in it.
- The database is currently running on a Raspberry Pi 4 with MariaDB for dev purposes.

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
