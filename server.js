const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./model/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/home', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5666)