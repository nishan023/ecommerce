import prisma from '../libs/prisma'
import { ShopOrder } from '@prisma/client'

export const create = async (order: ShopOrder) => {
    return await prisma.shopOrder.create({
        data: order,
    })
}

export const get = async () => {
    return await prisma.shopOrder.findMany({
        select: { id: true, order_date: true },
    })
}

export const getById = async (id: number) => {
    return await prisma.shopOrder.findMany({
        select: { id: true, order_date: true },
        where: { id },
    })
}

export const remove = async (id: number) => {}

export const update = async (id: number, order: any) => {}