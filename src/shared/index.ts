import * as bcrypt from 'bcrypt';
// import * as CryptoJS from 'crypto-js';
// import * as nodemailer from 'nodemailer';

// const iv = CryptoJS.enc.Base64.parse(''); //giving empty initialization vector
// const SECRET_KEY_256 = CryptoJS.SHA256(
//   '68e69a190a03ddb739c6356d5c9c10d16804adda',
// );

// export const encryptData = (data: any) => {
//   const encryptedString = CryptoJS.AES.encrypt(
//     JSON.stringify(data),
//     SECRET_KEY_256,
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     },
//   );
//   return encryptedString.toString();
// };

// export const decryptData = (encrypted: any) => {
//   var decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY_256, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// };

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const verifyENV = () => {
  if (process.env.ENV === 'dev') {
    return 'src/common/env/dev.env';
  }
  if (process.env.ENV === 'uat') {
    return 'src/common/env/uat.env';
  }
  if (process.env.ENV === 'prod') {
    return 'src/common/env/prod.env';
  }
};

export const gen_uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const gen_orderNo = (number: number) => {
  return 'xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * number) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   content: string,
// ) => {
//   try {
//     // console.log('send email=======L::: ', to);
//     const transporter = nodemailer.createTransport({
//       host: ENV().MAIL_HOST,
//       port: Number(ENV().MAIL_PORT),
//       secure: false,
//       auth: {
//         user: ENV().MAIL_USERNAME,
//         pass: ENV().MAIL_PASSWORD,
//       },
//     });
//     const info = await transporter.sendMail({
//       from: ENV().MAIL_USERNAME,
//       to: to,
//       subject: subject,
//       html: content,
//     });
//     setTimeout(() => {
//       console.log('after send mail');
//     }, 500);

//     if (info.messageId) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };
