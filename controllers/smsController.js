const MessagingResponse = require('twilio').twiml.MessagingResponse;
const SmsTwilio = require('../models/smsTwilioModel');
const nodemailer = require('nodemailer');

exports.postTwilioSMS = (req, res, next) => {

  const twiml = new MessagingResponse();
  //Primary Key Twilio SMS (SmsSid)
  const SmsSid = req.body.SmsSid;
  const ToCity = req.body.ToCity;
  const ToState = req.body.ToState;
  const ToCountry = req.body.ToCountry;
  const SmsStatus = req.body.SmsStatus;
  const FromCity = req.body.FromCity;
  const FromState = req.body.FromState;
  const FromCountry = req.body.FromCountry;
  const Body = req.body.Body;
  const From = req.body.From;
  const To = req.body.To;

  const smsTwilio = new SmsTwilio({
    SmsSid: SmsSid,
    ToCity: ToCity,
    ToState: ToState,
    ToCountry: ToCountry,
    SmsStatus: SmsStatus,
    FromCity: FromCity,
    FromState: FromState,
    FromCountry: FromCountry,
    Body: Body,
    From: From,
    To: To,
  });

  //Firebase
  const message = {text: smsTwilio.Body, from: smsTwilio.From, timestamp: new Date().toString()};
  const ref = admin.database().ref().child('sampleData/SMS');
  const logsRef = ref.child('logs');
  const messagesRef = ref.child('messages');
  const messageRef = messagesRef.push(message);
  
  smsTwilio.save()
  .then((data)=> {
    console.log(data);
   })
  .catch((err)=> {
    console.log(err);
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'grupo5.progrmacion.profesional@gmail.com',
      pass: 'SOS_grupo5'
    }
  });
  let mailOptions = {
    from: 'grupo5.progrmacion.profesional@gmail.com',
    to: ['juanp.zunigav@gmail.com','Rzenteno@alumnos.uai.cl'],
    subject: 'Notificación de petición de auxilio.',
    text: 'Se ha recibido una petición de auxilio de: ' + From + ' con la siguiente información: ' + Body
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email Enviado !!!!');
    }
  });
  twiml.message('Se ha recibido correctamente su SMS de emergencia');
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
};