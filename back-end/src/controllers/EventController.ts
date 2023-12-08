import { Request, Response } from "express";
import { EditableEvent, Event } from "../database/types/Event";
import EventService from "../services/EventService";

async function createEvent(req: Request, res: Response) {
    try {
        const eventData: Event = req.body;

        const {type, message} = await EventService.createEvent(eventData);

        if (type) return res.status(type).send(message);

        return res.status(201).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function findOneEvent(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const numberId = Number(id);

        const {type, message} = await EventService.findOneEvent(numberId);

        if (type) return res.status(type).send(message);

        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function findAllEvents(req: Request, res: Response) {
    try {
        const {message} = await EventService.findAllEvents();

        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function editEvent(req: Request, res: Response) {
    try {
        const editEventInfo: EditableEvent = req.body;

        const {message} = await EventService.editEvent(editEventInfo);

        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteEvent(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const numberId = Number(id);

        const {message} = await EventService.deleteEvent(numberId);

        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};


export default {
    createEvent,
    findOneEvent,
    findAllEvents,
    editEvent,
    deleteEvent,
}