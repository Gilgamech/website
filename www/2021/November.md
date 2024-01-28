From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [11/29/2021](#11292021) -  Campbell's Sippin Tomato Soup vs Coca Cola.

Tomato soup is so much healthier than Coca-Cola amirite? Can you tell which is which?

/images/CocaCola-vs-CampbellsTomato.png

--------------------------------------------------------------------

# [11/28/2021](#11282021) -  >Why's It Down?

Made a little page to diagnose website issues. It's basically a rework of my Error Cause page. [Check it out](/WhyIsItDown.html)!

--------------------------------------------------------------------

# [11/26/2021](#11262021) -  Happy Shopping Day.

The Darkest of Fridays occurs after our Most Thankful Day, in preparation for Giving Day at the End of Winter.

--------------------------------------------------------------------

# [11/25/2021](#11252021) -  Happy Thanksgiving.

https://www.youtube.com/embed/qsUixihhUSk

--------------------------------------------------------------------

# [11/24/2021](#11242021) -  Wuh.

Recently heard a guy with a German accent say 'W' as 'Double-oo' (or 'doubleoo'). This makes our long  'Double You' name seem unwieldy, even though it's the equivalent. (Also, go double yourself) So why don't we just rename the letter to 'Wuh'? 'Ess' 'Tee' 'You' 'Vee' 'Wuh' 'Ecks' 'Why' 'Zee' - it flows so much better.

--------------------------------------------------------------------

# [11/22/2021](#11222021) -  Charlemagne.

Charles the Great of France's given name is usually pronounced 'Shar-le-mane'. But this is likely in error. Magna is Latin for Great, so the name is likely 'Charle Magne'.

--------------------------------------------------------------------

# [11/21/2021](#11212021) -  The two most important questions.

These are 'How' and 'Why'. They are the most important questions because all other questions are derived from them. And together they (eventually) describe the entirety of human activity. 'How' encompasses all material, somatic, and other components, while 'Why' encompasses the entirety of human philosophy and political interest. The other 'newspaper questions': 'who', 'when', 'what', and 'where' are either mandated by 'How' if they are important, or left to the whims of 'Why' if they are not. 

--------------------------------------------------------------------

# [11/19/2021](#11192021) -  Network effects of Youtube's algorithm.

Youtube's algorithm shows similar videos to people in the same place - if your neighbor likes a video, then Youtube is more likely to show it to you. If you visit an area with a lot of trains and train watchers, you'll be recommended more train-related videos. Live in an area with a lot of political keyboard warriors, and you're likely to have many political opinions recommended to you. And so Youtube shows you more politically toxic videos when you have a politically toxic neighbor. Instead of becoming an internet refuge, it begins to mirror other parts of your life. Is this to fulfill the 'low' half of the TV News Emotional Cycle, and let fluffy teddy bears sell soap to you in the 'high' half?

--------------------------------------------------------------------

# [11/11/2021](#11112021) - Cloud provider pricing calculator outcomes.

Not quite as comprehensive as promised - whoops, plot hole.

- Previous AWS pricing: 1xCPU 1GB RAM 30GB HDD | bandwidth website only = $18-ish - more than calculated.
- Previous AWS pricing: 1xCPU 2GB RAM 30GB HDD | bandwidth plus Minecraft = $22-ish - less than calculated.
- Azure A1 Basic from [pricing calculator](httlis://azure.microsoft.com/en-us/pricing/calculator/): 1xCPU 1.75GB RAM 40GB 	HDD = $29.20
- Azure A1 Standard from [pricing calculator](httlis://azure.microsoft.com/en-us/pricing/calculator/): 1xCPU 1.75GB RAM 70GB HDD = $65.75

Unsure what is the difference between Azure Basic and Azure Standard that triples the price - does Standard give significant redundancy? AWS appears cheaper here still. 

--------------------------------------------------------------------

# [11/7/2021](#11072021) - Time to change time.

/images/Daylight.png

--------------------------------------------------------------------

# [11/4/2021](#11042021) - Code from 10/19 update.

Updated code that was promised before but not yet delivered.

## Prerequisite: Rotate AWS key

Updating this function with a progress bar to countdown the 30 seconds.

```
Function Reset-GilKey {
	$oldKey = (Get-AWSCredential default).GetCredentials().AccessKey
	$key = New-IAMAccessKey
	Set-AWSCredential -AccessKey $key.AccessKeyId -SecretKey $key.SecretAccessKey -StoreAs default
	0..30| %{Write-Progress -Activity 'Sleeping for keys to settle down.' -Status 'Countdown to 30 seconds: $_' -PercentComplete ($_*3.33);sleep 1}
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

Nothing new here, just don't forget.

## Step 2: New Security Group

Updating this function with a better name for the SG.

```
Function New-GilSecurityGroup {
	$addr = (iwr https://checkip.amazonaws.com)
	[ipaddress]$ipaddr = (($addr.content | Flip-BytesToText ) -replace '`n','' -join '')
	$IpCidr = ($ipaddr.IPAddressToString+'/32')
	$GroupName = ('RDP access - '+$IpCidr)
	$GilSecurityGroupID = New-EC2SecurityGroup -Description ('RDP access' + (Get-date -f yyymmdd)) -GroupName $GroupName -VpcId $VpcId
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

## Step 7: Add hosting access to server

Updating this function to lookup the sole instance ID.

```
$InstanceId = (Get-EC2Instance).Instances.instanceid
Edit-EC2InstanceAttribute -InstanceId $InstanceId -Group @( $HostingSecurityGroupID, $GilSecurityGroupID )
```

## Step 9: Cleanup old SG.

Updating this function to delete the delete of the server, since it will persist.

```
Get-EC2SecurityGroup
Remove-EC2SecurityGroup -Force -GroupId OLDSECURITYGROUPID
```

--------------------------------------------------------------------

# [11/1/2021](#11012021) - Wave-partcle duality.

The wave equation says a 'wavicle' (like a photon or electron) will radiate outwardly through 3d space as a wave, until it reacts with another wavicle (or composite of them like a molecule). But the wave equation is describing the probability that the whole photon will be at that location, not dividing the photon across the area. Quantum physics 'news' has the malady of selling how 'weird' it all is, like a teenage boy going through a 'girls are weird' phase. It's as weird as millions of people buying a lottery ticket, but only one of them winning. The lottery prize isn't split equally among the ticket buyers, despite the lottery's marketing, but is given to the person whose ticket happens to match the selected numbers. Likewise, the photon's charge is given to the molecule whose location happens to match the selected coordinates. To knit together these two analogies, consider lottery tickets to describe a location in 3, 6, or other integer dimension space: maybe not enough 'locations' 'bought tickets' for this 'week's' 'photonic energy prize' to have any 'winning coordinates', so it goes back into the 'pot' for next 'week's' 'drawing'. And it radiates out another Planck Length for the next 'drawing'.

The really weird part is how the probabilities split photons sometimes, like when two winning lottery tickets are picked. And if these go through two separate routes (unsure the lottery equivalent), the 'winners' show a diffraction pattern. (How would that show up in lottery winners?)
