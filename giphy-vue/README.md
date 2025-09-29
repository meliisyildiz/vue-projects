# 🎬✨ Giphy Vue App ✨🎬

A super cute and colorful web app built with Vue 3, TypeScript, and the Giphy API! Browse trending GIFs, search for your faves, and see all the fun details about each one! 🌈

![Made with Vue](https://img.shields.io/badge/Made%20with-Vue.js-42b883?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Giphy](https://img.shields.io/badge/Powered%20by-Giphy-FF6666?style=for-the-badge)

## ✨ Features

- 🌟 View 25 trending GIFs from Giphy
- 🔍 Search for GIFs by keyword
- 💜 Beautiful gradient purple theme
- 📱 Works on all devices!
- 🖼️ Detailed GIF info cards
- ⚡ Super smooth and fast
- 🎯 Clean and professional UI

## 🛠️ Tech Stack

- **Vue 3** 🖖 - The coolest JavaScript framework
- **TypeScript** 📘 - Type-safe coding FTW
- **Vue Router** 🛣️ - Navigate like a pro
- **Axios** 🚀 - Fetch data easily
- **Giphy API** 🎞️ - All the GIFs!

## 📁 Project Structure

```
giphy-vue/
├── src/
│   ├── assets/
│   │   └── styles.css          ✨ Global styles
│   ├── components/
│   │   └── StickerCard.vue     🎴 Reusable card component
│   ├── router/
│   │   └── index.ts            🛣️ Route configuration
│   ├── services/
│   │   └── giphy.ts            🔌 Giphy API service
│   ├── types/
│   │   └── giphy.ts            📝 TypeScript interfaces
│   ├── views/
│   │   ├── HomeView.vue        🏠 Main trending page
│   │   └── StickerDetails.vue  📄 GIF detail page
│   ├── App.vue                 🎨 Root component
│   └── main.ts                 🚀 Application entry point
└── package.json
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher) 📦
- npm or yarn 🧶

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd giphy-vue
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run the development server:**
```bash
npm run serve
# or
yarn serve
```

4. **Open your browser and visit:**
```
http://localhost:8080
```

🎉 **You're all set!** The app should be running now!

## 📜 Available Scripts

- `npm run serve` - 🏃 Start development server
- `npm run build` - 📦 Build for production
- `npm run lint` - 🧹 Lint and fix files

## 🔑 API Configuration

The app uses the Giphy API! For production, get your own API key from [Giphy Developers](https://developers.giphy.com/) 🎁

```typescript
// src/services/giphy.ts
const API_KEY = 'your-api-key-here';
```

## 🎨 Features Overview

### 🏠 Home Page
- Displays 25 trending GIFs in a beautiful grid 💎
- Search bar to find your favorite GIFs 🔎
- Click any GIF to see more details 👆
- Clear button to go back to trending 🔄

### 📄 Detail Page
- Full-size GIF display 🖼️
- All the GIF info you need:
  - ✏️ Title
  - ⭐ Rating
  - 👤 Creator username
  - 📅 Upload date
  - 🔥 Trending date
  - 📏 Dimensions
  - 🆔 GIF ID
  - 👨‍💼 User profile (if available)
- Back button to return home 🔙

## 📱 Responsive Design

Works beautifully on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Big screens (1400px+)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Giphy API](https://developers.giphy.com/) 🎬 - For all the amazing GIFs
- [Vue.js](https://vuejs.org/) 💚 - For the awesome framework
- [Axios](https://axios-http.com/) 🔌 - For easy HTTP requests

---

💜 Built with love using Vue 3 + TypeScript 💜

### 🎀 Made by Melis 🎀

*Happy coding! May your GIFs always load fast!* ⚡✨