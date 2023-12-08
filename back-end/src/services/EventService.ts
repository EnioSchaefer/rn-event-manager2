import EventModel from "../database/models/EventModel";
import { ApiResponse } from "../database/types/ApiResponse";
import { EditableEvent, Event } from "../database/types/Event";

async function createEvent(eventData: Event): Promise<ApiResponse> {
    const eventDB = await EventModel.findOne({where: {name: eventData.name, status: true}});

    if (eventDB) return ({type: 409, message: 'There is already an event registered by the same name'});
    await EventModel.create(eventData);

    return ({type: null, message: 'Event created'});
};

async function findOneEvent(eventId: number): Promise<ApiResponse> {
    const eventDB = await EventModel.findByPk(eventId);

    if (!eventDB) return ({type: 404, message: 'Event not found'});

    return ({type: 200, message: eventDB});
};

async function findAllEvents(): Promise<ApiResponse> {
    const eventsDB = await EventModel.findAll();

    return ({type: 200, message: eventsDB});
}

async function editEvent(eventEditInfo: EditableEvent): Promise<ApiResponse> {
    const eventDB = await EventModel.findOne({where: {id: eventEditInfo.id}});

    await eventDB!.update({...eventEditInfo});

    return ({type: null, message: "Changes saved"})
};

async function deleteEvent(eventId: number): Promise<ApiResponse> {
    await EventModel.destroy({where: {id: eventId}});

    return ({type: null, message: 'Event deleted'})
};

export default {
    createEvent,
    findOneEvent,
    findAllEvents,
    editEvent,
    deleteEvent,
};