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

We can embed a javascript script by `<script></script>` tag in the `<head>` section.

```html
<script>
window.onload = function() {
    document.body.style.backgroundColor = "#99f9";
};
</script>
```

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

### DOM Access and Manipulation Functions

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

### Common JavaScript Functions

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
