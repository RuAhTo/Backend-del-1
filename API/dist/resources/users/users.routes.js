"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_ts_1 = require("../../middleware/verifyToken.ts");
// Import handlers  from users.controller.js
const users_controllers_js_1 = require("./users.controllers.js");
const router = express_1.default.Router();
// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.
// CRUD for users
router.get("/users", users_controllers_js_1.getUsers);
router.get("/users/:id", verifyToken_ts_1.verifyToken, users_controllers_js_1.getUser);
router.put("/users/:id", verifyToken_ts_1.verifyToken, users_controllers_js_1.updateUser);
router.post("/users", users_controllers_js_1.createUser);
router.delete("/users/:id", verifyToken_ts_1.verifyToken, users_controllers_js_1.deleteUser);
router.post("/login", users_controllers_js_1.loginUser);
exports.default = router;
