const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//cara pasang nodemailer :
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'esterjustify1905@gmail.com',
        pass: 'xbraoibjfekxrqid'   
    },
    tls: {
        rejectUnauthorized: false
    }
})

//cara pasang express :
const app = express();

const port = process.env.PORT || 2000;

//cara pasang cors dan bodyParser :
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('<h1>SELAMAT DATANG di API NODEMAILER!</h1>')
})

//cara post ke email :
app.post('/sendmail', (req,res) => {
    var { to, subject, html } = req.body;
    var mailOptions = {
        from: 'Justify Ester Pasaribu <esterjustify1905@gmail.com>',
        to,
        subject,
        html
    }
    transporter.sendMail(mailOptions, (err,res1) => {  
        if(err) {
            console.log(err)
            res.send({ status: 'Error'})
        }
        else {
            console.log('Success!')
            res.send({ status: 'Success'})
        }
    })
})

app.listen(port, () => console.log('API aktif di port' + port));