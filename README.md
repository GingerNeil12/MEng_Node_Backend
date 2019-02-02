# MEng Node Back End

This project is the Node based part of the system for my Masters project. The overall project is about utilising an EA to help improve the automatic drawing of Venn/Euler Diagrams. 
Since the project needs to be web based, this part of the project is in relation to:
* Creating user profiles
* Saving diagrams
* Updating diagrams

The actual drawing and EA part is contained within a Java project since Node is not optimised for heavy processes. 

## How to use

The config folder containing the mongoURI and the secretOrKey as well as the passport config is not included in this git repo. You will need to make this yourself with your own settings. 

### Config

Create a folder called config in the main directory and add the following files to it:
* keys.js
* passport.js

the keys.js file should export the following:
* mongoURI: the mongoDb connection string
* secretOrKey: a word or phrase used for creation of the JWT

the passport.js should contain the settings for use of the passport library

## How to run

Once the config files have been created just open up a bash shell and type:
```
npm run server
```

This will run the nodemon server

### Libraries used

The following libraries were used in the creation of this project:
* express
* mongoose
* passport
* passport-jwt
* body-parser
* jsonwebtokens
* bcryptjs
* validator
* gravatar

And the following is used in the development env only:
* nodemon

#### Other Projects

The front end is done as a React.Js project at the following URL:

https://github.com/GingerNeil12/MEng_React_Frontend

The EA/Drawing alogrithm is a Java Spring project at the following URL:

#### Thanks

I would like to thank my team at Napier Uni for help in this project as well as my supervisor.
