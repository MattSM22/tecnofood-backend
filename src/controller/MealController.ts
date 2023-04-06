import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
import PdfPrinter from 'pdfmake';


export const MealController = Router();
const prisma = new PrismaClient({
  log: ["query"]
});

interface MealTypes {
  id?: string;
  student_rm: string;
  data_refeicao: Date | null | any | undefined | unknown;
  qtd_refeicao: number;
}

MealController.post("/create", async (req, res) => {
  const body: MealTypes = req.body;
  const studentExists = await prisma.student.findMany({
    where: {
      rm_aluno: body.student_rm
    },
  });

  if (studentExists) {
    const createMeal = await prisma.meal.create({
      data: body
    });

    if (createMeal) {
      return res.status(200).send(createMeal);
    } else {
      return res.status(400).send({ message: "An error ocurred on creation meal!" })
    }
  } else {
    return res.status(400).send({ message: "Student not found on database!" });
  }
});

MealController.get("/", async (req, res) => {
  const selectAllMeal = await prisma.meal.findMany({
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
  } else {
    return res.status(400).send({ message: "Don't have any record of meal!" });
  }
});

MealController.get("/report", async (req, res) => {
  const Meals = await prisma.meal.findMany({
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

  const printer = new PdfPrinter(fonts);
  const body = [];

  for await (let meal of Meals) {
    const rows = new Array();
    rows.push(meal.Student.rm_aluno);
    rows.push(meal.Student.nome_aluno);
    rows.push(meal.Student.curso_aluno);
    rows.push(meal.Student.turno_aluno);
    rows.push(meal.data_refeicao.toString());
    rows.push(meal.qtd_refeicao);

    body.push(rows);
  };

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Helvetica" },
    header: [{text: "Relatório de Refeições", alignment: 'center', marginTop: 20, marginBottom: 30}],
    content: [{
      layout: 'lightHorizontalLines',
      table: {
        body: [
          ["RM do Aluno", "Nome do Aluno", "Curso do aluno", "Turno do aluno", "Data da refeição", "Quantidade fornecida"],
          ...body
        ],
      }
    }],
    footer: [{text: "São Paulo, SP - Brasil", alignment: 'center'}]
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);
  const chunks: any[] = [];
  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.pipe(fs.createWriteStream("Relatório.pdf"))

  pdfDoc.end();
  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);
    console.log(result);
    return res.end(result);
  });

  res.send("Relatório concluido!");
});