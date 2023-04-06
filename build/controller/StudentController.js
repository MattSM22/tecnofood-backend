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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const stream_1 = require("stream");
const readline_1 = __importDefault(require("readline"));
const multer_1 = __importDefault(require("multer"));
exports.studentController = (0, express_1.Router)();
const multerConfig = (0, multer_1.default)();
const prisma = new client_1.PrismaClient({
    log: ["query"]
});
exports.studentController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findAllStudents = yield prisma.student.findMany();
    if (!findAllStudents) {
        return res.status(401).send({ message: "Error on search student." });
    }
    else if (findAllStudents.length == 0) {
        return res
            .status(400)
            .send({ message: "Have no data in student table." });
    }
    else {
        return res.status(200).send(findAllStudents);
    }
}));
exports.studentController.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const creatingStudent = yield prisma.student.create({
        data: {
            rm_aluno: body.rm_aluno,
            nome_aluno: body.nome_aluno.toUpperCase(),
            modulo_aluno: body.modulo_aluno.toUpperCase(),
            curso_aluno: body.curso_aluno.toUpperCase(),
            turno_aluno: body.turno_aluno.toUpperCase(),
        }
    });
    if (!creatingStudent) {
        return res.status(400).send({ message: "An error has occured on creating student." });
    }
    else {
        return res.send(creatingStudent);
    }
}));
exports.studentController.post("/create/csv", multerConfig.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const file = req.file;
    const { buffer } = file;
    const ReadableFile = new stream_1.Readable();
    ReadableFile.push(buffer);
    ReadableFile.push(null);
    const studentLine = readline_1.default.createInterface({
        input: ReadableFile
    });
    const students = [];
    try {
        for (var _d = true, studentLine_1 = __asyncValues(studentLine), studentLine_1_1; studentLine_1_1 = yield studentLine_1.next(), _a = studentLine_1_1.done, !_a;) {
            _c = studentLine_1_1.value;
            _d = false;
            try {
                let line = _c;
                const studentLineSplit = line.split(",");
                students.push({
                    rm_aluno: studentLineSplit[0],
                    nome_aluno: studentLineSplit[1],
                    modulo_aluno: studentLineSplit[2],
                    curso_aluno: studentLineSplit[3],
                    turno_aluno: studentLineSplit[4]
                });
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = studentLine_1.return)) yield _b.call(studentLine_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const studentsResult = yield prisma.student.createMany({
        data: students
    });
    return res.send(studentsResult);
}));
exports.studentController.put("/update/:rm", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rmStudent = req.params.rm;
    const student = req.body;
    const studentUpdated = yield prisma.student.update({
        where: {
            rm_aluno: student.rm_aluno
        },
        data: {
            rm_aluno: student.rm_aluno,
            nome_aluno: student.nome_aluno,
            modulo_aluno: student.modulo_aluno,
            curso_aluno: student.curso_aluno,
            turno_aluno: student.turno_aluno
        }
    });
}));
