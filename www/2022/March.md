From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [03/27/2022](#03272022) - Introducing the Door Clamp.
	
Demo of the 'door clamp' idea - these would clamp together several small box trailers. This example is a pair of 14 foot box trailers tail to tail, giving about 28 feet. And there's another pair of 14 foot box trailers to the left, giving space for a bedroom, living room, kitchenette, and bathroom. This demo is missing the weatherstripping wrap that would be clamped on either side, giving a much more enclosed space. Or the door ramps that would allow seamless thresholds. 

https://www.Gilgamech.com/images/doorClamp.png

--------------------------------------------------------------------

# [03/26/2022](#03262022) - Responsive iFrames.
	
Finally hunted down a [good CSS-only way to make iframes responsive](https://www.benmarshall.me/responsive-iframes/). A downside is that you need to declare the aspect ratio through percent instead of through both width and height.

```
.iframe-container {
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
}
```

/*This first part modifies the outer container, making it 56.25% as tall as it is wide, aka a 16:9 aspect ratio of width to height. (9/16 = 0.5625) Use 75% for 4:3 aspect ratio.*/

```
.iframe-container iframe {
   border: 0;
   height: 100%;
   left: 0;
   position: absolute;
   top: 0;
   width: 100%;
}
		
/*The next part modifies the iframe itself, making the video or other media fill the previous container.*/
```

--------------------------------------------------------------------

# [03/25/2022](#03252022) - Demo video.
	
Here's a demo of what I'm working on - finalize and record the script, and make a few more scenes like this, and I'll have a 10 minute video.

::: iframe# iframe-container
https://www.youtube.com/embed/obi8QXZmNxM
:::

--------------------------------------------------------------------

# [03/24/2022](#03242022) - Daily GIF update
	
Had to redo yesterday's setup because the scales were all weird. The table and room are in inches, the machine is in milimeters, and Blender wants to be in meters. So I reimported everything, scaled appropriately - and that machine is pretty small, with less footprint than a laptop. It's as big as a stack of textbooks.

https://www.Gilgamech.com/images/03242022.gif

--------------------------------------------------------------------

# [03/22/2022](#03222022) - Cancelling the video compendium.
	
I'm cancelling my video compendium - too much quantity and too little quality means it wasn't getting any viewership.
	
This means I'm free to work on the Enigma Machine video. I've made an Enigma-E replica in OpenSCAD and am putting together a digital space in Blender.

https://www.Gilgamech.com/images/Enigma-E.gif

--------------------------------------------------------------------

# [03/21/2022](#03212022) - Enigmeta Data
	
Some data from [The Crypto Museum](https://cryptomuseum.com/crypto/enigma/index.htm), tabulated. This might show up in the Enigma Machine video. Note that component names have been translated into English. Also, this leaves out the Swedish General Service's 28-contact version, which omits 'W' and adds Ä, Å, and Ö - Swedish didn't have a W, and they typed foreign names with a double-v, such as 'VVashington' or 'VVarsavva'.
	
First, the rotating and static wheels, and some other data points:

|Machine|Year|Rotating Wheel Locations|Total Rotating Wheels|Wheels Are Removable|Static Wheels|Static Wheel Settings|Wheel Contacts|Front Panel|Machines Produced|Comments|
|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
|Trade Machine|1923|4|4|Fixed|1|1|28|No Panel|A non-reciprocal cipher, so this large machine had an encrypt/decrypt switch.|
|A|1924|2|2|Fixed|1|1|26|No Panel|10-20|The 'military machine, it was a simpler reciprocal cipher.|
|B|1924|2|2|Fixed|1|26|26|No Panel|25+|The rolling reflector (static wheel) became changeable.|
|B Mk2|1925|3|3|Fixed|1|1|26|No Panel|50|
|C|1925|3|3|Fixed|1|2 or 4|26|No Panel|50|
|D|1926|3|3|Removable|1|26|26|No Panel|100+|This was the first long-lived model, and the basis for all following models.|
|Z|1927|3|3|Removable|1|10|10|No Panel|100|Number only version.|
|K|1927|3|3|Removable|1|26|26|No Panel|1k+|K for Kommercial version, this was the only version whose wheels were polished to a shine. Also used by their military logistics railiroad group. So in theory, anyone with one of these machines (like Marion) could guess the settings and start to decrypt their military messages.|
|1|1932 |3|5|Removable|1|1|26|Panel|20k|Used widely by their army and air force.|
|M1|1934|3|8|Removable|1|1|26|Panel|611|Naval Version (Marine1), includes 4 volt or 6 volt plug and cable for the ship's wall plug. Compatible with Enigma1 with certain settings.|
|M2|1938|3|8|Removable|1|1|26|Panel|890|Naval Version (Marine2). Cryptographically compatible with M1.|
|M3|1940|3|8|Removable|1|1|26|Panel|800|Naval Version (Marine3). Cryptographically compatible with M1 and M2. Had a rewirable reflector instead of a settable reflector. Also had a special box for the 5 extra wheels.|
|M4|1942|3|8|Removable|2|26|26|Panel|1011|Naval Version (Marine4), a secret even to other military branches. Took 8 months to crack, causing an intelligence blackout. Known as 'adding a 4th wheel', even though the 4th wheel wasn't interchangeable with the other 8, and couldn't rotate.|
	
Next, the frequency of rotation for various parts of the machine:

|Wheel|Frequency Of Change|
|-------|-------|
|Front Panel|Daily + each message|
|Wheel A|Daily + each message|
|Wheel B|Daily + each message|
|Wheel C|Daily + each message|
|Rolling Reflector|Daily + sometimes each message|
|Rewirable Reflector|Weekly|
|4thWheel|Monthly|
	
Enigma-M4 was distributed to the other branches after development, but the 3 Marine Wheels (Wheels F, G and H) were not. So they were using slightly different versions of Enigma, and while their army and air force version was cracked within months, the naval version wasn't cracked during the war. But cracking the naval version wasn't necessary to win the war. Speaking of Enigma versions:

|Cipher|Machine|Notes|
|-------|-------|-------|
|Enigma.TM|Trade Machine|First machine, this used a non-reciprocal version of Enigma cipher.|
|Enigma.1|A|Wheels reduce from 4 to 2, reciprocal version of Enigma cipher.|
|Enigma.2|B|Enigma.1 plus wheels increase from 2 to 3.|
|Enigma.3|C|Enigma.2 plus rolling reflector positions increased from 1 to 2 or 4.|
|Enigma.4|D,K|Enigma.3 plus rolling reflector positions increased from 2 or 4 to 26.|
|Enigma.5|1|Enigma.4 plus front panel allows transposing letters. Rolling reflector positions decreased from 26 to 1 (fixed), |
|Enigma.6|M1, M2, M3, M4 (navy)|Enigma.5 plus rolling reflector is rewirable. Shipped with 3 extra 'marine wheels' with different stepping.|
|Enigma.7|M4 (army/af)|Enigma.5 plus rolling reflector is rewirable, and  4thwheel is like a 2nd (26 position) rolling reflector.|
|Enigma.8|M4 (navy)|Enigma.6 plus 4thwheel is like a 2nd (26 position) rolling reflector, and has an Enigma.6-compatible setting.|

*This is a partial list.*

Enigma-C and all following models of Enigma Machine had 3 wheels that rotated with each keypress. Enigma-A had just 2, and Enigma-B at first had a 4th wheel that could spin, but this was quickly modified to remain stationary. Most videos say later upgrades added a 4th wheel, which is technically true, but it would not have realistically ever moved. Enigma's alphabetic advance means Wheel A moves with each keypress, Wheel B with each spin of Wheel A, or every 26 key presses. Wheel C every 26 x 26 or 676 keypresses, so maybe once or twice a message.
	
The fourth Wheel D would spin every 26 x 26 x 26 or 17576 keypresses. These were sent one-letter-at-a-time over radio telegraph, then decrypted one-letter-at-a-time through the glow lamp machine. At one character per second, it would have taken nearly 5 hours to transmit/receive a message this long. Not to mention incredibly tedious.
	
Some consider this to be a security defect, and I have to wonder what length of messages they expected people to send or receive one-letter-at-a-time.

--------------------------------------------------------------------

# [03/20/2022](#03202022) - Rushin' to Ukraine

### Actual Ukranians are living through a literal [Red Dawn](https://www.imdb.com/title/tt0087985/) moment. Actual Russians want their young soldiers to come home.
	
Planned on very short notice, the invasion was planned to be a quick taking of Kyiv and replacing the government with a puppet overlord. A planned quick invasion by the obviously superior military forces to subdue the lesser nation, and a quick political stroke to rejoin it to Russian interests. Ukranian forces were planned to fall like dominoes. Nations and megacorps were planned to be ambivalent.

### No plan survives first contact.
	
**Planned on very short notice**, the invasion was supposed to limit or prevent reaction time from other world powers. That the US State Department caught this, when even Russian businesses were unaware, speaks to the incredible intuitive abilities of the people who constitute that group. **This is Putin's War, and Putin's War alone.** It has no support from other world powers, or even from smaller nations. It also has no internal support in Russia, which is reflected in the half-baked planning and sloppy exection of the invasion.
	
**A planned quick invasion by the 'obviously' superior military forces to subdue the lesser nation - but this has gone from mired in literal mud to mired in an unworkable military position.** Russian forces have been shown to be in various states of disrepair and unfit for deployment anywhere outside of Russia. And now it appears that the majority of Russia's military machines have broken down. They may be unable to muster military might for some years, or maybe even decades.
	
Very short notice prevented Russian nations from performing their normal pre-embargo/pre-sanction stockpiling, and so Russian businesses and citizens are hurting especially badly. Many businesses are unable to continue operations due to a lack of raw material inputs, or inability to ship output products to customers. So many Russians are out of work directly because of Putin's personal actions, and they are very well aware. This will also heavily impact the maintenance and rebuilding of Russia's military forces, further extending the period of time before they can again muster a significant military force.
	
**The invasion was planned to be a quick taking of Kyiv and replacing the government with a puppet overlord, followed by a quick political stroke to realign it to Russian interests - but this has become a politlcal fiction.** The people of Ukraine have rallied and support their president now more than ever. Further, Belarusians and Russians are sabotaging their own nations to prevent aiding this war. Russian citizens are protesting the war in city streets. Russian oligarchs have started placing bounties on Putin, a further sign that he has lost the confidence of the Russian people of all classes.
	
**Ukranian forces were planned to fall like dominoes - but they stand like caltrops.** Russia's constipated invasion into Ukraine has stalled, and will likely stagnate until the young soldiers run out of fuel, food, or funding and go AWOL. The inferior planning and intelligence for this invasion was eerily similar to the US invasion of Iraq in the early 1990s. But in lieu of a quick military victory, or the sufficient and capable military forces which the USA used in Iraq, Putin has embraced the [Tarkin Doctrine](https://starwars.fandom.com/wiki/Tarkin_Doctrine) of terrorizing the populace into submission through overwhelming brutality. This is seen in the war crimes of continuously bombing and attacking of civilian shelters and evacuation routes.

### If business is war, then this is WW3. The whole world is at war with Putin.
	
**Nations and megacorps were planned to be ambivalent - but we unite in a modern-day economic siege of Russia.** While UN, NATO, and other world power organizations maintain some distance from what they see as a regional conflict, individual nations have imposed financial sanctions and economic embargoes. Megacorps have largely pivoted this external threat into a marketing opportunity: avoiding severe negative public opinion by opting for a continuation of international business, at the cost of meager profits from Russian operations. Citizens from nations around the Earth have protested the invasion in solidarity with the Russians inside Russia - and amazingly US Americans are enduring 50% higher gasoline prices in support of the international Russian oil boycott. Even China's CCP is dismayed at this confrontation, and seeks an end to military action, so commercial and industrial actions may resume.
	
The most troubling part of this is the lack of long-term endgame at this point. In the short term, Russia's broken tanks, trucks, and other military machines will likely be confiscated by Ukraine and its citizens - in a literal swords to plowshares move, the steel from the tanks might be used to make farming equipment. Russian forces will either be detained by Ukrainian forces, or just return home. The Ukrainan-Russian border will likely not change, and sanctions and boycotts might remain in place for a while.
	
What then of Putin? Does he have enough political and monetary influence to evade headhunters without being able to leave Russia, or access the money he's exfiltrated into London (and likely the Secrecy Jurisdictions)? Is there **No Country For Old Spies**?

--------------------------------------------------------------------

# [03/18/2022](#03182022) - Where's the remote?

https://www.Gilgamech.com/images/remote.gif
	
Found OpenSCAD, which has a wonderful C-like language interface in which the SCAD files are saved. It can also natively render and output STL files for direct Blender input. Now, the challenge is seeing the world as a series of added and removed Platonic Solids that move around.

--------------------------------------------------------------------

# [03/17/2022](#03172022) - Making weird GIFs while learning Blender.

https://www.Gilgamech.com/images/cubeandcone.gif
	
Learning 3d animation is really easy with Blender - it's a great tool for taking shapes, animating them, and producing a file stack for processing into a GIF or video. Working up the toolchain, the next step is finding a good free/cheap CAD program to create the shape files. Yes, it should have been green or have a clover. Oops! 😎

--------------------------------------------------------------------

# [03/13/2022](#03132022) - Historical Labor.
	
I made myself a challenge last week, to see if I could output 25 history videos, covering a large chunk of the historical compendium. It turns out I bit off more than I could chew. But I built a 'video factory' learned a lot in the process:

1. Screenshot the page and add to GIMP. This is roughly 960x540, and expands nicely on HD video. Then create a new layer foreach of the history items in the image. This step takes like 5 minutes.
2. Foreach layer, rectangle select the item, then invert. Painbrush black 60% opacity to deluminate the others. Second pass to add the Big G Gear stamp, same settings. Third pass to snap these into PNGs. Each of these operations is a one-click mouse macro. This step takes like 5-10 minutes.
3. Record and edit audio in Audacity. Recording takes like 5 minutes per video, and between 3x and 6x as long to edit. (Talk about missing time!)
4. Process video in OSP. This means dragging each of the audio clips in order, then matching the still image, extending it to the MP3 length, and ensuring no gaps between images.
5. Video Check. This is a step I had been missing, and Youtube reflects this. Almost every video I uploaded has errors, and some are bad. I have remastered each video, and I thought I'd have them uploaded yesterday, but fixing was a lot of work. It's going to take about a week to correct the videos already up.
	
From the latest set of videos:

https://www.youtube.com/embed/azD6usOHEso

--------------------------------------------------------------------

# [03/10/2022](#03102022) - Aces High.
	
I missed International Asexuality Day on March 6th. Here's an image I made recently:

https://www.Gilgamech.com/images/BadForYourHeart.png

--------------------------------------------------------------------

# [03/04/2022](#03042022) - Title card from new video.
	
In addition to making a video version of my historical compendium, I'm producing a video about the Enigma machine blog post I made below. Here's the title page:

https://www.Gilgamech.com/images/EnigmaTitle.png

--------------------------------------------------------------------

# [03/03/2022](#03032022) - Choosy Moms Choose Gif.
	
Learning to make videos means upgrading tools, and moving up from Windows Movie Maker and into OpenShot. One of the assets I'm working to design are animated GIFs that work as title elements and visualizations of concepts. A complication here is that OpenShot imports GIFs as a still image of the first frame, not as a type of video. So how to import GIFS into OpenShot? Through Windows Movie Maker! WMM takes GIFs as short videos, so just add the GIF to a new project, bring to storyboard, then export as MP4. The MP4 imports into OpenShot and plays in a track as any other video.

--------------------------------------------------------------------

# [03/01/2022](#03012022) - Calculon-and-on-and-on.
	
Putting all of my calculators on one page, for easy finding. [Check it out today](https://www.Gilgamech.com/calc.html)!
	
(Ciphers will get their own page soon.)
