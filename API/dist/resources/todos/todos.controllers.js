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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.updatePartialTodo = updatePartialTodo;
const connect_js_1 = require("./../../db/connect.js");
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const [results] = yield connect_js_1.pool.execute(sql, params);
        return results;
    });
}
//GET todos
function getTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield query("SELECT * FROM todos");
            if (!result.length)
                return res.status(404).json({ message: "No todos found" });
            res.status(200).json(result);
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
//POST todos
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, content, color, status } = req.body;
            const result = yield query("INSERT INTO todos (title, content, color, status) VALUES (?, ?, ?, ?)", [title, content, color, status]);
            if (result.affectedRows < 1)
                return res.status(400).json({ error: "User not created!" });
            res.status(201).json({ id: result.insertId, message: "Todo created!", title: title, status: status });
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
//Update todo
function updateTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, content, color, status } = req.body;
            const result = yield query("UPDATE todos SET title = ?, content = ?, color = ?, status = ? WHERE id = ?", [title, content, color, status, id]);
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
function updatePartialTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { status } = req.body; // Endast status skickas i requesten
        try {
            // Uppdatera endast statusfältet i databasen
            const result = yield query("UPDATE todos SET status = ? WHERE id = ?", [status, id]);
            if (result.affectedRows < 1)
                return res.status(404).json({ error: "Todos status not update!" });
            res.status(200).json({ message: "Status updated!" });
        }
        catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: "Database query failed!" });
        }
    });
}
;
