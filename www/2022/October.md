::: style#
body { background-color: #F87217; }
:::

From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [10/31/2022](#10312022) - Printing around a ghost.

Made a [3d ghost](https://github.com/Gilgamech/ShapeCache/blob/main/Halloween/Ghost.scad) for the [spooky season](https://github.com/Gilgamech/ShapeCache/tree/main/Halloween):

![3d printed ghost with a sign that says 'BOO!](/images/Ghost.jpg)

As with earlier projects, [Gilgahedron](https://github.com/Gilgamech/ShapeCache/blob/main/Main/Gilgahedron.scad) makes this a breeze, being a silo minus another silo, with a couple round and oval cutouts, and a couple circles. Check out the links above to download the code and code for the [CharleMagne tombstone](https://github.com/Gilgamech/ShapeCache/blob/main/Halloween/Tombstone.scad) too:

![3d printed tombstone with CharleMagne's birth and death dates.](/images/CharleMagne.jpg)

--------------------------------------------------------------------

# [10/26/2022](#10262022) - Automating uploads with GitHub Actions.

Quick and easy [automation to push a](https://towardsaws.com/build-a-simple-devops-pipeline-from-github-to-aws-s3-for-static-website-911c620dce31) GitHub repo to an S3 folder, flush the CloudFront cache, then ping Discord, the best of all modern collaboration software. First, add these to your GitHub Secrets Actions:

- Access Key
- Access Secret Key
- Bucket
- Bucket Region
- Distribution ID

[Create a webhook](https://ardalis.com/integrate-github-and-discord-with-webhooks/) in Discord, and add this to Github. Send as JSON and send everything. Then add this file to your repo as [.github/workflows/main.yml](https://github.com/Gilgamech/website/blob/main/.github/workflows/main.yml): (example, copy from the link for YAML formatting.)

```
name: CI
on:
  push:
    branches:
      - main #here we choose to deploy only when a push is detected on the main branch
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
		aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.S3_BUCKET_REGION }} # Use your bucket region here

    # Here you could add some building steps if you were dealing with some angular/react/Vue...
    # - name: Build static site
    #  run: yarn install && npm run-script build

    - name: Deploy static site to S3 bucket
      run: aws s3 sync ./ s3://${{ secrets.S3_BUCKET }} --delete; aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths '/*'
```

First, on every commit the file tells GitHub to gather your credentials, and after skipping tests, pushes the whole repo into the bucket with the AWS CLI. Then using the same it flushes the whole CloudFront distribution. Second, GitHub calls the webhook with the results of the first operation. Thus we have a simple serverless CI/CD pipeline.

--------------------------------------------------------------------

# [10/22/2022](#10222022) - Hostile Computing Initiative.

The HCI's mission is to develop computing solutions that do not need to trust their storage, network, or compute. The goal is to provide normal operation on nefarious or compromised services. The HCI has 3 principles:

- You can't trust your storage host.
- You can't trust your network provider.
- You can't trust your compute source.

This isn't to blame any cloud provider, nor the industry. Cloud providers work very hard to meet regulatory and security requirements needed to pass [SOC](https://us.aicpa.org/content/aicpa/interestareas/frc/assuranceadvisoryservices/sorhome.html) and other audits, which are required by the SEC and other regulatory agencies for publicly-traded companies. Instead, this is a dystopian cyberpunk nightmare where regulations are a memory and no cloud provider can be trusted. On the surface, this means expecting your storage to actively copy your data, expecting your network to inject malware, and expecting your compute source to modify or add commands.
It's cheaper and easier to not need to trust. Trust has 2 levels: that it works at all, and that it works correctly. The service has to be somewhere on a spectrum from incompetent to evil, assuming this is a profit-seeking situation. Further implications will reveal themselves as we dig deeper. On the way will be intersections with serverless website hosting, left shifting, and more. Grab your bit bucket and let's get started.

## You can (not) trust your storage host.

First, encrypt and hash all data, to prevent host-based surveilance and tampering. Compute logic should be stored within a hardened container such as [Bottlerocket](https://www.offeringoverview.com/Bottlerocket) at a minimum, and preferrably within a hardened VM. Lambda-style server or edge scripts should not be used in a hostile environment, as there's no protection from modification or injection. Here is presented a tradeoff between security and cost, convenience, & complexity.

Another solution is storing encrypted files and decrypting them at compute, or even on the client. We separate files into a few classes:

1. Files where injections will work.
  - These have to be encrypted.
1. Files where injections will break them.
  - These should also be encrypted, but since they act like they are hashed in that modifying them breaks them, any interference will break that part of the site.
1. Files where injections won't modify the output.
  - These would be ideal for bootstrapping a website, and would have to provide the decryption means for the other types.

## You can (not) trust your network provider.

As a minumum, SSL or other in-flight encryption at all times. IPSEC VPN if possible, with a double-layer of encryption around each packet. Again, security is placed against the trifecta of cost, convenience and complexity. Combining this with the at-rest encryption from the storage section may create an even more difficult barrier to surveil or inject through.

Incoming connections must be restricted by address and port at all points - internet to cloud, cloud to OS, OS to application. Encrypting data before storing in databases et cetera is preferred, with info like usernames, street addresses, credit cards being randomish strings within the data structure, and only decrypted on the client's device. Databases should be password-protected and tables should be restricted to specific accounts. If possible, the database files should be encrypted at rest as well. Client updates would be encrypted before being transmitted and stored.

Authentication mechanisms should rotate bearer tokens more frequently - on every request if possible. Use an algorithm for the client to transform the bearer token for return, to prevent direct sniffing reuse.

## You can (not) trust your compute source.

Compute isn't always necessary - you'll always have some flat files. And compute doesn't have to happen on the hostile host - it can happen on the client's device. You don't worry about the client's device being hostile - that's the user's problem. You don't need to trust anonymous client GETs, obviating this whole section. And this is the intersection with serverless hosting.

When compute IS necessary, we return to the choice of security vs the trifecta. Compute logic is more secure when contained within a hardened container such as Bottlerocket, and even moreso within a hardened VM. Ultimate compute security would be your own OS on your own bare metal, which is the trifecta at extreme: the most expensive, most complicated, and least convenient.

### This gives some options:

- Encrypted data and encrypted site files, bootstrapped by an empty shell that gets removed during the sitebuilding process. This allows you to not need to trust the storage host nor network provider.
- Hardened compute as a secure bastion, serving data through VPN connections. This is a costly solution that doesn't scale well, but works out at specific usage levels.
- Multiple sites served by multiple hosts, compared TOR style. This again maximizes the trifecta.
- Your own bare metal servers, running the OS of your choice, in your own physical data centers, over your own network circuits, to your own devices. This is usually cost prohibitive and eliminated in the first step post-greenfielding.

### [Everyone's guilty of something, right?](https://www.Gilgamech.com/Android.html) What's it matter if they get hacked for the wrong crime, so long as they get hacked?

A main theme of cyberpunk dystopias revolves around the Catholic notion that we're all sinners deserving of punishment. Extending this to technology, each site is a disgrace deserving of being hacked. This can only be prepared for and mitigated effectively from the beginning, in the design and architecture of the site. Here is the intersection with Shift Left, embodied across the 3 layers above. By receiving the blessings of encryption, verification, and hardened compute, a website can remain untained from creation through delivery

--------------------------------------------------------------------

# [10/07/2022](#10072022) - Server vs Serverless in a no-holds barred showdown.

From a recent LinkedIn post about [StackOverflow's architecture](https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-activity-6983452178417860608-YGFP):

/images/StackOverflowArch.png

## Monolith Design

The system design specifies 9 bare metal servers to support 100 million unique users per month, without more details. So assuming these are the old Dell or HP industry workhorse 2U rackmount server, this would all fit nicely into 1/2 rack. Ongoing Operations lists racks as still between $1000-$1500 per month.

At a previous employer, back in 2014, we had 40 million unique users/month across 4 large (24 core) and 6 small (4 core) webservers, one large (24 core) SQL server, and a few utility servers - spread across 7 Sabey cabinets but could have squeezed into 3. We were paying $1500/month/cabinet, which included electricity and cooling but not Internet.

Those servers tend to cost around $5000 each from Supermicro, so you're looking at $45k amortized across 5 years for $9000 per year or $750/month. Total $750 + $1k = $1750 per month to support 100 million unique users/month.

This is basically $0.0175 per 1000 page loads.

## Serverless Design

When looking at taking this serverless, the first question is 'how many users are logging in?' This is usually much lower, so the first advice would be to store these files on S3 and accelerate. S3 Get fees would be around $1000/month, replacing the rack fees. Additionally S3 has a bandwidth fee that we'll omit in place of the omitted Internet circuit from an ISP. CloudFront allows the first 10 TB free and charges $0.85 per 10 TB after, so you'd be looking at around $2 to cover the 31.35 TB transferred as the 313k site is transferred 100 million times.

This puts monthly fees around $1002 for the read-only users. Let's say there are 10 million unique writes per month, costing $20. Each write lasts 0.25 seconds, for a total of 2.5 million seconds of compute, at around $5.

Total $1k + $2 + $20 + $5 = $1027 per month to support 100 million unique users/month.

This is basically $0.01027 per 1000 page loads, or about 60% of the above rackmount example.

And this solution can scale down to 100 users and become free, which the rackmount solution cannot do. This is why this solution is recommended and the rackmount is not.

|Monthly|100|100k|100 million|100 billion|
|------|------|------|------|------|
|Server per user|$17.50|$0.0175|0.0000175|(site down)|
|Server total|$1750|$1750|$1750|$1750|
|Serverless per user|$0|$0.0000001|$0.00001|$0.00001|
|Serverless total|$0|$0.01|$1027|$1,026,814|

The moral of the story is that serverless is extremely cheap if you don't use compute where you don't need it. Why pay for the compute to serve a file when your file storage service does this natively? Just accelerate the file storage. Or do things that don't scale, if that's your thing.

Extra credit: 

- Price per user
- Price for overall system
- Capacity in some way

--------------------------------------------------------------------

# [10/01/2022](#10012022) - The price of war.

Ukraine had just started allowing private individuals to own land in 2021, and the [average price](https://kyivindependent.com/business/ukraine-land-sales-reach-200-million-six-months-after-launch) was $1420/hectare. [Specific regions](https://www.globalpropertyguide.com/Europe/Ukraine/Price-History) have more specific pricing from another site. [Hectare areas](https://en.wikipedia.org/wiki/Oblasts_of_Ukraine) from Wikipedia.

|Region|Hectares|USD per hectare|USD for region|Days of war|Sum| #1001Table
|---------|------------|---------------------|---math=(Hectares*USD per hectare)---|---math=(Days of war/(900 million))-m---|---math=(Days of war+Sum(-1))-|
|Cherkasy Oblast|2089100|1420|
|Chernihiv Oblast|31851300|1420|
|Chernivtsi Oblast|8093600|1420|
|Dnipropetrovsk Oblast|31900500|120900|
|Donetsk Oblast|26505700|115100|
|Ivano-Frankivsk Oblast|13894000|1420|
|Kharkiv Oblast|31401600|99300|
|Kherson Oblast|2844900|1420|
|Khmelnytskyi Oblast|20636200|1420|
|Kyiv Oblast|28118900|158500|
|Kirovohrad Oblast|24577500|1420|
|Luhansk Oblast|26672500|1420|
|Lviv Oblast|218237|00102100|
|Mykolaiv Oblast|24587400|1420|
|Odesa Oblast|33295900|246800|
|Poltava Oblast|28735800|1420|
|Rivne Oblast|20038500|1420|
|Sumy Oblast|23823900|1420|
|Ternopil Oblast|13817100|1420|
|Vinnytsia Oblast|26501600|1420|
|Volyn Oblast|20135300|1420|
|Zakarpattia Oblast|12771500|1420|
|Zaporizhzhia Oblast|27168500|1420|
|Zhytomyr Oblast|29819200|1420|
|Total|509498737|45566|

::: script#
var wordList = ['Donetsk Oblast','Luhansk Oblast','Zaporizhzhia Oblast','Kherson Oblast'];
colorifyMultipleWords(['1001Table'],wordList,'codeVariable')
:::

::: button#
Sum
:::{columnMath('1001Table',4,'1001Table',5,-1,'1001Table',5,'add',4)}

Russia are spending an estimated [estimated $900 million a day](https://www.newsweek.com/russia-spending-estimated-900-million-day-ukraine-war-1704383) on Putin's War in Ukraine. After 220 days, they could have bought Cherkasy, Chernivtsi, Ivano-Frankivsk, Kherson, Lviv, Rivne, Ternopil, Volyn, and Zakarpattia Oblasts. And they're just 6 days away from buying Khmelnytskyi too.To see this on the graph, sort by 'Days of war' and hit the 'Sum' button under the graph. The whole country would cost over $23 trillion, based on this data, with the most expensive Oblasts being the capital Kyiv and the main shipping hub Odesa. Buying the whole nation would take 70.66 years.
