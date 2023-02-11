<script setup>
import quizes from '../data/quizes';
</script>

<template>
  <div class="container">
    <header>
      <h1>Quizes</h1>
      <input type="text" placeholder="Search..">
    </header>
    <div class="option-container">
      <div v-for="(quiz, category) in quizes" :key="category" class="card">
        <img :src="quiz.image" alt="">
        <div class="card-text">
          <h2>{{ category }}</h2>
          <p>{{ quiz.questions.length }} questions</p>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped> 
.container {
  max-width: 1000px;
  margin: 0 auto;
}
header {
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  flex-wrap: wrap;
}

.card {
  width: 310px;
  overflow: hidden;
  border-radius: 2%;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
  margin-right: 20px;
  cursor: pointer;
}

.card h2 {
  text-transform: capitalize;
}

.card img {
  width: 100%;
  height: 190px;
  margin: 0;
}

.card .card-text {
  padding: 0 5px;
  color: bisque;
}

.card .card-text h2{
  font-weight: bold;
}

</style>