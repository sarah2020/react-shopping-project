const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const keys = require("./server/config/keys");
const stripe = require('stripe')(keys.stripeSecretKey);

// ---------- backend mysql -------------
const mysql = require('mysql');
// const path = require('path');
// const app = express();
const http = require('http');
// --------------------------------------


const dev = process.env.NODE_ENV !== 'production';


/* const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'osama251611',
    database: 'shopping'
  });
   
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  }); */
   

const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use('/images', express.static(path.join(__dirname, 'images'), {
        maxAge: dev ? '0' : '365d'
    }));

    server.use(bodyParser.json());

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.use((req, res, next) =>
    {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept',
   );
   next();
 });


    server.post('/api/stripe/checkout', async (req, res) => {
        await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'React Next eCommerce Templates',
            source: req.body.token.id
        });
        res.send({});
       
    });
/* 
    server.post('/api/checkout',(req, res) => {

        let data = {AMOUNT: req.body.amount, CURRENCY: 'usd' , SOURCE: req.body.source, Description: 'React Next eCommerce Templates'};
        let sql = "INSERT INTO shopping.checkout SET ?";
   conn.query(sql, data,(err, results) => {
     if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results , "message": "Updated Successfully"}));
   }); 


    });*/
    

    const PORT = process.env.PORT || 4040;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Read on http://localhost:${PORT}`)
    });
})