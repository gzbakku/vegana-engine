

<h1>Intro :-</h1>

<p>
vegana engine is a set of light weight functions to build, route and manipulate html dom elements.
</p>

<h1>Builder Function Examples</h1>


<h2>Standard Dom</h2>

<h2>Custom Elements</h2>

<h3>div</h3>
<table>
<tr><th>key</th><th>type</th><th>description</th></tr>
<tr><td>id</td><td>string</td>
<td>div unique id</td></tr>
<tr><td>parent</td><td>string</td>
<td>parent div id</td></tr>
<tr><td>class</td><td>string</td>
<td>class for current div</td></tr>
<tr><td>text</td><td>string</td>
<td>inner text of div</td></tr>
<tr><td>function</td><td>function</td>
<td>function will be called when div is clicked</td></tr>
</table>

<h3>input</h3>
<table>
<tr><th>key</th><th>type</th><th>description</th></tr>
<tr><td>id</td><td>string</td>
<td>input unique id</td></tr>
<tr><td>parent</td><td>string</td>
<td>parent div id</td></tr>
<tr><td>class</td><td>string</td>
<td>class for current input</td></tr>
<tr><td>type</td><td>string</td>
<td>type of input => string or number are valid</td></tr>
<tr><td>text</td><td>string</td>
<td>inner text of input</td></tr>
<tr><td>function</td><td>function</td>
<td>function will be called on input</td></tr>
</table>

<h3>card</h3>
<table>
<tr><th>key</th><th>type</th><th>description</th></tr>
<tr><td>id</td><td>string</td>
<td>card unique id</td></tr>
<tr><td>parent</td><td>string</td>
<td>parent div id</td></tr>
<tr><td>close</td><td>boolean</td>
<td>set the boolean to true to add close button to card header</td></tr>
<tr><td>headerText</td><td>string</td>
<td>set header string to add a header to the card</td></tr>
<tr><td>headerClass</td><td>string</td>
<td>header div class, header div container header text div and header action div</td></tr>
<tr><td>headerTextContClass</td><td>string</td>
<td>header text div can style header text too.</td></tr>
<tr><td>headerActionContClass</td><td>string</td>
<td>header action div class can be used to adjust close button</td></tr>
<tr><td>closeButtonClass</td><td>string</td>
<td>header close button class</td></tr>
<tr><td>closeButtonFunction</td><td>function</td>
<td>this function will be called when close button is clicked</td></tr>
<tr><td>cardBodyClass</td><td>string</td>
<td>card body div class  </td></tr>
</table>

<p>
  this function returns a card id and card body can be found by adding '-body' at the end of returned card id.;
</p>
