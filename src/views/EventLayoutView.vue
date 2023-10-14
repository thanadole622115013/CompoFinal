<script setup lang="ts">
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const store = useEventStore()
const event = storeToRefs(store).event
const id = ref(event?.value?.id)
const router = useRouter()

</script>

<template>
  <div v-if="event">

    <div class="lg:flex lg:items-center lg:justify-between px-12">
      <div class="min-w-0 flex-1">
        <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div class="mt-2 flex items-center text-sm text-gray-500">

          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">

          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">

          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">

          </div>
        </div>
      </div>
      <div class="mt-5 flex lg:ml-4 lg:mt-0">
        <span class="hidden sm:block">
          <Router-link :to="{ name: 'event-edit', params: { id } }">
            <button type="button"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <PencilIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Comment
          </button>
          </Router-link>
          
        </span>

        <span class="ml-3 hidden sm:block">
          <Router-link :to="{ name: 'event-detail', params: { id } }">
          <button type="button"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <LinkIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Profile
          </button>
          </Router-link>
          
        </span>

        <span class="sm:ml-3">
        </span>

      </div>
    </div>



  <RouterView :event="event"></RouterView>
</div></template>


