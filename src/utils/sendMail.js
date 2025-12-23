import sgMail from "@sendgrid/mail";

import dotenv from "dotenv";
dotenv.config();
// Set API Key once
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ to, subject, html, text }) => {
  try {
    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM, // must be verified in SendGrid
        name: "Support",
      },
      subject,
      html,
      text,
    };

    await sgMail.send(msg);
    return true;
  } catch (err) {
    console.error("SendGrid Send Error:", err.response?.body || err.message);
    throw new Error("Email sending failed");
  }
};

export default sendMail;
