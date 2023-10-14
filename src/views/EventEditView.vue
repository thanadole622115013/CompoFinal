<script setup lang="ts">
import type { StudentType } from '@/type'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useEventStore } from '@/stores/event'
import { useCommentStore } from '@/stores/comment'
import { RouterLink, RouterView } from 'vue-router'
import { ref, type PropType } from 'vue';

const props = defineProps({
    event: {
      type: Object as PropType<StudentType>,
        require: true
    }
})
const router = useRouter()
const store = useMessageStore()
const store2 = useCommentStore()
const comment = ref("")

function edit(){
router.push({ path: '/event/' + props.event?.id})
store.updateMesage("Comment of " + " " + props.event?.studentId + ' has been updated ')

store2.updateComment(comment.value)

setTimeout(() => {
  store.resetMessage()
}, 3000)
router.push({
  name: 'event-detail',
  params: {
    id: [props.event?.id]
  }
})
}

</script>

<template>
  <div v-if="event" class="flex justify-center items-center">
    <form class="flex justify-center items-center">
  <div class="flex items-center border-b border-teal-500 py-2">
    <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Input teacher comment" aria-label="Full name" ref="inputComment" v-model="comment">
    <button @click="edit" class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Save
    </button>
   
  </div>
</form>
  </div>
</template>


