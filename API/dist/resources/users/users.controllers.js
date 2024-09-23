"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
const connect_js_1 = require("./../../db/connect.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const [results] = yield connect_js_1.pool.execute(sql, params);
        return results;
    });
}
/**
 * @description Get all users
 * @route GET /users
 */
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield query("SELECT * FROM users");
            if (!result.length)
                return res.status(404).json({ message: "No users found" });
            res.status(200).json(result);
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
/**
 * @description Get user
 * @route GET /users/:id
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield query("SELECT * FROM users WHERE id = ?", [id]);
            if (!result.length)
                return res.status(404).json({ message: "User not found" });
            res.status(200).json(result[0]);
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
/**
 * @description Create user
 * @route POST /users/new
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, email } = req.body;
            // Check if user already exists
            const existingUser = yield query("SELECT id FROM users WHERE email = ?", [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ error: "User with this email already exists" });
            }
            // Krypterar lösenordet
            const saltRounds = 10;
            const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
            const result = yield query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email]);
            if (result.affectedRows < 1)
                return res.status(400).json({ error: "User not created!" });
            res.status(201).json({ id: result.insertId, message: "User created!", username: username });
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
/**
 * @description Update user
 * @route PUT /users/:id
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { username, password, email } = req.body;
            // Krypterar lösenordet
            const saltRounds = 10;
            const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
            const result = yield query("UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?", [username, hashedPassword, email, id]);
            if (result.affectedRows < 1)
                return res.status(404).json({ error: "User not updated!" });
            res.status(200).json({ message: "User updated!" });
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
/**
 * @description Update user
 * @route DELETE /users/:id
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield query("DELETE FROM users WHERE id = ?", [id]);
            if (result.affectedRows < 1)
                return res.status(404).json({ error: "User not deleted!" });
            res.status(200).json({ message: "User deleted!" });
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
//Log In User
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const result = yield query("SELECT * FROM users WHERE username = ?", [username]);
            const user = result[0];
            if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
                return res.status(401).json({ error: "invalid username or password" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Login failed!" });
        }
    });
}
