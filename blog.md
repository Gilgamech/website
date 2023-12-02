# [12/02/2023](#12022023) - The Path To Hell Is Paved in Poorly Folded Towels.

## The Bible describes 'the path to Heaven' as 'a narrow path' while 'the path to Hell is very broad'. This is an expression of entropy. 

Think of folding towels, with the 'heaven' of a well-folded towel vs the 'hell' of a mis-folded towel: 
- The towel can exist rolled or folded or some mix of these, giving a huge number of possible states. 
- The goal is to end with one of a few folded states. Often folded in half once along one face axis, then once along the other axis, giving 2 possible end states. 
- Folding is the process of starting with any random state and moving toward one of the two goal states. 
- But if you're not paying attention, its very easy to end in some other state and have to start over. 
  - Even moreso if you're working with larger foldables such as blankets and sheets. 
  - Sometimes 2 people work together against entropy with these larger objects.
  
# [12/01/2023](#12012023) - Series Of Tubes...Err Pipes.

## Seeing many posts on LinkedIn about CI/CD pipelines, and all of them are server-based. So here is my serverless CI/CD pipeline:

1. Develop and test locally.
2. Commit to GitHub.
3. GitHub Actions builds the website and tests.
4. GitHub Actions pushes to S3.
5. GitHub Actions flushes the CloudFront distribution. 
6. Site is live. 
