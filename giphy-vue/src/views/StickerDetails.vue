<template>
  <div class="gif-detail">
    <button @click="goBack" class="back-btn">
      ← Back to Trending
    </button>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading GIF details...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchGifDetails" class="retry-btn">Try Again</button>
    </div>

    <div v-else-if="gif" class="content">
      <div class="gif-container">
        <img :src="gif.images.original.url" :alt="gif.title" class="main-gif" />
      </div>

      <div class="info-card">
        <h1 class="gif-title">{{ gif.title || 'Untitled GIF' }}</h1>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">⭐ Rating</span>
            <span class="info-value">{{ gif.rating.toUpperCase() }}</span>
          </div>

          <div class="info-item" v-if="gif.username">
            <span class="info-label">👤 Creator</span>
            <span class="info-value">{{ gif.username }}</span>
          </div>

          <div class="info-item">
            <span class="info-label">📅 Uploaded</span>
            <span class="info-value">{{ formatDate(gif.import_datetime) }}</span>
          </div>

          <div class="info-item">
            <span class="info-label">🔥 Trending Since</span>
            <span class="info-value">{{ formatDate(gif.trending_datetime) }}</span>
          </div>

          <div class="info-item">
            <span class="info-label">📏 Dimensions</span>
            <span class="info-value">{{ gif.images.original.width }}x{{ gif.images.original.height }}</span>
          </div>

          <div class="info-item">
            <span class="info-label">🆔 GIF ID</span>
            <span class="info-value id-value">{{ gif.id }}</span>
          </div>
        </div>

        <div v-if="gif.user" class="user-info">
          <img
            v-if="gif.user.avatar_url"
            :src="gif.user.avatar_url"
            :alt="gif.user.display_name"
            class="user-avatar"
          />
          <div class="user-details">
            <p class="user-name">{{ gif.user.display_name }}</p>
            <p class="user-username">@{{ gif.user.username }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { giphyService } from '../services/giphy';
import type { GiphyGif } from '../types/giphy';

export default defineComponent({
  name: 'StickerDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const gif = ref<GiphyGif | null>(null);
    const loading = ref(false);
    const error = ref('');

    const fetchGifDetails = async () => {
      loading.value = true;
      error.value = '';
      try {
        const id = route.params.id as string;
        const response = await giphyService.getGifById(id);
        gif.value = response.data;
      } catch (err) {
        error.value = 'Failed to load GIF details. Please try again.';
        console.error('Error fetching GIF details:', err);
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.push({ name: 'home' });
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    onMounted(() => {
      fetchGifDetails();
    });

    return {
      gif,
      loading,
      error,
      fetchGifDetails,
      goBack,
      formatDate
    };
  }
});
</script>

<style scoped>
.gif-detail {
  min-height: 100vh;
  padding: 2rem;
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 2rem;
}

.back-btn:hover {
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.loading, .error-message {
  text-align: center;
  color: white;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.retry-btn:hover {
  transform: translateY(-2px);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.gif-container {
  background: white;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.main-gif {
  width: 100%;
  border-radius: 15px;
  display: block;
}

.info-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.gif-title {
  font-size: 2rem;
  color: #333;
  margin: 0 0 2rem 0;
  font-weight: 700;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.id-value {
  font-family: monospace;
  font-size: 0.875rem;
  background: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  margin-top: 2rem;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid white;
}

.user-details {
  color: white;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.user-username {
  font-size: 0.875rem;
  opacity: 0.9;
  margin: 0;
}

@media (max-width: 968px) {
  .content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .gif-detail {
    padding: 1rem;
  }

  .gif-title {
    font-size: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>