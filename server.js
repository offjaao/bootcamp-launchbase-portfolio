const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {

    const about = {
        avatar_url: "https://instagram.fcgh17-1.fna.fbcdn.net/v/t51.2885-15/e35/89482852_251131322563140_758917748006707445_n.jpg?_nc_ht=instagram.fcgh17-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=wqFB3D1iAgMAX94mgUa&tp=1&oh=6f3728ee959ab69873c241d0f3104fee&oe=602515F4",
        name: "João 'Jaao' Lucas",
        role: "Desenvolvedor",
        description: "Olá, me chamo João, possuo 19 anos e estudo programação!",
        link: [
            { name: "Github", url: "https://www.github.com/offjaao" },
            { name: "Twitter", url: "https://www.twitter.com/offjaao" },
            { name: "Instagram", url: "https://www.instagram.com/offjaao" }
        ]
    }

    return res.render("about", {about: about})
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res) {

    const id = req.query.id;

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) return res.send("Video not found!")
    

    return res.render("video", {item: video})
})

server.listen(5000, function() {
    console.log("Server is running")
})