# React ReactQuery Example App

[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](http://realworld.io)
#### React + Next.js + ReactQuery + Chakra UI + React Hook Form


## Getting started

### [Live Demo](https://mssoftco.gitlab.io/real-world-front/)

or

To get the frontend running locally:


1- install packages:

```bash
npm install
```

2- run the development local:

```bash
npm run dev
```

3- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Functionality Overview

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- GET and display paginated lists of articles

**The general page breakdown looks like this:**

- Sign in/Sign up pages (URL: /login, /register )
    - Use JWT (store the token in localStorage)
- Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
- Article page (URL: /article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
<br />

[![Brought to you by Thinkster](https://raw.githubusercontent.com/gothinkster/realworld/master/media/end.png)](https://thinkster.io)