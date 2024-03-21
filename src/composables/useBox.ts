import { firestore } from '@/libs/firebase'
import { useAuthStore } from '@/stores/auth'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

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
    chatbox.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse()
  })

  const isTyping = async (status) => {
    if (!authStore.isLogin) return
    console.log(status)
    const query = chatboxesCollection.where('id', '==', chatbox.value[0].id);
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      doc.ref.update({
        userIsTyping: status
      });
    });
  }

  return { chatbox, unsubscribe, isTyping }
}
