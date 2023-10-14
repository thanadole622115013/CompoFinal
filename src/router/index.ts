import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
// import AboutViewVue from '@/views/AboutView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import EventEditView from '../views/EventEditView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetWorkErrorView from '../views/NetWorkErrorView.vue'
import EventLayoutViewVue from '@/views/EventLayoutView.vue'
import TeacherProfileView from '@/views/TeacherProfileView.vue'
import TeacherListView from '@/views/TeacherListView.vue'
import TeacherLayoutView from '@/views/TeacherLayoutView.vue'
import TeacherDetailView from '@/views/TeacherDetailView.vue'
import StudentAddForm from '@/views/StudentAddForm.vue'
import TeacherAddForm from '@/views/TeacherAddForm.vue'

import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import { useTeacherStore } from '@/stores/teacher'


const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StudentList',
      component: StudentListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/AddStudent',
      name: 'AddStudent',
      component: StudentAddForm,
    },
    {
      path: '/AddTeacher',
      name: 'AddTeacher',
      component: TeacherAddForm,
    },
    {
      path: '/TeacherList',
      name: 'TeacherList',
      component: TeacherListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutViewVue,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventById(id)
        .then((response) => {
          // set up
          eventStore.setEvent(response.data)
        })
        .catch((error) => {
          if(error.response && error.response.status === 404) {
            return {
              name: '404-resource',
              params: { resource:'event'}
            }
          } else {
            return { name: 'network-error'}
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          props: true
        },
        {
          path: 'teacher-profile',
          name: 'teacher-profile',
          component: TeacherProfileView,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetWorkErrorView 
    },

    //Teacher index

    {
      path: '/teacher/:id',
      name: 'teacher-layout',
      component: TeacherLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const teacherStore = useTeacherStore()
        return EventService.getTeacherById(id)
        .then((response) => {
          // set up
          teacherStore.setEvent(response.data)
        })
        .catch((error) => {
          if(error.response && error.response.status === 404) {
            return {
              name: '404-resource',
              params: { resource:'teacher'}
            }
          } else {
            return { name: 'network-error'}
          }
        })
      },
      children: [
        {
          path: '',
          name: 'teacher-detail',
          component: TeacherDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'teacher-edit',
          component: EventEditView,
          props: true
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0}
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
