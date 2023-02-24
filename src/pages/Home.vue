<script setup>
import quizes from "../data/quizes";
import { ref, computed } from "vue";

const search = ref("");
const filteredQuizes = computed(() => {
  if (search.value) {
    const q = Object.entries(quizes).filter(([key]) =>
      key.includes(search.value)
    );
    return Object.fromEntries(q);
  }

  return quizes;
});
</script>

<template>
  <div class="container">
    <header>
      <h1>Quizzes</h1>
      <input v-model.trim="search" type="text" placeholder="Search.." />
    </header>
    <div class="option-container">
      <RouterLink
        :to="`/category/${category}`"
        v-for="(quiz, category) in filteredQuizes"
        :key="category"
        class="card"
      >
        <img :src="quiz.image" alt="" />
        <div class="card-text">
          <h2>{{ category }}</h2>
          <p>{{ quiz.questions.length }} questions</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  padding-left: 1vw;
  padding-right: 1vw;
  margin: 0 auto;
}
header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

header h1 {
  font-weight: bold;
  margin-right: 30px;
  color: palevioletred;
}

header input {
  border: none;
  padding: 12px;
  border-radius: 5px;
  background-color: beige;
  cursor: pointer;
}

.option-container {
  display: flex;
  margin-top: 40px;
  gap: 2.5rem 2rem;
  flex-wrap: wrap;
}

.card {
  flex-basis: 300px;
  flex-grow: 1;
  overflow: hidden;
  text-decoration: none;
  color: currentColor;
  border-radius: 2%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card h2 {
  text-transform: capitalize;
  margin-top: 0;
}

.card img {
  width: 100%;
  height: 190px;
  margin: 0;
}

.card .card-text {
  padding: 0.5rem 1rem;
}

.card .card-text h2 {
  font-weight: bold;
}
</style>
