From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [06/21/2022](#06212022) - Cost balancing.
	
The first noticeable outcome is the pricing of ALBs - they cost almost as much as a small EC2 instance. The sole function provided by the ALB is to anchor the SSL cert and translate port 443, since SSL in Javascript is still somewhat undiscussed, Hopefully adding a Traefik instance to my container set will allow this to get its own SSL certs from Let's Encrypt.

--------------------------------------------------------------------

# [06/19/2022](#06192022) - Blog in a box.
	
Containerizing this site has been pretty easy. Containers are pretty powerful, and hosting static files is kinda overkill, but still seems much more efficient than renting a Windows server.

1. Pull together a small Node.js app to serve static files.
1. Dockerfile to declare Node.js version and start it.
1. Scripting Docker for quick local builds.
1. Upload to ECR, include in Task Definition, create Service.
1. Apply for ACM cert, add CNAME in Google Domains.
1. Add ACM cert to ALB, set up Target Group, point at the Task's internal IP.
	
Larger breakdown still to come.

--------------------------------------------------------------------

# [06/16/2022](#06162022) - Facsimileft.
	
Learning Docker containers has reignited a desire for web development. They are like a missing puzzle piece. And a key part of modern web dev is licensing.
	
Here's a tabulation of software licenses from [It's Foss](https://itsfoss.com/open-source-licenses-explained/). All licenses have in common: "The Work is suitable for commercial use" and "Licensees can modify the work."

|Term|GPL|LGPL|EPL 1.0|MPL|ASL 2.0|MIT|BSD|
|------|------|------|------|------|------|------|------|
|Copyleft (generally unrestricted to use and redistribute)|Strong|Weak (bound to DLL)|Weak (bound to software "module")|Weak (bound to individual files)|Non-copyleft|Non-copyleft|Non-copyleft|
|Licensees must provide proper attribution for the Work.||||Yes|Yes|Yes|Yes|
|Licensees must release the source alongside with Derivative Work.|Yes|<div>Only if you don't modify|Only if you don't modify|Yes (Licensees cannot relicense MPL-licensed source)|No|No|No|
|Licensees may redistribute Derivative Work under different terms|No|||Yes|Yes|Yes|Yes|
|Commercial distributors of the software must defend or compensate original EPL contributors from lawsuits/damages caused by the commercial offering.|||Yes|||||
|Licensees cannot use the original Author name or trademark to endorse Derivative Work (3- and 4- clause BSD)|||||||Yes|
|Licensees must acknowledge the original Author in all advertising materials mentioning features or use of the Work (4-clause BSD)|||||||Yes|
	
In case the blog didn't make it obvious, the author isn't a lawyer, so be sure to check with one before making a business-impacting decision.

--------------------------------------------------------------------

# [06/06/2022](#06062022) - Pride in what you do.
	
Found [CSS and JS to change highlight-color](https://dev.to/braydoncoyer/change-text-highlight-color-with-css-80). Each time you click, the color will change, moving through the Pride flag rainbow. As an upgrade to the original, this checks if the background color is within 500 "color points" of dark #000000 text. Back in my [8/21/2021](https://www.Gilgamech.com/2021/August.html#08212021) post, I discussed adding together all 3 color values to obtain a "color point" value, and how a value of 500 is considered the minimum value for readability. I got this from an accessability website and forgot to reference them 😞.
	
First, the CSS. The top section, :root, is where these variables are initialized with a null value. They'll get populated in the lower Javascript section then used in this ::selection section.

```
:root {
  --foreground-color: null;
  --highlight-color: null;
}
::selection {
  color: var(--foreground-color);
  background: var(--highlight-color);
}
```
		
Next, Javascript to setup the colors, from [here](https://www.kapwing.com/resources/official-pride-colors-2021-exact-color-codes-for-15-pride-flags/).

```
const colors = [
"#E50000", //red
"#FF8D00",//orange 
"#FFFF00", //yellow
"#028121",//green 
"#004CFF",//indigo 
"#760088",//purple 
"#FFAFC7",//pink
"#73D7EE",//teal
"#613915"];//brown
```
		
Then setup the mousedown event. Whenver the left mouse button is clicked on the webpage, it will detach the first color in the colors array, check its "color points" [by converting](https://www.w3docs.com/snippets/javascript/how-to-convert-decimal-to-hexadecimal-in-javascript.html) and update the foreground color if necessary, then forward both values to the CSS variable above. Then it reattaches the color to the end of the colors array, effectively rotating it forward by one.

```
window.addEventListener("mousedown", (e) => {
	const color = colors.shift();
	var foreground = "#000000";
	if (parseInt(color.substr(1,2), 16)+parseInt(color.substr(3,2), 16)+parseInt(color.substr(5,2), 16) &gt; 500){
		foreground = "#FFFFFF";
	}
  document.documentElement.style.setProperty("--highlight-color", color);
  document.documentElement.style.setProperty("--foreground-color", foreground);
  colors.push(color);
});
```
