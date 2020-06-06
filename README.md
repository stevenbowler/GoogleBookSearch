# GoogleBookSearch

### Overview
This is a MERN stack app that allows user to search for their favorite books on Google Book Search.  

### Overview

The MERNshell enables the coder/team to focus on their app while providing register/login capability complete with input validation, password encryption and private routes protection with JSON Web Tokens.

This project has afforded this programmer the opportunity to gain experience in development of full stack MERN apps including various technologies.  The Packages used include: [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [body-parser](https://www.npmjs.com/package/body-parser), [concurrently](https://www.npmjs.com/package/concurrently), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [express](https://www.npmjs.com/package/express), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose).

### User Documentation

1. Watch the video tutorial by clicking [this link](https://drive.google.com/file/d/1dXeXGydfJTvsE2GS7LnczJzTW0EKO-wS/view?usp=sharing). Then click [this link](https://drive.google.com/file/d/1_4N8HZdfe0iLeP5e1oFAKL5MQbadpiw6/view?usp=sharing).

2. Click [here](https://googlegooglebooksearch.herokuapp.com/) to see the Google Book Search app.

### Program Documentation

See [program documentation](https://stevenbowler.github.io/GoogleBookSearch/docs/index.html) in JSDOC format.

Link to the repository [here](https://github.com/stevenbowler/GoogleBookSearch/).

Requires [dotenv](https://www.npmjs.com/package/dotenv) to be installed and a `.env` file must be stored in the root directory for the app.  The `.env` file must contain the app owner's MongoDB URL with embedded username and password.  _*To use the same user database in development, testing and production then, it is critically important that the TOKEN_SECRET shown below be exactly the same string.*_
````
MONGODB_URI=your_mongodb_url_with_embedded_username_password
TOKEN_SECRET = any_random_string_but_always_use_same_string
````

To deploy to Heroku then following `git push heroku master` command, and before accessing the app page, will be necesary to set the two environmental variables with these commands from the Heroku CLI:
````
heroku config:set --app=mernshell MONGODB_URI=your_mongodb_url_with_embedded_username_password
heroku config:set --app=mernshell TOKEN_SECRET=any_random_string_but_always_use_same_string
````


## Available Scripts
[Connect Repo with Heroku Video](https://youtu.be/GgNcs9zlFSA?list=PLOFmg4xbN_TPrB6w4rThsFanVxJI_SfER)

Program is deployed to [Heroku](https://www.heroku.com).  Program uses [concurrently](https://www.npmjs.com/package/concurrently), so locally runs server on port 5000 and react app on port 3000.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).







