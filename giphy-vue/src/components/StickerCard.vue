<template>
  <div class="sticker-card">
    <img :src="imageUrl" :alt="title" class="sticker-image" />
    <div class="sticker-info">
      <h3 class="sticker-title">{{ title }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StickerCard',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Untitled'
    }
  }
});
</script>

<style scoped>
.sticker-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.sticker-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.sticker-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.sticker-info {
  padding: 1rem;
}

.sticker-title {
  font-size: 1rem;
  color: #333;
  margin: 0;
}
</style>