# Quote Vote

Quote.Vote is a text-first platform for public dialogue,  
where every post becomes a space for quoting, reflecting, and voting on ideas.  

Contributors from around the world helped build this civic engagement tool—  
without ads or algorithms, we can have transparent conversation.  

Features such as targeted feedback via text highlights, public chat threads,  
and voting mechanics support thoughtful interaction over reactive engagement.  

Originally prototyped as Scoreboard, the project is now in preparation for open-source  
and our team welcomes remix, reuse, and contributions from developers, designers,  
and democratic technologists alike.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Features](#features)
- [Feature Development](#feature-development)
- [Pages](#pages)
- [Contributing](#contributing)
<!-- - [File Strcture](#file-structure) -->

## Requirements
  - If working on a mac, you will need to have Xcode properly installed for your current OS version.


## Installation
 Ensure the backend is running. Follow the [instructions.](https://github.com/QuoteVote/quotevote-react/blob/master/README.md)

2. Clone the repository

    `git clone https://github.com/QuoteVote/quotevote-react.git && cd quotevote-react`
3. Create a `.env` file and add the following:
    ```
    NODE_ENV=dev
    REACT_APP_SERVER=https://api.quote.vote
    REACT_APP_SERVER_WS=wss://api.quote.vote
    REACT_APP_DOMAIN=https://dev.quote.vote
    ```

3. Install dependencies

    `npm install`

3. Run the application

    `npm start`

## Features
  - Chat with buddies
  - Create posts
  - Upvote and downvote posts
  - Quote posts

    
## Feature Development

  Testing of new React components is provided via Jest

    `npm run test`

## Pages

  ### Post Page.
+ Create a post, add to a Subscoreboard_
  
### Content Page.
  + View the entire content of a post and interact with it through comments, quotes, upvotes/downvotes_
  
### Trending Page
  + Pages are listed in terms of highest to lowest interactions
  
### User profile.
  + Displays the activities of all the people you follow
  
### Activity feed.
  + Displays your interaction score along with the activities of people you follow

### Bookmark posts.
  + Bookmark a post and then you comment on that post and all its followers and creator will be notified
  
### Follow user.
  + This adds their activity detail to the home page and activity page


## Contributing

1. Clone the repo, this pull our dev branch. it's our default branch  
  `git clone https://github.com/QuoteVote/quotevote-react.git`
2. Install node_modules  
`cd quotevote_react && npm i`
3. Check out a new branch, with `dev-` prefix  
  `git checkout -b dev-feature`  
  for example `dev-eslint-fix`
4. Do your work, check UI, run tests.
5. Make as many commits as you like. After each commit, push the branch back up to origin.
`git push origin dev-branchName`  
As a note, if it's incomplete, add `WIP` to the git commit message first line.  
For example
`WIP Linting files. Linted hssbComponent` 
Rest of git message
6. Once you are done with your work, make sure all test still pass, and that you have linted the files.  
  `npm run lint:check`  
  * Make the adjustments needed so there is no warnings or errors.
  * Ensure you can build without any problems.  
    `npm run build`
7. [Squash your commits](https://github.com/QuoteVote/quotevote-react/wiki/Squashing-Commits) so there is only one.
8. Create your pull request with a descriptive title.  
See the deployed version on the netlify preview build. Wait for code review, feedback, or approval.

  To see the preview build from Netlify, and scroll down to the bottom. Next to where it says "Deploy preivew", it says Details. If it's still building, it'll direct you to the netlify log of the build process. Once complete it will show a green check like the example below.

  ![Netlify Deploy Preview](https://i.imgur.com/oPYdnvc.png)

*** 

<!-- ## File Structure -->
<!-- Work in Progress -->

### Addditional Notes on Contributions

### React Hooks + GraphQL
- Use @apollo/react-hooks <!-- if you want to use hooks. -->
<!-- Use @apollo/react-components if you want to use components / render props -->
- If you want to make queries or mutation put them in the src/graphql/mutation.js  or src/graphql/query.js

### Use Our Wiki
Please use and contribute to the wiki: [voxpop-React Wiki](https://github.com/QuoteVote/quotevote-react/wiki)
