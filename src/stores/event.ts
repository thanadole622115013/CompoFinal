import type { StudentType } from "@/type"
import { defineStore } from "pinia"
export const useEventStore = defineStore('event', {
    state: () => ({
        event: [] as StudentType[]
    }),
    actions: {
        setEvent(event: StudentType[]) {
            this.event = event
        }
    }
})