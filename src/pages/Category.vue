<script setup>
import { reactive, ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import quizes from "../data/quizes";
import Progress from "../components/Progress.vue";

const route = useRoute();
const questions = quizes[route.params.id]?.questions;
const currentQuestionIndex = ref(0);

const gameRecord = reactive([]);
const isQuestionAnswered = computed(
  () => gameRecord[currentQuestionIndex.value]
);

const won = computed(() =>
  gameRecord.filter(
    (record) => record.selectedIndex === record.indexOfCorrectAnswer
  )
);
const lost = computed(() =>
  gameRecord.filter(
    (record) => record.selectedIndex !== record.indexOfCorrectAnswer
  )
);

const currentQuestion = computed(() => {
  const quiz = questions[currentQuestionIndex.value];
  const options = [...quiz.incorrect_answers];
  const indexOfCorrectAnswer = Math.round(Math.random() * options.length);

  options.splice(indexOfCorrectAnswer, 0, quiz.correct_answer);
  return {
    question: quiz.question
      .replaceAll("&quot;", `"`)
      .replaceAll("&#039;", `'`)
      .replaceAll("&deg;F", `°F`),
    options,
    indexOfCorrectAnswer,
  };
});

const handleSelectOption = (index) => {
  gameRecord[currentQuestionIndex.value] = {
    selectedIndex: index,
    indexOfCorrectAnswer: currentQuestion.value.indexOfCorrectAnswer,
  };
};
</script>

<template>
  <RouterLink class="link" to="/">Go Back</RouterLink>

  <div class="container">
    <aside class="card">
      <h3>{{ route.params.id }}</h3>

      <Progress :progress="gameRecord.length" :total="questions.length"
        >quiz played</Progress
      >

      <div class="metric">
        <span class="lost"
          ><b>{{ lost.length }}</b> <br />
          Quiz Lost</span
        >
        <span class="pass">
          <b>{{ won.length }}</b> <br />
          Quiz Won
        </span>
      </div>
    </aside>

    <main>
      <div class="question">
        <h2>{{ currentQuestion.question }}</h2>

        <label
          :class="{
            wrong:
              isQuestionAnswered &&
              gameRecord[currentQuestionIndex].selectedIndex === i &&
              gameRecord[currentQuestionIndex].indexOfCorrectAnswer !== i,

            'right-unselected':
              isQuestionAnswered &&
              gameRecord[currentQuestionIndex].selectedIndex !== i &&
              gameRecord[currentQuestionIndex].indexOfCorrectAnswer === i,

            right:
              isQuestionAnswered &&
              gameRecord[currentQuestionIndex].selectedIndex === i &&
              gameRecord[currentQuestionIndex].indexOfCorrectAnswer === i,
          }"
          v-for="(option, i) in currentQuestion.options"
          :key="option"
        >
          <input
            :disabled="isQuestionAnswered"
            type="radio"
            name="option"
            :id="option"
            @change="handleSelectOption(i)"
            :value="i"
          />
          {{ option }}
        </label>
      </div>
      <button
        :disabled="!isQuestionAnswered"
        @click="
          currentQuestionIndex = Math.min(
            currentQuestionIndex + 1,
            questions.length - 1
          )
        "
      >
        Next
      </button>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap-reverse;
  min-height: 100vh;
  align-items: center;
}
main {
  flex-shrink: 1;
}
.card {
  flex-basis: 325px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #e8e5fb;
  padding: 10px;
  padding-top: 36px;
}

.card h3 {
  text-transform: capitalize;
  font-weight: 500;
}
.link {
  color: #6a5ae0;
  padding: 25px;
  margin: 20px;
  text-decoration: none;
  cursor: pointer;
}
.question h2 {
  font-weight: 500;
  margin-bottom: 24px;
}

.card .metric {
  display: flex;
  gap: 1rem;
}
.card span {
  font-size: bold;
  display: block;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
}

.card span b {
  font-size: 24px;
}

label {
  display: flex;
  align-items: center;
  margin: 5px;
  margin-bottom: 20px;
  font-size: bold;
  color: #9595a2;
  cursor: pointer;
}

label.wrong {
  color: red;
}

label.right-unselected {
  color: rgba(0, 128, 0, 0.567);
}

label.right {
  color: green;
}

label input {
  margin-right: 8px;
}

.pass {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: whitesmoke;
  background-color: #6a5ae0;
}
.lost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 15px, 15px, 15px, 15px;
  background-color: whitesmoke;
}

button {
  margin: 20px;
  border-radius: 3px;
  border: none;
  padding: 5px;
}
</style>
