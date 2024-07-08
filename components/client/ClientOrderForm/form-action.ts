'use server'

import { newOrderNotificationBot } from "../../../services/bot";
import { wrappedAddOrder } from "../../../services/orders";
import { IFromData } from "./OrderForm";

export async function AddOrder <T extends {} = IFromData>(data:T) {
     const request = await wrappedAddOrder(data)
     const notice = request ? await newOrderNotificationBot(request) :null
     console.log('bot-notice', notice)
    return request
}
