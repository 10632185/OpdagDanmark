<script setup>
import { ref } from "vue";
// import { ref } betyder at vi henter ref-funktionen fra Vue. ref bruges til at lave reaktive værdier, som Vue automatisk opdaterer i den visuelle frontend del, når deres indhold ændrer sig.


// menuOpen er en reaktiv variabel, der starter som false. ref(false) betyder: "lav en reaktiv boolean-værdi, der lige nu er false"..value bruges til at læse/ændre værdien inde i ref'en.
const menuOpen = ref(false);

// guidesOpen fungerer på samme måde, men styrer om 'Guides'-dropdownen er åben.
const guidesOpen = ref(false);


// toggleMenu er en funktion, der skifter menuOpen mellem true og false. !menuOpen.value betyder: "modsatte af den nuværende værdi" så hvis menuOpen.value er false  bliver den true, og derefter omvendt iforhold til knappens værdi.
const toggleMenu = () => (menuOpen.value = !menuOpen.value);

// toggleGuides gør præcis det samme, men for guidesOpen. Det er en simpel måde at lave en "åbn/luk" funktion.
const toggleGuides = () => (guidesOpen.value = !guidesOpen.value);
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
          Guides
          <span class="arrow">▼</span>
        </button>

        <div class="desktop-dropdown-content">
          <NuxtLink to="/guides/landsdele">Landsdele</NuxtLink>
        </div>
      </div>

      <NuxtLink to="/om-os">Om os</NuxtLink>
    </nav>

    <div class="cta-area">
      <NuxtLink to="/klubdanmark" class="cta-btn">KlubDanmark</NuxtLink>
    </div>

    <div class="burger" :class="{ open: menuOpen }" @click="toggleMenu">
      <span></span><span></span><span></span>
    </div>
  </header>

  <div class="menu-backdrop" :class="{ open: menuOpen }" @click="menuOpen = false"></div>

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
        </ul>
      </li>

      <li><NuxtLink to="/om-os">Om Os</NuxtLink></li>
    </ul>

    <NuxtLink to="/klubdanmark" class="cta-bottom">KlubDanmark</NuxtLink>
  </nav>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: white;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.logo-area {
  flex: 1;
  display: flex;
  align-items: center;
}

.logo {
  height: 2rem;
}

.desktop-menu {
  display: none;
  gap: 4px;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.desktop-menu a,
.desktop-dropdown-btn {
  font-size: 0.9rem;
  font-weight: 500;
  color: #111;
  padding: 6px 14px;
  border-radius: 50px;
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

.desktop-menu .router-link-active {
  background: #f0f0f0;
  font-weight: 600;
}

.cta-area {
  flex: 1;
  display: none;
  justify-content: flex-end;
  align-items: center;
}

.cta-btn {
  background: #dd3333;
  color: white !important;
  padding: 8px 18px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.18s ease;
}

.cta-btn:hover {
  background: #962323;
}

.desktop-dropdown {
  position: relative;
}

.desktop-dropdown-btn {
  display: flex;
  align-items: center;
  gap: 4px;
   font-family: "Montserrat", sans-serif;
}

.desktop-dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
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

.desktop-dropdown:hover .desktop-dropdown-content,
.desktop-dropdown-content:hover {
  display: flex;
}

.desktop-dropdown-content a {
  border-radius: 50px;
  padding: 8px 14px;
  margin-bottom: 2px;
  font-size: 0.875rem;
  color: #111;
  text-decoration: none;
}

.desktop-dropdown-content a:hover {
  background: #f0f0f0;
}

.arrow {
  font-size: 0.65rem;
  margin-left: 3px;
  display: inline-block;
  transition: transform 0.2s ease;
}

.desktop-dropdown:hover .arrow {
  transform: rotate(180deg);
}

.burger {
  width: 1.75rem;
  height: 1.375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.burger span {
  height: 3px;
  background: black;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.burger.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger.open span:nth-child(2) {
  opacity: 0;
}

.burger.open span:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}

.menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 900;
}

.menu-backdrop.open {
  opacity: 1;
  pointer-events: all;
}

.mobile-menu {
  position: fixed;
  right: -100%;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: white;
  padding: 4rem 2rem;
  transition: right 0.3s ease;
  z-index: 998;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}

.mobile-menu.open {
  right: 0;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.mobile-menu li {
  margin-bottom: 1.75rem;
}

.mobile-menu a,
.dropdown-btn {
  font-size: 1.35rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  display: block;
}

.dropdown-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-content {
  margin-top: 0.75rem;
  padding-left: 1rem;
}

.dropdown-content a {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.cta-bottom {
  background: #DD3333;
  color: white !important;
  text-align: center;
  padding: 14px 0;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
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

  .cta-area {
    display: flex;
  }
}
</style>
