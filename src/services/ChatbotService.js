import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMG_GET_STARTED =
  "https://huongnghiepsongan.com/wp-content/uploads/2021/05/H%E1%BB%8EI-%C4%90%C3%81P-1.gif";
let callSendAPI = async (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: "https://graph.facebook.com/v9.0/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
let getUserName = (sender_psid) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let userName = `${body.first_name}  ${body.last_name}`;
          resolve(userName);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userName = await getUserName(sender_psid);
      let response1 = {
        text: `Xin chào bạn ${userName} đến với Fullstack bạn cần mình giúp gì không?`,
      };
      let response2 = sendGetStartedTemplate();
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let sendGetStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Xin chào bạn đến với Full stack devoloper !!!",
            subtitle: "Dưới đây là những lựa chọn câu hỏi của Full stack!",
            image_url: IMG_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "CÁC CÂU HỎI?",
                payload: "QUESTIONS",
              },
              {
                type: "postback",
                title: "ĐẶT CÂU HỎI!",
                payload: "MAKE_A_QUESTION",
              },
              {
                type: "postback",
                title: "HƯỚNG DẪN SỬ DỤNG BOT!",
                payload: "GUIDE_TO_USE",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

module.exports = { handleGetStarted };
