import firebase from 'firebase/compat/app'
import { firestore } from '@/libs/firebase'
import { useAuthStore } from '@/stores/auth'
import { ref, onUnmounted } from 'vue'

export async function useChat(readerId: string) {
  const authStore = useAuthStore()

  const user = (await authStore.getCurrentUser()) as any

  const messages = ref<any[]>([])
  const messagesCollection = firestore.collection(`${readerId}:${user.uid}`)
  const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)

  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse()
  })

  const sendMessage = (msg: string) => {
    if (!authStore.isLogin) return
    messagesCollection.add({
      from: user.uid,
      to: readerId,
      msg: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage, unsubscribe }
}
