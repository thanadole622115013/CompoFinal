<script setup lang="ts">
import NProgress from 'nprogress'
import { useRouter } from 'vue-router';
import type { StudentType } from '@/type';
import EventService from '../services/EventService'
import { computed, ref, vModelText, watchEffect } from 'vue'
import axios, { AxiosResponse } from 'axios';
import router from '@/router';
import { onBeforeRouteUpdate } from 'vue-router';
import { useEventStore } from '@/stores/event';
import { useMessageStore } from '../stores/message';

const name = ref('')
const surname = ref('')
const studentId = ref('')
const imgLink = ref('')
const course = ref('')
const teacherName = ref('')
const teacherSurname = ref('')
const teacherimgLink = ref('')
const comment = ref('')
const id = ref('')
const store = useMessageStore()

function sendStudentForm(this: any) {

    axios({
        method: 'POST',
        url: 'http://localhost:3004/events',
        data: {
            id: id.value,
            studentId: studentId.value,
            name: name.value,
            surname: surname.value,
            imgLink: imgLink.value,
            course: course.value,
            teacherName: teacherName.value,
            teacherSurname: teacherSurname.value,
            teacherimgLink: teacherimgLink.value,
            comment: comment.value
        }
    })

    store.updateMesage("A new student has been added to the list")

    setTimeout(() => {
        store.resetMessage()
    }, 5000)
    router.push({
        name: 'StudentList',
    })
}

</script>

<template>
    <form class="w-full max-w-lg ml-28" @submit.prevent="sendStudentForm">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" type="text" placeholder="Jane" v-model="name">
                <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
            </div>
            <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name" type="text" placeholder="Doe" v-model="surname">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-student-id">
                    Student ID
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password" type="text" placeholder="Input student ID" v-model="studentId">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-course">
                    Course enrolled
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password" type="text" placeholder="Input Course ID" v-model="course">
                <p class="text-gray-600 text-xs italic">Only this semester</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-link">
                    Image Link
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password" type="text" placeholder="Input image link" v-model="imgLink">
                <p class="text-gray-600 text-xs italic">Input the URL only</p>
            </div>
        </div>

        <br />
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Advisor First Name
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" type="text" placeholder="Jane" v-model="teacherName">
            </div>
            <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Advisor Last Name
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name" type="text" placeholder="Doe" v-model="teacherSurname">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-link">
                    Advisor Image Link
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password" type="text" placeholder="Input image link" v-model="teacherimgLink">
                <p class="text-gray-600 text-xs italic">Input the URL only</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-comment">
                    Advisor Comment
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password" type="text" placeholder="Input comment" v-model="comment">

            </div>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-48 mb-10" type="submit">
            Button
        </button>
    </form>
</template>

<style scoped></style>
