import type { StudentType } from "@/type"
import { defineStore } from "pinia"
export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teacher: null as StudentType | null
    }),
    actions: {
        setEvent(teacher: StudentType) {
            this.teacher = teacher
        }
    }
})