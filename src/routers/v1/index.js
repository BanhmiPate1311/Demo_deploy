// Routers V1
const express = require("express");
const userController = require("../../controllers/user.controller");
const restaurantController = require("../../controllers/restaurant.controller");
const authController = require("../../controllers/auth.controller");
const uploadController = require("../../controllers/upload.controller");
const authorization = require("../../middleware/authorization");
const requiredRole = require("../../middleware/requireRole");
const upload = require("../../middleware/upload");

// const foodController = require("../../controllers/food.controller");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho users
v1.get("/users", userController.getUsers());
v1.get("/users/:id", userController.getUserByID());
v1.post("/users", userController.createUser());
v1.put("/users/:id", userController.updateUser());
v1.delete("/users/:id", userController.deleteUser());

// Định nghĩa các routers cho restaurants
v1.get("/restaurants", restaurantController.getRestaurants());
v1.post(
  "/restaurants",
  authorization,
  requiredRole("merchant", "admin"),
  restaurantController.createRestaurant()
);
v1.delete(
  "/restaurants/:id",
  authorization,
  restaurantController.deleteRestaurant()
);
v1.post(
  "/restaurants/:restaurantId/like",
  authorization,
  restaurantController.likeRestaurant()
);
// Định nghĩa các routers cho foods
// v1.get("/restaurants/:restaurantId/foods", foodController.getFoods());
// v1.post("/users", userController.createUser());

// Định nghĩa các routers cho auth
v1.post("/login", authController.login());
v1.get("/profiles", authorization, authController.getProfile());

// Định nghĩa các routers cho upload
v1.post("/upload", upload.single("file"), uploadController.upload());

module.exports = v1;
