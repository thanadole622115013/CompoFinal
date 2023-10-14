import { defineStore } from "pinia"
export const useCommentStore = defineStore('comment', {
    state: () => ({
        comment: '' as string
    }),
    actions: {
        updateComment(comment: string) {
            this.comment = comment
        },
        resetComment() {
            this.comment = ''
        }
    }
})
    
