import { Request, Response } from "express";
import { UserEvent, QrCodeData } from "../database/types/UserEvent";
import UserEventService from "../services/UserEventService";

async function createUserEvent(req: Request, res: Response) {
    try {
        const {userId, eventId} = req.body;

        const {message} = await UserEventService.createUserEvent(userId, eventId);

        const stringQrCode = message.toString();

        return res.status(201).send(stringQrCode);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function findUserEvent(req: Request, res: Response) {
    try {
        const {userId, eventId} = req.body;

        const {type, message} = await UserEventService.findUserEvent(userId, eventId);

        if (type) return res.status(type).send(message);

        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default {
    createUserEvent,

};