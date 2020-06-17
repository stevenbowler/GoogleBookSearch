# GoogleBookSearch

### Overview
Search For and Save Your Books With the Google Book Search.  

### Overview

The Google Book Search app enables the user to search for books based on any topic, title, author or combination thereof, using `Google Books API Search`.  Users can search, save, recall and delete their favorite books either as their own notes or as a specific book found by the Google Books API search.

This program was developed by Steven Bowler for the purpose of gaining experience developing a full-stack app employing best-practices for executing the [Model-View-Control](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) software development pattern.  Additionally, the project provides this programmer the opportunity develop skills in creating and deploying a functional full-stack app on [Heroku](https://www.heroku.com), integrating [SocketIO](https://www.npmjs.com/package/socket.io),[ExpressJS](https://www.npmjs.com/package/expressjs),[Mongoose](https://www.npmjs.com/package/mongoose) and [Axios](https://www.npmjs.com/package/axios), [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [body-parser](https://www.npmjs.com/package/body-parser), [concurrently](https://www.npmjs.com/package/concurrently), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [express](https://www.npmjs.com/package/express), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). _*`Enjoy`*_.


This project has afforded this programmer the opportunity to gain experience in development of full stack MERN apps including various technologies.  The Packages used include: , [mongoose](https://www.npmjs.com/package/mongoose).

### User Documentation

1. Watch the video tutorial by clicking [this link](https://drive.google.com/file/d/1pMIpAHzZumuAqCgBHyNImCm_faikkTYn/view). 

2. Click [here](https://googlerbooksearch.herokuapp.com/) to see the Google Book Search app.

Program uses Socket.io to message each of the sessions the total number of users currently on-line as either Guest or logged-in as Member and show the number of users on-line on the Navbar.  The number of users shown is updated with each user action, so if a user drops their session, the Navbar will update once each user of the other sessions performs an update in the form of Search, show Saved, Save, Login or Logout.  

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


Directory structure is as follows:

```
.
│ 
├── client
│   └── public
│   └── src
│       ├── components
│       │   └── various
│       └── pages
│       │   └── Book.js
│       │   └── Search.js
│       │   └── Save.js
│       │   └── GoogleDetail.js
│       │   └── Detail.js
│       └── utils
│           └── API.js
│ 
├── controller
│   └── booksController.js
│   └── userController.js
│
├── docs
│
├── jsdoc.json
│
├── models
│   └── index.js
│         └── Book.js
│         └── Note.js
│ 
├── node_modules
│ 
├── package.json
│ 
├── privateRoutesAuth.js
│
├── routes
│   └── api
│         └── index.js
│         └── books.js
│         └── users.js
│
├── server.js
│
├── validation.js
│

```



[Connect Repo with Heroku Video](https://youtu.be/GgNcs9zlFSA?list=PLOFmg4xbN_TPrB6w4rThsFanVxJI_SfER)

Program is deployed to [Heroku](https://www.heroku.com).  Program uses [concurrently](https://www.npmjs.com/package/concurrently), so locally runs server on port 5000 and react app on port 3000.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).







