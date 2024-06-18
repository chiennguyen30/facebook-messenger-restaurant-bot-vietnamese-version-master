import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMG_GET_STARTED = "https://bit.ly/nvc-1";
const IMG_MAIN_MENU_2 = "https://bit.ly/nvc-2 ";
const IMG_MAIN_MENU_3 = "https://bit.ly/nvc-3";
const IMG_MAIN_MENU_4 = "https://bit.ly/nvc-4";
const IMG_LUCNH_MENU_STEACK = "https://bit.ly/nvc-ca-hoi";
const IMG_LUCNH_MENU_CA_HOI = "https://bit.ly/45J73nr";
const IMG_LUCNH_MENU_NGOI_SEN = "https://bit.ly/4c4vWvX";
const IMG_LUCNH_MENU_VIT_QUAY = "https://bit.ly/3KJVxhA";
const IMG_BACK_TO_MAIN_MENU = "https://bit.ly/eric-bot-8";
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
      let response2 = getStartedTemplate();
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Nhà hàng NvC kính chào quý khách !!!",
            subtitle: "Dưới đây là những lựa chọn của nhà hàng dành cho bạn",
            image_url: IMG_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "MENU CHÍNH",
                payload: "MAIN_MENU",
              },
              {
                type: "postback",
                title: "ĐẶT BÀN",
                payload: "RESERVE_TABLE",
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

let handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getMainMenuTemplate();
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getMainMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Xin chào bạn đến với nhà hàng của NvC!!!",
            subtitle: "Dưới đây là những lựa chọn của nhà hàng dành cho bạn!!!",
            image_url: IMG_MAIN_MENU_2,
            buttons: [
              {
                type: "postback",
                title: "BỮA TRƯA",
                payload: "LUNCH_MENU",
              },
              {
                type: "postback",
                title: "BƯA TỐI",
                payload: "DINNER_MENU",
              },
            ],
          },
          {
            title: "Giờ mở cửa của nhà hàng của NvC!",
            subtitle: "T2-T6 10AM-11PM | T7 5PM - 10PM | CN 5PM - 9PM",
            image_url: IMG_MAIN_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "ĐẶT BÀN",
                payload: "RESERVE_TABLE",
              },
            ],
          },
          {
            title: "Không gian nhà hàng!",
            subtitle: "Nhà hàng có sức chưa lên tới 300 khách ngồi và phục vụ các bữa tiệc lớn!",
            image_url: IMG_MAIN_MENU_4,
            buttons: [
              {
                type: "postback",
                title: "CHI TIẾT PHÒNG",
                payload: "SHOW_ROOM",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleSendLunchMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getLunchMenuTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getLunchMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Món tráng miệng",
            subtitle: "Nhà hàng có nhiều món tráng miệng hấp dẫn",
            image_url: IMG_LUCNH_MENU_NGOI_SEN,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_APPETIZERS",
              },
            ],
          },
          {
            title: "Thưởng thức steak",
            subtitle:
              "Muốn có thịt bò bít tết thơm ngon cả nhà đều mê, đầu tiên mình phải chọn được loại thịt chất lượng",
            image_url: IMG_LUCNH_MENU_STEACK,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_STEAK",
              },
            ],
          },
          {
            title: "Cá hồi áp chảo sốt chanh bơ tỏi",
            subtitle:
              "Cá hồi áp chảo sốt chanh bơ tỏi có mùi thơm vô cùng hấp dẫn, sốt chanh bơ tỏi lạ miệng vừa béo thơm vừa chua chua cùng thịt cá tươi ngon rất vừa miệng.",
            image_url: IMG_LUCNH_MENU_CA_HOI,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_CA_HOI",
              },
            ],
          },
          {
            title: "Vịt quay Bắc Kinh",
            subtitle:
              "Vịt quay Bắc Kinh là một món ăn từ Bắc Kinh được chế biến từ thời phong kiến. Đặc điểm của loại thịt này là lớp da mỏng và giòn, trong đó cách ăn truyền thống thường đi kèm với da và ít thịt, được người nấu thái lát trước mặt thực khách.",
            image_url: IMG_LUCNH_MENU_VIT_QUAY,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_VIT_QUAY",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại menu chính",
            image_url: IMG_BACK_TO_MAIN_MENU,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let handleSendDinnerMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getDinnerMenuTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getDinnerMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Xin chào bạn đến với nhà hàng của NvC!!!",
            subtitle: "Dưới đây là những lựa chọn của nhà hàng dành cho bạn!!!",
            image_url: IMG_MAIN_MENU_2,
            buttons: [
              {
                type: "postback",
                title: "BỮA TRƯA",
                payload: "LUNCH_MENU",
              },
              {
                type: "postback",
                title: "BƯA TỐI",
                payload: "DINNER_MENU",
              },
            ],
          },
          {
            title: "Giờ mở cửa của nhà hàng của NvC!",
            subtitle: "T2-T6 10AM-11PM | T7 5PM - 10PM | CN 5PM - 9PM",
            image_url: IMG_MAIN_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "ĐẶT BÀN",
                payload: "RESERVE_TABLE",
              },
            ],
          },
          {
            title: "Không gian nhà hàng!",
            subtitle: "Nhà hàng có sức chưa lên tới 300 khách ngồi và phục vụ các bữa tiệc lớn!",
            image_url: IMG_MAIN_MENU_4,
            buttons: [
              {
                type: "postback",
                title: "CHI TIẾT PHÒNG",
                payload: "SHOW_ROOM",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
let handleViewAppetizers = (sender_psid) => {};
let handleViewSteak = (sender_psid) => {};
let handleViewCaHoi = (sender_psid) => {};
let handleViewVitQuay = (sender_psid) => {};
let handleBackMainMenu = (sender_psid) => {};
module.exports = {
  handleGetStarted,
  handleSendMainMenu,
  handleSendLunchMenu,
  handleSendDinnerMenu,
  handleViewAppetizers,
  handleViewSteak,
  handleViewCaHoi,
  handleViewVitQuay,
  handleBackMainMenu,
};
