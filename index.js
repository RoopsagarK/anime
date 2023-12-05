import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://api.jikan.moe/v4";
const db = new pg.Client({
    user: "postgres",
    password: "roop9854",
    database: "anime",
    host: "localhost",
    port: 5432,
});
db.connect();

let searchResult = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", async (req, res) => {
    const response = await axios.get("https://kitsu.io/api/edge/trending/anime");
    const animeRecommendation = await axios.get(API_URL + "/recommendations/anime")
    const trendingAnime = response.data.data;

    res.render("index.ejs", { animes: trendingAnime, req: "root", recommendations: animeRecommendation.data.data });
});

app.post("/search", async (req, res) => {
    const searchValue = req.body.query;
    const response = await axios.get(API_URL + `/anime?q=${searchValue}`);
    searchResult = response.data.data;
    res.render("searchPage.ejs", { searchResults: searchResult, req: "search" });
});

app.get("/animes/:id/:title", async (req, res) => {
    const clikedAnime = req.params;
    try{
        const info = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${clikedAnime.title}`);
        const details = info.data.data;
        res.render("cardPage.ejs", {data: details});
    }catch(error){
        console.error(error.stack);
    }
});

app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});