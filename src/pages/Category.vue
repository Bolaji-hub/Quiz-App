<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import quizes from '../data/quizes';


const route = useRoute()
const questions = quizes[route.params.id]?.questions
const currentQuestionIndex = ref(0)

const currentQuestion = computed(() => {
  const quiz = questions[currentQuestionIndex.value]
  const options = [...quiz.incorrect_answers]
  const indexOfCorrectAnswer = Math.round(Math.random() * options.length)

  options.splice(indexOfCorrectAnswer, 0, quiz.correct_answer)
  return {
    question: quiz.question,
    options,
    indexOfCorrectAnswer
  }
})
</script>



<template>
  <h1>Category {{ route.params.id }}</h1>

  <div>
    <h4>{{ currentQuestion.question }}</h4>

    <label v-for="option in currentQuestion.options" :key="option">
      <input type="radio" name="option" :id="option" :value="option">

      {{ option }}
    </label>
  </div>
</template>