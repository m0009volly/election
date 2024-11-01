import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!(name && email && subject && message)) {
    return res.status(400).json({ message: "all fields are required !" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      // host: process.env.SMTP_SERVER,
      // port: process.env.SMTP_PORT,
      // secure: false,
      // auth: {
      //   user: process.env.GMAIL_USER,
      //   pass: process.env.GMAIL_PASS,
      // },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: subject,
      text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(400).json({ message: `failed to send mail` });
      } else {
        return res.status(200).json({ message: `mail sent successfully` });
      }
    });
  } catch (err) {
    console.error("Error Occured :", err);
    return res.status(500).send("Internal server error");
  }
};
