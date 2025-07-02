import api from './index'

export async function getHealthEntries() {
    const response = await api.get('/health-entries')
    return response.data
}

export async function createHealthEntry(data: any) {
    const response = await api.post('/health-entries', data)
    return response.data
}
