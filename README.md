# Simon-Says

[![Build Status](https://travis-ci.com/PXMYH/Simon-Says.svg?branch=master)](https://travis-ci.com/PXMYH/Simon-Says)

## run the app

run locally:

```bash
npm start
```

run docker image:

```bash
docker run -d --name simon-says -p 7777:3000 simon-says
```

## Deploy to Heroku

Manually

```bash
heroku create simon-says
git push heroku master
```

Set up Heroku deployment connected to GitHub and set app automatic deployment only triggers if CI passes
