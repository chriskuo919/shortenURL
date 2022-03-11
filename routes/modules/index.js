const express = require("express")
const URL = require("../../models/URL")
const shortenURL = require("../../utils/shortenURL")

const router = express.Router()

//首頁畫面
router.get("/", (req, res) => {
  res.render("index")
})

//送出長網址,產生短網址;輸入相同網址,資料庫找到已有的資料,不須再新增資料
router.post("/", (req, res) => {
  if (!req.body.url) return res.redirect("/")
  const shortURL = shortenURL(5)

  URL.findOne({ originalURL: req.body.url })
    .then(data =>
      data ? data : URL.create({ shortURL, originalURL: req.body.url })
    )
    .then(data =>
      res.render("index", {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.error(error))
})

//測試短網址
router.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params

  URL.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        })
      }

      res.redirect(data.originalURL)
    })
    .catch(error => console.error(error))
})

module.exports = router