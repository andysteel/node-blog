const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = express()
app.set('view engine', 'ejs')
const dbURI = 'mongodb+srv://${{ secrets.MONGO_USER }}:${{ secrets.MONGO_PASS }}@devcluster-1vl5x.mongodb.net/test-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(result => { 
            console.log('Mongo connected.')
            app.listen(3000)
        }).catch(error => console.log(error))

console.log('Express is UP and running...')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

//Blog routes
app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})
