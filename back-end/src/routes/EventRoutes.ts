import { Router } from "express";
import EventController from "../controllers/EventController";

const eventRouter = Router();

eventRouter.post('/create', EventController.createEvent);
eventRouter.get('/find/:id', EventController.findOneEvent);
eventRouter.get('/all', EventController.findAllEvents);
eventRouter.put('/edit', EventController.editEvent);
eventRouter.delete('/delete/:id', EventController.deleteEvent);

export default eventRouter;