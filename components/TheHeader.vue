<script setup>
const menuOpen = ref(false)
const guidesOpen = ref(false)

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const toggleGuides = () => (guidesOpen.value = !guidesOpen.value)
</script>

<template>
  <header class="header">
    <div class="logo-area">
      <NuxtLink to="/"><img src="../public/img/opdagdanmark_logo.png" alt="Logo" class="logo" /></NuxtLink>
    </div>

    <nav class="desktop-menu">
      <NuxtLink to="/oplevelseskort">Oplevelseskort</NuxtLink>
      <NuxtLink to="/eventkalender">Eventkalender</NuxtLink>
      <NuxtLink to="/danmarks-bedste">Danmarks Bedste</NuxtLink>

      <div class="desktop-dropdown">
        <button class="desktop-dropdown-btn">
          Guides
          <span>▼</span>
        </button>

        <div class="desktop-dropdown-content">
          <NuxtLink to="/guides/landsdele">Landsdele</NuxtLink>
          <NuxtLink to="/guides/temaer">Temaer</NuxtLink>
        </div>
      </div>

      <NuxtLink to="/om-os">Om os</NuxtLink>
      <NuxtLink to="/klubdanmark">KlubDanmark</NuxtLink>
    </nav>

    <div class="burger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>

  <nav class="mobile-menu" :class="{ open: menuOpen }">
    <ul>
      <li><NuxtLink to="/">Forside</NuxtLink></li>
      <li><NuxtLink to="/oplevelseskort">Oplevelseskort</NuxtLink></li>
      <li><NuxtLink to="/eventkalender">Eventkalender</NuxtLink></li>
      <li><NuxtLink to="/danmarks-bedste">Danmarks Bedste</NuxtLink></li>

      <li class="dropdown">
        <button class="dropdown-btn" @click="toggleGuides">
          Guides
          <span class="arrow" :class="{ open: guidesOpen }">▼</span>
        </button>

        <ul v-if="guidesOpen" class="dropdown-content">
          <li><NuxtLink to="/guides/landsdele">Landsdele</NuxtLink></li>
          <li><NuxtLink to="/guides/temaer">Temaer</NuxtLink></li>
        </ul>
      </li>

      <li><NuxtLink to="/om-os">Om Os</NuxtLink></li>
      <li><NuxtLink to="/klubdanmark">KlubDanmark</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>

.header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: white;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.0625rem solid #eee;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.logo {
  width: 10rem;
  height: 2rem;
}

.brand {
  font-size: 1.25rem;
  font-weight: 600;
  color: #d33;
}

.desktop-menu {
  display: none;
  gap: 1.5625rem;
  align-items: center;
}

.desktop-menu a {
  font-size: 1rem;
  font-weight: 500;
  color: black;
}

.desktop-dropdown {
  position: relative;
}

.desktop-dropdown-btn {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.desktop-dropdown-content {
  display: none;
  position: absolute;
  top: 1.75rem;
  left: 0;
  background: white;
  border: 1px solid #eee;
  padding: 0.625rem 0.9375rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  flex-direction: column;
}

.desktop-dropdown:hover .desktop-dropdown-content {
  display: flex;
}

.desktop-dropdown-content a {
  margin-bottom: 0.5rem;
}

.burger {
  width: 1.75rem;
  height: 1.375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.burger span {
  height: 0.1875rem;
  background: black;
  border-radius: 3px;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 75%;
  height: 100vh;
  background: white;
  padding: 5rem 1.25rem;
  transition: 0.3s ease;
  z-index: 998;
  box-shadow: -4px 0 10px rgba(0,0,0,0.1);
}

.mobile-menu.open {
  right: 0;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
}

.mobile-menu li {
  margin-bottom: 1.25rem;
}

.mobile-menu a {
  font-size: 1.25rem;
  color: black;
  font-weight: 500;
}

.dropdown-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
  text-align: left;
  padding: 0;
  cursor: pointer;
}

.arrow {
  float: right;
  transition: 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-content {
  margin-top: 0.625rem;
  padding-left: 0.9375rem;
}

.dropdown-content li {
  margin-bottom: 0.75rem;
}

@media (min-width: 900px) {
  .burger {
    display: none;
  }

  .mobile-menu {
    display: none;
  }

  .desktop-menu {
    display: flex;
  }
}
</style>
