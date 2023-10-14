<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router';
import type { StudentType } from '@/type';
import EventService from '../services/EventService'
import { computed, ref, watchEffect } from 'vue'
import { AxiosResponse } from 'axios';
import router from '@/router';
import { onBeforeRouteUpdate } from 'vue-router';

const events = ref<StudentType[]>([])

const totalEvent = ref<number>(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 4)
  return props.page.valueOf() < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})


EventService.getEvent(4, props.page).then((response: AxiosResponse<StudentType[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
  console.log(response.data)
}).catch(() => {
  router.push({ name: 'NetworkError' })
})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)

  EventService.getEvent(4, toPage).then((response: AxiosResponse<StudentType[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  })
})

</script>

<template>
  <div>
    <h1 class="text-center uppercase ">All students</h1>
    <hr
  class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    <main class="flex flex-col items-center">
      <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
      
      <div class="pagination" v-if="page == 1">
        <RouterLink :to="{ name: 'StudentList', query: { page: page - 0 } }" rel="prev"
          class="cursor-not-allowed text-center block max-w-sm p-4 bg-gray-200 border border-gray-200 rounded-lg shadow">
          Previous
        </RouterLink>
        <div class="m-4"></div>
        <RouterLink :to="{ name: 'StudentList', query: { page: page + 1 } }" rel="next"
          class="text-center block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          Next
        </RouterLink>
      </div>
      <div class="pagination" v-else-if="hasNextPage">
        <RouterLink :to="{ name: 'StudentList', query: { page: page - 1 } }" rel="prev"
          class="text-center block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          Previous
        </RouterLink>
        <div class="m-4"></div>
        <RouterLink :to="{ name: 'StudentList', query: { page: page + 1 } }" rel="next"
          class="text-center block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          Next
        </RouterLink>
      </div>
      <div class="pagination" v-else>
        <RouterLink :to="{ name: 'StudentList', query: { page: page - 1 } }" rel="prev"
          class="text-center block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          Previous
        </RouterLink>
        <div class="m-4"></div>
        <RouterLink :to="{ name: 'StudentList', query: { page: page + 0 } }" rel="next"
          class="cursor-not-allowed text-center block max-w-sm p-4 bg-gray-200 border border-gray-200 rounded-lg shadow">
          Next
        </RouterLink>
      </div>

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
