import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const response = await axios.get("https://api.jikan.moe/v4/anime/1/recommendations");
    const result = response.data;
    result.data.length = 50;
    res.render("index.ejs", {animes: result.data});
});


app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});