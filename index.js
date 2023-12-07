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
    try{
        const info = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${clikedAnime.title}`);
        const info2 = await axios.get(API_URL + `/anime/${clikedAnime.id}/full`);
        const characters = await axios.get( API_URL + `/anime/${clikedAnime.id}/characters`);
        const stremed = await axios.get(API_URL + `/anime/${clikedAnime.id}/streaming`)
        const charactersLength = characters.data.data.length;
        characters.data.data.length = 6;
        const details = info.data.data;
        const genres = info2.data.data.genres[0].name;
        console.log(stremed.data)
        res.render("cardPage.ejs", {
            data: details, data2: info2.data.data, 
            characters: characters.data.data,
            charactersLength: charactersLength,
            stream: stremed.data.data
        });
    }catch(error){
        console.error(error.stack);
    }
});

app.get("/characters/:id", async (req, res) => {
    const animeId = req.params;
    const characters = await axios.get( API_URL + `/anime/${animeId.id}/characters`);
    res.render("characters.ejs", {characters: characters.data.data});
});

app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});