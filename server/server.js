const path =require('path');
const express=require('express');
const port= process.env.port||3000
const app=express();
const staticPath=path.join(__dirname,'../public')
app.use(express.static(staticPath));

console.log(staticPath);

app.get('/',(req,res)=>{
    res.render(index)
})



app.listen(port,()=>console.log(`connected at ${port}`))

