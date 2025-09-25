# Vue 3 Pokédex API Project

A beginner-friendly Pokédex application built with Vue 3, TypeScript, and the Composition API. This project demonstrates how to fetch data from REST APIs, manage state, and create reusable components.

## 🎯 Learning Objectives

- Practice Vue 3 Composition API
- Learn API data fetching with `fetch()`
- Understand component composition and props
- Implement search and pagination functionality
- Work with external REST APIs (PokéAPI)

## 🚀 Features

- **Browse Pokémon**: Load Pokémon in batches of 20
- **Search**: Find specific Pokémon by name or ID
- **Responsive Design**: Grid layout that adapts to screen size
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type safety and better development experience
- **Composition API** - Modern Vue 3 reactive programming
- **PokéAPI** - RESTful API for Pokémon data
- **CSS Grid** - Responsive layout system

## 📁 Project Structure

```
src/
├── components/
│   ├── PokemonCard.vue    # Individual Pokémon display
│   └── PokemonList.vue    # Grid container for cards
├── assets/
│   └── style.css          # Global styles
├── App.vue                # Main application component
└── main.js               # Application entry point
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vue-pokedex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run serve
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

## 🧩 Component Breakdown

### PokemonCard.vue
- **Purpose**: Displays individual Pokémon information
- **Props**: `pokemon` (Object) - Pokémon data from API
- **Features**: 
  - Shows official artwork or fallback sprite
  - Displays name with proper capitalization
  - Lists all Pokémon types

### PokemonList.vue
- **Purpose**: Renders a grid of Pokémon cards
- **Props**: `pokemons` (Array) - Array of Pokémon objects
- **Features**: Responsive grid layout using CSS Grid

### App.vue
- **Purpose**: Main application logic and state management
- **Features**:
  - Search functionality
  - Pagination with "Load More"
  - Loading states
  - Reset functionality

## 🔧 Key Concepts Demonstrated

### 1. API Data Fetching
```javascript
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset.value}`)
const data = await res.json()

const details = await Promise.all(
  data.results.map(r => fetch(r.url).then(r => r.json()))
)
```

### 2. Vue 3 Composition API
```javascript
import { ref, onMounted } from 'vue'

const pokemons = ref([])
const loading = ref(false)

onMounted(() => {
  fetchList()
})
```

### 3. Component Communication
```javascript
<PokemonList :pokemons="pokemons" />

defineProps({ pokemons: Array })
```

## 📚 API Reference

This project uses the [PokéAPI](https://pokeapi.co/), a free RESTful API for Pokémon data.

### Endpoints Used:
- `GET /pokemon?limit=20&offset=0` - Get list of Pokémon
- `GET /pokemon/{id or name}` - Get specific Pokémon details

### Data Structure:
```javascript
{
  id: number,
  name: string,
  types: [{ type: { name: string } }],
  sprites: {
    front_default: string,
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
}
```

## 🎨 Styling Approach

- **CSS Grid**: For responsive Pokémon card layout
- **Flexbox**: For controls and button layouts
- **Box Shadow**: For card depth effect
- **Responsive Design**: Cards adapt from 150px minimum width


## 🤝 Contributing

This is a learning project! Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues

## 📖 Learning Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🎮✨**

> Built with ❤️ for learning Vue 3 and API integration