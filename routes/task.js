import express  from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getMyTask } from '../controllers/task.js';
import { UpdateTask } from '../controllers/task.js';
import { DeleteTask } from '../controllers/task.js';
import { newTask } from '../controllers/task.js';

const router = express.Router();

router.post("/new/tasks",isAuthenticated,newTask)
router.get("/my/tasks",isAuthenticated,getMyTask)
router.route("/change/:id").put(isAuthenticated,UpdateTask).delete(isAuthenticated,DeleteTask)

export default router