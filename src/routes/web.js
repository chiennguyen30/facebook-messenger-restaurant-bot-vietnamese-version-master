import express from "express";
import homeController from "../controllers/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  //setup get start button whitelisted domain
  router.post("/setup-profile", homeController.postSetupProfile);
  //setup persistent menu
  router.post("/setup-persistent-menu", homeController.postSetuppersistentMenu);

  router.post("/webhook", homeController.postWebhook);
  router.get("/webhook", homeController.getWebhook);
  router.get("/reserve-table/:senderId", homeController.handleReserveTable);
  router.post("/reserve-table-ajax", homeController.handlePostReserveTable);

  return app.use("/", router);
};

module.exports = initWebRoutes;
