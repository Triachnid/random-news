const express = require("express");
const serverless = require("serverless-http");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('27605a93416945e69d50642adb983dc4');
const fetch = require('node-fetch').default;

const app = express();
const router = express.Router();
let recent;


router.get("/get-random-recent", (req, res) => {
    newsapi.v2.topHeadlines({
        language: 'en',
        country: 'us'
    }).then(response => {
        const index = Math.floor(Math.random() * (response.articles.length - 1));
        console.log(index);
        res.send(response.articles[index.toString()]);
    });
});

app.use(`/.netlify/functions/api`, router);

module.exports = [app, fetch];
module.exports.handler = serverless(app);