# Nerd Summit Heroku/Google Sheets backend

The goal is to provide a backend service to serve Google Sheets data. This is composed of two parts: a Google Sheets script that will instigate a fetch from the server everytime there's an update to the sheet. The express server fetches from Google Sheets, saves it to a database, and serves the most recent data as Json.

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
    - `heroku config:set API_KEY=<the api key from Google>`
    - `heroku config:set SHEETS_ID=<the id of the target Sheet>`
    - `heroku config:set SHEETS_RANGE=<the range of the Sheet cells, e.g !A:J>`
- Push a subtree to heroku `git subtree push --prefix backend heroku master`

## Google Sheets

### The Script
On the Google Sheet that will server as the data source go to `Tools->Script Editor`. Paste the `googleSheetsScript.js` content into the text field and save. You will have to enable and add permissions for the script.

### API Key
The simplest way to allow the application to read from Google Sheets is to create an API key in Google's API Console. https://support.google.com/googleapi/answer/6158862?hl=en

