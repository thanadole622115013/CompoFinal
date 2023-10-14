<template>
    <RouterLink class="event-link" :to="{ name: 'teacher-detail', params: { id: teacher?.id } }">

        <ul role="list" class="divide-y divide-gray-100">
            
            <li class="flex justify-between gap-x-96 py-5">
                <div class="flex min-w-0 gap-x-4">
                    <img class="overflow-hidden h-24 w-24 flex-none rounded-full bg-gray-50" :src="teacher?.teacherimgLink" alt="" />
                    <div class="min-w-0 flex-auto">
                        
                        <p class="text-sm font-semibold leading-6 text-gray-900 pt-3 pl-4 ml-8">{{ teacher?.teacherName + " " + teacher?.teacherSurname}}</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500 pl-4 ml-8">CMU</p>
                    </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p class="text-sm leading-6 text-gray-900">Teacher</p>
                    <p class="mt-1 text-xs leading-5 text-gray-500">
                        {{ teacher?.id }}
                    </p>
                    
                </div>
            </li>
            <br>
        </ul>

    </RouterLink>
</template>

<script setup lang="ts">
import { type StudentType } from '@/type';
import { PropType } from 'vue'
const props = defineProps({
    teacher: {
        type: Object as PropType<StudentType>,
        require: true
    }
})

</script>

<style scoped>

</style>