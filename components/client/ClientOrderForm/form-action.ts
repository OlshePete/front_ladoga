'use server'

import { wrappedAddOrder } from "../../../services/getOrders";
import { IFromData } from "./OrderForm";

export async function AddOrder <T extends {} = IFromData>(data:T) {
     const request = await wrappedAddOrder(data)
    return request
}
