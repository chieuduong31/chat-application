import firebase from 'firebase/compat/app'
import { firestore } from '@/libs/firebase'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

export async function useUnread() {
  const unread = ref<any[]>([])
  const unreadsCollection = firestore.collection(`unread`)
  // const unreadsQuery = unreadsCollection.where('to', '==', chatboxId).where('isReaded', '==', false)
  const authStore = useAuthStore()

  // const unsubscribe = unreadsQuery.onSnapshot(async (snapshot) => {
  //   if (!authStore.isLogin) return
  //   unreadsCollection.add({
  //     chatbox: chatboxId,
  //     isReaded: false,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp()
  //   })
  //   unread.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse()
  // })

  const sendUnread = (chatboxId) => {
    if (!authStore.isLogin) return
    unreadsCollection.add({
      chatbox: chatboxId,
      isReaded: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { unread, sendUnread }

}