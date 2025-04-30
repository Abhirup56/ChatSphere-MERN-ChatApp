import express from 'express';
import { getmsg, sendmsg } from '../controller/message.controller.js';
import secureRoute from '../midddleware/secureRoute.js';

const router = express.Router();

router.post("/send/:id",secureRoute, sendmsg);
router.get("/get/:id",secureRoute, getmsg);

export default router;
