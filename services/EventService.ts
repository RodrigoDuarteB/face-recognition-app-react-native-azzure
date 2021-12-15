import { Event } from "../models/Event";
import { saveDataToCollection } from "./Service";

export const saveEvent = async (event: Event) => {
    await saveDataToCollection('events', event)
}