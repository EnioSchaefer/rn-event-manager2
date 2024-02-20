import UserEventModel from "../database/models/UserEventModel";
import UserModel from "../database/models/UserModel";
import { ApiResponse } from "../database/types/ApiResponse";
import { UserEvent } from "../database/types/UserEvent";
import createQRCode from "../utils/qrCode";

async function createUserEvent(userId: number, eventId: number): Promise<ApiResponse> {
    const userDB = await UserModel.findByPk(userId);

    const qrCodeData = {userId, eventId, email: userDB?.email};
    const qrCode = await createQRCode(qrCodeData);

    const userEventData: UserEvent = {userId, eventId, qrCode, used: false};

    await UserEventModel.create(userEventData);

    return {type: null, message: qrCode}
};

async function findUserEvent(userId: number, eventId: number): Promise<ApiResponse> {
    const userEventDB = await UserEventModel.findOne({where: {userId, eventId}});

    if (!userEventDB) return ({type: 404, message: 'No user event found'});

    return ({type: null, message: userEventDB});
};

async function findAllEventsByUser(userId: number): Promise<ApiResponse> {
    const eventsDB = await UserEventModel.findAll({where: {userId}});

    if (!eventsDB) return ({type: 404, message: 'There are no events registered in this account'});

    return ({type: null, message: eventsDB});
};

async function findAllUsersByEvent(eventId: number): Promise<ApiResponse> {
    const usersDB = await UserEventModel.findAll({where: {eventId}});

    if (!usersDB) return ({type: 404, message: 'There are no users registered in this event'});

    return ({type: null, message: usersDB});
};

async function findQrCode(userId: number, eventId: number): Promise<ApiResponse> {
    const userEventDB = await UserEventModel.findOne({where: {userId, eventId}});

    if (!userEventDB) return ({type: 404, message: 'Error: QR code not found'});

    const qrCode = userEventDB?.qrCode;

    return ({type: null, message: qrCode});
};

async function findUsedQrCodes(eventId: number): Promise<ApiResponse> {
    const usedQrCodes = await UserEventModel.findAll({where: {eventId, used: true}});

    if (!usedQrCodes) return ({type: 404, message: 'There are not any activated codes for this event'});

    return ({type: null, message: {count: usedQrCodes.length, data: usedQrCodes}});
};

async function findUnusedQrCodes(eventId: number): Promise<ApiResponse> {
    const unusedQrCodes = await UserEventModel.findAll({where: {eventId, used: false}});

    if (!unusedQrCodes) return ({type: 404, message: 'All of the QR codes generated were used in the event'});

    return ({type: null, message: {count: unusedQrCodes.length, data: unusedQrCodes}});
};

async function updateUserEventUsed(userId: number, eventId: number): Promise<ApiResponse> {
    const userEventDB = await UserEventModel.findOne({where: {userId, eventId}});

    userEventDB?.update({used: !userEventDB.used});

    return ({type: null, message: 'Ok'});
};

async function deleteUserEvent(userId: number, eventId: number): Promise<ApiResponse> {
    await UserEventModel.destroy({where: {userId, eventId}});

    return ({type: null, message: 'Ticket deleted'});
}

export default {
    createUserEvent,
    findUserEvent,
    findAllEventsByUser,
    findAllUsersByEvent,
    findQrCode,
    findUsedQrCodes,
    findUnusedQrCodes,
    updateUserEventUsed,
    deleteUserEvent,
};