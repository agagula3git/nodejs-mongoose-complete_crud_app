const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Members = require('./models/members');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mongodbcrud', {useNewUrlParser: true}, err =>{
    if(err){
        console.log('Attempt to connect to DB failed: '+ err);
    }else{
        console.log('A successful connection to MongoDB!');
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');

/*app.use('/', express.static(path.resolve(__dirname, 'public')));*/

app.get('/', (req,res)=>{
    Members.find((err, doc)=>{
        if(!err){
            res.render('listOfMembers',{
                members: doc
            })
        }else{
            console.log('Error in retrieving docs: '+ err);
        }
    }).lean();
});

app.get('/insertMember', (req,res)=>{
    res.render('insertMember', {
        title: "Insert Member",
        ACTION: "/insertMember"
    });
});

app.post('/insertMember', (req,res)=>{
    var member = new Members({
        fullName: req.body.fullName,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address
    });
    member.save((err, doc)=>{
        if(!err){
            res.redirect('/');
        }else{
            console.log('Error occured: '+ err);
        }
    });
});

app.get('/deleteMember/:id', (req,res)=>{
    Members.findOneAndRemove({_id: req.params.id}, (err,doc)=>{
        if(!err){
            res.redirect('/');
        }else{
            console.log('Error in delete member: '+ err);
        }
    })
});

app.get('/editMember/:id', (req,res)=>{
    Members.findOne({_id: req.params.id}, (err,member)=>{
        if(!err){
            res.render('insertMember',{
                member: member,
                ACTION: `/insertMember/${req.params.id}`,
                title: 'Update Member'
            })
        }
    }).lean();
})

app.post('/insertMember/:id', (req,res)=>{
    Members.findOneAndUpdate({_id: req.params.id}, req.body, {new: false}, (err,doc)=>{
        if(!err){
            res.redirect('/');
        }else{
            console.log('Error occured during update member: '+ err);        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
})

