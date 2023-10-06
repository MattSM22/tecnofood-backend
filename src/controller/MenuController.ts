import { Router } from 'express';
import { Menu, PrismaClient } from '@prisma/client';

export const MenuController = Router();

const prisma = new PrismaClient({
  log: ["query"]
});

interface MenuTypes {
  id ?: string;
  base_plate: string;
  principal_entrance: string;
  guarnich: string;
  fruit_salad: string;
  calories: string;
  date: string;
  weekday: string;
}

MenuController.post("/create", async (req, res) => {
  const body: MenuTypes = req.body;
  const createNewMenu = await prisma.menu.create({
    data: {
      base_plate: body.base_plate,
      principal_entrance: body.principal_entrance,
      guarnich: body.guarnich,
      fruit_salad: body.fruit_salad,
      calories: body.calories,
      date: body.date,
      weekday: body.weekday
    }
  });
  
  if (!createNewMenu) {
    return res.status(406).send({ message: "An error occured on creation of menu!" });
  } else {
    return res.status(200).send(createNewMenu);
  }
});

MenuController.get('/list', async (req, res) => {
  const MenuListComplete = await prisma.menu.findMany();

  if(!MenuListComplete) {
    return res.status(401).send({ message: "No have connection with Database or table please verify your connection!" });
  } else if (MenuListComplete.length == 0) {
    return res.status(400).send({ message: "No have records on this table, please make one record before use this route!" });
  } else {
    return res.status(200).send(MenuListComplete);
  }
});

MenuController.put("/update", async (req, res) => {
  const body: MenuTypes = req.body;

  const UpdatingMenu = await prisma.menu.update({
    data: {
      base_plate: body.base_plate,
      principal_entrance: body.principal_entrance,
      guarnich: body.guarnich,
      fruit_salad: body.fruit_salad,
      calories: body.calories,
      date: body.date,
      weekday: body.weekday
    },
    where: {
      id_cardapio: body.id
    }
  });

  if (!UpdatingMenu) {
    return res.status(401).send({ message: "No have connection with Database or table please verify your connection!" });
  } else {
    return res.status(200).send(UpdatingMenu);
  }
});

MenuController.delete("/delete/:id", async (req, res) => {
  const idMenu = req.params.id;
  const DeletingRowOnDatabase = await prisma.menu.delete({
    where: {
      id_cardapio: idMenu
    }
  });

  if (!DeletingRowOnDatabase) {
    return res.status(401).send({ message: "No have connection with Database or table please verify your connection!" });
  } else {
    return res.status(200).send(DeletingRowOnDatabase);
  }
});