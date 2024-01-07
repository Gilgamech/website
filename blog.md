# [01/06/2024](#01062024) - Advanced HTTP processing.

Sparational 4.0 officially moves from Alpha to Beta with this update. HTTP Processing is now inline instead of block, and works on both relative and inline references. So if you leave a URL ending in `.png` in your text, it doesn't just become a link, but loads in as an inline image. 

Text parsing takes this path: 

- Markdown
- Tokens
- JML
- DOM

Network looks like: 

- HTML bootstrap
- JS & CSS
- frame
- first layer content
- second layer content 
- third layer content not recommended because it might take too long. 

