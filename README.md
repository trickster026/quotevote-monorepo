# VoxPOP

VoxPOP was built to enable anyone, anywhere to create a forum where they can share their
knowledge and learn from others. The existing platforms all had problems, whether that
was a system that could be gamed to exclude the people most in need of a place to have
their voices heard, shady data collection practices, geographic limitations, or all of the
above.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Features](#features)
- [Feature Development](#feature-development)
- [Pages](#pages)

## Requirements
  This application uses multiple technologies including (but not limited to) React, Node/NPM, GraphQl,  [semantic-ui-react](https://react.semantic-ui.com) 


## Installation
1. Ensure the backend is running. Follow the instructions at https://github.com/flyblackbox/HHSB-GraphQL-Api

2. Clone the repository

    `git clone https://github.com/flyblackbox/HHSB.git && cd HHSB`

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
  + Displays the activites of all the people you follow
  
### Activity feed.
  + Displays your interaction score along with the activities of people you follow

### Bookmark posts.
  + Bookmark a post and then you comment on that post and all its followers and creator will be notified
  
### Follow user.
  + This adds their activity detail to the home page and activity page