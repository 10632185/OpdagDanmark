<script setup>
const menuOpen = ref(false)
const guidesOpen = ref(false)

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const toggleGuides = () => (guidesOpen.value = !guidesOpen.value)
</script>

<template>
  <header class="header">
    <div class="logo-area">
      <NuxtLink to="/">
        <img src="../public/img/opdagdanmark_logo.png" alt="Logo" class="logo" />
      </NuxtLink>
    </div>

    <nav class="desktop-menu">
      <NuxtLink to="/oplevelseskort">Oplevelseskort</NuxtLink>
      <NuxtLink to="/eventkalender">Eventkalender</NuxtLink>
      <NuxtLink to="/danmarks-bedste">Danmarks Bedste</NuxtLink>

      <div class="desktop-dropdown">
        <button class="desktop-dropdown-btn">
          Guides <span class="arrow">▼</span>
        </button>
        <div class="desktop-dropdown-content">
          <NuxtLink to="/guides/landsdele">Landsdele</NuxtLink>
          <NuxtLink to="/guides/temaer">Temaer</NuxtLink>
        </div>
      </div>

      <NuxtLink to="/om-os">Om os</NuxtLink>
      <NuxtLink to="/klubdanmark" class="cta-btn">KlubDanmark</NuxtLink>
    </nav>

    <div class="burger" @click="toggleMenu">
      <span></span><span></span><span></span>
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
  padding: 0 2rem;
  height: 72px; /* NEW */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  height: 2rem;
}

/* DESKTOP NAV */
.desktop-menu {
  display: none;
  gap: 4px;
  align-items: center;
  height: 100%; /* NEW */
}

.desktop-menu a,
.desktop-dropdown-btn {
  font-size: 0.9rem;
  font-weight: 500;
  color: #111;
  padding: 6px 14px;
  border-radius: 999px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.18s ease;
  text-decoration: none;
  white-space: nowrap;
}

.desktop-menu a:hover,
.desktop-dropdown-btn:hover {
  background: #f0f0f0;
}

/* Active page pill */
.desktop-menu .router-link-active:not(.cta-btn) {
  background: #f0f0f0;
  font-weight: 600;
}

/* CTA BUTTON */
.cta-btn {
  background: #d33 !important;
  color: white !important;
  padding: 8px 18px !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
}

.cta-btn:hover {
  background: #b82828 !important;
}

/* DROPDOWN */
.desktop-dropdown {
  position: relative;
}

.desktop-dropdown-content {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: white;
  border: 1px solid #eee;
  padding: 6px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  flex-direction: column;
  min-width: 140px;
  z-index: 100;
}

.desktop-dropdown:hover .desktop-dropdown-content {
  display: flex;
}

.desktop-dropdown-content a {
  border-radius: 8px !important;
  padding: 8px 14px !important;
  margin-bottom: 2px;
  font-size: 0.875rem;
  color: #111;
}

.desktop-dropdown-content a:hover {
  background: #f0f0f0;
}

.arrow {
  font-size: 0.65rem;
  margin-left: 3px;
}

/* BURGER */
.burger {
  width: 1.75rem;
  height: 1.375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.burger span {
  height: 3px;
  background: black;
  border-radius: 3px;
}

/* MOBILE MENU */
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
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
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

.arrow.open {
  display: inline-block;
  transform: rotate(180deg);
}

.dropdown-content {
  margin-top: 0.625rem;
  padding-left: 0.9375rem;
}

.dropdown-content li {
  margin-bottom: 0.75rem;
}

/* DESKTOP BREAKPOINT */
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