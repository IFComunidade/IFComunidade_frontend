<script setup>
function enviar(){
    alert('enviar')
}
</script>

<template>
    <section class="px-22 flex flex-col justify-start min-h-screen">

        <div class="flex gap-6 mt-20 mb-15">
            <span class="mdi mdi-arrow-left text-3xl font-bold text-[#386641]"></span>
            <h1 class="text-[#386641] text-3xl font-bold">Insatisfação relacionada ao planejamento acadêmico </h1>
        </div>

        <div class="flex">
            <div class="flex-col">
                <ul>
                    <li>
                        <p class="text-[#A7A7A7] text-xl mb-2"> Ultima atividade</p>
                        <p class="text-xl font-semibold mb-4"> 3 Meses atrás</p>
                    </li>
                    <li>
                        <p class="text-[#A7A7A7]  text-xl mb-2"> Data de registro</p>
                        <p class="text-xl font-semibold mb-4">15/05/2025</p>
                    </li>
                    <li>
                        <p class="text-[#A7A7A7]  text-xl mb-2">Tipo de Ocorrência</p>
                        <p class="text-xl font-semibold mb-4"> Queixa</p>
                    </li>
                    <li>
                        <p class="text-[#A7A7A7]  text-xl mb-2">Categoria</p>
                        <p class="text-xl font-semibold mb-4"> Planejamento Acadêmico</p>
                    </li>
                    <li>
                        <p class="text-[#A7A7A7] text-xl mb-2">Status</p>
                        <p class="text-xl font-semibold mb-4">Em análise</p>
                    </li>
                    <li>
                        <p class="text-[#A7A7A7] text-xl mb-2">Controles</p>
                        <form action="">
                            <ul class="w-75">
                                <li class="mb-2">
                                    <input type="radio" name="status" id="analise" class="mr-1">
                                    <label for="analise" class="accent-[#386641]">Marcar como “Em análise” <span
                                            class="mdi mdi-email-fast-outline"></span></label>
                                </li>
                                <li class="mb-2">
                                    <input type="radio" name="status" id="resolvido" class="mr-1">
                                    <label for="resolvido">Marcar como “Resolvido” <span
                                            class="mdi mdi-email-check-outline"></span></label>
                                </li>
                                <li class="mb-2">
                                    <input type="radio" name="status" id="naoresolvido" class="mr-1">
                                    <label for="naoresolvido">Marcar como “Não resolvido” <span
                                            class="mdi mdi-email-remove-outline"></span></label>
                                </li>
                            </ul>
                        </form>
                    </li>

                </ul>
            </div>
            <div class="ml-25">
                <div class="border-b-1 border-[#386641]">
                    <div class="flex">
                        <img src="https://www.gravatar.com/avatar/?d=mp" class="rounded-full w-10 h-10">
                        <div class="ml-3">
                            <p class="text-2xl"> Maria Clara Pavanello Giareta - 202422344</p>
                            <p class="text-xs text-[#A7A7A7] mb-4 ">@pontofrio</p>
                        </div>
                    </div>
                    <p class="max-w-200 mb-3">
                        Olá, venho registrar minha insatisfação em relação ao planejamento acadêmico deste semestre. As
                        mudanças de datas e horários de aulas têm acontecido com pouca antecedência e sem comunicação
                        clara, o que está dificultando muito a organização da minha rotina, principalmente para quem
                        trabalha ou depende de transporte. Entendo que imprevistos acontecem, mas acredito que um
                        comunicação mais transparente e um planejamento mais estável seriam fundamentais para evitar
                        prejuízos ao nosso desempenho acadêmico.
                    </p>
                </div>
                <div class="border-b-1 border-[#386641] mt-20">
                    <div class="flex">
                        <img src="https://www.gravatar.com/avatar/?d=mp" class="rounded-full w-10 h-10">
                        <div class="ml-3">
                            <p class="text-2xl">Coordenação de Curso</p>
                            <p class="text-xs text-[#A7A7A7] mb-4 ">17/05/2025 - 13:36</p>
                        </div>
                    </div>
                    <p class="max-w-200 mb-3">
                        Olá, Maria. Agradecemos pelo seu feedback e entendemos sua insatisfação. Estamos trabalhando
                        para melhorar a comunicação e garantir maior estabilidade no planejamento das aulas. Você
                        poderia nos contar se alguma dessas mudanças impactou diretamente em sua rotina?
                    </p>
                </div>
                <div class="border-b-1 border-[#386641] mt-20">
                    <input type="text" placeholder="Responder" class="text-xl w-185 focus: outline-none">
                    <span class="mdi mdi-send text-[#A7A7A7] cursor-pointer " @click="enviar"></span>
                </div>
            </div>
        </div>

    </section>
</template>
