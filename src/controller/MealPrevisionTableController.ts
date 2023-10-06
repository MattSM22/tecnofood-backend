import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { isDate } from 'util/types';

export const MealPrevisionTableController = Router();

interface MealPrevisionTable {
  id?: string;
  student_rm: string;
  date_assignment: string;
}

const prisma = new PrismaClient({
  log: ["query"]
});

MealPrevisionTableController.post('/register', async (req, res) => {
  const body: MealPrevisionTable = req.body;
  const createRegister = await prisma.mealPrevisionTable.create({
    data: {
      student_rm: body.student_rm.trim(),
      date_assignment: body.date_assignment,
    }
  });

  if (!createRegister) {
    return res.status(406).send({ message: "There's an error on create register on list prevision, please check the data sent!" });
  } else {
    return res.status(200).send(createRegister);
  }
});

MealPrevisionTableController.get('/prevision', async (req, res) => {
  const listPrevision = await prisma.mealPrevisionTable.findMany();
  if (!listPrevision){
    return res.status(401).send({ message: "No have connection with Database or table please verify your connection!" })
  } else if (listPrevision.length === 0) {
    return res.status(400).send({ message: "No have records on this table, please make one record before use this route!" });
  } else {
    return res.status(200).send(listPrevision);
  }
});

MealPrevisionTableController.post('/prevision/date', async (req, res) => {
  const body: MealPrevisionTable = req.body;
  const previsionTableFiltered = await prisma.mealPrevisionTable.findMany({
    where: { date_assignment: body.date_assignment }

  });

  if (!previsionTableFiltered) {
    return res.status(401).send({ message: "No have connection with Database or table please verify your connection!" })
  } else if (previsionTableFiltered.length === 0) {
    return res.status(400).send({ message: "No have records on this table, please make one record before use this route!" });
  } else { 
    return res.status(200).send(previsionTableFiltered);
  }
});