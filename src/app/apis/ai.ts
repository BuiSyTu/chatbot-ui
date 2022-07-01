import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api'

const training = async () => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${baseUrl}/training`,
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error?.response)
        return null
    }
}

const test = async (sentence: string) => {
    try {
        const res = await axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${baseUrl}/test_nlp`,
            data: {
                sentence,
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

export const aiApi = {
    training,
    test,
}
