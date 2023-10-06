import express from 'express'
import cors from 'cors';
import { AdmController } from './controller/AdmController';
import { StudentController } from './controller/StudentController';
import { MealController } from './controller/MealController';
import { MealPrevisionTableController } from './controller/MealPrevisionTableController';
import { MenuController } from './controller/MenuController';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/adm', AdmController);
app.use('/student', StudentController);
app.use('/meal', MealController);
app.use('/list', MealPrevisionTableController);
app.use('menu', MenuController);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("🚀 Server is running on port: " + PORT)
});