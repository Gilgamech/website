# [12/01/2023](#12012023) - Series Of Tubes...Err Pipes.

## Seeing many posts on LinkedIn about CI/CD pipelines, and all of them are server-based. So here is my serverless CI/CD pipeline:

1. Develop and test locally.
2. Commit to GitHub.
3. GitHub Actions builds the website and tests.
4. GitHub Actions pushes to S3.
5. GitHub Actions flushes the CloudFront distribution. 
6. Site is live. 
