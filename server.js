const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blogs')




// express app
const app = express();


// connect to mongo db
const dbURI= 'mongodb+srv://joseph:test1234@nodetuts.7ozamsj.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>{app.listen(3000);})
.catch((err)=> console.log(err))




// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));




app.use(morgan('dev'));

//mongoose and mongo sandbox routes
 

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});



app.get('/', (req, res) => {
  res.redirect('/blogs')
});


// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });


//blog routes
app.get('/blogs',(req,res)=>{

  Blog.find().sort({createdAt:-1})
  .then((result)=>{

    res.render('index',{title:'All Blogs',blogs:result})

  })
  .catch((err)=>console.log(err))

})



app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});