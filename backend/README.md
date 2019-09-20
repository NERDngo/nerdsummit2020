# Nerd Summit Heroku/Google Sheets backend

The goal is to provide a backend service to serve Google Sheets data. This is composed of two parts: a Google Sheets script that will send data to the server everytime there's an update to the sheet. And an express server that receives that data, saves it to a database, and serves the most recent data as Json.

## The Secret
In order to prevent anyone from POSTing data to the server and having it serve that data on the site, we include a very simple password check. 

- The Google Sheets script sends a custom header `X-Secret` with a password. 
- In the set up of the Heroku application we set the same password as the `SECRET` environmental variable. 
- Any POST requests that come to the server without the proper secret are promptly rejected.

As long at the password remains secret and hard to guess (very long and randomized), this should serve to secure the application. In this scenario, the largest security concern is access to the Google Sheets script. If the password is hard-coded here, and can be viewed, it could be used to bypass the security and pollute the site.

## Heroku
Heroku provides a server and database that can be used to host the express application. Limits to the free account are 550 hours of "dyno hours" (this can be increased to 1000 for a verified account). It sleeps after 30 minutes of no use, and there are limits to the database size. There may be other limits that should be accounted for.

### Set up
- Create an account on [Heroku](https://signup.heroku.com/)
- Install the heroku [command line tools](https://devcenter.heroku.com/articles/heroku-cli)
- In the project repository run `heroku create`
- In order to install the postgres add-on run `heroku addons:create heroku-postgresql:hobby-dev`
- Run the database migration to create the one table `heroku run knex migrate:latest`
- Create the environmental variables:
    - `heroku config:set ENVIRONMENT=production`
    - `heroku config:set SECRET=<alongrandomstring>`
- Push a subtree to heroku `git subtree push --prefix backend heroku master`

## Google Sheets