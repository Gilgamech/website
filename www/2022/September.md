From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [09/30/2022](#09302022) - Transpose arrays faster.

Inspired by (and partially written during) [HackerRank Array Manipulation Challenge](https://www.hackerrank.com/challenges/crush/problem). Transposes an array in linear time to the number of columns (length of the 2nd dimension), by using regex to slice up the coumns into rows. Doesn't support non-alphanumeric characters yet.

```JavaScript
function transposeArray(arr) {
```

Create a new array that's as long as the old one was wide.

```JavaScript
	var out = Array(arr[0].length);
```

Create a Regular Expression to replace every N letters, numbers, and commas with a single plus.

```JavaScript
	var regex = new RegExp('(,[a-z0-9]+){'+(out.length-1)+'},','g')
```

Cycle through the array, summing arr column C to index item C.

```JavaScript
	var nextItemLoc = 0
	for (let c = 0; c<out.length; c++) {
```

Cast the array to string, slice off the first C columns in the first row, then regex the columns you don't want, split off the array members you don't want, and eval. Arrays are comma-separated, making this easy.

```JavaScript
		out[c] = eval('['+arr.toString().slice(nextItemLoc).replace(regex,'+').split(',')[0].replace('+',',')+']')
```

Move forward to the next item.

```JavaScript
		nextItemLoc = arr.toString().indexOf(',',nextItemLoc)+1
	}
	return out;
}
```

--------------------------------------------------------------------

# [09/23/2022](#09232022) - Deaureating nebulae-transcending colossi.

## Recent compute eras, simplified.

|Era|Compute|Network|Storage|
|------|------|------|------|
|2023|N/A|CF Edge|S3-IA|
|2020|N/A|CloudFront|S3|
|2017|Lambda|API Gateway|S3|
|2014|Docker|Application ELB|S3|
|2010|EC2|Classic ELB|EBS|
|2000|VMWare|Netscaler|SAN|
|1990|Bare Metal|ISP Circuit|RAID|
|1980|Mainframe|LAN|Mainframe|


## Cloud-native adoption strategies to reach the 2023 Era:

- 1980s Era: Mainframe and LAN. Mainframes in the 2020s are probably processing customer and product data. Since there are no cloud-hosted mainframes, moving the data and logic to a data lake and depreicating the mainframe is really the only path.
- 1990s Era: Bare Metal, ISP Circuits, RAID storage. A couple routes exist, depending on your data center costs. The ultimate goal of any cloud-native migration is to replace each of your services with APIs, but intermediate cost savings and flexibility gain can be achieved by rehosting workloads onto EC2 servers. Or if you have low data center costs, use an on-premise Kubernetes service to build and test your new cloud-native services. For complex systems, a multi-step migration path can be followed, to allow enough granularity for a smooth migration across multiple maintenance windows:

|Step|Compute|Network|Storage|
|------|------|------|------|
|0|Bare Metal|ISP Circuit|RAID|
|1|VMWare|ISP Circuit|RAID|
|2|VMWare Cloud|ISP Circuit|RAID, S3 & Data Lake|
|3|VMWare Cloud, ECS, Lambda, & N/A|ELB|S3 & Data Lake|
|4|VMWare Cloud, ECS, Lambda, & N/A|ELB, CloudFront, & API Gateway|S3 & Data Lake|
|5|ECS, Lambda, & N/A|CloudFront & API Gateway|S3 & Data Lake|

- 2000s Era: VMWare, Netscaler, SAN. Basically the same options as 1990s Era, as various routes to completely rebuild the system.
- 2010 Era: EC2, Classic ELB, EBS. Similar options as 1990s era, but needing much fewer steps to replace, as the rehosting migration will be much shorter. 
- 2014 Era: ECS, Application ELB, S3. Depending on runtime and implementation, these might be very easy to move into Lambda. 
- 2017 Era: Lambda, API Gateway, S3. Great for workloads that don't run long nor need much customization. Can be modernized by using a direct-access URL. Or use a framework like [Sparational.js](https://www.Sparational.com) to move compute logic completely into the browser, and remove the compute layer altogether. 
- 2020 Era: N/A, CloudFront, S3. Modify your S3 settings to use other tiers and redundancies for less-accessed and archival files. S3 can rotate logs without invoking another service. Accelerate any necessary compute with Lambda@Edge. 
- 2023 Era: N/A, CF Edge, S3-IA. You're living in the future. 

## How much work will be involved to rebuild a given workload, and where exactly should it end up? Use these questions to help yourself to know:

- Can it be rewritten or reenvisioned to be stateless?
- Can it write to S3 instead of a local filesystem?
- Does it need to stay in memory?
- How long does it run, and how often? 
- Do you need to customize the OS or environment?
- Is the use case so specific that you need custom software, or is there a SaaS option that will also work?
- Failing that, is there a free, open-source, commercial off-the-shelf software (FOSS COTS) option? Containerized if possible.

--------------------------------------------------------------------

# [09/21/2022](#09212022) - Methane, youthane, we all thane for urethane.

Burning natural gas is generally environmentally beneficial, as it converts 3 high absorbers of heat into 2 moderate absorbers of heat and 1 high absorber.

- The process is CH4 + 2 O2 => CO2 + 2 H2O

This process is not easily reversible; methane cracking involves generating hydrogen through electrolysis or other means, then pressure-cooking it with carbon dioxide. Or put a cowpie into a grass-filled mud puddle.

To reference my [blog post from last October](https://www.Gilgamech.com/2021/October.html#10112021), carbon's 4 'hands' allow each to hold the sole hand of a hydrogen atom. And the two dioxygen molecules are made from 2 oxygen atoms, tightly holding one pair of 'hands', but the other pair only loosely held together. Ignition gives enough energy to loosen a few 'hands', and at the end of the process: the two oxygen atoms from one of the dioxygen molecules have wrapped themselves around the carbon molecule, and the hydrogen atoms have dispersed themselves across the 4 open 'hands' of another oxygen molecule.

Methane has an [atmospheric lifetime](https://energyeducation.ca/encyclopedia/Methane) of 12 years - after this, what does it break down into? I'm guessing UV sunlight ionizes the molecule into water and CO2, the same products as combustion would create. Combustion creates these because they're the lowest-energy state of the system of atoms. But instead of this energy being used by humans, it's lost into the atmosphere.

To put another way, carbon and hydrogen in the configuration named 'methane' represents a certain amount of energy, like a compressed spring, which will break apart and be released as heat at some point in the next 12 years. This energy can either be captured by humans, where at least some of it will be converted into rotational or electrical energy. Or it can be released into the atmosphere completely as heat.
Considering whole mols of matter instead of individual chemicals allows easy comparing of energy absorption. In Joules of energy per mol:

- Before: CH4 + 2 O2 = (35.69 + (2 * 29.38))/3 = 31.48 J/mol for every 1 degree increase.
- After: CO2 + 2 H2O = (36.94 + (2 * 75.327))/3 = 62.53 J/mol for every 1 degree increase.

So after burning methane, the products need twice as much energy to become the same temperature. Boltzmann's Constant tells us that the temperature of a gas is directly related to the average speed of its constituent molecules, and so this means it takes about twice as much energy to accelerate a water molecule to a given speed than a methane or dioxygen molecule. Much of this is due to water being a polar molecule, and thus being attracted to like molecules, instead of most gases which repel their like molecules.

Burning methane for energy not only gives us a useful energy source, but also reduces how fast the atmosphere will heat up, and removes another heat source. This should be kept to well-maintained and regularly-audited industrial facilities, to prevent accidental weaponization through poor maintenance and lack of awareness of problems. Nobody wants their road to explode, [which occasionally](https://www.foxnews.com/us/at-least-9-firefighters-injured-after-natural-gas-explosion-in-seattle-neighborhood) [keeps happening](https://www.seattletimes.com/seattle-news/uw-tower-evacuated-after-natural-gas-leak-at-construction-site/) in Seattle.

--------------------------------------------------------------------

# [09/08/2022](#09082022) - Pollute-off.

Making batteries for 1 BEV car is about the same as an ICE car driving 55k miles, or 3.75 years at the USA average of 15k miles/year. So the BEV has to drive for 3.75 years (while charging from renewable energy not coal power plants) to equal an ICE car in pollution - after the 3.75 years, the BEV pollutes less.

But a hybrid has about 1/200 as much battery as the BEV, and so only needs to drive 275 miles or about a week. After that, the hybrid is polluting less than the ICE car. Usually about 1/2 as much, based on gasoline savings.

And this means it takes the BEV car 7.5 years of charging entirely from renewables to match a hybrid in pollution. After 7.5 years, the BEV pollutes less than a hybrid.

Graph of pounds of CO2 released. These assume 55k mi of driving at 20 MPG equivalent to assemble the BEV battery. Engine and body values made up but assumed to be close.

|Input|Battery|Engine|Body|Assembly Sum|Rate|Year0|Year1|Year2|Year3|Year4|Year5|Year6|Year7|Year8|
|------|------------|--------|------|--------------------|-----|---math('Assembly Sum'+'(0)'))-|---math('Rate'+'Year0')-|---math('Rate'+'Year1')-|---math('Rate'+'Year2')-|---math('Rate'+'Year3')-|---math('Rate'+'Year4')-|---math('Rate'+'Year5')-|---math('Rate'+'Year6')-|---math('Rate'+'Year7')-|
|Mileage|0|0|0|0|15k|
|BEV|55k|0|3k|58k|0|
|Hybrid|275|2k|3k|5.275k|7.5k|
|ICE|0|2k|3k|5k|15k|

--------------------------------------------------------------------

# [09/07/2022](#09072022) - CCP 20th party congress selections.

Notes from [Lei's Real Talk video](https://www.youtube.com/watch?v=16-obNP1zJo) about the upcoming political event in Asia:

- Selections begin the congress? They happen every 5 years. Top-down selection process, not bottom-up elections.
- Centralized Democracy: Democracy is an illusion, and centralized means central political agency.
- Age is important because the maximum age for Politburo members (other than the party leader) is 67 - if a Politburo member is 68 or older during a congress, they have to step down during that congress. This is called '7-up 8-down'.

## Process

- 90 million CCP members from across China's 34 admin regions, and Taiwanese party members, select 2000 vetted delegates, 10 of which are from Taiwan, but with family on the mainland.
- Delegates select 200 central committee members and 160 alternates. This year some are saying to select a Taiwanese to the central committee for once.
- 200 central committee members select 25 to form the Politburo. (Is 'Politburo' Newspeak for 'Political Bureau'?)
- 25 Politburo members select 7 to form Politburo Standing Committee (PSC).
- PSC member count has varied. Mao had 5, 6, 7, then 9. In 1987 it went to 5, then 7 for the following 2, then Deng Xiaoping increased to 9 to 'pack the PSC' with his supporters. XI Jinping reduced to 7, and might reduce to 5 to centralize political agency.
- Votes used as reference. Sometimes a successor gets few votes, and this embarassment is ignored.

|Step|Mainland|Taiwan|Sum|Selected|Per selected|China Rep|Taiwan Rep|
|------|-------------|---------|-----|---math('Taiwan'+'Mainland')-|---math('Sum'/'Selected')-|---math('Mainland'/'(1.4 billion)')-|---math('Taiwan'/'(23.57 million)')-|
|Members select citizens|1.4 billion|23.57 million|90 million|
|Members select delegates|90 million|235.7k|2k|
|Delegates select committee|2000-10|10|200|
|Committee selects Politburo|200-1|1|25|
|Politburo selects PSC|25|0|7|


## Process Analysis

- 90 million CCP members? Rumors suggest fewer. With China's reported population of about 1.4 billion, with rumors also suggesting fewer, this would be 1 party member for every 15 or 16 people, or about 6% of the population.
- Assuming both figures are inflated 10% gives us 81 million CCP members and 1.26 billion total population, which is still just 6%.
- Taiwan's potential influence is greatly diluted relative to its size, and in a democratic government wouldn't be accepted as proper representation. The graph above shows Taiwan's representation in the CCP is an order of magnitude less than the rest of China.
- 2000 vetted delegates are split between 10 Taiwanese and 1900 from Mainland China. This gives 1 central committe member per 736,842 Chinese citizens but only 1 per 2.36 million Taiwanese. This means the Taiwanese selection is only 31.22% as powerful as a mainlander's selection.
- 200 central committe members might have 1 Taiwanese member. This would give 1 central committe member per 7.3 million Chinese citizens but only 1 per '+taiwanPop+' Taiwanese. Likewise, this means the Taiwanese selection is only 30.97% as powerful as a mainlander's selection.

## PSC Roles

- CCP Secretary - De facto leader of nation.
- Premier - Role has heavy financial responsibility building the economy. Members in this role are unlikely to become the CCP Secretary.
- First Vice Premier - A person will usually fill this role before being selected for Premier.
- Central Secretariat - Unsure of the duities of this role.
- Central Committee for Discipline Inspection - Most important role for XJP's anti-corruption campaign, the tool he's using to remove political enemies. Very sensitive position, all predecessors only had 1 term because of all the 'dirty laundry'.
- Political Consultative Conference - 'leisure job' without much power.
- People's Congress - 'leisure job' without much power.

## PSC Players

|Pinyin Name|Phonetic Name|Age|Faction|19th PSC Role|20th PSC Role|Notes|
|------|------|------|------|------|------|------|
|Xi Jinping|Shi Jinping|69|XJP|CCP Secretary|CCP Secretary|Called XJP here because his name comes up too often. A benefit of the role is that 7-up 8-down doesn't apply.|
|Li Keqiang|Lee Ke'chang|67|Hu Jintau|Premier|People's Congress or retire|Unlikely to become CCP Secretary. Doesn't want to be Premier again.|
|Wang Yang|Wong Yong|67|Hu Jintau|Political Consultative Conference|Premier?|Many believe Wang Yang's relationship with XJP is better than Li Keqiang's, but Wang Yang has a 'leisure job' and isn't earning much trust, so probably won't. Hu Jintau's previous chosen successor for XJP.|
|Han Zheng|Han Jeng|68|Jiang Zemin|First Vice Premier|Retire|Expected to retire due to 7-up 8-down.|
|Wang Huning|Wong Hooning|67|Jiang Zemin|Central Secretariat|Central Secretariat?|The 'CCP leadership's makeup artist' and the one who steered XJP to the 'left' (away from business investment?). He was a scholar before joining the Politburo, which really breaks protocol. Jiang Zemin faction's best weapon against XJP, as an advisor to stay close and control the political direction. Called the 'most dangerous man in the world', but lately has been marginalized by XJP as he realizes he's been 'shifting left' too fast.|
|Zhao Leji|Jolly Ji|65|XJP|Central Committee for Discipline Inspection|Unclear|His father was subordinate to XJP's father, so they're 'more equal' than others. Youngest in the PSC, unimpressive abilities but role gives him dirty laundry, so he might be moved around instead of retired.|
|Li Zhanshu|Lee Janshoo|72|Unknown|People's Congress|Retire|Expected to retire due to 7-up 8-down.|
|Hu Chunhua|Hoo Chunhua|59|Unknown|Politburo|Premier?|Hu Jintau's chosen successor for XJP, but his ranking in the Politburo isn't very high, so moving him up to CCP #2 is rare.|
|Ding Xuexiang|Ding ShueeShiang|59|Unknown|Politburo|Premier?|Runs the daily CCP business. Went to college at 16 to study material science, then left university research for politics in his 30s. Had a 6-month internship and really impressed XJP with his low-key pragmatic approach.|
|Huang Kunming|Huang Kunming|65|Unknown|Politburo|Might join if Li Keqiang retires|Minister of Propaganda, another important apparatus for XJP. Started in the military. From Fujian Province where XJP started his career, so they have worked together for a long time.|
|Chen Xi|Chen Shi|68|Unknown|Politburo|Retire?|Runs CCP HR, and the CCP party school, so knows all the dirty laundry. Was XJP's roommate in 1975 at Tsinghua University and they studied chemical engineering together. XJP had trouble joining the CCP because his dad was in an anti-CCP clique, and had applied 9 times, then Chen Xi got XJP admitted as a member. Can't join PSC due to 7-up 8-down.|
|Hu Jintau|Hoo Jintau|80|Hu Jintau|Faction Leader|Faction Leader|The PSC's kingmaker, chooses party secretary successors. Leads the Youth Faction.|
|Jiang Zemin|Jiang Zemin|96|Jiang Zemin|Faction Leader|Faction Leader||

## PSC Factions:

- Reducing PSC members to 5 could either remove one faction completely or kneecap both other factions down to a single member.','','li')
- Harmony and discord between XJP Faction and Hu Jintau's Youth League. Hu put XJP on the throne, and supported him, so XJP wants to accept Hu Jintau's chosen successor as payback. But they have different goals?','','li')

## USSR impact:

- Mikhail Gorbachev banned censorship, restored political victims, granted rights to start organizations. CCP news hardly covered his uninstall because he really touched a nerve.','','li')
- Since the USSR fell, the CCP have been studying why, to try to avoid the same fate.','','li')
- The CCP see the fall of the USSR not as a failure of communist ideology as a bad path, but a failure of implementation as an inability to stay on the path. It's like driving into a dirt trail and high centering, saying that you high centered because you're so bad at keeping your car on the road - when in reality, the road you're on has ruts so deep that even the most lifted truck would high center.','','li')
- The Li/Xi dichotomy stems from Li trying to build an economically impressive China (like a nice car), but Xi (the driver) seems to be tearing it apart with Zero Covid and other political platforms. So it doesn't matter that the car is nice because the driver is crashing so much.','','li')
- Zero Covid has become a very convenient scapegoat for local governments not meeting financial goals.','','li')

The first step to defeating an opponent in a game is understanding them.

--------------------------------------------------------------------

# [09/01/2022](#09012022) - Menu pagelet.

Pagelet is live. Login may be next.
