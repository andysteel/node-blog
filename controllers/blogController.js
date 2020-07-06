const Blog = require('../model/blog')

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then(result => {
            res.render('blogs/index', { title: 'Home', blogs: result})
        })
        .catch(error => console.log(error))
    
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => res.render('blogs/detail',{ blog: result, title: 'Blog detail' }))
        .catch(error => res.status(404).render('404', {title: 'Blog not found'}))
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create new blog'})
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => res.status(201).redirect('/blogs'))
        .catch(error => console.log(error))
}

const blog_delete = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => res.json({ redirect: '/blogs' }))
        .catch(error => console.log(error))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}