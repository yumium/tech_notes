# JavaScript and Web Dev

### How does HTML, CSS, and JS work together?

HTML - Structure

CSS - Style

JS - Logic/Behavior

It's good practice to use modularization and have html, css, and js in different files and reference each other.



### Front end vs back end

[https://www.pluralsight.com/blog/software-development/front-end-vs-back-end#:~:text=Briefly%2C%20front%2Dend%20refers%20to,and%20%E2%80%9Cback%2Dend%E2%80%9D.](https://www.pluralsight.com/blog/software-development/front-end-vs-back-end#:~:text=Briefly%2C front-end refers to,and "back-end".)

Front end: Client-side rendering -> visual aspect, logic

Back end: Server-side rendering -> Databases, algorithms, cloud

Full stack = front end + back end







---

# MDN Front-end developer "course"

(https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer)



## Getting started with the web

An overview of front end developing

(https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)

More things I need to install/learn to use:

- A version control system: Git
- An automation system to sort out modularization: Webpack, Grunt, Gulp

- A local web server (python simpleHTTPserver):https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server



**Planning:**

1. **What is your website about?** Do you like dogs, New York, or Pac-Man?
2. **What information are you presenting on the subject?** Write a title and a few paragraphs and think of an image you'd like to show on your page.
3. **What does your website look like,** in simple high-level terms? What's the background color? What kind of font is appropriate: formal, cartoony, bold and loud, subtle?

- Test, Theme color, Images, Fonts



**Dealing with files**

> When you are working on a website locally on your computer, you should keep all the related files in a single folder that mirrors the published website's file structure on the server

Naming:

- Use all lower case letters
- Use `-` as separaters, not `_` or space

Structure of your files:

1. **`index.html`**: This file will generally contain your homepage content, that is, the text and images that people see when they first go to your site. Using your text editor, create a new file called `index.html` and save it just inside your `test-site` folder.
2. **`images` folder**: This folder will contain all the images that you use on your site. Create a folder called `images`, inside your `test-site` folder.
3. **`styles` folder**: This folder will contain the CSS code used to style your content (for example, setting text and background colors). Create a folder called `styles`, inside your `test-site` folder.
4. **`scripts` folder**: This folder will contain all the JavaScript code used to add interactive functionality to your site (e.g. buttons that load data when clicked). Create a folder called `scripts`, inside your `test-site` folder.

File paths:

- To let files talk to each other, you will need to learn file paths. You'll learn this in detail in HTML course





**What is HTML?**

HTML = Hypertext Markup Language

- Opening/Closing tag, content, element

- Attributes

- Nested elements, need to be properly nested

- Empty elements <img>

- ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>My test page</title>
    </head>
    <body>
      <img src="images/firefox-icon.png" alt="My test image">
    </body>
  </html>
  ```

- Headings, Paragraphs, Lists etc. I know this from markdown



**What is CSS?**

- Style sheet language
- Cascading Style Sheets
- ruleset = selector + declarations
  - declaration = property : property-value

```css
p {
    color: red
}
```

`p` is selector, `color` is property, `red` is property-value

- Different selectors...
- Remember to link the CSS file at the header of `index.html`.
- Fonts
- The box model: padding, border, margin etc.





**JavaScript**

- Dynamic programming language
- Compact yet flexible, good for creating games, 2D/3D graphics etc.
- Use <script src=></script> to link it to index.html, to *apply* to it so it can make an effect.
- Most JavaScript language features are found in other languages
- Events (eg. myImage.onclick = <continuation>)



**Publishing a website**

- Need a hosting service (rent space on a web server)
  - Use FTP to transfer files to that server
- Register a domain name

- Can also use online tools like GitHub pages or Google App Engine (heroku app??), AWS
- For quick testing, use:
  - JS Bin
  - JSFiddle



**Overview of how browsing works:**

1. The browser goes to the DNS server, and finds the real address of the server that the website lives on (you find the address of the shop).
2. The browser sends an HTTP request message to the server, asking it to send a copy of the website to the client (you go to the shop and order your goods). This message, and all other data sent between the client and the server, is sent across your internet connection using TCP/IP.
3. If the server approves the client's request, the server sends the client a "200 OK" message, which means "Of course you can look at that website! Here it is", and then starts sending the website's files to the browser as a series of small chunks called data packets (the shop gives you your goods, and you bring them back to your house).
4. The browser assembles the small chunks into a complete web page and displays it to you (the goods arrive at your door — new shiny stuff, awesome!).

Order of parsing when loading a webpage: HTML; CSS; JS





---









# JS

**There's many more guides on the website. But I think it's time to learn some HTML, CSS, and general web stuff first.**

### Introductory

[What is JavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript

- JavaScript allows run time class alternation!
- Client side: What js is built for, usually runs in browser
- Server side: Can use Node.js, though Node.js can be used as an environment on a computer as well

[DOM]: https://en.wikipedia.org/wiki/Document_Object_Model

- Tree structure for HTML

[An re-introduction to javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript

- A good guide to js
- It contains different ways to iterate through an array
- Rest parameters in functions `...`, `arguments` object
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments





