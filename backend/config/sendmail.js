import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your gmail
      pass: process.env.EMAIL_PASS, // app password (not normal pass)
    },
  });

  await transporter.sendMail({
    from: `"Campus Bazaar" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
