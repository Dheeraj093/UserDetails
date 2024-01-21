const User = require("../Models/User");
const bcryptjs = require("bcryptjs");;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const register = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new User({ 
        username,
        email, 
        password : hashedPassword
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const login = async (req, res) => {
   
  try {
    const { username, password } = req.body;
    console.log(username)
    const user = await User.findOne({ username: username.trim() });
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

     

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 
const forgetPassword = async (req, res) => {
     
  try {
    const { email } = req.body;

     
    const resetToken = crypto.randomBytes(20).toString("hex");

     
    const resetTokenExpiration = Date.now() + 3600000;

     
    await User.updateOne({ email }, { $set: { resetToken, resetTokenExpiration } });

    
    console.log("object :" ,resetToken)
    const link = await sendResetEmail(email, resetToken);

    res.json({ message: "Password reset email sent successfully",link :link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },  
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

     
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 
const sendResetEmail = async (email, resetToken) => {
  try {
     
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: "your.email@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);

  } catch (error) {
    console.error(error);
    throw new Error("Error sending email");
  }
};


module.exports = {login, register, forgetPassword,resetPassword,sendResetEmail};