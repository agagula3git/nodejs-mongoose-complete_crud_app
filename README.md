# Node.Js Complete Crud App - The Register of Members
 
## Requirements 
* express @4.17.1
* body-parser @1.19.0
* express-handlebars @5.2.1
* mongoose @5.3.4
* nodemon @2.0.7

## General Info

Complete crud app that is used to register members and keep their information in a table. If you wanna register a new member you are required to enter the basic information through the simple form. The table of registered members is on the homepage and you can change its content at any time.  
The layout of home page is given by the following image:  
  
<img src="images/test1.PNG" width="50%" height="50%">   
From the homepage, you can get to the registration page by clicking on the Create new button.  
  
   
<img src="images/test2.PNG" width="50%" height="50%">

## Installation
Create a package.json file
```bash
npm init
```

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults.

After you create a package.json file, install Express in the project directory and save it in the dependencies list with the following command:

```bash
npm i --s express@4.17.1
```

Assuming you’ve already installed MongoDB, in command prompt enter the following command for installation a MongoDB object mongoose:

```bash
npm install mongoose@5.3.4
```

You will need to install body parsing middleware as well, which is responsible for parsing the incoming request bodies in a middleware before you handle it.
```bash
npm install body-parser
```

To install a path module for handling and transforming file paths, perform the following command line:
```bash
npm install --s path
``` 

For this project you will need a Handlebars view engine for Express, which helps to embed JavaScript to HTML pages.
```bash
npm install express-handlebars
```

To start the server, go to your terminal and type:
```bash
node app.js
```
This will start the server. This application will listen on port 3000.

## Usage
Include the express module in your main js file by typing the following code:

```python
const express = require('express')
```
Before you start using Express, you need to define an instance of it, which handles the request and response from the server to the client. In this case, it is the variable app.

```python
const app = express();
```

Now you could type the following code to check if everything is OK with the installation of needed packages.
```python
app.get('/', (req, res)=>{
    res.send('Hello World');
}) .listen(3000, ()=>{
    console.log('Server started on port 3000. Good luck!');
})
```
To start the server, go to your terminal and type:
```bash
node app.js
```
This will start the server. This single-page application will listen on port 3000. 
If everything is ok, you should see the message in your terminal: 
```python
Server started on port 3000. Good luck!
```
To include mongoose tool in our project, you need to type the following code:
```python
const mongoose = require('mongoose');
```
Considering that our app uses only one database, you should use mongoose.connect to define a connection. Connect take a mongoDB//URI, options and the callback function.
In the apart file called db you should define Model through the Schema interface and export it for use in the main file.
```python
const MemberSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    telephone:  {
        type: String
    },
    address: {
        type: String
    }
}, {collection: 'members-collection'}
);

const model = mongoose.model('MemberModel', MemberSchema);
module.exports = model;
```
To import created model from members.js file, use the following code:
```python
const Members = require('./models/members');
```
In Studio 3T create new connection with the following data - name and DB server. After you create the connection, you need to add a database for storing data that are forward through input form.
      
Studio 3T is the professional IDE, client, and GUI for MongoDB. You could visit the following link for downloading this IDE. 
[Download Studio 3T](https://studio3t.com/download/)  
  
Code below are used to parse the incoming request bodies in a middleware before you handle it.

```python
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
```
The main layout is the HTML page wrapper which can be reused for the different views of the app. {{{body}}} is used as a placeholder for where the main content should be rendered.  
The following code sets up an Express app to use .hbs as the file extension for views:
```python
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
```
