<div align="center">

![Logo projektu](/logo3.png "Logo projektu")
  <h1>Restaurant Kameralna [BE]</h1>

  <p>
    Restuarant Kameralna project.
  </p>

<h4>
    <a href="https://kameralna.networkmanager.pl/">View Demo</a>
</h4>
<hr>
  <p>
    More information on the application described in [FE]
<h4>
    <a href="https://github.com/MWyso/RestaurantKameralnaFront/blob/main/README.md">Restuarant Kameralna [FE]</a>
</h4>
<hr>
  </p>
</div>

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)


## Technologies
**Backend** is created with:
* Node.js
* Express.js
* TypeScript
* Maria DB

## Setup

### Step1
``
$ git clone https://github.com/MWyso/RestaurantKameralnaBack.git
``
### Step2
***Database*** 
<br>
To import the database using [phpMyAdmin](http://localhost/phpmyadmin), follow these steps:

1. Open phpMyAdmin and connect to the server.
2. Create a new database and import the "db_kameralna.sql" file.
3. After completing the above steps, the database and values will be imported into your project.

***Environment Variables***
<br>
To configure environment variables in your project, follow these steps:

1. In the **config** folder, create a file named **config.ts** and open it.
Copy the contents of the config.example.ts file into it - this file contains example values for environment variables.
2. In the **config.ts** file, fill in the data for each environment variable value and save it.
3. After completing the above steps, the environment variables will be configured in your project.

### Step3
Use script from package.json
<br>
````
"scripts": {
"start": "ts-node index.ts",
"start:dev": "tsnd index.ts",
