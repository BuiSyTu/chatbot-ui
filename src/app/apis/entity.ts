import axios from 'axios'

import { Entity } from '../models'

const controllerName = 'entities'
const baseUrl = `http://127.0.0.1:8000/api/${controllerName}`

const getAll = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}`,
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error?.response)
        return null
    }
}

const add = async (data: Entity) => {
    try {
        const res = await axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: baseUrl,
            data,
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const getById = async (id: string) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/${id}`,
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const update = async (id: string, data: Entity) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${baseUrl}/${id}`,
            data,
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error?.response)
        return null
    }
}

const _delete = async (id: string) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${baseUrl}/${id}`,
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}


export const entityApi = {
    getAll,
    add,
    getById,
    update,
    delete: _delete,
}
