function buildMenuPage($parentElement) {
//addElement($elementParent,innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)

var outerUL = addElement(addElement($parentElement,"","","nav"),"","","ul")
var blogLi = addElement(outerUL,"","","li")
addElement(blogLi,"Blog ▼","","a")
var blogUL = addElement(blogLi,"","","ul")
addElement(addElement(blogUL,"","","li"),"August 2022","","a","","/blog.html")

var $2022Li = addElement(blogUL,"","","li")
addElement($2022Li,"2022 ▼","","a")
addElement(addElement($2022Li,"","","li"),"July 2022","","a","","/2022/July.html")
addElement(addElement($2022Li,"","","li"),"June 2022","","a","","/2022/June.html")
addElement(addElement($2022Li,"","","li"),"May 2022","","a","","/2022/May.html")
addElement(addElement($2022Li,"","","li"),"April 2022","","a","","/2022/April.html")
addElement(addElement($2022Li,"","","li"),"March 2022","","a","","/2022/March.html")
addElement(addElement($2022Li,"","","li"),"February 2022","","a","","/2022/February.html")
addElement(addElement($2022Li,"","","li"),"January 2022","","a","","/2022/January.html")

var $2021Li = addElement(blogUL,"","","li")
addElement($2021Li,"2021 ▼","","a")
addElement(addElement($2021Li,"","","li"),"December 2021","","a","","/2021/December.html")
addElement(addElement($2021Li,"","","li"),"November 2021","","a","","/2021/November.html")
addElement(addElement($2021Li,"","","li"),"October 2021","","a","","/2021/October.html")
addElement(addElement($2021Li,"","","li"),"September 2021","","a","","/2021/September.html")
addElement(addElement($2021Li,"","","li"),"August 2021","","a","","/2021/August.html")
addElement(addElement($2021Li,"","","li"),"July 2021","","a","","/2021/July.html")

addElement(addElement(outerUL,"","","li"),"World History","","ul","","/history.html")

var stuffLi = addElement(outerUL,"","","li")
addElement(addElement(stuffLi,"","","li"),"Stuff ▼","","a")
var stuffUL = addElement(stuffLi,"","","ul")
addElement(addElement(stuffUL,"","","li"),"Gillogisms","","a","","/Gillogisms.html")
addElement(addElement(stuffUL,"","","li"),"Gaming ▼","","a")
var gamingUL = addElement(stuffUL,"","","ul")
addElement(addElement(gamingUL,"","","li"),"Ingame Items","","a","","/InGameItem.html")
addElement(addElement(gamingUL,"","","li"),"Android","","a","","/Android.html")


addElement(addElement(stuffUL,"","","li"),"Tools ▼","","a")
var ToolsUL = addElement(stuffUL,"","","ul")


addElement(addElement(outerUL,"","","li"),"Contact","","ul","","/contact.html")
}


				<li><a href="/calc.html">Calculators</a></li>
				<li><a href="/WhyIsItDown.html">Why's It Down?</a></li>
				<li><a href="/errorcause.html">Error Causes</a></li>
