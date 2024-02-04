From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk).

--------------------------------------------------------------------

# [01/20/2024](#01202024) - Lift and spider-shift.

Rewriting all of this site's pages as Markdown pages. It's the next step in converting this to a Sparational 4 site. The previous was moving to a Markdown page frame, and once all pages are on the same Markdown page frame, it's a process of streamlining CSS and selectors to better match the base frame, then moving onto the base frame. One of the small indicators that this is going down the right path is that the base frame and this blog's frame are almost the same - just a few selector names are different. This was the same situation with the Sparational site, and will probably be the case with the vast majority of pages too.

--------------------------------------------------------------------

# [01/06/2024](#01062024) - Advanced HTTP processing.

Sparational 4.0 officially moves from Alpha to Beta with this update. HTTP Processing is now inline instead of block, and works on both relative and inline references. So if you leave a URL ending in `.png` in your text, it doesn't just become a link, but loads in as an inline image. 

Text parsing takes this path: 

- Markdown
- Tokens
- JML (edit: JSON Markup Language not Java Modeling Language.)
- DOM

Network looks like: 

- HTML bootstrap
- JS & CSS
- frame
- first layer content
- second layer content 
- third layer content not recommended because it might take too long. 
