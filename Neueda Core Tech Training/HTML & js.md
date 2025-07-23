# HTML, CSS & Javascript

## Overview

### HTML, the Uncompilable Document

HTML4 first emerged in 1999, which is standardized by the Worldwide Web Consortium (or W3C). HTML5 launched in 2007 and introduced several new features (e.g. native audio & video, new input controls, graphics, geolocation, web sockets, web stroage, web workers and Ajax improvements), simplifying `DOCTYPE` declarations.

A common structure in HTML5 is as follows, which has been enable to render a complete `.html` page. `<head></head>`, the tags, represent the head elements which contains the meta data of the HTML document. `<body></body>` the tags stand for visible webpage content.

```html
<!DOCTYPE html>
<html>
    <head>
        <style></style>
        <meta charset="utf-8">
        <title>Title</title>
    </head>
    <body>
        <h1>Headings 1</h1>
        <p>Paragraph</p>
    </body>
</html>
```

### CSS

Having been introduced in HTML4, CSS allows developers to define styles for HTML elements.

CSS can be categorized into 3 types &mdash;

- **External**: applicable to entire page wherever it's referenced
- **Internal**: applicable to entire page wherever it's written
- **Inline**: applicable only to contents with the tag

Think about the following code in a HTML document. This could be an example of internal CSS in that it uses CSS inside the document and will apply to all `body` and `h2` elements in the page &mdash; for external CSS, use tag `<link rel='' href=''>` in the `<head>` section.

```html
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h2 {
            color: #333;
        }
    </style>
</head>
```

For Inline CSS, the most commonly-used CSS methods for me myself, separate element customization can be reached it will also overwrite CSS styles defined by the internal ones.

```html
<h2 style="color: red;">Headings 2</h2>
```

> Do **NOT** write HTML contents in External CSS file.

### Javascript

A scripting language usually embedded directly (or linked) into HTML pages. It's used to make HTML pages interactive, react to events, update the content of the HTML document and validate data before it's submitted to a server in order to save unnecessary roundtrips.

> HTML defines the template of a web page while CSS defines the page's theme, styles and color, and Javascript provides support for user-interactive events.

## Javascript, the Programming Language

> Code blocks in this section will be **Raw** ones in Javascript.

### NodeJS in Brief

Javascript was largely a technology used in the client side elements of web applications up until 2009. However, the release of NodeJS in 2009 provided a framework that allowed server side applications to also be developed using Javascript, meaning that an application could be entirely-built using Javascript from then on.

NodeJS uses Google V8 Javascript Engine &mdash; its architecture is event driven and the I/O can be asynchronous, which is ideal for building ***scalable*** and performant Web applications. The framework allows you to create additional libraries and then these can be shared and managed using the **Node Package Manager** (or **NPM**).

To install NodeJS, download files for all OSs from [the official site for stable version](https://nodejs.org/en/download).

```json
// package.json
{
    "name": "jsDemo",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "Gu",
    "license": "ISC",
    "description": ""
}
```

### Basic NodeJS

#### Web Server

Initialize the NodeJS workspace by `npm init -y` first. All NodeJS files will take the following steps above all &mdash;

**Step 1** &mdash; import the HTTP module.

```javascript
const http = require('http');
```

**Step 2** &mdash; create HTTP server.

```javascript
const server = http.createServer((req, res) =>
{
    res.statusCode = 200; // The status code of response
    res.setHeader('Content-Type', 'text/plain'); // The content being sent to the client is plain text
    res.end('Hello from node.js\n'); // End of response
});
```

> Any function name in Java should start from lower case and use capital letters for a new word's initial &mdash; the **lowerCamelCase** cliché has turned a **rule** in Javascript.

**Step 3** &mdash; start `server`, the server.

```javascript
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`); // Make sure the server has been running already
});
```

> Convention has it that `PORT`, the variable standing for the server port, should be **all-capped**. To mention a variable in a string to output, use `${variable_name}` inside **backsticks** (rather than quotes).
> Do **NOT** break line before & after `=>`, the *equal to* sign.

Run codes combining the 3 steps above and check `http://localhost:3000` as instructed by the terminal. The site will feature a message saying `Hello from node.js`, meaning that the JS file has been completely configured.

The execution of example above will be finished when HTTP requests come in on port 3000.

> Refreshing the website will **NOT** change anything in the page &mdash; you need to restart the server first after modification to the JS file by stop running the file-running in terminal. To avoid the problem, try install `nodemon` by command `npm install -g nodemon` in terminal &mdash; it will make corresponding changes to the server when changes are made in JS file itself.

For *Step 2* above, if we are to read files from HTML (suppose it's `index.html`) and give response to the port we previously mentioned, a JS file should follow the steps below.

**Step 2.1** &mdash; create HTML page. Suppose the page to create is `index.html`.

**Step 2.2** &mdash; connect the HTML page with NodeJS.

```javascript
const path = require('path');
```

**Step 2.3** &mdash; connect to path.

```javascript
const filePath = path.join(__dirname, 'index.html');
```

**Step 2.4** &mdash; read file stream.

```javascript
const fs = require('fs');
```

**Step 2.5** &mdash; create the `server` and read file.

```javascript
const server = http.createServer((req, res) => {
    fs.readFile(filePath, (error, content) => {
        res.writeHead(200, {'Content-Type': 'text/html'}); // text/json is also acceptable, basing on the file type
        res.end(content);
    });
});
```

Then return to *Step 3* above. The localhost page will feature `index.html`, the HTML file we expect.

The JS steps to read files is, beyond doubts, not meaningless &mdash; it's of great help when seeking to make redirects for some occasions where the developers forgot to create `index.html`, the default and **compulsory** file of a site.

#### JSON API Server

**JavaScript Object Notation** (or **JSON**) is a lightweight data-interchange format easy for humanbeings to read and write and simple for machines to parse and generate.

> Please initialize the NPM first by using the command `npm init -y`.

Here's an example of an API using Node.js's built-in HTTP module.

```javascript
const http = require('http');
const data = {
    name: "Node.js",
    type: "Runtime",
    language: "JavaScript",
}
const server = http.createServer((req, res) => {
    if(req.url === '/api') {
        // A basic API endpoint at /api that returns a JSON object describing Node.js
        res.writeHead(200, {'Content-Type': 'application/json'}); // ONLY json accepted in that it's API
        res.end(JSON.stringify(data));
    }
    else {
        // All other routes return a 404 error
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});
```

Similar with that for web server, import the HTTP module above all. Then try to get the URL we're going to request &mdash; if the URL is `http://localhost:3000` only, it should return a not-found page with error message `Not Found`; the page will return the in-string value of `data`, the JSON object describing `Node.js` otherwise.

In other words, as is implied by the code block above, the API's URL will be `http://localhost:3000/api`.

#### REST API, Using Express

Express is a web application framework for NodeJS that simplifies the process of building web servers and APIs by providing a set of features and utilities for handling HTTP requests, routing, middleware, etc.

RESTful APIs can be easily created via Express, example given in the code block below.

> Use command `npm install express` above all.

```javascript
// index.js
'use strict';

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

// data, in-memory
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
];

// middleware to parse JSON bodies
app.use(express.json());
// mandatory step - path for html
app.use(express.static(path.join(__dirname, 'public')));
// GET endpoint to retrieve all users
app.get('/users', (req, res) => {
    res.json(users);
});
// POST endpoint to add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1; // simple ID assignment
    users.push(newUser);
    res.status(201).json(newUser);
});
```

The page will display `Cannot GET /` on `localhost:3000` and `[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Smith"},{"id":3,"name":"Alice Johnson"}]` on `localhost:3000/users` in that the page only provides API services in `/users`.

> Think about code blocks for JSON API and REST API. Why is the data type different?

We can clearly figure out that we need to add or remove users in the REST API case. That's why we drop `const` (constant) and pick `let` to define the variable.

#### GET, the Request for HTML's Fetching

To make the API we created in the past chapter, we should create `index.html` in `public` folder &mdash; the Javascript code has set `public` as a static resource directory, and Express will look for `public/index.html` the file by default therefore.

Now think about how HTML can get information from the backend API &mdash; take the HTML document below as an example, basing on `index.js` in the previous chapter. We can use `fetch('/users')` to send a `GET` request to `/users` endpoint of **the server** in pursuit of users' information; The response will be encoded in JSON format. Then analyze the data of users we received by traverse `users`, the array, to get every element in the array (a.k.a. List Item or `li`) and add them to the list of the frontend page.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- ... -->
    </head>
    <body>
        <h1>List of users</h1>
        <ul id="userlist"></ul>
        <script>
            const userlist = document.getElementById('userlist');
            const userForm = document.getElementById('addUserForm');
            const username = document.getElementById('username');

            // Connect to API...
            function getAllUsers(){
                fetch('/users')
                .then(res => res.json())
                .then(users => {
                    userlist.innerHTML = '';
                    users.forEach(u => {
                        const li = document.createElement('li');
                        li.textContent = u.name;
                        userlist.appendChild(li);
                    });
                })
            }
            getAllUsers();
        </script>
    </body>
</html>
```

The bold word, *the server*, in the paragraph above the code block, also highlights a fact that **one should run the Javascript file before we open HTML file for preview** &mdash; it is necessary to fetch data from the server we just started by NodeJS.

#### POST, the Operation for HTML's Sending

> Suppose an additional occasion where we need to add some names of users to the list we have got in the section above. How can we send things to API?

Beyond doubts, we need to send the data of input upon a user click a button to add itself to the list. The signal that button sends after click can be taken as a ***event*** &mdash; we can keep *listening*, waiting for the occurence of the event, and take actions once the event-signal emerged.

Take the code block below as example. We first get what the user input in the text box, and raise an HTTP `POST` request which targets at `/users` and has claimed its content type as JSON to the server via `fetch`. The server then add the user to the in-memory array and return status code `201` with the new user as an object via `app.post(/users)`. The function sends the user's name in string format afterwards &mdash; then it clears the input field upon the adding's completion. The user list will be refreshed after the input field is cleared.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
    <head><!-- ... --></head>
    <body>
        <form id="addUserForm">
            <input type="text" id="username" placeholder="Enter username" required>
            <button type="submit">Add User</button>
        </form>
        <script>
            addUserForm.addEventListener('submit', function(e){
                // e for event.
                e.preventDefault(); // prevent the default form submission behavior
                // Read the data from the input box
                const name = username.value;
                if(!name) return; // if no name (name is null), do not submit anything
                // Post name to API...
                fetch('/users', {
                    method: 'POST', // clarify the method as POST to avoid mistaking it as GET by system
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name }) // send the name in JSON as string
                })
                .then (res => res.json())
                .then (() => {
                    username.value=''; // Clear the input field after addings
                    getAllUsers(); // refresh the user list after adding a new user
                })
            });
        </script>
    </body>
</html>
```

> `POST` request should use `fetch` with clarification of its type in avoidance of being mistaken as `GET`.

Now combine both `GET` and `POST` functions together as [a single file](https://github.com/K-PK66/HSBCLRNEXP/raw/refs/heads/main/Neueda%20Core%20Tech%20Training/OFLLRNEXPSMPL/rest_api_demo/public/index.html). The page `localhost:3000`, up to now, will be able to add new user to the list of users we fetched in the previous chapter and will have been capable of displaying the live update.

> **Practice:**
>
> 1. Develop an API to store movie information in JSON format.
> 2. Develop an HTML page to obtain movie info from the API.
> 3. Develop an HTML form to submit movie info to API and then show the entire list on the page.

Check the files as answers from [the link](https://github.com/K-PK66/HSBCLRNEXP/tree/main/Neueda%20Core%20Tech%20Training/OFLLRNEXPSMPL/get_post_rest_api_practice).

#### GET & POST REST API, Integrated with MySQL

> Please read [notes for SQL](https://github.com/K-PK66/HSBCLRNEXP/raw/refs/heads/main/Neueda%20Core%20Tech%20Training/SQL%20skills/noteSQL.md) first to acquire a proper command of MySQL before digging into this section.

Think about the files before the Practice of previous chapter &mdash; it's possible to connect the HTML file with database created by MySQL when listing the users.

> Use `npm install express mysql body-parser` the command in bash to enable MySQL.

Beyond no doubt, the connection should feature API, HTML and MySQL database. Suppose there have been a SQL file as below already, now let's focus on how to make the connection.

```sql
CREATE DATABASE IF NOT EXISTS myApp;
USE myApp;
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO users(name) VALUES ('Jack');
```

Use the same approach to call `mysql` and `body-parser` in Javascript. Then connect the database after clarifying the username and password to the MySQL server for database &mdash; error message should pop up when the connection fails.

We are also supposed to convert what we have got to JSON via `bodyParser` of middleware. We can ask the server identify different methods of data-processing (like `GET`, `PUT`, `POST` and `DELETE`) by recognizing whether there's some additional information and how the bonus info may look like.

See the matching Javascript file by [this link](https://github.com/K-PK66/HSBCLRNEXP/raw/refs/heads/main/Neueda%20Core%20Tech%20Training/OFLLRNEXPSMPL/rest_api_sql/index.js).

> Type command `npm uninstall mysql` and `npm install mysql2` if the Javascript file reported an error when running.

The HTML file can be reached by [this link](https://github.com/K-PK66/HSBCLRNEXP/raw/refs/heads/main/Neueda%20Core%20Tech%20Training/OFLLRNEXPSMPL/rest_api_demo/public/index.html). It can be checked that there will be two buttons saying `Update` and `Delete` for every entry we added &mdash; both of them can be used only once in that the HTML document will call `getAllUsers()` the function after the `update` action, which will make a local re-query on SQL.

#### Common JavaScript Functions

| Function             | Category        | Description                                              | Example Usage                     |
|----------------------|-----------------|----------------------------------------------------------|-----------------------------------|
| `alert()`            | Dialog / UI     | Shows an alert dialog with a message.                    | `alert("Hello!")`                 |
| `prompt()`           | Dialog / UI     | Asks user for input.                                     | `let name = prompt("Enter name")` |
| `confirm()`          | Dialog / UI     | Displays OK/Cancel dialog, returns true or false.        | `let result = confirm("Continue?")` |
| `parseInt()`         | Conversion      | Converts string to integer.                              | `parseInt("123")`                 |
| `parseFloat()`       | Conversion      | Converts string to floating point number.                | `parseFloat("3.14")`              |
| `isNaN()`            | Validation      | Returns true if the value is NaN.                        | `isNaN("abc")`                    |
| `isFinite()`         | Validation      | Checks if a number is finite.                            | `isFinite(123)`                   |
| `eval()`             | Execution       | Executes a string as JavaScript code. (Use with caution) | `eval("2 + 2")`                   |
| `setTimeout()`       | Timing          | Runs function after delay (once).                        | `setTimeout(() => alert("Hi"), 1000)` |
| `setInterval()`      | Timing          | Runs function repeatedly after delay.                    | `setInterval(myFunction, 2000)`   |
| `clearTimeout()`     | Timing          | Cancels a timeout set with setTimeout.                   | `clearTimeout(timerId)`           |
| `clearInterval()`    | Timing          | Cancels an interval set with setInterval.                | `clearInterval(intervalId)`       |
| `Date()`             | Date/Time       | Returns current date/time.                               | `let now = new Date()`            |
| `Math.random()`      | Math            | Returns a random number between 0 and 1.                 | `Math.random()`                   |
| `Math.floor()`       | Math            | Rounds down to nearest integer.                          | `Math.floor(4.9)`                 |
| `Math.ceil()`        | Math            | Rounds up to nearest integer.                            | `Math.ceil(4.1)`                  |
| `Math.round()`       | Math            | Rounds to the nearest integer.                           | `Math.round(4.5)`                 |
| `Math.max()`         | Math            | Returns largest of the numbers.                          | `Math.max(1, 5, 3)`               |
| `Math.min()`         | Math            | Returns smallest of the numbers.                         | `Math.min(1, 5, 3)`               |
| `Number()`           | Conversion      | Converts value to number.                                | `Number("45")`                    |
| `String()`           | Conversion      | Converts value to string.                                | `String(45)`                      |
| `Boolean()`          | Conversion      | Converts value to boolean.                               | `Boolean(0)`                      |
| `typeof` (operator)  | Type Checking   | Returns type of a variable or value.                     | `typeof 123`                      |
| `Array.isArray()`    | Array Utility   | Checks if a value is an array.                           | `Array.isArray([1, 2, 3])`        |
| `Object.keys()`      | Object Utility  | Returns array of object’s keys.                          | `Object.keys({a: 1, b: 2})`       |

## Embedded Javascript in HTML

We can embed a javascript script by `<script></script>` tag in the `<head>` section.

```html
<script>
window.onload = function() {
    document.body.style.backgroundColor = "#99f9";
};
</script>
```

Before digging into how javascript can function in a HTML document, let's started by making what an HTML document may contain clear.

### HTML Making

As mentioned in [the overview chapter](#html-the-uncompilable-document), an HTML document is a compound of HTML document itself and CSS file (if any) which features elements defined by tags. Thus, the process of making HTML files is essentially that of defining different elements and combining them into one single file.

> Think about a very simple webpage with title, featuring various headings, images and paragraphs. What will the webpage contain and how will they be styled?

Normally we use tag `<h1></h1>`, `<h2></h2>`, `<h3></h3>`, ..., `<h6></h6>` to define headings. The smaller number the `h` is with, the higher priority the headings created would be. Use `<img src="url_of_image" alt="name_of_image">` the tag to keep an image in the webpage and `<p></p>` the tag pair to define a paragraph. We can add inline CSS to the tags to keep tags in different styles, shown in the example below.

```html
<!-- about.html -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h1>About Us</h1>
<img src="https://railgallery.ru/photo/02/86/66/286664.jpg" alt="SS9"/>
<p>Xi'an Metro (Loop) Line 8, also named Xi'an Metro Line 8 or Xi'an Metro Loop Line, is a loop line of Xi'an Metro built in 2024.</p>
<div style="float: right;">
    <a href="register.html" style="color: white;">Sign Up Now　ユーザー登録</a><br>
    <a href="infoRecord.html" style="color: white;">Information Record　情報レコード</a><br>
</div>
</body>
</html>
```

It's also possible to define the webpage template in `<head>` section, using internal CSS. Remember: **Inline CSS will overwrite the tagged paragraph, which was formally styled as instructed by in- or ex-ternal CSS.**

Now look at the image in the webpage &mdash; it's possible for webpage readers to conduct the zoom-in or -out operations upon leaving the mouse cursor on the image by using event reactions defined by Javascript from developers, shown below.

```html
<!-- about.html -->
<head>
    <!-- ... -->
    <style>
        img{
            width: "200px";
            float: right;
        }
    </style>
    <script>
        function imgBig(img){
            img.style.width = 300;
        }
        function imgSmall(img){
            img.style.width = 200;
        }
    </script>
</head>
<body>
    <!-- ... -->
    <img src="https://railgallery.ru/photo/02/86/66/286664.jpg" alt="SS9" onmouseover=imgBig(this) onmouseout=imgSmall(this) />
</body>
```

`onmouseover`, along with `onmouseout`, is an **event** of the webpage. It can also be defined by `img.onmouseover(){}` or `img.onmouseout(){}`, and there're still other events available for corresponding javascript functions, as is listed below.

| Event            | Category              | Description                                                   | Example Syntax                         |
|------------------|-----------------------|---------------------------------------------------------------|----------------------------------------|
| click           | Mouse Events         | Fires when an element is clicked.                             | `element.onclick = function() {}`      |
| dblclick        | Mouse Events         | Fires when an element is double-clicked.                      | `element.ondblclick = function() {}`   |
| mousedown       | Mouse Events         | Fires when the mouse button is pressed.                       | `element.onmousedown = function() {}`  |
| mouseup         | Mouse Events         | Fires when the mouse button is released.                      | `element.onmouseup = function() {}`    |
| mousemove       | Mouse Events         | Fires when the mouse is moved.                                | `element.onmousemove = function() {}`  |
| mouseenter      | Mouse Events         | Fires when the mouse enters an element.                       | `element.onmouseenter = function() {}` |
| mouseleave      | Mouse Events         | Fires when the mouse leaves an element.                       | `element.onmouseleave = function() {}` |
| keydown         | Keyboard Events      | Fires when a key is pressed.                                  | `document.onkeydown = function() {}`   |
| keyup           | Keyboard Events      | Fires when a key is released.                                 | `document.onkeyup = function() {}`     |
| keypress        | Keyboard Events      | (Deprecated) Fires when a key is pressed.                     | `document.onkeypress = function() {}`  |
| input           | Form Events          | Fires when input value changes.                               | `input.oninput = function() {}`        |
| change          | Form Events          | Fires when a form element loses focus after value is changed. | `input.onchange = function() {}`       |
| submit          | Form Events          | Fires when a form is submitted.                               | `form.onsubmit = function(e) {}`       |
| focus           | Focus Events         | Fires when an element gains focus.                            | `element.onfocus = function() {}`      |
| blur            | Focus Events         | Fires when an element loses focus.                            | `element.onblur = function() {}`       |
| load            | Window Events        | Fires when the page and resources are fully loaded.           | `window.onload = function() {}`        |
| DOMContentLoaded| Document Events      | Fires when the DOM is fully loaded.                           | `document.onload = function() {}` (rare) |
| resize          | Window Events        | Fires when the browser window is resized.                     | `window.onresize = function() {}`      |
| scroll          | Window/Element Events| Fires when the page or element is scrolled.                   | `window.onscroll = function() {}`      |
| unload          | Window Events        | Fires when the page is unloaded.                              | `window.onunload = function() {}`      |
| error           | Global/Media Events  | Fires when a resource fails to load.                          | `window.onerror = function() {}`       |
| touchstart      | Touch Events         | Fires when a touch starts.                                    | `element.ontouchstart = function() {}` |
| touchend        | Touch Events         | Fires when a touch ends.                                      | `element.ontouchend = function() {}`   |
| touchmove       | Touch Events         | Fires when a finger moves on the screen.                      | `element.ontouchmove = function() {}`  |
| dragstart       | Drag Events          | Fires when dragging starts.                                   | `element.ondragstart = function() {}`  |
| dragover        | Drag Events          | Fires when dragging over a valid target.                      | `element.ondragover = function() {}`   |
| drop            | Drag Events          | Fires when an item is dropped.                                | `element.ondrop = function() {}`       |

> Now thinking about a sign-up page for a site &mdash; what should it contain and how can it work?

For a sign-up page of a site, it should at least contain user's name, e-mail address and password. Some pages may even ask a user to re-enter the password and limit the length of the password to more than 8. This in turn highlights the role of scripts that is capable of validating the *form* and returning messages on where the invalid entry is, if any.

Please check [the linked HTML file](https://github.com/K-PK66/HSBCLRNEXP/raw/refs/heads/main/Neueda%20Core%20Tech%20Training/OFLLRNEXPSMPL/register.html) for example. The introduction of `<input></input>` tags will enable the webpage viewer to fill in blanks for information and the application of `<table></table>` tags will help contents keep aligned. You may have noticed at `document.getElementById($id$)` the function &mdash; it will get the value of the input under the `id` you give.

> What is the difference between `id` and `class`, the sub-tags?

The answer of the question above is not obvious unless looking into `CSS`. For an element whose `id` is `copyright`, we should use `#copyright` to clarify the CSS; for that with the `class` is `copyright`, we should use `.copyright` to make its CSS clear.

There are multiple functions available to get different values, listed below. Please choose proper functions for proper scenario.

#### DOM Access and Manipulation Functions

| Function                          | Category           | Description                                              | Example Usage                    |
|-----------------------------------|--------------------|----------------------------------------------------------|----------------------------------|
| `document.getElementById()`      | DOM Selection      | Returns element by ID.                                   | `document.getElementById("title")` |
| `document.getElementsByClassName()`| DOM Selection      | Returns HTMLCollection of elements with matching class.  | `document.getElementsByClassName("box")` |
| `document.getElementsByTagName()` | DOM Selection      | Returns HTMLCollection by tag name.                      | `document.getElementsByTagName("div")` |
| `document.querySelector()`        | DOM Selection      | Returns first matching element (CSS selector).           | `document.querySelector(".btn")` |
| `document.querySelectorAll()`     | DOM Selection      | Returns all matching elements (NodeList).                | `document.querySelectorAll("p.note")` |
| `document.createElement()`        | DOM Creation       | Creates a new element node.                              | `document.createElement("div")` |
| `element.appendChild()`           | DOM Manipulation   | Appends a child node to an element.                      | `parent.appendChild(child)`      |
| `element.removeChild()`           | DOM Manipulation   | Removes a child node.                                    | `parent.removeChild(child)`      |
| `element.setAttribute()`          | DOM Manipulation   | Sets an attribute on an element.                         | `element.setAttribute("id", "newID")` |
| `element.getAttribute()`          | DOM Manipulation   | Gets the value of an attribute.                          | `element.getAttribute("href")`   |
| `element.classList.add()`         | Class Manipulation | Adds a class to the element.                             | `element.classList.add("active")` |
| `element.classList.remove()`      | Class Manipulation | Removes a class from the element.                        | `element.classList.remove("active")` |
| `element.classList.toggle()`      | Class Manipulation | Toggles a class on the element.                          | `element.classList.toggle("active")` |
| `element.innerHTML`               | DOM Content Access | Gets or sets HTML content inside an element.             | `element.innerHTML = "<p>Hello</p>"` |
| `element.textContent`             | DOM Content Access | Gets or sets only text content inside an element.        | `element.textContent = "Hello"`  |

> **Practice:** Build a webpage that prompts page viewers to give their names, ages, addresses, genders (M, F & Prefer not to Say only), cities, postal codes (or zipcodes) and hobbies. The result of the registry should output in another webpage.

Please refer to [the linked HTML file](https://github.com/K-PK66/HSBCLRNEXP/raw/refs/heads/main/Neueda%20Core%20Tech%20Training/OFLLRNEXPSMPL/infoRecord.html) for answer.
