"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AdmController_1 = require("./controller/AdmController");
const StudentController_1 = require("./controller/StudentController");
const MealController_1 = require("./controller/MealController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/adm', AdmController_1.admController);
app.use('/student', StudentController_1.studentController);
app.use('/meal', MealController_1.MealController);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Server is running on port: " + PORT);
});
