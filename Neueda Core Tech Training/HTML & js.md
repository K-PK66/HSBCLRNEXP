# HTML, CSS & Javascript

## Overview

### HTML

HTML4 first emerged in 1999, which is standardized by the Worldwide Web Consortium (or W3C). HTML5 launched in 2007 and introduced several new features (e.g. native audio & video, new input controls, graphics, geolocation, web sockets, web stroage, web workers and Ajax improvements), simplifying DOCTYPE declarations.

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

Think about the following code in a HTML document. This could be an example of internal CSS in that it uses CSS inside the document and will apply to all `body` and `h2` elements in the page.

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

For Inline CSS, the most commonly-used CSS methods for me myself, can customize elements separately.

```html
<h2 style="color: red;">Headings 2</h2>
```

### Javascript

A scripting language usually embedded directly (or linked) into HTML pages. It's used to make HTML pages interactive, react to events, update the content of the HTML document and validate data before it's submitted to a server in order to save unnecessary roundtrips.

> HTML defines the template of a web page while CSS defines the page's theme, styles and color, and Javascript provides support for user-interactive events.
