<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import PassoUmComponent from '@/components/PassoUmComponent.vue';
import PassoDoisComponent from '@/components/PassoDoisComponent.vue';
import PassoTresComponent from '@/components/PassoTresComponent.vue';
import PassoQuatroComponent from '@/components/PassoQuatroComponent.vue';

const userStore = useUserStore();


const validarSenha = ref('')

const currentStep = ref(1)

function nextStep() {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<template>
  <PassoUmComponent
  v-if="currentStep === 1"
  v-model:email="userStore.usuario.email"
  v-model:password="userStore.usuario.password"
  v-model:confirmPassword="validarSenha"
  @next="nextStep"
  />


  <PassoDoisComponent
  v-if="currentStep === 2"
  @next="nextStep"
  @prev="prevStep"
  />

  <PassoTresComponent
  v-if="currentStep === 3"
  @next="nextStep"
  @prev="prevStep"
  />

  <PassoQuatroComponent
  v-if="currentStep === 4"
  @next="nextStep"
  @prev="prevStep"
  />

</template>
