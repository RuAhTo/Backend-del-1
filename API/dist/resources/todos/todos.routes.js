"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import handlers  from users.controller.js
const todos_controllers_js_1 = require("./todos.controllers.js");
const router = express_1.default.Router();
// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.
// CRUD for users
router.get("/todos", todos_controllers_js_1.getTodos);
router.post("/todos", todos_controllers_js_1.createTodo);
router.put("/todos/:id", todos_controllers_js_1.updateTodo);
router.patch("/todos/:id", todos_controllers_js_1.updatePartialTodo);
exports.default = router;
