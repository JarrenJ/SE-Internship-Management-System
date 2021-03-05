Internship Management System
---

#### Initial Project setup
- Install Node.js (https://nodejs.org/en/download/)
- Install yarn (run in a terminal window) - `npm install --global yarn`
- Clone this project
- Open terminal window **in the project directory** and run `yarn install`
  - This will install all the dependencies and packages
  
## Running Local MySQL Server Windows
###First time Setup
- Install MySQL Server (https://dev.mysql.com/downloads/installer/) the only thing you need is MySQL server
- Take the setup.sql file from MySQL Setup and put it in c:\
- Run command line as administrator and navigate to `c:\Program Files\MySQL\MySQL Server 8.0\bin`
- run `mysqld --init --console`
- Open a second command line as administrator and navigate to `c:\Program Files\MySQL\MySQL Server 8.0\bin`
- run `mysql -u root` to get in SQL
- run `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''`;
- run `source c:\setup.sql` 
###MySQL server
- Open a command line as administrator and navigate to `c:\Program Files\MySQL\MySQL Server 8.0\bin`
- run `mysql -u root`

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

---

#### Github Plans

- Assuming we decide to work on separate features, we should each checkout a branch to work on that feature
- Then you can open a Pull Request to merge your work into the `master` branch after it has been reviewed by other members of the group.
