//addElement($elementParent,innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)
//addElement("elementParent","innerText","elementClass","elementType","elementStyle","href","onChange","onClick","contentEditable","attributeType","attributeAction","elementId")

function buildMenuPage($parentElement) {
rebuildElement($parentElement)
var outerUL = addElement(addElement($parentElement,"","","nav"),"","","ul")

var blogLi = addElement(outerUL,"","","li")
addElement(blogLi,"Blog ▼","","a")
var blogUL = addElement(blogLi,"","","ul")

addElement(addElement(blogUL,"","","li"),"Aug 2023","","a","","/blog.html")

var $2023Li = addElement(blogUL,"","","li")
addElement($2023Li,"2023 ▼","","a")
var $2023UL = addElement($2023Li,"","","ul")
addElement(addElement($2023UL,"","","li"),"July 2023","","a","","/2023/July.html")
addElement(addElement($2023UL,"","","li"),"June 2023","","a","","/2023/June.html")
addElement(addElement($2023UL,"","","li"),"May 2023","","a","","/2023/May.html")
addElement(addElement($2023UL,"","","li"),"Apr 2023","","a","","/2023/April.html")
addElement(addElement($2023UL,"","","li"),"Mar 2023","","a","","/2023/March.html")
addElement(addElement($2023UL,"","","li"),"Feb 2023","","a","","/2023/February.html")
addElement(addElement($2023UL,"","","li"),"Jan 2023","","a","","/2023/January.html")

var $2022Li = addElement(blogUL,"","","li")
addElement($2022Li,"2022 ▼","","a")
var $2022UL = addElement($2022Li,"","","ul")
addElement(addElement($2022UL,"","","li"),"Dec 2022","","a","","/2022/December.html")
addElement(addElement($2022UL,"","","li"),"Nov 2022","","a","","/2022/November.html")
addElement(addElement($2022UL,"","","li"),"Oct 2022","","a","","/2022/October.html")
addElement(addElement($2022UL,"","","li"),"Sept 2022","","a","","/2022/September.html")
addElement(addElement($2022UL,"","","li"),"Aug 2022","","a","","/2022/August.html")
addElement(addElement($2022UL,"","","li"),"Jul 2022","","a","","/2022/July.html")
addElement(addElement($2022UL,"","","li"),"Jun 2022","","a","","/2022/June.html")
addElement(addElement($2022UL,"","","li"),"May 2022","","a","","/2022/May.html")
addElement(addElement($2022UL,"","","li"),"Apr 2022","","a","","/2022/April.html")
addElement(addElement($2022UL,"","","li"),"Mar 2022","","a","","/2022/March.html")
addElement(addElement($2022UL,"","","li"),"Feb 2022","","a","","/2022/February.html")
addElement(addElement($2022UL,"","","li"),"Jan 2022","","a","","/2022/January.html")

var $2021Li = addElement(blogUL,"","","li")
addElement($2021Li,"2021 ▼","","a")
var $2022UL = addElement($2021Li,"","","ul")
addElement(addElement($2022UL,"","","li"),"Dec 2021","","a","","/2021/December.html")
addElement(addElement($2022UL,"","","li"),"Nov 2021","","a","","/2021/November.html")
addElement(addElement($2022UL,"","","li"),"Oct 2021","","a","","/2021/October.html")
addElement(addElement($2022UL,"","","li"),"Sept 2021","","a","","/2021/September.html")
addElement(addElement($2022UL,"","","li"),"Aug 2021","","a","","/2021/August.html")
addElement(addElement($2022UL,"","","li"),"July 2021","","a","","/2021/July.html")

addElement(addElement(outerUL,"","","li"),"World History","","a","","/history.html")

var stuffLi = addElement(outerUL,"","","li")
addElement(addElement(stuffLi,"","","li"),"Stuff ▼","","a")
var stuffUL = addElement(stuffLi,"","","ul")
addElement(addElement(stuffUL,"","","li"),"Gillogisms","","a","","/Gillogisms.html")

var gamingLi = addElement(stuffUL,"","","li")
addElement(gamingLi,"Gaming ▼","","a")
var gamingUL = addElement(gamingLi,"","","ul")
addElement(addElement(gamingUL,"","","li"),"Ingame Items","","a","","/InGameItem.html")
addElement(addElement(gamingUL,"","","li"),"Android","","a","","/Android.html")


var toolsLi = addElement(stuffUL,"","","li")
addElement(toolsLi,"Tools ▼","","a")
var toolsUL = addElement(toolsLi,"","","ul")
addElement(addElement(toolsUL,"","","li"),"Calculators","","a","","/calc.html")
addElement(addElement(toolsUL,"","","li"),"Why's It Down?","","a","","/WhyIsItDown.html")
addElement(addElement(toolsUL,"","","li"),"Error Analyzer","","a","","/errorcause.html")

addElement(addElement(outerUL,"","","li"),"Contact","","a","","/contact.html")
}

function buildFooterPage($parentElement) {
	rebuildElement($parentElement);
	var footerNav = addElement($parentElement,"","navbar-static-bottom","","text-align: center;");
	addElement(footerNav,"© 2013-2023 Gilgamech Technologies - Powered by Sparational.js.","copyright","p");
	addLinkToWord(footerNav,"Sparational.js","https://www.Sparational.com/");
}
