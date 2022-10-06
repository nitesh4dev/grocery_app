const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
app.use(express.json());
app.listen(port, ()=>console.log(`Server is running on ${port}`));
const cors = require('cors');
app.use(cors());
const url = "mongodb+srv://nitesh4dev:Nite$h2oo3@cluster0.camzdu1.mongodb.net/Grocery_app?retryWrites=true&w=majority"
mongoose.connect(url , {
    UseNewUrlParser : true,
    useUnifiedTopology: true

}).then(()=>console.log("connection succesfull")).catch((err)=>console.log(`An error occured ${err}`));

const Groceries = mongoose.model('Groceries', mongoose.Schema({item:{type: String, required:true},isPurchased:{type:Boolean,default: false}}));

app.post('/addGrocery',async(req, res)=>{
    const item = req.body.input;
   try{
      const added = new Groceries({item});
      const saved = await added.save();
      if(saved){
      res.json({message:'Added succeffully'});
      }
      else{res.json({message:'Something went wrong'})}
   }
   catch(err){
    console.log(err);
   }
});
app.put('/updateGrocery', async(req, res)=>{
    const id = req.body.id;
    console.log(req.url);
    try{
        const updated = await Groceries.findOneAndUpdate({_id: id},{isPurchased:true});
       if(updated){
       res.json({message:"updated succesfully", dataObj: updated});
       }
       else{
        res.json({message:'Something went wrong'})
       }
    }
    catch(err){
        console.log(err)
    }
})

app.get('/getGrocery',async(req, res)=>{
    try{
        const groceries = await Groceries.find();
        res.send(groceries);
    }
    catch(err){
          console.log(err);
    }
})
app.delete('/deleteGrocery',async(req, res)=>{
     const id = req.query.id;
     try{
        const deleted = await Groceries.findOneAndDelete({_id: id});
        if(deleted){
            res.json({message: 'Deleted succesfully'});
        }
        else{
            res.json({message:'Something went wrong'})
        }
     }
     catch(err){
        console.log(err);
     }
})