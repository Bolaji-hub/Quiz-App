<script setup>
import { computed } from "vue";

const props = defineProps({
  total: Number,
  progress: Number,
});

const percentage = computed(() => (props.progress / props.total) * 100);
</script>
<template>
  <div class="progress">
    <div class="inner">
      <div>
        <b>{{ progress }}</b> <span class="total">/{{ total }}</span>
      </div>
      <span><slot /></span>
    </div>
  </div>
</template>

<style scoped>
.progress {
  --thickness: 30px;

  min-width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  background: conic-gradient(
    #6a5ae0 v-bind("percentage + '%'"),
    white v-bind("percentage + '%'")
  );
}
.progress .inner {
  width: calc(100% - var(--thickness));
  height: calc(100% - var(--thickness));
  background-color: #e8e5fb;
  border-radius: 50%;

  display: grid;
  place-content: center;
}
.progress b {
  font-size: 24px;
}
.progress span {
  color: #9595a2;
}
span.total {
  font-weight: 600;
}
</style>
