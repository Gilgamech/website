::: style#
body { background-color: #F87217; }
:::

From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [10/30/2021](#10302021) - GeoMetroDynamics.

This involves the study of Geo Metros in dynamic environments. [Oh, it means something else?](https://en.wikipedia.org/wiki/Geometrodynamics)

--------------------------------------------------------------------

# [10/29/2021](#10292021) - Life is the river, and we are the riverbed.

Set of knowledge for a field => Set A (Field Knowledge).

Set of information to solve a present problem => Set B (Relevant Knowledge).

1. Set B is comprised from multiple Sets A.
1. No single Set A holds all items within a Set B.
1. Expertise in a field is generally considered to holding Set A within one's brain.
1. Problem solving aka troubleshooting is holding all of Set B - sometimes after locating its components and assembling Set B.

Gilcraft update - Even with expanded RAM, the sole AWS CPU struggles with even one player, and would likely be unplayable even with the small limit of 5. The host review might turn into gaming benchmarking, and will be written early next month, to include a look at bandwidth costs.

--------------------------------------------------------------------

# [10/23/2021](#10232021) - Game is the middle half of my name.

Revised the server build code while upgrading the server. And work progresses on Gilcraft.

--------------------------------------------------------------------

# [10/22/2021](#10222021) - The one kind of video that Youtube doesn't want to have.

Youtube are again completely retraining their algorithm, this time to hate videos longer than 4 minutes. Their claim that this is to support mobile views suggests they're losing views to another video service, so are quick to alienate their long-video users. Supporting long (30+ minute) videos over watchable (4-20 minute) was to compete with a 3rd video service. It's the eventual result of every group who tries to be 'everything to everyone' and lead all segments, as the goal of compromise is to spread misery through nonviolent political means. This is a social upgrade from spreading misery through military means. As for the video length, it's a [Random Walk](https://en.wikipedia.org/wiki/Random_walk), like a dog going inside-outside-inside-outside.

Youtube provides an easy way to search for short (under 4 minute) and long (over 20 minute) videos. But strangely do not provide an option to prefer videos between 4 and 20 minutes long. And this is 'logical' because underserving their userbase somehow makes them more money. The obvious solution here is to launch a service focused on 'quick bites' that are 4-6 minutes long amirite?

--------------------------------------------------------------------

# [10/21/2021](#10212021) - Some Minehut drama, and self-hosting Gilcraft on AWS.

Minehut's [5 hour outage](https://twitter.com/minehutsupport/status/1450250681101717504) turned into a 7 hour outage. During that time, I reviewed their frequent downtime, numerous non-working features on their website, and that the server hosting this blog can also host a Minecraft server. Indeed, testing showed this was possible.

https://www.Gilgamech.com/images/MCServerStartupRAM.png

For one player on a vanilla server, it works pretty well. There's an occasional bit of lag, but not bad. The sawtooth shape is from used variables thrown away into the memory 'bit bucket', filling to the max memory (512 MB for this 1GB VM) and then Garbage Collection pauses everything, dumps the 'bit bucket', and resumes normal operation. This happens as infrequenty as possible, which is about once per second for this small of server. This should scale with RAM size.

https://www.Gilgamech.com/images/MCServerModsStartupRAM.png

Same server, loaded with WorldGuard and all these other mods - a little rough starting up, so give it a few seconds to settle down, right?

https://www.Gilgamech.com/images/MCServerModsPlayer.png

Nope -  as soon as a player joins, those nice sawtooths become frentic and irregular, showing how little space there is between the low point (post garbage collection) and the max. Ingame it was unplayably laggy. Since mods are most of the point of Java Edition Minecraft, the best solution is to increase server RAM. This doubles server price (not to mention outgoing data rates) incentivize either buying a Reserved Instance year prepayment of server use, or migration to another host. Look for a host evaluation in the future.

--------------------------------------------------------------------

# [10/19/2021](#10192021) - Update remote address in SG

Adding a few lines recompiled from the 10/7 entry, to update the remote MS-RDP address:

```
$instance = (Get-EC2Instance).Instances
$Group = @( 'sg-123456', $GilSecurityGroupID)
Edit-EC2InstanceAttribute -InstanceId $instance.instanceid -Group $group
```
	
Having just one instance vastly simplifies this. It's not entirely complete, as you'll have to populate variables and run New-GilSecurityGroup to set up the new SG and get its ID.

--------------------------------------------------------------------

# [10/18/2021](#10182021) - Falltime return to Gilcraft

Have been sorting out details for maps, plugins, spawn, economy, playstyles, etc. Here's what I've got so far:

Spawn inside the mouth of the Food Dwarf - a huge natural cave where players can set up their own chest shops and sell to other players. Outside spawn is a beautiful terracotta frontier, with vast mesas punctuated by steep cliffs and bowl-like canyons. The gentler biomes are some distance from spawn, so plan to import what you need and sell the rest.

Currency is gold nuggets. Use commands including `/deposit` all to deposit all gold directly from your inventory, and `/withdrawal` all to get all your gold back. Economy plugin takes nuggets as 1 gold, ingots as 9 gold, and blocks as 81 gold - and automatically converts withdrawals to the fewest nuggets, ingots, and blocks. Players start with 17 gold. Make sure to buy a noob plot and expand from there.

Buy WorldGuard regions for about 1 gold per plane block:

- Vary in size, resources, view, and distance from spawn.
- Noob Valley: 5x5 plots for 10 gold. Comes with a (tree? chest of supplies? still working on this)
- Basic Plot: 10x10 for 100 gold  (less than 2 blocks)
- Large Plot: 25x25 for 625 gold (less than 8 blocks)
- Homestead Plot: 100x100 for 10k gold (less than 124 blocks)

Players should plan to exploit a plot for some time, then sell the plot back to the server and go buy a bigger plot somewhere else, upgrading every so often. Players could own up to 3 plots, so would be able to move out of a plot and into another. A server admin will manually reset unoccupied plots with WorldEdit about once a week.

Roads

- Plots will all be fronted by a road. Except in Noob Valley, where plots all have 1 block between them to run to the road.
- Roads will be 4 blocks wide and 250 blocks long (4x250) for 1000 blocks, but cost $10k gold.
- Intersections can't be purchased.
- Players could buy a road, and enclose & toll it, even set up their own chest shops inside, but wouldn't be allowed to block access or they would lose the plot.

Still finalizing these details, so they're subject to change. Hoping to finish permissions, spawn, and mapping out several regions of several sizes (including a grid of roads) this week.

Edit: realized it's not winter until later December. Western WA State has 2 seasons: summer and wet. And alas I confuse the 2nd with winter.

--------------------------------------------------------------------

# [10/15/2021](#10152021) - Gillogisms

The [ramblings](/Gillogisms.html) of a sane man in a mad world. And a few clever jokes.

--------------------------------------------------------------------

# [10/14/2021](#10142021) - Psychological Lumping and Splitting.

Humans are neuroprocessors mounted to frames. Our neuroprocessors have huge computation ability, but still finite, and can be depleted in daily situations.

Lumping people together is a monkeysphering * process where our brains 'combine' people with similar physical characteristics, in an attempt to simplify and reduce the amount of information being processed. This process can easily become problematic or even harmful, and the first step in preventing it is identifying it.

- Monkeysphering is the set of techniques we use to keep the information about other people, stored in our brains, to a manageable level. It's based on [Dunbar's number](https://en.wikipedia.org/wiki/Dunbar's_number) being the upper limit to an average human neuroprocessor's data storage and processing ability. And nobody wants to run their brain at 100% all the time, as it's exhausting.

Splitting is the reverse process - identifying two people who were inadvertently lumped by your brain, and listing their differences. Even just 2 or 3 preferences foreach person can be enough.

Relumping - Humans like to be grouped by mental characteristics and preferences, not physical characteristics. After splitting, it can be beneficial to re-lump people based on their desires and preferences - lumping all Sounders fans together, lumping all Sir Mix-a-lot's fans, lumping everyone with an REI membership.

Researching the literature after making this post, instead of before, leads to a [Darwinian use of these terms](https://en.wikipedia.org/wiki/Lumpers_and_splitters). Which inspires a Kirkegaardian reference that the key isn't in being a lumper or a splitter, but being brave enough to both lump and split.

--------------------------------------------------------------------

# [10/13/2021](#10132021) - Domain Analysis

Musings on interacting with domains of knowledge and the people who dwell within.

- How to interact with a complex topic like 'computer engineering' or 'cardiovascular heath'?
  - Is the domain well-known?
  - Is the domain controversial?
  - Who are the famous people who work in the domain?
  - How large is the domain?
  - What are the:
    - General thesis
    - Necessary axioms
    - Primary tenets
    - Supporting concepts
      - How many of each of these are there?
  - What are the logical connections (ideas) between them?
  - How well do the ideas connect?

  - Are the logical connections between the data points well-mapped and explored?
  - Are any only tenuously understood, or have any untested assumptions?
  - Would testing them be within the abilities of an average outsider?
  - How many experts are there in the domain?

  - What titles do they generally hold?
  - Do they respect their domain, or do they see it as a launchpad for other professional or civic endeavors?
  - Intra-domain communcation levels

  - How do ideas travel through the domain?
  - Are there good internal routes (mail lists, newsletters, training, conferences, etc)?
  - Or do they often travel through domain outsiders? 
  - What is the domain's history?

  - Who created it and why?
  - How and when has the knowledge or technology been weaponized or otherwise become problematic in the past?
  - How is it used today and who does it benefit?
  - How was it used in the past and who benefitted - how has this changed over time?
	
--------------------------------------------------------------------

# [10/11/2021](#10112021) - Carbon has 4 'hands' and 4 'pockets'.

Here's a simplifying framework to combine [VSPER theory](https://en.wikipedia.org/wiki/VSEPR_theory), [sp^2^](https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Map%3A_Inorganic_Chemistry_(Housecroft)/05%3A_Bonding_in_polyatomic_molecules/5.2%3A_Valence_Bond_Theory_-_Hybridization_of_Atomic_Orbitals/5.2C%3A_sp2_Hybridization)[Hybridization](https://byjus.com/jee/hybridization/#sp-Hybridization), and [Lewis acids & bases](https://en.wikipedia.org/wiki/Lewis_acids_and_bases). VSPER allows the S and P electron orbitals around an atomic nucleus to merge. The 2S orbital holds one pair of electrons, while the 2P orbital holds 3, so these 'SP-hybrids' are 4 sets of paired electrons and mangnetically balance into a tetrahedral shape around the spherical nucleus & spherical 1S orbital. This also explains the [shape of snowflakes](https://duckduckgo.com/?q=vsper+ice&atb=v116-1&iax=images&ia=images).

Traditional acids and bases operate around the exchange of hydrogen atoms, or electrons. Lewis Acids, by contrast, operate around the exchange of electron pairs. Boron is frequently a Lewis Acid due to having a open 'pocket' in only having 3 'SP-hybrid' electrons, and thus only able to pair into 3 electron pairs. This vacancy sometimes gets filled by being a lower-energy state than having another electron pair in the outermost electron shell around the molecule.

To extend this, oxygen has 6 hands and still 4 pockets. All 'SP-hybrids' have 4 pockets, and the number of hands goes up with atomic number:

|Atomic Number|5|6|7|8|9|10|
|Element|Boron|Carbon|Nitrogen|Oxygen|Flourine|Neon|
|sp^2^ electrons|3|4|5|6|7|8|
|sp^2^ orbitals|4|4|4|4|4|4|
|Open 'Hands'|5|4|3|2|1|0|
|Open 'Pockets'|2.5|2|1.5|1|0.5|0|

This explains why carbon is so 'gregarious' and makes more molecular combinations than any other element. It has the most free hands, allowing it to form molecular bonds more easily than other elements in its periodic row. Boron just doesn't have enough 'electromagnetic density' to really fill its pockets, and those which do already have at least 1 pocket full. Carbon is a 'Goldilocks' element for molecule-building. 

The next row down can also SP3 hybridize. But since they have both the full s^1^ and sp^2^ electron rings to work with, the effect is weaker and not quite the same.

|Atomic Number|13|14|15|16|17|18|
|Element|Aluminum|Silicon|Phosphorus|Sulfur|Chlorine|Argon|
|sp^3^ electrons|3|4|5|6|7|8|
|sp^3^ orbitals|4|4|4|4|4|4|
|Open 'Hands'|5|4|3|2|1|0|
|Open 'Pockets'|2.5|2|1.5|1|0.5|0|

--------------------------------------------------------------------

# [10/10/2021](#10102021) - Maro Khan and Zara Omenuko

Here is another pair of my D&D characters that I haven't played yet.

###  Maro Khan, King Hu's Cannon

- 29 yo human heavy explosives expert. 6'2' 220 lbs.

###  in the Royal Army of his homeland, he's on loan to the Imperial Army of Zara's homeland. 

- Heavy mutitions expert, can do sapping and demolitions but prefers artillery, and makes fireworks and clay masks as hobbies.
- Loves big booms at long range. 
- Former cannon operator in an elite heavy artillery unit of the royal military of his homeland, far east.
- Loves to eat chicken. Had not heard of rice until he met Zara.

### Princess Zara Omenuko

- 32 yo human fighter, blind since birth, but didn't let that hold her back from her love of fighting. 5'8' 160 lbs
- Princess from a jungle land far to the southeast.
- Her royal parents brought in an old gladiator who had since gone blind, to train her.
- But Blind Fighting never made sense, and she became very good at charging or flailing towards voices, foot scrapes, crunched branches and leaves, or other humanoid sounds.
- Prefers blindly charging opponents with her shield, constantly doing shield bash. Uses double maces (2 foot long) as backup, flailing wildly. (She rolls a 1d4 'subtraction dice' to negate her To HIt role.)
- Has a hemispherical (140 degree) enchanted shield that has an intertial dampner in it, so she doesn't really feel the impact of what she hit - the shield just kinda stops moving forward and her with it.
- Charging blind means she fights almost like a barbarian, with move bonus, but without the long recovery.

### Maro & Zara

- 5 years ago, Zara traveled east in search of combat and dungeon adventure, and traveled through a city Maro was guarding. 
- They met, and she liked the way he got excited talking about beautiful explosions. He liked her calm and unshakeable confidence.
- Her parents still send her occasional care packages with friendly letters, magical trinkets, and a few pieces of gold.
- His parents send letters asking when he'll bring her home to settle down and have kids.
- In combat, Zara is always charging shield-first towards the opponent. She depends on Maro to point her in the right direction, and to grappling hook her back out of danger.
- Maro has 2 jobs in combat: 1 keep Zara safe. 2 launch explosive ordinance at the threat. Often this means seeing Zara land a hit, firing a round, and reeling her in - just as the round lands.

--------------------------------------------------------------------

# [10/8/2021](#10082021) - Kind Richard and Lui'ha

Now for something completely different. These are a pair of my D&D characters that I haven't played yet.

### Kind Richard the goatmedic

- Kind Richard is a L1 Bard who doesn't stop talking long enough to actually gain XP.
- Does not stop talking (Charisma -1, stealth -6, also prevents leveling as he doesn't stop talking long enough for the DM to give him XP. He'd be at least L9 by now.)
- Likes goats because they don't get tired of hearing him talk.
- Talks in his sleep, so has -2 to overnight encounters happening with neutral or good characters, but +2 to overnight encounters with evil characters
- Always saying friendly and nice things, or at least expressing his fear, so non-evil enemies get -4 to hit and stop considering him a threat after 3 failed attacks.
- Enjoys cooking and is very skilled at making tasty soups. Yes, loves making soups. The only thing he loves more than making soup is telling you about his last soup.
- Travels from village to village, healing goats and foretelling the weather. (Each village is happy to see him arrive, and happy to see him go.)

### Lui'ha

- Female [Kenku](https://forgottenrealms.fandom.com/wiki/Kenku) whose only care in the world is to be airborne.
- Her name is actually a tune played by an enchanted ocarina that was found with her. Kind Richard sings the word 'Lui'ha' when he sings the tune that is her name, and so she generally answers to the name as well.
- Hasn't met another Kenku.
- Very high intelligence and willpower.
- Master of hangglider combat - escapes off ledges and circle around, flying kicks, dropping light items.
- L3 Artificer/Fighter (also L3 sorcerer with flight, fireball? prestidigitation, etc, but skill points almost always go into Artificer or Fighter)
- Makes her own armor, weapons, and camp gear
- Hangglider is built into her leather armor

  - Has 2 rolled-leather supports that she pulls out and down to make the hangglider section taut and capable of supporting her
  - Hangglider needs 10x5x5 feet (2 squares wide) of space or it crashes, dealing normal falling damage. Vertical space checks are at the DM's discretion.

### The duo

- Lui'ha was left with Richard when she was very young, and he's cared for her like his own daughter. She works as Richard's assistant.
- Lui'ha can't speak (being Kenku), but she can imitate Kind Richard, and he says enough words for 2 people.
- Being around him gives her more than enough words to carry on complicated transactions. She's never actually been in a situation where she couldn't say what she wanted, because he talks so much.
- They send you on an unrelated quest to find the Lost (City/Artifact/Treasures/Tomb) of (Treasure/Horror/the Ages/<insert deity here>), and their next village is the same way, so they'd love to have you join them for it.
- While you're with them, Kind Richard is always talking, conversing, teasing, cajoling, or saying what he sees.
- If Kind Richard dies, it sends Lui'ha into a blind sorcerer rage. After she's calmed down, she'll fly his corpse to the nearest city to have him resurrected.
- If Lui'ha dies, it sends Kind Richard into a blind panic, usually running all the way back to the city to have her resurrected.

--------------------------------------------------------------------

# [10/7/2021](#10072021) - From new SG to new Cert

### VPC > SG > EC2 > RDP > IIS > SSL >  DNS

AWS (now) starts with VPCs, within which are Security Groups and Subnets, on which EC2 servers are built, to which we'll MS-RDP, configure IIS, request SSL, and finally direct DNS. This will use the 'cattle not pets' philosophy to generate a new webserver, update, configure, deploy, and cleanup.

### Prerequisite: Rotate AWS key

This script:

- Finds your existing AWS API key from your PC
- Requests a new one from AWS
- Updates your PC to use the new one
- Sleeps for 30 seconds while everything settles down
- Removes the old one

Future upgrades could include verifying that the new key is active on the PC before removing the old key.

```
Function Reset-GilKey {
	$oldKey = (Get-AWSCredential default).GetCredentials().AccessKey
	$key = New-IAMAccessKey
	Set-AWSCredential -AccessKey $key.AccessKeyId -SecretKey $key.SecretAccessKey -StoreAs default
	sleep 30
	Remove-IAMAccessKey -AccessKeyId $oldKey -Force
}
```

## Prerequisite utility function:

This function takes bytes as input, and outputs ASCII (or Unicode) characters. It's part of my soon to be released PowerGil Powershell utility suite. Here, it's used to autogenerate the cert password, and also to revert the IP address from bytes back to ASCII. Since we're only using the password once, we won't need to store it. If anything happens to the cert, we'll just get a new cert from Let's Encrypt.

```
Filter Flip-BytesToText {
	Param(
		[switch]$Unicode
		); #end Param
	[int]$Unicode2 = 0
	$ReturnString = ''
	if ($_) {
		if ($Unicode) {
			$ReturnString = [System.Text.Encoding]::Unicode.GetString(($_,$Unicode2))
			} else {
			$ReturnString = [System.Text.Encoding]::ASCII.GetString($_)
		}; #end if Unicode
		if ($ReturnString -ne '') {
			return $ReturnString
		}; #end if ReturnString
	}; #end if _
}; #end Flip-BytesToText
```

## Step 1: Initializing variables

Set up your AWS Region and VPC ID. Replace REGION with your default region, and replace VPCID with your VPC's ID. Security Group sg-123456 is an example SG to initialize the variable.

```
Set-DefaultAWSRegion -Region REGION
$VpcId = 'VPCID'
$GilSecurityGroupID = 'sg-123456' 
```

## Step 2 (optional): New Security Group

Keeping different functions separate means having different security groups for the server's production access, and for the server's administration. Frequent relocation means frequently updating the network address allowed to access MS-RDP port 3389, which is where a 2nd security group becomes more useful. Most users will have a static location and network address, and might skip this step by reusing both existing security groups, or even combining them if they want.

This script gets your IP from AWS. The security model is to restrict IP to users at your IP address, and depend on obscurity and Windows password for users at your location.

```
Function New-GilSecurityGroup {
	$addr = (iwr https://checkip.amazonaws.com)
	[ipaddress]$ipaddr = (($addr.content | Flip-BytesToText ) -replace '`n','' -join '')
	$IpCidr = ($ipaddr.IPAddressToString+'/32')
	$GroupName = ('RDP access - '+$IpCidr)
	$GilSecurityGroupID = New-EC2SecurityGroup -Description 'RDP access' -GroupName $GroupName -VpcId $VpcId
	$cidrBlocks = New-Object 'collections.generic.list[string]'
	$cidrBlocks.add($IpCidr)
	$ipPermissions = New-Object Amazon.EC2.Model.IpPermission
	$ipPermissions.IpProtocol = 'tcp'
	$ipPermissions.FromPort = 3389
	$ipPermissions.ToPort = 3389
	$ipPermissions.IpRanges = $cidrBlocks
	Grant-EC2SecurityGroupIngress -GroupName $GroupName -IpPermissions $ipPermissions	
}
```

## Step 3: New Windows server

I use Windows and IIS because I'm a villain. Replace SUBNETID with your Subnet ID and replace KEYPAIR with your Keypair name.

```
Function Build-GilServer {
	$GilImage = Get-EC2ImageByName 'WINDOWS_2016_BASE'
	New-EC2Instance -ImageId $GilImage.ImageId -SecurityGroupId $GilSecurityGroupID -InstanceType 't2.micro' -AvailabilityZone 'us-west-2a' -KeyName 'KEYPAIR' -SubnetId 'SUBNETID'	
}
```

## Step 4: Login to the server and configure

### Server login

This retrieves the password. Replace INSTANCEID with the Instance ID generated in the previous step, and replace the KEYPAIR.pem path with the path to your priavte key. Instead of storing the server password, store this command.

```
Get-EC2PasswordData -InstanceId INSTANCEID -PemFile C:\Secure\Location\KEYPAIR.pem -Decrypt | clip
```

### Install software

These install IIS, upgrade .NET's outbound security protocol to TLS 1.2, and install the Posh-ACME module. Posh-ACME is the toolkit that lets us request the LE cert. The TLS upgrade is needed because TLS 1.1 is used for compatibility, but more secure hosts disconnect instead of negotiating.

```
Function New-ServerCommands {
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Install-Module -Name Posh-ACME
}
```

## Step 5: Request LE Cert

### [From: TheSysAdminChannel.com - Create Free Let's Encrypt SSL Certs using Powershell](https://thesysadminchannel.com/create-free-lets-encrypt-ssl-certificates-using-powershell)

Feel free to copy website code to c:\inetpub\wwwroot before/while running these steps. This process uses manual domain verification, until Google Domains automation can be developed.

```
Function Do-LetsEncrypt {
	#SSL Certificates Using Powershell
	##requires -Module Posh-ACME
	##requires -RunAsAdministrator
	[string]$CFAuthKey = 'CFAUTHKEYGOESHERETHISONEISLONG'
	[string]$CFAuthEmail = 'YourEmail@Example.com'
	[string]$PFXPass = '$tr0ngPa$$W0rdG03$|-|3r3'
	[array]$Domains = ('*.Example.com','*.Subdomain.Example.com','Example.com')
	[string]$DownloadPath = 'C:\LetsEncryptCerts\$((Get-Date).ToString('yyyyMM'))'
	[string]$ContactEmail = 'Contact@Example.com'
	[array]$ComputerList = ((hostname))
	[string]$FriendlyName = ('LetsEncrypt_$((Get-Date).AddDays(90).ToString('yyyy-MM-dd'))')
```

	### #Information Gathering

```
	Set-PAServer LE_PROD
	$CFParams = @{CFAuthEmail=$CFAuthEmail; CFAuthKey=$CFAuthKey}
	$NewCertificate = New-PACertificate $Domains -AcceptTOS -Contact $ContactEmail -DnsPlugin Manual -FriendlyName $FriendlyName -PluginArgs $CFParams -DNSSleep 180 -PfxPass $PFXPass -Force 
```

### #Goto Google Domains and add the A records _acme-challenge and _acme-challenge.hosting - leave off the .Example.com.

- #C:\Programs\BIND\dig.exe txt \`@8.8.8.8 \_acme-challenge.Example.com

- #C:\Programs\BIND\dig.exe txt \`@8.8.8.8 \_acme-challenge.hosting.Example.com


### Copy to fileserver

```
	mkdir $DownloadPath -Force
	$Path = Get-PACertificate | select -ExpandProperty CertFile
	$Path = $Path.Substring(0,$Path.LastIndexOf('\'))
	Copy-Item '$Path\cert.cer' $DownloadPath -Force
	Copy-Item '$Path\cert.key' $DownloadPath -Force
	Copy-Item '$Path\cert.pfx' $DownloadPath -Force
```

### #Import PFXPassword, ComputerList and Thumbprint

```
	$PFXPassword = $PFXPass | ConvertTo-SecureString -AsPlainText -Force
	$Thumbprint = $NewCertificate.Thumbprint
```

### #Deploy

```
	Copy-Item '$DownloadPath\Cert.pfx' '\\$Computer\c$'
	Import-PfxCertificate -FilePath 'C:\cert.pfx' -CertStoreLocation Cert:\LocalMachine\My\ -Exportable:$false -Password $PFXPassword
	$Cert = Get-ChildItem Cert:\LocalMachine\My\$Thumbprint
	$Cert.FriendlyName = $FriendlyName
```

	### #Cleanup

```
	Remove-Item '\\$Computer\c$\cert.pfx'
	Get-ChildItem Cert:\LocalMachine\My\ | Where-Object {($_.Subject -eq 'CN=*.Example.com') -and ($_.ThumbPrint -ne $Thumbprint)} | Remove-Item -Force
} 
```

## Step 6: Bind port 443 to IIS

Now that we've populated the SSL cert, we can bind applications to port 443. This is another todo.

```
New-WebBinding -Name -Protocol -Port -IPAddress -HostHeader -SslFlags -Force -Verbose
```

## Step 7: Add hosting access to server

This lets the public internet reach the server on ports 80 and 443. Again, replace RDPSECURITYGROUPID with your MS-RDP Security Group ID, and HOSTINGSECURITYGROUPID with your Hosting Security Group ID.

```
Edit-EC2InstanceAttribute -InstanceId INSTANCEID -Group @( 'RDPSECURITYGROUPID', 'HOSTINGSECURITYGROUPID' )
```
## Step 8: Transfer domain in Google Domains

Move the domain to your new server's public IP. This is another todo.

## Step 9: Cleanup old server and SG.

Deleting the server will remove the public IP too Then removing the SG completes cleanup. Use the first command to find your old instance's ID, then replace OLDINSTANCEID with that. Likewise, use the 3rd command to find the old Security Group ID, then replace OLDSECURITYGROUPID with that. Future upgrades will automate this.

```
(Get-EC2Instance).Instances
Remove-EC2Instance -InstanceId OLDINSTANCEID 5 -Force
Get-EC2SecurityGroup
Remove-EC2SecurityGroup -GroupId OLDSECURITYGROUPID -Force
```

--------------------------------------------------------------------

# [10/6/2021](#10062021) - Some old updates and some LE work

Got the Let's Encrypt cert renewed in the Nick of Time, and on a new EC2 server. Will do a full post about the new script and process tomorrow.

--------------------------------------------------------------------

# [10/4/2021](#10042021) - Updating Let's Encrypt Certs

An old LE root cert expired yesterday. It's implied in my cert chain, and I'm on a countdown to renew, so might as well solve both at once. I was going to fix this days ago, but new hires unwittingly conspire against my time and internet connection.

--------------------------------------------------------------------

# [10/3/2021](#10012021) - Game and Shadowgame

When you see someone driving a very nice car, a common reaction is 'How did they pay for that?'.  Game and Shadowgame are an extension of that question: 

- Game is something someone does to be seen, for example, the person driving the very nice car.
- Shadowgame is all of the extra labor, negotiating, shipping, storage, financing, and other work to make a particular Game work.

Why is this significant? It's a framework to put passions and dreams alongside the work needed to maintain them. 

(Update from the Gillogisms) Stage and Backstage - Story and Paul Harvey's rest of the story. 
