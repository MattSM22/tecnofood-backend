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
exports.MealController = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const pdfmake_1 = __importDefault(require("pdfmake"));
exports.MealController = (0, express_1.Router)();
const prisma = new client_1.PrismaClient({
    log: ["query"]
});
exports.MealController.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const studentExists = yield prisma.student.findMany({
        where: {
            rm_aluno: body.student_rm
        },
    });
    if (studentExists) {
        const createMeal = yield prisma.meal.create({
            data: body
        });
        if (createMeal) {
            return res.status(200).send(createMeal);
        }
        else {
            return res.status(400).send({ message: "An error ocurred on creation meal!" });
        }
    }
    else {
        return res.status(400).send({ message: "Student not found on database!" });
    }
}));
exports.MealController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const selectAllMeal = yield prisma.meal.findMany({
        include: {
            Student: {
                select: {
                    id: true,
                    rm_aluno: true,
                    nome_aluno: true,
                    modulo_aluno: true,
                    curso_aluno: true,
                    turno_aluno: true,
                    _count: true
                }
            }
        }
    });
    if (selectAllMeal) {
        return res.status(200).send(selectAllMeal);
    }
    else {
        return res.status(400).send({ message: "Don't have any record of meal!" });
    }
}));
exports.MealController.get("/report", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const Meals = yield prisma.meal.findMany({
        include: {
            Student: {
                select: {
                    id: true,
                    rm_aluno: true,
                    nome_aluno: true,
                    modulo_aluno: true,
                    curso_aluno: true,
                    turno_aluno: true,
                    _count: true
                }
            }
        }
    });
    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        },
    };
    const printer = new pdfmake_1.default(fonts);
    const body = [];
    try {
        for (var _d = true, Meals_1 = __asyncValues(Meals), Meals_1_1; Meals_1_1 = yield Meals_1.next(), _a = Meals_1_1.done, !_a;) {
            _c = Meals_1_1.value;
            _d = false;
            try {
                let meal = _c;
                const rows = new Array();
                rows.push(meal.Student.rm_aluno);
                rows.push(meal.Student.nome_aluno);
                rows.push(meal.Student.curso_aluno);
                rows.push(meal.Student.turno_aluno);
                rows.push(meal.data_refeicao.toString());
                rows.push(meal.qtd_refeicao);
                body.push(rows);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = Meals_1.return)) yield _b.call(Meals_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    ;
    const docDefinitions = {
        defaultStyle: { font: "Helvetica" },
        header: [{ text: "Relatório de Refeições", alignment: 'center', marginTop: 20, marginBottom: 30 }],
        content: [{
                layout: 'lightHorizontalLines',
                table: {
                    body: [
                        ["RM do Aluno", "Nome do Aluno", "Curso do aluno", "Turno do aluno", "Data da refeição", "Quantidade fornecida"],
                        ...body
                    ],
                }
            }],
        footer: [{ text: "São Paulo, SP - Brasil", alignment: 'center' }]
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    const chunks = [];
    pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
    });
    pdfDoc.pipe(fs_1.default.createWriteStream("Relatório.pdf"));
    pdfDoc.end();
    pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        console.log(result);
        return res.end(result);
    });
    res.send("Relatório concluido!");
}));
