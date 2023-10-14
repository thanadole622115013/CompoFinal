<script setup lang="ts">
import TeacherCard from '../components/TeacherCard.vue'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router';
import type { StudentType } from '@/type';
import EventService from '../services/EventService'
import { computed, ref, watchEffect } from 'vue'
import { AxiosResponse } from 'axios';
import router from '@/router';
import { onBeforeRouteUpdate } from 'vue-router';

const teachers = ref<StudentType[]>([])

const totalEvent = ref<number>(0)
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalEvent.value / 10)
    return props.page.valueOf() < totalPages
})
const props = defineProps({
    page: {
        type: Number,
        required: true
    }
})


EventService.getTeacher(10, props.page).then((response: AxiosResponse<StudentType[]>) => {
    teachers.value = response.data
    totalEvent.value = response.headers['x-total-count']
    console.log(response.data)
}).catch(() => {
    router.push({ name: 'NetworkError' })
})

onBeforeRouteUpdate((to, from, next) => {
    const toPage = Number(to.query.page)

    EventService.getTeacher(10, toPage).then((response: AxiosResponse<StudentType[]>) => {
        teachers.value = response.data
        totalEvent.value = response.headers['x-total-count']
        next()
    }).catch(() => {
        next({ name: 'NetworkError' })
    })
})

</script>

<template>
    <div>
        <h1 class="text-center uppercase ">All teachers</h1>
        <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <main class="flex flex-col items-center">
            <TeacherCard v-for="teacher in teachers" :key="teacher.id" :teacher="teacher"></TeacherCard>
        </main>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    width: 290px;
}

.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}
</style>
