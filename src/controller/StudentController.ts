import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";

import readline from 'readline';
import multer from "multer";

export const studentController = Router();
const multerConfig = multer();

const prisma = new PrismaClient({
  log: ["query"]
});

interface StudentTypes {
  id?: string | any;
  rm_aluno: string | any;
  nome_aluno: string;
  modulo_aluno: string;
  curso_aluno: string;
  turno_aluno: string;
  meal?: []
}

studentController.get("/", async (req, res) => {
  const findAllStudents = await prisma.student.findMany();
  if (!findAllStudents) {
    return res.status(401).send({ message: "Error on search student." });
  } else if (findAllStudents.length == 0) {
    return res
      .status(400)
      .send({ message: "Have no data in student table." });
  } else {
    return res.status(200).send(findAllStudents);
  }
});

studentController.get("/:id", async (req, res) => {
  const idStudent: string = req.params.id;
  const findOneStudent = await prisma.student.findUnique({
    where: {
      id: idStudent
    }, 
  })

  if (!findOneStudent){
    return res.status(401).send({ message: "Error on search student." });
  } else {
    return res.status(200).send(findOneStudent);
  }
});

studentController.post("/create", async (req, res) => {
  const body: StudentTypes = req.body;
  const creatingStudent = await prisma.student.create({
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
  } else {
    return res.send(creatingStudent);
  }
});

studentController.post("/create/csv", multerConfig.single('file'), async (req, res) => {
  const file = req.file;
  const { buffer }: any = file;

  const ReadableFile = new Readable();
  ReadableFile.push(buffer);
  ReadableFile.push(null);

  const studentLine = readline.createInterface({
    input: ReadableFile
  });

  const students: StudentTypes[] = [];

  for await (let line of studentLine) {
    const studentLineSplit = line.split(",");
    students.push({
      rm_aluno: studentLineSplit[0],
      nome_aluno: studentLineSplit[1].toUpperCase(),
      modulo_aluno: studentLineSplit[2].toUpperCase(),
      curso_aluno: studentLineSplit[3].toUpperCase(),
      turno_aluno: studentLineSplit[4].toUpperCase()
    });
  }

  const studentsResult = await prisma.student.createMany({
    data: students
  })

  return res.send(studentsResult);
});

studentController.put("/update/:id", async (req, res) => {
  const idStudent: string = req.params.id;
  const student: StudentTypes = req.body;

  const studentUpdated = await prisma.student.update({
    data: {
      rm_aluno: student.rm_aluno,
      nome_aluno: student.nome_aluno,
      modulo_aluno: student.modulo_aluno,
      curso_aluno: student.curso_aluno,
      turno_aluno: student.turno_aluno
    },
    where: {
      id: idStudent
    }
  });

  if (!studentUpdated){
    return res.status(400).send({ message: "An error occured on update!" });
  } else {
    return res.status(200).send(studentUpdated);
  }
});

studentController.delete("/delete/:id", async (req, res) => {
  const idStudent: string = req.params.id;
  const studentDeleted = await prisma.student.delete({
    where: {
      id: idStudent
    }
  });

  if (!studentDeleted){
    return res.status(401).send({ message: "An error occured on delete" });
  } else {
    return res.status(200).send(studentDeleted);
  }
});
