const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

const app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'магазин';

// ----------- DB connect start -------------------------//

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('products');

  // DB functions start

  const insertResult = await collection.insertOne(
    {
      "name": "New product 2",
      "price": 500,
      "text": "product added from Node"
    }
  );

  console.log('Inserted documents =>', insertResult);

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  // DB functions end

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// ----------- DB connect end -------------------------//

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});
app.get('/contacts', function(req, res) {
  res.render('contacts', {filledAllFields: true});
});
app.post('/contacts', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  console.log(req.body.check);
  if (req.body.email == "" || req.body.name == "" || req.body.message == "" || req.body.city == "" || req.body.check == undefined) {
    res.render('contacts', {filledAllFields: false})
  } else {
    res.render('success-page', {data: req.body});
  }

  // ----------- Sending email after filling form ---------------
//   async function main() {
//
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ukr.net",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "testerbitrix@ukr.net",
//       pass: "JbIw0rIlljA3iLLC",
//     },
//   });
//
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"TesterBitrix" <testerbitrix@ukr.net>', // sender address
//     to: "ihorsolohub@i.ua", // list of receivers
//     subject: "Hello", // Subject line
//     // text: req.body.email, // plain text body
//     html: "<b>" + req.body.message + "</b>", // html body
//   });
//
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// };
// main().catch(console.error);
  // ---------------- Sending email ---------------

});

app.listen(3000);
console.log("Ми отсеживаем порт 3000");
