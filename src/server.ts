import express from 'express'
import cors from 'cors';
import { admController } from './controller/AdmController';
import { studentController } from './controller/StudentController';
import { MealController } from './controller/MealController';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/adm', admController);
app.use('/student', studentController);
app.use('/meal', MealController);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("🚀 Server is running on port: " + PORT)
});