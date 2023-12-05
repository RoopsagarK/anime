import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://api.jikan.moe/v4";

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
    console.log(clikedAnime)
    try{
        const info = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${clikedAnime.title}`);
        const info2 = await axios.get(API_URL + `/anime/${clikedAnime.id}/full`);
        console.log(info2.data.data);
        const details = info.data.data;
        res.render("cardPage.ejs", {data: details, data2: info2.data.data});
    }catch(error){
        console.error(error.stack);
    }
});

app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});