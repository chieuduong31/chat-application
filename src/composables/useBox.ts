import { firestore } from '@/libs/firebase'
import { useAuthStore } from '@/stores/auth'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'

export async function useBox(readerId: string) {
  const authStore = useAuthStore()

  const user = (await authStore.getCurrentUser()) as any

  const chatbox = ref<any[]>()

  const chatboxesCollection = firestore.collection(`chatboxes`)
  const chatboxesQuery = chatboxesCollection
    .where('reader', '==', readerId)
    .where('user', '==', user.uid)
    .limit(1)
  const unsubscribe = chatboxesQuery.onSnapshot(async (snapshot) => {
    if (snapshot.empty) {
      await chatboxesCollection.add({
        id: uuidv4(),
        reader: readerId,
        user: user.uid,
        customerName: user.displayName,
        isEnding: false,
        lastEnd: null
      })
    }
    chatbox.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data(), docId: doc.id }))
      .reverse()
  })

  const isTyping = async (status: boolean) => {
    if (!authStore.isLogin) return
    const query = chatboxesCollection.where('id', '==', chatbox.value[0]?.id)
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      doc.ref.update({
        userIsTyping: status
      })
    })
  }

  const continueChatting = () => {
    // @ts-ignore
    const docRef = doc(chatboxesCollection, chatbox.value[0].docId)
    updateDoc(docRef, {
      isEnding: false,
      lastEnd: null
    })
  }

  const endSession = async (id) => {
    const query = chatboxesCollection.where('id', '==', id)
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      doc.ref.update({
        isEnding: true,
        lastEnd: new Date()
      })
    })
  }

  return { chatbox, unsubscribe, isTyping, continueChatting, endSession }
}
