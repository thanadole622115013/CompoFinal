<template>
    <RouterLink class="event-link" :to="{ name: 'event-detail', params: { id: event?.id } }">

        <ul role="list" class="divide-y divide-gray-100">
            
            <li class="flex justify-between gap-x-96 py-5">
                <div class="flex min-w-0 gap-x-4">
                    <img class="overflow-hidden h-24 w-24 flex-none rounded-full bg-gray-50" :src="event?.imgLink" alt="" />
                    <div class="min-w-0 flex-auto">
                        
                        <p class="text-sm font-semibold leading-6 text-gray-900 pt-3 pl-4 ml-8">{{ event?.name + " " + event?.surname}}</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500 pl-4 ml-8">CMU</p>
                    </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p class="text-sm leading-6 text-gray-900">Student</p>
                    <p class="mt-1 text-xs leading-5 text-gray-500">
                        {{ event?.studentId }}
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
    event: {
        type: Object as PropType<StudentType>,
        require: true
    }
})

</script>

<style scoped>
/* .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
}

.event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
    color: #2c3e50;
    text-decoration: none;
} */
</style>