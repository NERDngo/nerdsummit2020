# Nerd Summit Heroku/Google Sheets backend


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
    - `heroku config:set ENVIRONMENT=<alongrandomstring>`
- Push a subtree to heroku `git subtree push --prefix backend heroku master`
