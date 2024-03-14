// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'gametomato2@gmail.com', // Your Gmail email address
//     pass: 'jdjo rsmg siac ojoa', // Your Gmail password or app password
//   },
// });

// const sendEmail = (toEmail, score, username) => {
//   const mailOptions = {
//     from: 'gametomato2@gmail.com',
//     to: toEmail,
//     subject: '🚀 Congratulations! You\'ve set a new high score in the Tomato Game! 🍅',
//     html: `
//       <h1>Congratulations, ${username}!</h1>
//       <p>You've achieved a new high score in the Tomato Game!</p>
//       <p>Your High Score: ${score}</p>
//       <p>Keep up the fantastic work and continue to dominate the game leaderboard.</p>
//       <p>Keep playing, keep winning, and most importantly, have fun!</p>
//       <p>Best regards,</p>
//       <p>Tomato Game</p>
//     `
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// module.exports = { sendEmail };
