From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [07/31/2022](#07312022) - Cryptid currency.

- Formal
  - Lack of oversight allows market players to create volatility, and whole new currencies, at will. Market players set up and run countryless central banks as though they're businesses, including the massive marketing budgets to name sports stadiums. There is no consumer nor employee protection, so during downturns both parties are among the first to be pushed from the company.
- Computational
  - Reverse-engineering SHA256 (or similar) certificates to store data feels like a solution in search of a problem. Why not reverse-engineer SSL certificates or user passwords? SHA isn't technically reversible, so they're creating billions of certs per second, looking for one that already has the transaction details hashed within. And the more people looking, the harder it becomes to find.
	- In which situations do you need a volunteer-run distributed append-only database that's weak against a 51% attack?
- Financial
  - Markets often overinflate with speculative investors, causing too much volatility for a currency to be used for payment, and definitely too 'interesting' to reliably store asset value.
	- Tossing a coin to the lucky miner is a transfer of wealth from all other coin holders.
	- The most popular currencies are designed to prevent liquidity. Instead of additional miners increasing transaction capacity, it's the difficulty level of mining that increases proportionately with additional miners. This causes the money supply to remain flat, instead of being able to respond to changes in demand. This causes supply-side inflation during shortages, where high demand for the currency inflates its value unnaturally. And likewise, deflations are unnaturally magnified. Therefore these cannot store value, since transfer rates will always inflate alongside coin prices - an effective store of value has a low or static fee instead of this Adjustable Rate.
- ForEx
  - Volatile and not backed make it like investing in the Turkish Lira through a Chinese bank. (Investing in the RMB through a Turkish bank would be a less-questionable investment strategy. Even better, for those with the option, is investing in USD through an US American bank.)
- Marketing
  - Each new currency, and each wave of an existing currency, uses the marketing budget of a Disney movie - mostly paying Youtubers to say 'to the moon' a lot.
- Environment
  - In 2022, most electricity on Earth is generated through carbon release and not a sustainable power source, and so the high electricity use of these devices (comparable to heating Sweden through the arctic winter) must be having a high environmental impact.
- ROI
  - Consumes enormous amounts of very expensive computational resources, using electricity consumption comparable to Sweden for an uncertain ROI.
	- Asset classes are entirely numerical hashes, for which an algorithmic hash-to-image function has been constructed - these people don't even own those ugly monkeys, as the monkey is just a drawing that a website makes based on the random-ish numbers that the person bought. Just like [Robohash.org](https://www.Robohash.org) can do with any username.
- Psychological
  - 'Winning' a block has a very gacha feel.
	- The 'line/number go up' effect is undeniable.
	- Users are eager to look at ugly monkeys because they're a nice change of pace from the bar and line graphs. (This is the News Advertising cycle being played out in crypto)
- Market effects
  - Impacts gaming as both consume the same video cards. (Weren't ASICs supposed to help with this? As a counterargument, why buy an ASIC - if this currency goes bust you could go play Elden Ring instead.)
	- Exceptional volatility - I started writing this post when the price of Bitcoin was under $44k. But by the time I'd gathered what I felt were sufficient perspectives, its price had peaked at $48k, then lost 60% of its value to crash under $20k, and recovered somewhat. If this market keeps growing, these new markets and currencies might experience regulation just to make sure this exceptional volatility doesn't have too much impact on global financial markets.
- Career
  - Giving a 'cash prize' for performing work is much less ethical than having a labor contract, turning mining into the Gig Economy version of Data Centers.
	- Company employees experience rug-pulls during market downturns, since their employers sole value is psychological, and the industry has but one revenue stream: investors. (Where is the ad-supported Bitcon?)
- Industry
  - These are quintessential tech companies in a few ways, including their heavy use of scalable code, investor-driven Ponziesque profit model (where is the ad-supported Bitcon?), and disregard for employees with highly-valuable skills by treating them as disposable.
	- There are no profit centers here, only cost centers.

# [07/29/2022](#07292022) - Making websites about making websites.

Part of becoming a solutions architect is endless learning. There are So Many Services. And more than half of them are AWS. So I'm assembling a website to keep track of them all. Right now it's called [Offering Overview](http://offeringoverview.s3-website-us-west-2.amazonaws.com/). It's still a work in progress, so please be gentle.

				
# [07/28/2022](#07282022) - For the love of webservice.

Containers led down a rabbit hole that reignited my love of full stack development. I created a [Programmatic Webserver](https://github.com/Gilgamech/ProgrammaticWebserver), to which you can PUT a JSON file with an action described, and the server will respond accordingly when GET is called against the same resource.

Alongside this has been much studying of cloud architecture and evaluating numerous products. A Gartner image reposted on LinkedIn gave me an epiphany about the state and direction of the industry. Look forward to more content about how patching servers is a waste of time in the age of serverless and SaaS, and how much more we can do if we're so unburdened.

Also cleaned up my [Github](https://github.com/Gilgamech) pages, uploading and fixing up numerous repos including the 3d [ShapeCache](https://github.com/Gilgamech/ShapeCache), [WebCoif](https://github.com/Gilgamech/WebCoif), [StarSpar](https://github.com/Gilgamech/starspar), plus [ARKData](https://github.com/Gilgamech/ARKData) and [SteamQuery](https://github.com/Gilgamech/SteamQuery).

The site is back now as [hosted S3 files](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html), fronted by a [CloudFront distribution](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-https-requests-s3/). The SSL certificate was generated by ACM after manual DNS modifications.

Tips:

- Be sure to specify your index.html or other root file - leave it blank and [CloudFront will accelerate an S3 error page](https://stackoverflow.com/questions/44741287/cloudfront-error-this-xml-file-does-not-appear-to-have-any-style-information-as). 
- Remember to add your main domain as an alternate CNAME domain, or [CloudFront won't be able to find it, and will instead give you a 403 error](https://aws.amazon.com/premiumsupport/knowledge-center/resolve-cloudfront-bad-request-error/).

A big plus to moving to S3 is the ease of updating individual files - almost as easy as when it was on a Windows server. Next up, we'll evaluate costs.


		
