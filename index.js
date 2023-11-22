import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://api.jikan.moe/v4";
let recommendationResult = "";
let searchResult = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const response = await axios.get(API_URL + "/anime/1/recommendations");
    recommendationResult = response.data.data;
    recommendationResult.length = 50;
    res.render("index.ejs", { animes: recommendationResult, req: "root" });
});

app.post("/search", async (req, res) => {
    const searchValue = req.body.query;
    const response = await axios.get(API_URL + `/anime?q=${searchValue}`);
    searchResult = response.data.data;
    res.render("searchPage.ejs", { animes: searchResult, req: "search" });
});

app.get("/animes/:title", (req, res) => {
    console.log(req.params);
    res.render("cardPage.ejs");
});

app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});