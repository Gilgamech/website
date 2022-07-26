# Website code
- This is the website www.Gilgamech.com. 
- Currently this website is containerized, serving files from local storage. 
- As a burgeoning Solutions Architect, the most efficient solution seems to be moving the files into S3 and moving the website into a Lambda function. A container is overkill for flat file and stateless API calls.
	- Debating removing the front-page global scoreboard, as it's only for vanity. Without those few API calls, the site would be all static content and could be served by S3. 
	- Other option is to redirecting those paths with R53 (it can redirect paths right?) to a Lambda call for these paths. (How much would each redirection and invocation cost? What are their free tiers?)
