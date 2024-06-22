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

const IMG_DETAIL_APPETIZERS_1 = "https://bit.ly/3Xpq6Rv";
const IMG_DETAIL_APPETIZERS_2 = "https://bit.ly/4c77jPf";
const IMG_DETAIL_APPETIZERS_3 = "https://bit.ly/eric-bot-11";

const IMG_DETAIL_FISH_1 = "https://bit.ly/eric-bot-12";
const IMG_DETAIL_FISH_2 = "https://bit.ly/eric-bot-13";
const IMG_DETAIL_FISH_3 = "https://bit.ly/eric-bot-14";

const IMG_DETAIL_MEAT_1 = "https://bit.ly/4epCkj3";
const IMG_DETAIL_MEAT_2 = "https://bit.ly/3RyrwFl";
const IMG_DETAIL_MEAT_3 = "https://bit.ly/3RwQBAO";

const IMG_DETAIL_DUCK_1 = "https://bit.ly/4baNDZz";
const IMG_DETAIL_DUCK_2 = "https://bit.ly/4etnEiP";
const IMG_DETAIL_DUCK_3 = "https://bit.ly/4c2XBO1";

const IMG_GIF_WELCOME = "https://bit.ly/3KRsau5";

const IMG_DETAIL_ROOM = "https://bit.ly/eric-bot-18";
let callSendAPI = async (sender_psid, response) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Construct the message body
      let request_body = {
        recipient: {
          id: sender_psid,
        },
        message: response,
      };

      await sendMarkReadMessage(sender_psid);
      await sendTypingOn(sender_psid);

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
            resolve("message sent!");
          } else {
            console.error("Unable to send message:" + err);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

let sendTypingOn = async (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
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
        console.log("sendTypingOn sent!");
      } else {
        console.error("Unable to send sendTypingOn:" + err);
      }
    }
  );
};

let sendMarkReadMessage = async (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "mark_seen",
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
        console.log("sendTypingOn sent!");
      } else {
        console.error("Unable to send sendTypingOn:" + err);
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
          let username = `${body.first_name}  ${body.last_name}`;
          resolve(username);
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
      let username = await getUserName(sender_psid);
      let response1 = {
        text: `Xin chào bạn ${username} đến với nhà hàng NvC bạn cần mình giúp gì không?`,
      };
      // send an img
      let response2 = getImgStartedTemplate();
      // let response2 = getStartedTemplate(sender_psid);
      let response3 = getStartedQuickReplyTemplate(sender_psid);
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      await callSendAPI(sender_psid, response3);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

// let getStartedTemplate = (sender_psid) => {
//   let response = {
//     attachment: {
//       type: "template",
//       payload: {
//         template_type: "generic",
//         elements: [
//           {
//             title: "Nhà hàng NvC kính chào quý khách !!!",
//             subtitle: "Dưới đây là những lựa chọn của nhà hàng dành cho bạn",
//             image_url: IMG_GET_STARTED,
//             buttons: [
//               {
//                 type: "postback",
//                 title: "MENU CHÍNH",
//                 payload: "MAIN_MENU",
//               },
//               {
//                 type: "web_url",
//                 url: `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
//                 title: "ĐẶT BÀN",
//                 payload: "RESERVE_TABLE",
//                 webview_height_ratio: "tall",
//                 messenger_extensions: true,
//               },
//               {
//                 type: "postback",
//                 title: "HƯỚNG DẪN SỬ DỤNG BOT!",
//                 payload: "GUIDE_TO_USE",
//               },
//             ],
//           },
//         ],
//       },
//     },
//   };
//   return response;
// };

let getStartedQuickReplyTemplate = (sender_psid) => {
  let response = {
    text: "Dưới đây là những lựa chọn của nhà hàng dành cho bạn:",
    quick_replies: [
      {
        content_type: "text",
        title: "MENU CHÍNH",
        payload: "MAIN_MENU",
      },
      {
        content_type: "text",
        title: "ĐẶT BÀN",
        payload: "RESERVE_TABLE",
      },
      {
        content_type: "text",
        title: "HƯỜNG DẪN SỬ DỤNG BOT",
        payload: "GUIDE_TO_USE",
      },
    ],
  };
  return response;
};

let getImgStartedTemplate = () => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: IMG_GIF_WELCOME,
        is_reusable: true,
      },
    },
  };
  return response;
};

let handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getMainMenuTemplate(sender_psid);
      await callSendAPI(sender_psid, response1);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};

let getMainMenuTemplate = (sender_psid) => {
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
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid} `,
                title: "ĐẶT BÀN",
                payload: "RESERVE_TABLE",
                webview_height_ratio: "tall",
                messenger_extensions: true,
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

let getLunchMenuTemplate = (sender_psid) => {
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
            title: "Cá hồi",
            subtitle: "Cá hồi áp chảo,Cháo cá hồi,Cá hồi nướng,Ruốc cá hồi...",
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
            title: "Vịt quay",
            subtitle: "Vịt Bắc Kinh,Vịt Tứ Xuyên,Vịt Quế Hoa Nam Kinh,...",
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

// function get menu
let getDinnerMenuTemplate = () => {
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
            title: "Cá hồi",
            subtitle: "Cá hồi áp chảo,Cháo cá hồi,Cá hồi nướng,Ruốc cá hồi...",
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
            title: "Vịt quay",
            subtitle: "Vịt Bắc Kinh,Vịt Tứ Xuyên,Vịt Quế Hoa Nam Kinh,...",
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
let handleViewAppetizers = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getDetailViewAppetizerTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailViewAppetizerTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Dưa hấu Nhật",
            subtitle: "500.000đ/1kg",
            image_url: IMG_DETAIL_APPETIZERS_1,
          },
          {
            title: "Xoài Việt Nam",
            subtitle: "300.000đ/1kg",
            image_url: IMG_DETAIL_APPETIZERS_2,
          },
          {
            title: "Ổi Nhật",
            subtitle: "200.000đ/1kg",
            image_url: IMG_DETAIL_APPETIZERS_3,
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
let getDetailViewSteakTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Bò bít tết kiểu Việt Nam",
            subtitle: "Giá : 200.000đ",
            image_url: IMG_DETAIL_MEAT_1,
          },
          {
            title: "Bò bít tết kiểu Mỹ",
            subtitle: "Giá : 300.000đ",
            image_url: IMG_DETAIL_MEAT_2,
          },
          {
            title: "Bò bít tết sốt phô mai",
            subtitle: "Giá : 600.000đ",
            image_url: IMG_DETAIL_MEAT_3,
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
let getDetailViewCaHoiTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Cá hồi áp chảo",
            subtitle: "Giá : 350.000đ",
            image_url: IMG_DETAIL_FISH_1,
          },
          {
            title: "Cháo cá hồi",
            subtitle: "Giá : 300.000đ",
            image_url: IMG_DETAIL_FISH_2,
          },
          {
            title: "Cá hồi nướng",
            subtitle: "Giá : 200.000đ",
            image_url: IMG_DETAIL_FISH_3,
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
let getDetailViewVitQuayTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Vịt Bắc Kinh",
            subtitle: "Giá : 500.000đ",
            image_url: IMG_DETAIL_DUCK_1,
          },
          {
            title: "Vịt Tứ Xuyên",
            subtitle: "Giá : 400.000đ",
            image_url: IMG_DETAIL_DUCK_2,
          },
          {
            title: "Vịt Quế Hoa Nam Kinh",
            subtitle: "Giá : 900.000đ",
            image_url: IMG_DETAIL_DUCK_3,
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

// funciton handle
let handleViewSteak = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getDetailViewSteakTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let handleViewCaHoi = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getDetailViewCaHoiTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let handleViewVitQuay = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getDetailViewVitQuayTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let handleBackMainMenu = async (sender_psid) => {
  await handleSendMainMenu(sender_psid);
};
let handleShowDetailRoom = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      //send an img
      let response1 = getImgRoomsTemplates(sender_psid);
      //send a button templates : text,button
      let response2 = getButtonRoomstemplates(sender_psid);
      // Thêm thời gian chờ để đảm bảo thứ tự
      await new Promise((resolve) => setTimeout(resolve, 500));
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
};
let getImgRoomsTemplates = () => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: IMG_DETAIL_ROOM,
        is_reusable: true,
      },
    },
  };
  return response;
};

let getButtonRoomstemplates = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Nhà hàng có thể phục tối đa 300 khách hàng",
        buttons: [
          {
            type: "postback",
            title: "MENU CHÍNH",
            payload: "MAIN_MENU",
          },
          {
            type: "web_url",
            url: `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
            title: "ĐẶT BÀN",
            payload: "RESERVE_TABLE",
            webview_height_ratio: "tall",
            messenger_extensions: true,
          },
        ],
      },
    },
  };
  return response;
};
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
  handleShowDetailRoom,
  callSendAPI,
  getUserName,
};
