From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk).

--------------------------------------------------------------------

# [02/04/2024](#02042024) - columnMath, formatMax, and sort columns in Markdown.

The journey of shifting my sites to my own Markdown processor has largely been a process of figuring out how little I need to extend Markdown to cover all of the features I've built into the Sparational framework and use on this and other sites. One of my most-used functions from Sparational 3 is columnMath. This function takes 2 columns as input, and either creates a new column in the table as output, or can overwrite an existing column. While the base function can take data from 2 separate tables and output to a 3rd, this functionality wasn't used and isn't being extended, simplifying the calls. 

This function joins formatMax and sort column functionality, in being expressed through the table's 2nd row. This row is reserved for table identification, and also colon-based justification. To add these:

- sort column: s
- formatMax: f
- columnMath: math=('Col 1 name'Symbol'Col 2 name') 
  - addition example: math=('Col 1'+'Col 2') 

As Sparational 4 is sitll in beta, this feature isn't quite live yet, but it will be soon. Feel free to drop it into your site and just wait for it to go live, then watch the magic happen.
