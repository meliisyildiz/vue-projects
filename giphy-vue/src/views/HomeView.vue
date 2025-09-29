<template>
  <div class="home">
    <div class="header">
      <h1 class="title">
        <span class="gif-emoji">🎬</span>
        Trending GIFs
        <span class="gif-emoji">✨</span>
      </h1>
      <p class="subtitle">Discover the hottest GIFs on Giphy right now</p>
      
      <div class="search-container">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="Search for GIFs..."
          class="search-input"
        />
        <button @click="handleSearch" class="search-btn">Search</button>
        <button v-if="isSearching" @click="clearSearch" class="clear-btn">Clear</button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading trending GIFs...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchTrendingGifs" class="retry-btn">Try Again</button>
    </div>

    <div v-else class="gifs-grid">
      <div
        v-for="gif in gifs"
        :key="gif.id"
        class="gif-card"
        @click="goToGifDetail(gif.id)"
      >
        <img
          :src="gif.images.fixed_height.url"
          :alt="gif.title"
          class="gif-image"
        />
        <div class="gif-overlay">
          <p class="gif-title">{{ gif.title || 'Untitled GIF' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { giphyService } from '../services/giphy';
import type { GiphyGif } from '../types/giphy';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const gifs = ref<GiphyGif[]>([]);
    const loading = ref(false);
    const error = ref('');
    const searchQuery = ref('');
    const isSearching = ref(false);

    const fetchTrendingGifs = async () => {
      loading.value = true;
      error.value = '';
      isSearching.value = false;
      try {
        const response = await giphyService.getTrending(25);
        gifs.value = response.data;
      } catch (err) {
        error.value = 'Failed to load trending GIFs. Please try again.';
        console.error('Error fetching trending GIFs:', err);
      } finally {
        loading.value = false;
      }
    };

    const handleSearch = async () => {
      if (!searchQuery.value.trim()) return;
      
      loading.value = true;
      error.value = '';
      isSearching.value = true;
      try {
        const response = await giphyService.searchGifs(searchQuery.value, 25);
        gifs.value = response.data;
      } catch (err) {
        error.value = 'Failed to search GIFs. Please try again.';
        console.error('Error searching GIFs:', err);
      } finally {
        loading.value = false;
      }
    };

    const clearSearch = () => {
      searchQuery.value = '';
      fetchTrendingGifs();
    };

    const goToGifDetail = (id: string) => {
      router.push({ name: 'gif-detail', params: { id } });
    };

    onMounted(() => {
      fetchTrendingGifs();
    });

    return {
      gifs,
      loading,
      error,
      searchQuery,
      isSearching,
      fetchTrendingGifs,
      handleSearch,
      clearSearch,
      goToGifDetail
    };
  }
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 800;
}

.gif-emoji {
  display: inline-block;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
  justify-content: center;
}

.search-input {
  flex: 1;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  border: 2px solid white;
  border-radius: 25px;
  background: white;
  color: #333;
  outline: none;
  transition: box-shadow 0.2s;
}

.search-input:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.search-input::placeholder {
  color: #999;
}

.search-btn,
.clear-btn {
  padding: 0.875rem 2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.search-btn:hover,
.clear-btn:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.clear-btn {
  background: #ff6b6b;
  color: white;
}

.clear-btn:hover {
  background: #ff5252;
}

.loading {
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

.error-message {
  text-align: center;
  color: white;
  padding: 2rem;
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.gifs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.gif-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.gif-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gif-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.gif-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1rem;
  opacity: 1;
}

.gif-card:hover .gif-overlay {
  opacity: 1;
}

.gif-title {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .search-container {
    flex-direction: column;
    max-width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .gifs-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .gif-image {
    height: 150px;
  }
}
</style>