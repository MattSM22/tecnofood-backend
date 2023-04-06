"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdmController_1 = require("./controller/AdmController");
const StudentController_1 = require("./controller/StudentController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/adm', AdmController_1.admController);
app.use('/student', StudentController_1.studentController);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Server is running on port: " + PORT);
});
