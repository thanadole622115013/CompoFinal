import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentType } from '@/type'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3004',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvent(perPage: number, page: number): Promise<AxiosResponse<StudentType[]>> {
        return apiClient.get<StudentType[]>('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEventById(id: number): Promise<AxiosResponse<StudentType>>{
        return apiClient.get<StudentType>('events/' + id.toString())
    },
    getTeacher(perPage: number, page: number): Promise<AxiosResponse<StudentType[]>> {
        return apiClient.get<StudentType[]>('/teachers?_limit=' + perPage + '&_page=' + page)
    },
    getTeacherById(id: number): Promise<AxiosResponse<StudentType>>{
        return apiClient.get<StudentType>('teachers/' + id.toString())
    },
    postStudent(id: number): Promise<AxiosResponse<StudentType>>{
        return apiClient.get<StudentType>('events/' + id.toString())
    },
}
