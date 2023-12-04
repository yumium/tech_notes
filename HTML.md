# HTML

### HTML

HTML = Hyper Text Markup Language

Describes the structure of a web page, tells browser how to display the content

You don't have exact control over the way webpage is displayed, it depends on styles and size of browser etc.



HTML element: `<p>This is an element </p>`

Elements can be nested

Elements can be empty: `<br>`



We can add attributes inside HTML tags using `name="value"`

Use quotations

If the value contains double quotes, use single quotes outside. Vice versa.



<u>Bookmarks</u>

Create bookmark: `<h2 id="c4">Chapter 4</h2>`

Link to bookmark: `<a href="#C4">Jump to Chapter 4</a>`

Link to bookmark of another page: `<a href="html_demo.html#C4">Jump to Chapter 4</a>`



<u>Block vs. inline elements</u>

Block: starts new line and takes up as much width as possible

Inline: doesn't start new line and takes up as much width as needed

​	Override these values: `display: block`, `display: inline`

Inline block: `display: inline-block` will act as `inline` but allow settling width and height

Hiding elements:

- `display: none` => hide element completely (without deleting from HTML)
- `visibility: hidden` => hide element but will still keep white space of element



<u>Id</u>

Id is a unique identifier to track an HTML element, must be unique within the HTML document.

```html
<h1 id="myHeader">My Header</h1>
```

Can be used in bookmarks or for JavaScript `.getDocumentById()`



<u>"Escape" for HTML native elments (like `<`)</u>

https://www.w3schools.com/html/html_symbols.asp

https://www.w3schools.com/html/html_emojis.asp



HTML document elements

- The `<head>` element is a container for metadata (data about data)
- The `<head>` element is placed between the `<html>` tag and  the `<body>` tag
- The `<title>` element is required and it defines the title of the document
- The `<style>` element is used to defined style information for a single element
- The `<link>` tag is most often used to link to external style sheets
- The `<meta>` element is typically used to specify the character set, page description, keywords, author of the document, and viewport settings
- The `<script>` element is used to define client-side JavaScripts
- The `<base>` element specifies the base URL and/or target for all relative URLs in range





### CSS

Where to insert CSS:

- Inline: `<h1 style="color: blue;">A Blue Heading</h1>`
- Internal: `<style> ... </style>`
- External: `<link rel="stylesheet" href="style.css">`



Syntax of CSS:

- selector: {declaration; declaration}
- Each declaration is in format `property:value`

Example

```css
h1 {
    color: blue;
    font-size: 12px;
}
```



Selectors:

- element: `p`, `h1`
  - selects `<p>`, `<h1>`, ...
- id: `#para1`
- class: `.center`
- universal: `*`
- combinators:
  - descendant `div p`
  - child `div > p`
  - adjacent sibling `div + p`
  - general sibling `div ~ p` (any next sibling, not just immediate next)
- pseudo-classes
  - `a:link`, visited, hover, active
  - `p:first-child`
  - `a.highlight:hover` => use with class
- pseudo-element
  - `p::first-line`, first-letter
  - `::before` and `::after`

```css
h1::after {
    content: url(smiley.gif);
}
```



Common values:

- auto: automatic
- inherit: inherit this property from parent
- px, pt, em, %
- initial: default value



CSS box model

- Margin, Border, Padding, Content (from outermost to innermost)
- Outline can be defined as an extra layer just outside the border to help making the element stand out



Some other text properties:

- Alignment
  - `text-align`: horizontal alignment, `text-align-last`: alignment of last line of text, `direction`: (rtl), `vertical-align`: (baseline, text-top, text-bottom, sub, super)
    - values: center, left, right, justify (fill vertical space)
- Transformation
  - `text-transform`: (uppercase, lowercase, capitalize)



Font properties:

- Font family => `font-family`: (a list of font names, each as a fallback for the one previous)
  - There are a list of web safe fonts that are available on all browsers
- Font style => `font-style`: (normal, italic, oblique)
- One-liner shorthand: font-style, font-variant, font-weight, font-size/line-height, font-family
  - Eg: `font: italic small-caps bold 12px/30px Georgia, serif;`



Icons

```html
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">   
</head>    
<body>

<i class="glyphicon glyphicon-cloud"></i>
    
</body>
</html>
```



Positioning (see examples here: https://www.w3schools.com/css/css_positioning.asp)

- `position: static`: no affected by `top`, `bottom`, `left`, and `right` properties
- `position: relative`: affected by properties above

```css
div.relative {
    position: relative;
    left: 30px;
    border: 3px solid red;
}
```

- `position: fixed`: fixed on the page, does not move with scrolling
- `position: absolute`: positioned relative to the nearest positioned ancestor, not to its immediate ancestor
- `position: sticky`: toggles between `relaive` and `fixed`



z-index: stack order of overlapping elements, higher is more to front.

​	Only applies to `position` and `flex` items



Overflow

The `overflow` property specifies whether to clip the content or to add scrollbars when the content of an element is too big to fit in the specified area.

The `overflow` property has the following values:

- `visible` - Default. The overflow is not clipped. The content renders outside the element's box
- `hidden` - The overflow is clipped, and the rest of the content will be invisible
- `scroll` - The overflow is clipped, and a scrollbar is added to see the rest of the content
- `auto` - Similar to `scroll`, but it adds scrollbars only when necessary

`overflow-x` and `overflow-y` gives you control over what to do with overflow on each axis.



Float and clear

The `float` property is used for positioning and formatting content e.g. let an image float left to the text in a container.

The `float` property can have one of the following values:

- `left` - The element floats to the left of its container
- `right` - The element floats to the right of its container
- `none` - The element does not float (will be displayed just where it occurs in the text).  This is default
- `inherit` - The element inherit the float value of its parent

We can then use `clear` property if we want the next element to be below the floated element, and not to the side of it

The `clear` property can have one of the following values:



The clear property can have one of the following values:

- none - The element is not pushed below left or right     floated elements. This is default
- left - The element is pushed below left floated elements
- right - The element is pushed below right floated elements
- both - The element is pushed below both left and right     floated elements
- inherit - The element inherits the clear value from its parent

Navigation bar:

https://www.w3schools.com/css/css_navbar.asp

Just a list 

Cascading order

The CSS language runs an algorithm to determine which of the concurrent styles for an element will be applied. Cascading order:

1. **Relevance**:     It first filters all the rules from the different sources to keep only the     rules that apply to a given element. That means rules whose selector     matches the given element and which are part of an appropriate media at-rule.
2. **Origin and importance**

Then it sorts these rules according to their importance, that is, whether or not they are followed by

!important

, and by their origin. Ignoring layers for the moment, the cascade order is as follows:

| **Order (low to high)** | **Origin**                | **Importance** |
| ----------------------- | ------------------------- | -------------- |
| 1                       | user-agent (browser)      | normal         |
| 2                       | user                      | normal         |
| 3                       | author (developer)        | normal         |
| 4                       | CSS @keyframe  animations |                |
| 5                       | author (developer)        | !important     |
| 6                       | user                      | !important     |
| 7                       | user-agent (browser)      | !important     |
| 8                       | CSS transitions           |                |

1. **Specificity:**     In case of equality with an origin, the [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) of a rule is considered to choose one value or     another. The specificity of the selectors are compared, and the     declaration with the highest specificity wins.
2. **Order of appearance**:     In the origin with precedence, if there are competing values for a     property that are in style block matching selectors of equal specificity,     the last declaration in the style order is applied.

Margin collapse: Top and bottom margin of adjacent elements will take together the larger of the 2 values, not the sum. This only applies to top and bottom margin, not left and right





| **Tag**                                                      | **Example**                                                  | **CSS**                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <!DOCTYPE>                                                   | <!DOCTYPE html>                                              |                                                              |
| <h1> headings                                                | <h1>This is heading 1</h1>                                   | font-size background-color:blue color:blue color:rgb(255, 99, 71) color:rgba(255, 99, 71, 0.5) color:#ff6347 font-family:verdana font-size:160% text-align:center background-image: url('img.jpg') background-repeat: no-repeat background-attachment: fixed background-size: cover |
| <p>  paragraphs                                              | <p>This is a paragraph.</p>                                  | border: 2px solid powderblue; padding: 30px margin: 25px 50px 75px 100px |
| <a> links                                                    | <a href="https://www.google.com">This is  a link target="_self/_blank/_parent/_top"/</a> *self = open same tab* blank=open in new tab parent=open in parent  frame top=open  in new window | a:link/visited/hover/active                                  |
| <img>  images                                                | <img src="example.svg"  alt="example" width="42px" height="128px"> |                                                              |
| <hr> horizonal rule                                          | <hr>                                                         |                                                              |
| <br>  line break                                             | <br>                                                         |                                                              |
| <pre> preformatted text, preserves spaces  & line breaks     | <pre> This is a poem </pre>                                  |                                                              |
| <b> bold text                                                |                                                              |                                                              |
| <strong> important text                                      |                                                              |                                                              |
| <i> italic  text                                             |                                                              |                                                              |
| <em> emphasized text                                         |                                                              |                                                              |
| <mark>  marked text                                          |                                                              |                                                              |
| <small> smaller text                                         |                                                              |                                                              |
| <del>  deleted text                                          | Usually a line strike                                        |                                                              |
| <ins> inserted text                                          | Usually an underline                                         |                                                              |
| <sub>  subscript text                                        | Half a character below line                                  |                                                              |
| <sup> superscript text                                       | Half a character  above line                                 |                                                              |
| <blockquote>  section quoted from somewhere else             | <blockquote cite="https://wikipedia.org/beaver">  Beavers are mysterious. </blockquote> |                                                              |
| <q> short quotations                                         | Usually insert  quotation marks around text                  |                                                              |
| <abbr>  abbreviation                                         | <abbr title="World Health  Organization">WHO</abbr>          |                                                              |
| <address> contact information of author                      | <address>Written by John Doe.<br>Visit us  at:<br>Example.com</address> |                                                              |
| <cite>  title of creative work                               | <cite>The Screak </cite>                                     |                                                              |
| <bdo> bi-directional override                                | Override current text  direction <bdo  dir="rtl">This text will be written from right to  left</bdo> |                                                              |
| <map>  image with clickable areas                            | https://www.w3schools.com/html/html_images_imagemap.asp      |                                                              |
| <picture> display different pictures for  different devices  | https://www.w3schools.com/html/html_images_picture.asp       |                                                              |
| <link>  favicon                                              | <link rel="icon" type="image/x-icon"  href="/images/favicon.ico">  add this after <title> element |                                                              |
| <title> title of document                                    | Is displayed and also  on the tab of the webpage, used for SEO |                                                              |
| <table>  A table <th> table header <tr>  table row <td> table data | <table> <tr> <th>Company</th>  <th>Contact</th> <th>Country</th> </tr>  <tr> <td>Alfreds Futterkiste</td> <td>Maria  Anders</td> <td>Germany</td> </tr> <tr>  <td>Centro comercial Moctezuma</td> <td>Francisco  Chang</td> <td>Mexico</td> </tr></table> colspan="2"  attribute on header element, will have header span 2 columns | border: 2px solid red; border-collapse: collapse border-style: dotted border-radius: 5px; td:nth-child(even), th:nth-child(even) {<br/>  background-color: #D6EEEE;<br/>} text-align: left Scroll vertically: https://www.w3schools.com/css/css_table_responsive.asp |
| <ul> unordered list Stick list inside  list element for nested list | <ul> <li>Coffee</li>  <li>Tea</li> <li>Milk</li></ul>        | https://www.w3schools.com/css/css_list.asp                   |
| <ol>  ordered list                                           | <ol> <li>Coffee</li>  <li>Tea</li> <li>Milk</li><br/></ol>   |                                                              |
| <dl> description list                                        | <dl> <dt>Coffee</dt> <dd>- black  hot drink</dd> <dt>Milk</dt> <dd>- white cold  drink</dd></dl> | float:left to display a list horizontally list-style-type:circle; bullet point style |
| <span>  inline text                                          | <span>Hello World!</span>                                    |                                                              |
| <div> empty element for structure                            |                                                              |                                                              |
| <iframe>  html inside html                                   | <iframe src="demo_iframe.htm"  style="border:2px solid red;" title="Iframe  Example"></iframe> |                                                              |
| <header> Header of document                                  | SEMANTIC ELEMENTS:                                           | Use these elements  with float property to ensure they are correctly  displayed |
| <nav>  navigation links                                      |                                                              |                                                              |
| <section> section in document                                |                                                              |                                                              |
| <article>  independent, self-contained content               |                                                              |                                                              |
| <aside> content aside from the conent (like  sidebar)        |                                                              |                                                              |
| <footer>                                                     |                                                              |                                                              |
| <figure> self-contained content, like  illustrations         |                                                              |                                                              |
| <kbd>  keyboard input                                        | COMPUTER CODE                                                |                                                              |
| <samp> program output                                        |                                                              |                                                              |
| <code>  computer code                                        |                                                              |                                                              |
| <var> variables                                              |                                                              |                                                              |
| <tabindex>                                                   | tabindex=0 makes it tab-able A positive number further specifies the order of tabbing | Index telling if the user is able to tab into the element  (for accessibility) Interactive elements are tab-able  by default (<a>, <button>, <details>,  <input>, <select>, <textarea>,  etc.) Other elements are not by default  (e.g. <div>) |

 









Landing the plane (ROI out of this)

The girl is really not that special

