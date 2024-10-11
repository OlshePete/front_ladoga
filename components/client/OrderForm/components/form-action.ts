'use server'

import { newOrderNotificationBot } from "../../../../services/bot"
import { wrappedAddCustomer, wrappedAddOrder } from "../../../../services/getOrders"
import { INewUser } from "../../ClientOrderForm/OrderForm"
import { IFromData } from "../OrderForm"


export async function AddOrder(data:IFromData) {
     const request = await wrappedAddOrder(data as IFromData)
     const notice = request ? await newOrderNotificationBot(request) :null
     console.log('bot-notice', notice)
    return request
}

export async function AddCallbackCustomer (customer:INewUser) {
    const new_customer = wrappedAddCustomer(customer)
    return !('error' in new_customer )
}