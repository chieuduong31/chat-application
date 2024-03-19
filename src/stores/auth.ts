import { ref, computed, onUnmounted } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/libs/firebase'
import firebase from 'firebase/compat/app'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<any>(null)

  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user))
  onUnmounted(unsubscribe)

  const isLogin = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
    router.push({
      name: 'Home'
    })
  }
  const signOut = () => auth.signOut()

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }

  return { user, isLogin, signIn, signOut, getCurrentUser }
})
