<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const currentStep = ref(1)

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
const length = 10
const values = ref(Array(length).fill(''))

const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}

function handleInput(e, index) {
  const value = e.target.value.slice(-1)
  values.value[index] = value

  if (value && index < length - 1) {
    const next = document.getElementById(`otp-${index + 1}`)
    if (next) next.focus()
  }
}
function handleBackspace(e, index) {
  if (e.key === 'Backspace' && !values.value[index] && index > 0) {
    const prev = document.getElementById(`otp-${index - 1}`)
    if (prev) prev.focus()
  }
}
function goHome() {
  window.location.href = '/'
}
</script>

<template>
  <section
    v-if="currentStep === 1"
    class="flex flex-col justify-center items-center text-center mt-10 mb-5"
  >
    <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4" />
    <h1 class="text-4xl font-bold text-center mb-20">Entre na nossa comunidade.</h1>
    <div class="flex justify-center items-center gap-12">
      <div class="w-full max-w-md">
        <ul class="text-left w-full">
          <li>
            <p class="mb-2">Email <span class="mdi mdi-email-outline"></span></p>
            <input
              type="email"
              id="email"
              placeholder="exemplo@gmail.com"
              class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full placeholder-gray-500"
            />
          </li>
          <li class="mt-2">
            <p class="mb-2 w-full">Senha <span class="mdi mdi-lock-outline"></span></p>
            <div class="relative w-full">
              <input
                :type="showPassword ? 'text' : 'password'"
                name="senha"
                placeholder="Digite sua senha"
                id="senha"
                class="border border-gray-400 rounded py-3 pr-10 pl-2 w-full placeholder-gray-500"
              />
              <span
                @click="togglePassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
              >
                <span :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></span>
              </span>
            </div>
          </li>
          <li class="mt-2 w-full">
            <p class="mb-2">Confirme senha</p>
            <div class="flex items-center border border-gray-400 rounded w-full mb-10">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmesenha"
                placeholder="Confirme sua senha"
                class="flex-1 py-3 pl-2 pr-3 placeholder-gray-500 outline-none rounded bg-transparent"
              />
              <span
                @click="toggleConfirmPassword"
                class="cursor-pointer text-gray-600 text-xl px-3"
              >
                <span :class="showConfirmPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></span>
              </span>
            </div>
          </li>
        </ul>
        <button
          @click="nextStep"
          class="cursor-pointer w-full text-center bg-[#386641] font-bold text-[#FFFCF7] py-3 border rounded transition-transform duration-200 hover:scale-105 pointer"
        >
          Continuar <span class="mdi mdi-arrow-right"></span>
        </button>
        <div class="text-left mt-2">
          <p>
            Já faz parte de um setor? <RouterLink to="/Cadastro/Setor" class="text-[#2D88D4] hover:underline cursor-pointer"> Clique aqui. </RouterLink>
          </p>
          <p class="text-[#2D88D4] hover:underline cursor-pointer">
            <RouterLink to="/Login"> Já possuo uma conta. </RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="relative w-100 h-auto left-[20em] bottom-[18em] ">
    <img src="/public/mobile-login.png" alt="mobile" class=" absolute" />
    </div>
    <button
      @click="goHome"
      class="px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-transform duration-200 hover:scale-105 -mt-30 mr-150 cursor-pointer"
    >
      <span class="mdi mdi-arrow-left"></span> Voltar
    </button>
  </section>
  <section
    v-if="currentStep === 2"
    class="flex flex-col justify-center items-center text-center mt-10"
  >
    <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-4" />
    <h1 class="text-4xl font-bold text-center mb-20">Verifique sua matrícula.</h1>
    <div>
      <h2 class="text-2xl font-bold text-center mb-8">
        <span class="mdi mdi-lock-check-outline"></span> Insira abaixo:
      </h2>
      <div class="flex justify-center items-center gap-2 min-h-[90px]">
        <input
          type="text"
          id="matricula"
          v-model="matricula"
          class="w-66 h-12 px-2 border border-[#A7A7A7] rounded text-center focus:outline-none -mt-5 text-left"
        />
      </div>
      <div class="flex justify-center mt-6">
        <button
          @click="nextStep"
          class="cursor-pointer text-center mx-auto px-6 bg-[#386641] font-bold text-[#FFFCF7] py-3 border rounded transition-transform duration-200 hover:scale-105 pointer"
        >
          Continuar <span class="mdi mdi-arrow-right"></span>
        </button>
      </div>
      <button
        @click="prevStep"
        class="cursor-pointer px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-transform duration-200 hover:scale-105 -mt-30 mr-150"
      >
        <span class="mdi mdi-arrow-left"></span> Voltar
      </button>
    </div>
  </section>

  <section
    v-if="currentStep === 3"
    class="flex flex-col justify-center items-center text-center mt-20"
  >
    <img src="/public/LogoIFC.png" alt="logo" class="w-40rem h-20rem mb-6" />
    <h1 class="text-4xl font-bold text-center mb-20">Confirme seus dados.</h1>
    <h2 class="text-3xl font-bold text-center mb-10">Essa pessoa é você?</h2>
    <div class="flex flex-col justify-center items-center gap-12">
      <div class="w-full max-w-md">
        <ul class="text-left w-full">
          <li>
            <div class="flex justify-between">
              <p class="mb-3">Nome</p>
              <span class="mdi mdi-smart-card-outline text-2xl"></span>
            </div>
            <input type="text" class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full" />
          </li>
          <li class="mt-3">
            <div class="flex justify-between">
              <p>CPF</p>
              <span class="mdi mdi-card-bulleted-outline text-2xl"></span>
            </div>
            <input type="number" class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full" />
          </li>
          <li class="mt-3">
            <div class="flex justify-between">
              <p>Matrícula</p>
              <span class="mdi mdi-card-account-details-outline text-2xl"></span>
            </div>
            <input
              type="number"
              class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full no-spinner"
            />
          </li>
          <li class="mt-3 mb-5 w-full">
            <div class="flex justify-between">
              <p>Curso</p>
              <span class="mdi mdi-google-classroom text-2xl"></span>
            </div>
            <select
              name="curso"
              id="curso"
              class="border border-gray-400 rounded py-3 pr-3 pl-2 w-full cursor-pointer"
            >
              <option value="1" class="text-gray-500 cursor-pointer">
                Informática para Internet
              </option>
              <option value="2" class="text-gray-500 cursor-pointer">Agropecuária</option>
              <option value="3" class="text-gray-500 cursor-pointer">Química</option>
            </select>
          </li>
        </ul>
        <button
          @click="goHome"
          class="cursor-pointer w-full text-center px- bg-[#386641] font-bold text-[#FFFCF7] py-3 border rounded transition-transform duration-200 hover:scale-105 pointer"
        >
          Continuar <span class="mdi mdi-arrow-right"></span>
        </button>
      </div>
      <button
        @click="prevStep"
        class="cursor-pointer px-10 py-2 text-[#386641] rounded border-1 border-[#386641] font-bold transition-transform duration-200 hover:scale-105 mr-150"
      >
        <span class="mdi mdi-arrow-left"></span> Voltar
      </button>
    </div>
  </section>
  <div class="w-screen px-8 mt-50 relative mb-10">
    <div class="absolute top-5 left-10 right-10 h-0.5 bg-gray-300 z-0"></div>
    <ul class="flex justify-between w-full px-8">
      <li class="flex flex-col items-center relative">
        <span
          :class="[
            'text-3xl w-9 h-9 text-center rounded-full bg-gray-100',
            currentStep > 1
              ? 'mdi mdi-circle text-[#386641]'
              : currentStep === 1
                ? 'mdi mdi-record-circle text-[#386641]'
                : 'mdi mdi-record-circle text-[#C0C0C0]',
          ]"
        >
        </span>
        <p
          class="text-[#386641] text-center"
          :class="currentStep >= 1 ? 'text-[#386641]' : 'text-[#736C6C]'"
        >
          Informações Iniciais
        </p>
        <p class="text-center text-[#C0C0C0]">Email e senha</p>
      </li>
      <li class="flex flex-col items-center relative">
        <span
          :class="[
            'text-3xl w-9 h-9 text-center rounded-full bg-gray-100',
            currentStep > 2
              ? 'mdi mdi-circle text-[#386641]'
              : currentStep === 2
                ? 'mdi mdi-record-circle text-[#386641]'
                : 'mdi mdi-record-circle text-[#C0C0C0]',
          ]"
        >
        </span>

        <p
          class="text-[#736C6C] text-center"
          :class="currentStep >= 2 ? 'text-[#386641]' : 'text-[#736C6C]'"
        >
          Confirme sua Identidade
        </p>
        <p class="text-[#C0C0C0] text-center">Verificação</p>
      </li>
      <li class="flex flex-col items-center relative">
        <span
          :class="[
            'text-3xl w-9 h-9 text-center rounded-full bg-gray-100',
            currentStep === 3
              ? 'mdi mdi-record-circle text-[#386641]'
              : 'mdi mdi-record-circle text-[#C0C0C0]',
          ]"
        >
        </span>
        <p
          class="text-[#736C6C] text-center"
          :class="currentStep === 3 ? 'text-[#386641]' : 'text-[#736C6C]'"
        >
          Detalhes Finais
        </p>
        <p class="text-center text-[#C0C0C0]">Nome, CPF, Curso, etc...</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
