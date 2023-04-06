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
exports.admController = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
exports.admController = (0, express_1.Router)();
;
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
exports.admController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findAll = yield prisma.adm.findMany();
    if (findAll.length === 0) {
        return res.status(400).send({ message: "Error searching for administrators." });
    }
    else {
        return res.status(200).send(findAll);
    }
}));
exports.admController.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createAdm = yield prisma.adm.create({
        data: {
            id: undefined,
            login_adm: body.login_adm.toUpperCase(),
            senha_adm: body.senha_adm.toUpperCase(),
            super_user: body.super_user,
        }
    });
    if (!createAdm) {
        return res.status(406).send({ message: "There was an error creating an administrator." });
    }
    else {
        return res.status(200).send(createAdm);
    }
}));
exports.admController.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAdm = req.params.id;
    const body = req.body;
    const updateAdm = yield prisma.adm.update({
        where: {
            id: idAdm,
        },
        data: {
            login_adm: body.login_adm.toUpperCase(),
            senha_adm: body.senha_adm.toUpperCase(),
            super_user: body.super_user,
        }
    });
    if (!updateAdm) {
        return res.status(400).send({ message: "An error occurred while updating admin data." });
    }
    else {
        return res.status(200).send(updateAdm);
    }
}));
exports.admController.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAdm = req.params.id;
    const deletedAdm = yield prisma.adm.deleteMany({
        where: {
            AND: {
                id: idAdm,
                super_user: false,
            }
        }
    });
    if (!deletedAdm) {
        return res.status(400).send({ message: "An error occurred while deleting administrator data." });
    }
    else if (deletedAdm.count < 1) {
        return res
            .status(400)
            .send({ message: "Verifique se o administrador selecionado para exclusão é do tipo super usuário, caso for peça ao suporte para que realize a alteração ou exclusão do administrador caso necessário!" });
    }
    else {
        return res.status(200).send({ message: "Check if the selected administrator is a super user, if so, contact support to proceed with the deletion." });
    }
}));
