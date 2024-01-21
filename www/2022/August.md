From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [08/31/2022](#08312022) - Menu sitelet.

Testing using a sitelet for the navigation menu. Sitelet on this page, normal HTML on others. Can you tell a difference?

--------------------------------------------------------------------

# [08/21/2022](#08212022) - LINTDOR Truffles.

[Textarea](https://www.Sparational.com/sitelets/textArea.js) as a sitelet. Currently includes basic JSONLint as a feature, with a promise of more features to come. Read and modify the textarea contents with readElement and writeElement by setting the optional newTextAreaName parameter.

https://www.sparational.com/sitelets/textArea.js

::: script#TextAreaWrapper
buildTextAreaSitelet('TextAreaWrapper');
:::

--------------------------------------------------------------------

# [08/19/2022](#08192022) - Solved Sudoku.

Rebuilt the [Sudoku solver](https://www.Sparational.com/sitelets/sudokuSolver.js) into a sitelet. It's now available with the others.

https://www.sparational.com/sitelets/sudokuSolver.js

::: script#solverWrapper
buildSudokuSolverSitelet('solverWrapper');
:::

--------------------------------------------------------------------

# [08/17/2022](#08172022) - Calc.js sitelet.

Rebuilt the [calc.js](https://www.Sparational.com/sitelets/calc.js) sitelet. It's now generally available - feel free to use on your site.

https://www.Sparational.com/sitelets/calc.js

::: script#calcWrapper
buildCalculatorSitelet('calcWrapper');
:::

--------------------------------------------------------------------

# [08/14/2022](#08142022) - Sparational.js has its own site!

Check it out at [Sparational.com](https://www.Sparational.com/)!

Version 3 brings a refocusing of vision - make faster websites faster. Increase flexibility so the framework is easier to use, giving more ways to use it. Sparational.js can be added to mostly-static sites like this one, added as sitelets like [rgb.js](https://www.Sparational.com/sitelets/rgb.js), built into a page display engine (or use a prebuilt template), or fully declared in a SPA file. The SPA file supports variable replacement upto whole elements, allowing a unified theme to be used across your page while reducing bandwidth.

New in v3 are a suite of table manipulation tools, including mdArrayToTable, which makes an HTML Table out of a multidimensional JSON array. And columnMath, which performs a basic math operation on two columns of the same or different tables, or one column and a constant, outputting to the same table or a third. Again, decrease both development and loading time while increasing flexibility. 

Last but not least among the numerous updates is adding caching to webRequest. The last parameter when calling the function, any integer will cause the function to cache the results in a variable, and respond with the cached results for the integer in seconds. So if you specified 60 for $cached, it would cache the URI for 60 seconds.

--------------------------------------------------------------------

# [08/09/2022](#08092022) - OfferingOverview is live!

Check it out at [OfferingOverview.com](https://www.offeringoverview.com/)

--------------------------------------------------------------------

# [08/07/2022](#08072022) - Out SPArational.

Building the [OfferingOverview](https://www.Gilgamech.com/blog.html#07292022) site drove a rebuilding of the SPArational simple serverless framework. It's the core of the page engines that converts the Services.json data file into over 130 different pages, entirely generated within the browser.

New for v3 are table creation tools. Provide a multidimensional array in JSON (like [["Player","Score"],["Alice"3],["Bob",2]]) and mdArrayToTable will build this into a table:

::: script#tableCreationWrapper
mdArrayToTable('tableCreationWrapper','',[["Player","Score"],["Alice",3],["Bob",2]]);
:::				

Alongside addElement, these allow a great deal of website creation ability packed into a few powerful commands. Indeed, this whole post is just 10 lines.SPArational not only makes building sites easy - it makes building site engines to convert JSON into websites easy.
