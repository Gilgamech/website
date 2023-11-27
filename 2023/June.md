# [06/30/2023] (#06302023) - How to Internet.
## Pride in what you do, for those of us who identify as hard-working people who Get Suff Done. Also good advice for the ideologically unemployed, to understand how physical systems actually work.
- Domains are the website name you type, like Google.com. You'll rent one from a Registrar, and for the .COM TLD there are so many, including all cloud providers and also GoDaddy and Name and NameCheap et cetera.
- TLD (Top Level Domain) is the .com or .net or .org. Vanity TLDs are also sold now, so your website can be www.Auto.Mechanic or www.Hair.Dresser.
- SSL Certificates go hand-in-hand with the domain. SSL means Secure Sockets Layer, where Sockets are IP + Port. These have to be bought from a 3rd party, because \"if we're all wearing masks and can't identify anyone, it's more secure to ask a 3rd party if someone is who they say they are, than just asking the person themselves\" or something like that. They come in 2 parts, the Public Key and the Private Key.
## IP (Internet Protocol) is the computer's address on the network. 
- Computers send packets back and forth like companies sending parcels, each wrapped in a frame and stamped with an address by the NIC (Network Interface Card) like an automatic mail room. Sometimes split across frames when too big, and reassembled by the destination. NICs are designed to receive and throw out packages that aren't addressed to them, so  a computer can listen to more than 1 address. (They can listen to ALL addresses, called \"sniffing\" the network, for good or evil.)
- Ports are numbers inside the computer where programs will listen on a specific port, and the OS will route incoming requests to the program listening on that port. Your web browser will send requests on port 80 or 443, then listen on like 1234 which keeps this traffic separate from like Spotify traffic on port 4070 and Roblox on ports 49152 and above. Ports go up to 65535 for each IP address. And again 2 types, UDP and TCP.
- UDP (Universal Datagram Packet) is a simple fire-and-forget packet. It might arrive once, or many times if routed oddly.
- TCP (Transport Communications Protocol) has a 3-packet handshake to establish, a response packet for every sent packet, and a serial number system to ensure that packets arrive at least once.
## Cloud storage is basically the \"hard drive in the sky\" and you'll send files to it, and get them back usually as websites. 
- Or other ways, they usually have many features. Every major cloud provider (AWS, GCP, Azure) have a type of cloud storage, so the big question is how much does it cost to rent the space. Usually it's pennies per GB, and websites rarely weigh more than a couple hundred MB. (GB = 1000 MB if you're in marketing or 1024 MB if you're in computer science, it's fun. MB = like 1 million bytes, which are 8 bits, where a bit is a one and/or zero.)
- AWS is Amazon Web Services. They're Amazon's money maker and the largest cloud provider by far. They're why Jeff Bezos is almost everywhere. Their cloud storage is called S3 for Simple Storage Service.
- Azure (pronounced a-Zjuur) is Microsoft's cloud project and does pretty well. It's where ChatGPT is hosted. Their cloud storage is boringly called \"cloud storage\".
- GCP is Google Compute Project. It has been confirmed to exist and have customers. Their cloud storage is also called \"cloud storage\".
- Digital Ocean is a smaller player.
- Linode is a smaller player.
- Smaller players may value your business more and give a better experience. Or may be in over their heads and give a worse experience. Specific situations dictate a lot.
- CDN (Content Distribution Network) is a company with many tiny data centers closer to homes and businesses. These are set up with web servers which will proxy your site locally. When one person goes to your website, they get sent to this proxy, and the proxy goes to your site and saves it. Then the next person goes to the proxy and gets your site too, and much faster. Also cheaper than going all the way to your site every time. And it's almost like magic, being just a specific configuration of Domains above.
- This is important because Cloud providers charge a lot for network. And because network packets from halfway around the planet can take up to a second just to arrive. But the CDN is always in the same city as the user.
- SSL certs have 2 parts give the private key to the CDN and it will encrypt your pages with it. This is a mathematical operation (binary XOR?) that makes your website look like random numbers. Then users will download your public key from the SSL site, and using a similar or the same mathematical operation (like a dark ritual) the random numbers will turn back into your website.
### To summarize, serverless website architecture:
- Website files (big 3 HTML, CSS, JS and others like images and data)
- Storage: Cloud Storage
- Compute: Not needed (use free client browser compute instead of expensive server-side compute. Works in 80% of situations. SEO is among the 20%.)
- Network: CDN to transport to users.
- SEO (Search Engine Optimization) is an industry that studies how search engines rank pages, and sell to companies the dark knowledge of which specific words and tags will get their pages ranked higher than their competitors. Started in 2001, these are blamed for why Google doesn't work anymore like it did in 2014.
- Complex programmatic pages may not show up high in search results, because search engines don't run the JS files, only reading the HTML files.
