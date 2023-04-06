import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export const admController = Router();

interface AdminTypes {
  id?: string | undefined;
  login_adm: string;
  senha_adm: string;
  super_user: boolean;
};

const prisma = new PrismaClient({
  log: ['query'],
});

admController.get("/", async (req, res) => {
  const findAll = await prisma.adm.findMany();
  if (findAll.length === 0) {
    return res.status(400).send({message: "Error searching for administrators."});
  } else {
    return res.status(200).send(findAll);
  }
});

admController.post("/create", async (req, res) => {
  const body: AdminTypes = req.body;
  const createAdm = await prisma.adm.create({
    data: {
      id: undefined,
      login_adm: body.login_adm.toUpperCase(),
      senha_adm: body.senha_adm.toUpperCase(),
      super_user: body.super_user,
    }
  });

  if (!createAdm) {
    return res.status(406).send({ message: "There was an error creating an administrator." });
  } else {
    return res.status(200).send(createAdm);
  }
});

admController.put("/update/:id", async (req, res) => {
  const idAdm = req.params.id;
  const body: AdminTypes = req.body;
  const updateAdm = await prisma.adm.update({
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
  } else {
    return res.status(200).send(updateAdm);
  }
});

admController.delete("/delete/:id", async (req, res) => {
  const idAdm = req.params.id;
  const deletedAdm = await prisma.adm.deleteMany({
    where: {
      AND: {
        id: idAdm,
        super_user: false,
      }
    }
  });

  if (!deletedAdm) {
    return res.status(400).send({ message: "An error occurred while deleting administrator data." });
  } else if (deletedAdm.count < 1) {
    return res
      .status(400)
      .send({ message: "Verifique se o administrador selecionado para exclusão é do tipo super usuário, caso for peça ao suporte para que realize a alteração ou exclusão do administrador caso necessário!" });
  } else {
    return res.status(200).send({ message: "Check if the selected administrator is a super user, if so, contact support to proceed with the deletion." });
  }
});