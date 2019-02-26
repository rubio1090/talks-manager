const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
var mysql = require('mysql');


//Settings
app.set('port', process.env.PORT || 3030);

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

var urlencodedParser = bodyParser.urlencoded({ extended : false });

app.get('/ui/*', (req, res) => {
  res.sendFile(public_dir, function(err){
    if(err){
      res.status(500).send(err);
    }
  });
});

//Static Files
const public_dir = path.join('Users', 'josueortega', 'Desktop', 'Portfolio', 'public');

app.use('/', express.static(public_dir));

//Connecion settings
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'TALKY'
});

//Connect to DB
con.connect(err => {
  if(err){
    return err;
  }
});

// STORE MESSAGE 
app.post('/send/message', urlencodedParser, (req, res) => {
    const {name, email, phone, message} = req.body;
    const query = `INSERT INTO messages (name,email,phone,message,sent_dttm) VALUES ('${name}', '${email}', '${phone}', '${message}', CURRENT_DATE)`;
    con.query(query, (err, result) => {
      if(err){
        res.send(err);
      }else{
        return res.json({data : result.affectedRows});
      }
    });
});

// GET USER INFO
app.get('/api/user', (req, res) => {
  const sql = `CALL GetUserInfo(${req.query.user_id})`;
  con.query(sql, (err, user) => {
    if(err){
      return res.send(err);
    }else{
      return res.json({ data : user[0] })
    }
  })
});

// GET CONG INFO
app.get('/api/cong', (req, res) => {
  const sql = `CALL GetCongInfo(${req.query.cong_id})`;
  con.query(sql, (err, cong) => {
    if(err){
      return res.send(err);
    }else{
      return res.json({ data : cong[0] })
    }
  })
});

// GET SPEAKERS BY CONG_INFO
app.get('/api/speakers', (req, res)=>{
  const sql = `CALL GetSpeakersByCongId(${req.query.cong_id})`;
  con.query(sql, (err, speakers)=>{
    if(err){
      return res.send(err);
    }else{
      return res.json({ data: speakers[0] });
    }
  });
});

// GET TALKS BY SPEAKER
app.get('/api/talks', (req, res)=>{
  const sql = `CALL GetTalksBySpeaker(${req.query.user_id})`;
  con.query(sql, (err, talk)=>{
    if(err){
      return res.send(err);
    }else{
      return res.json({ data: talk[0] });
    }
  });
});

// GET TALKS BY CONG ID
app.get('/api/cong/talks', (req, res)=>{
  const sql = `CALL GetTalksByCong(${req.query.cong_id})`;
  con.query(sql, (err, result)=>{
    if(err){
      return res.send(err);
    }else{
      return res.json({ data : result[0]})
    }
  });
});

//Start server
app.listen(app.get('port'), () => console.log('From the server'));
