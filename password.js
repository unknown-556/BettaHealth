// import cryptoHash from 'crypto';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';
// import User from './src/models/userModel.js';

// const hashValue = (value) => {
//     const hash = cryptoHash.createHash('sha256');
//     hash.update(value);
//     return hash.digest('hex');
// };

// export const requestPasswordReset = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const passwordtoken = crypto.randomBytes(20).toString('hex');

//         user.resetPasswordToken = passwordtoken;
//         user.resetPasswordExpires = Date.now() + 1800000; 

//         await user.save();

//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.EMAIL_PASSWORD,
//             },
//             tls: {
//                 rejectUnauthorized: false
//             } 
//         });

//         const mailOptions = {
//             to: user.email,
//             from: process.env.EMAIL,
//             subject: 'Password Reset',
//             html: `
//                 <html>
//         <head>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1 >Devly_</h1>
//                     <h2>Password Reset Request</h2>
//                 </div>
//                 <div class="content">
//                     <p>Hello,</p>
//                     <p>You requested a password reset. Click the button below to reset your password.</p>
//                     <p style="margin: 20px 0;">
//                         <a href="https://devly-ruddy.vercel.app/NewPassword/${passwordtoken}"
//                            style="background-color: #0DA16C; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
//                            Reset Password
//                         </a>
//                     </p>
//                     <p>If the button above does not work, please click on the following link, or paste this into your browser to complete the process:</p>
//                             <p>
//                                 <a href="http://https://devly-ruddy.vercel.app/NewPassword/${passwordtoken}">
//                                     "https://devly-ruddy.vercel.app/NewPassword/${passwordtoken}"
//                                 </a>
//                             </p>
//                             <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
//                             <p><h1>This link wil expire in 30 minutes.</h1></p>
//                 </div>
//                 <div class="footer">
//                     <p>Thank you,<br/><h1>Devly_</h1></p>
//                     <p><a href="https://devlyng.vercel.app">Visit our website</a></p>
//                 </div>
//             </div>
//         </body>
//     </html>
//             `,
//         };

//         await transporter.sendMail(mailOptions);
        
//         console.log(passwordtoken)

//         return res.status(200).json({ passwordtoken});

//     } catch (error) {
//         console.log({error})
//         res.status(500).json({ message: error.message });
//     }
// };


// // "http://${req.headers.host}/reset/${passwordtoken}"

// export const resetPassword = async (req, res) => {
//     const { passwordtoken, password } = req.body;

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: passwordtoken,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
//         }

//         const encryption = hashValue(password);

//         user.password = encryption;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ message: 'Password has been reset' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };