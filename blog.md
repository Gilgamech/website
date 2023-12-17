
# [12/17/2023](#12172023) - Click it just a little bit.

With a few additions, Markdown can support semantic HTML5 types. This enables simple games, such as the Clicker Game:

https://www.sparational.com/sites/clickergame.md

How high can you click it? 

- This is also a demo of the advanced HTTP parsing system, which renders Markdown files instead of merely linking to them.

--------------------------------------------------------------------

# [12/07/2023](#12072023) - Living In A Stolen Time.

The perspective that we're living on 'stolen' land is a medieval perspective. Compare to Japan, whose Meiji Revolution is still enjoyed today. Meiji saw that these small nations, like Buzen and Yamato and Echigo and Tosa, would stand no chance against full military nations such as the UK, the Dutch, or the Russians. By conquering all of these nations and uniting them under one banner, then drawing from these places to form a national military, Meiji increased the ability for the islands to defend themselves on the world stage. Because of Meiji, Japan is a modern powerhouse instead of a disorganized set of states. 

In the same way that Arabia is a set of disconnected and mostly-impotent nations, unable to escalate their military operations beyond terrorism or sending a few planes to shoot at a neighbor. Arabia is incapable of generating aircraft carriers to send to other parts of Earth, entirely due to persistent political divisions. Indeed, this was part of the reason for the [Act of Union](https://en.wikipedia.org/wiki/Acts_of_Union_1707) in the UK too - it let Britain and Scotland stop fighting each other and allowed them to fight everyone else on Earth instead. 

And so too would North America be a series of weak nations on the world stage, had the US Government not exercised [Right of Conquest](https://en.wikipedia.org/wiki/Right_of_conquest). A weak North America was a goal of the UK, as they wanted to [force all Native nations and tribes to relocate between the USA and Canada](https://en.wikipedia.org/wiki/Indian_barrier_state) - so the UK through Canada would have a weaker trading partner to exploit. By conquering and uniting these nations, we have created the most powerful nation on Earth, by far. And the peoples of these nations are greatly enriched through our potent economy and also with our overwhelming national defense. This is [Maimonidean Charity](https://en.wikipedia.org/wiki/Maimonides#Philosophy) in action, to have an economy so rubust that people do not need to beg. 

Now we're working to unite the planet, as we start to investigate extraterrestrial political connections. And some would have us go backwards 600 years instead, and enter the galactic stage with political Swiss cheese. This is beyond German humor and into Russian humor. Or a plot from [Star Trek: The Next Generation](https://memory-alpha.fandom.com/wiki/Kesprytt)

--------------------------------------------------------------------

# [12/05/2023](#12052023) - Markdown Touchdown.

After a few tries, I think I have a good strategy. First, it helps to have an understanding of the general philosophy behind Markdown implementations: to converge data and formatting into the least-conspicuous form. This has largely been achieved through decades of email communication, so Markdown emulates well-written emails. Central to Markdown is the separation of block-level controls and inline controls. 

- Block controls
  - Paragraphs are the basic unit of Markdown. If a line of text isn't prepended by any control characters, or it start with an escape character then a control character, then it becomes a paragraph. 
  - Also includes Headers, Tables, Code Blocks, Lists of all kinds, Fences, Horizontal Rules, parsed HTML, etc.
  - Delineated by 2 line breaks.

Each kind of block has its own inline controls rules. 

- Paragraph Inline controls
  - A, abbr, anchor, code, del, em, mark, img, ins, strong, sub, sup, etc.
  - No delineation as it's inline with text.
  - HTML isn't parsed.
- Header Inline controls
  - Most Paragraph block controls.
- Table Inline controls
  - Some Paragraph block controls.
- Code Block Inline controls
  - No Paragraph block controls.
- List Inline controls
  - Some Paragraph block controls.
- Fence Inline controls
  - Unsure
- Horizontal Rule Inline controls
  - No Paragraph block controls. 
  - This element doesn't display data, only a separator line.
- parsed HTML Inline controls
  - HTML is parsed
  - No other Paragraph block controls. Has to be HTML-only.

Strategy:

- Parse into blocks. split('\\n\\n')
- Perform control replacement on Paragraph and other suitable blocks.
- Perform HTML ampersand-escaped replacement.
- Rewrite each block to replace control replacements with JML, for consumption into Sparational.
  - Use the same rewriter to replace inline HTML blocks with JML, and use this as the parser for the HTML switch for convertWebElement. 
  
--------------------------------------------------------------------

# [12/02/2023](#12022023) - The Path To Hell Is Paved In Poorly Folded Towels.

## The Bible describes 'the path to Heaven' as 'a narrow path' while 'the path to Hell is very broad'. This is an expression of entropy. 

Think of folding towels, with the 'heaven' of a well-folded towel vs the 'hell' of a mis-folded towel:

- The towel can exist rolled or folded or some mix of these, giving a huge number of possible states. 
- The goal is to end with one of a few folded states. Often folded in half once along one face axis, then once along the other axis, giving 2 possible end states. 
- Folding is the process of starting with any random state and moving toward one of the two goal states. 
- But if you're not paying attention, its very easy to end in some other state and have to start over. 
  - Even moreso if you're working with larger foldables such as blankets and sheets. 
  - Sometimes 2 people work together against entropy with these larger objects.

--------------------------------------------------------------------
  
# [12/01/2023](#12012023) - Series Of Tubes...Err Pipes.

## Seeing many posts on LinkedIn about CI/CD pipelines, and all of them are server-based. So here is my serverless CI/CD pipeline:

1. Develop and test locally.
2. Commit to GitHub.
3. GitHub Actions builds the website and tests.
4. GitHub Actions pushes to S3.
5. GitHub Actions flushes the CloudFront distribution. 
6. Site is live. 
