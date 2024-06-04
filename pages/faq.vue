<template>
  <section class="m-2">
    <h1 class="text-3xl text-center defqon">Häufig gestellte Fragen</h1>
    <div
      v-for="faqCategory of faq"
      :key="faqCategory.title"
    >
      <h1 class="text-2xl defqon">{{ faqCategory.title }}</h1>
      <div class="join join-vertical w-full">
        <div
          v-for="entry of faqCategory.entries"
          class="collapse collapse-arrow join-item border border-base-300"
        >
          <input type="radio" :name="entry.question" checked="checked" /> 
          <div class="collapse-title text-xl font-medium">
            {{ entry.question}}
          </div>
          <div class="collapse-content"> 
            <p>{{ entry.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const faq = [
  {
    title: 'Camping',
    entries: [
      {
        question: 'Welche Arten von Grills sind erlaubt?',
        answer: `Alle Arten von Gasflaschen, Treibstoff (Benzin, Diesel, etc.), Generatoren, Batterien oder Trockeneis/Brennstoff sind auf den Defqon.1-Campingplätzen nicht mehr erlaubt. Bitte beachte, dass sich dies im Vergleich zu den Vorjahren geändert hat. Diese Entscheidung wurde im Namen der örtlichen Behörden getroffen. Kleine Einweggrills sind weiterhin erlaubt (Grills mit Holzkohle oder mit kleinen Batterien wie AA oder AAA). Es gibt keine Ladestationen für Elektrogrills oder Wasserkocher.`
      }
    ]
  }
]
</script>