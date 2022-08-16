# DRAGONS AND CHATS

## Description

This application is a Dungeons and Dragons chat room webpage. Users are able to make an account and then enter a chat room where they can connect with other indivuals who share their love for D&D. The theme of the application is a mixture of Stranger Things and D&D.  </br>

Dungeons and Chats is built following the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, the express-session npm package for authentication, and uses Socket.IO for its chat room function. All together, the site is built from scratch and deployed via Heroku. 

## Installation

1. Clone the Repository on to your machine.
2. Open the terminal and ensure you are in the right file path.
3. Run the command ```npm install``` to download the packages.
4. Run the following command at the root of your project and answer the prompted questions:

        `mysql -u root -p`

        Enter PW when promted

        `source db/schema.sql`

        `quit`

        `npm run seed`
        
        `npm start`

## ScreenShots

Homepage:

![image](/media/homepage.png)

Settings:

![image](media/Screenshot%202022-08-14%20202819.png)


## Deployed Site