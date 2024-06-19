const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

function numberToString(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

const sendEmailCreateOrder = async (email, orderItems,totalPrice) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let html = '<table style="border-collapse: collapse; width: 100%;">';
  html +=
      '<thead><tr style="background-color: #f2f2f2;"><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Tên sản phẩm</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Số lượng</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Giá gốc</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Giảm giá</th></tr></thead>';
  html += '<tbody>';
  
  orderItems.forEach((item) => {
      html += `<tr style="border: 1px solid #dddddd;">
                      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.name}</td>
                      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.amount}</td>
                      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.totalPrice}</td>
                      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.discount}%</td>
                  </tr>`;
  });
  
  html += `</tbody></table> <div style="margin-top: 10px;">Bạn cần thanh toán: ${numberToString(totalPrice)}</div>`;
  
  const info = await transporter.sendMail({
    from: "phong0328927727@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng thành công", // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });

};

const sendEmailChangePassword = async (email,token) => {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  
    const resetUrl = `Đổi mật khẩu <a href="http://localhost:3000/reset-password?email=${email}&token=${token}">Tại đây</a>`;
    
    const info = await transporter.sendMail({
      from: "phong0328927727@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Đổi mật khẩu", // Subject line
      text: "Hello world?", // plain text body
      html: resetUrl, // html body
    });
  
  };

module.exports = {
  sendEmailCreateOrder,
  sendEmailChangePassword
};
