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
import { useTeacherStore } from '@/stores/teacher'
import { storeToRefs } from 'pinia'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const store = useTeacherStore()
const teacher = storeToRefs(store).teacher
const id = ref(teacher?.value?.id)
const router = useRouter()

</script>

<template>
  <div v-if="teacher">

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
      
    </div>



  <RouterView :teacher="teacher"></RouterView>
</div></template>


