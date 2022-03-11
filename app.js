const express = require("express")
const exphbs = require("express-handlebars")
require("./config/mongoose")
const routes = require("./routes")

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(routes)


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})