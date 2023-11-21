import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const response = await axios.get(API_URL + "/anime/1/recommendations");
    const result = response.data;
    result.data.length = 50;
    res.render("index.ejs", {animes: result.data, req: "root"});
});

app.post("/search", async (req, res) => {
    const searchValue = req.body.query;
    const response = await axios.get(API_URL + `/anime?q=${searchValue}`);
    const result = response.data;
    res.render("searchPage.ejs", {animes: result.data, req: "search"});
});

app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});