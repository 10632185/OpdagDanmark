<script setup>
const menuOpen = ref(false);
const guidesOpen = ref(false);
const desktopGuidesOpen = ref(false);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const toggleGuides = () => (guidesOpen.value = !guidesOpen.value);
const toggleDesktopGuides = () =>
  (desktopGuidesOpen.value = !desktopGuidesOpen.value);

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".desktop-dropdown")) {
      desktopGuidesOpen.value = false;
    }
  });
});
</script>

<template>
  <header class="header">
    <div class="logo-area">
      <NuxtLink to="/">
        <img
          src="../public/img/opdagdanmark_logo.png"
          alt="Logo"
          class="logo"
        />
      </NuxtLink>
    </div>

    <nav class="desktop-menu">
      <NuxtLink to="/oplevelseskort">Oplevelseskort</NuxtLink>
      <NuxtLink to="/eventkalender">Eventkalender</NuxtLink>
      <NuxtLink to="/danmarks-bedste">Danmarks Bedste</NuxtLink>

      <div class="desktop-dropdown">
        <button class="desktop-dropdown-btn" @click.stop="toggleDesktopGuides">
          Guides
          <span class="arrow" :class="{ open: desktopGuidesOpen }">▼</span>
        </button>
        <div
          class="desktop-dropdown-content"
          :class="{ open: desktopGuidesOpen }"
        >
          <NuxtLink to="/guides/landsdele" @click="desktopGuidesOpen = false"
            >Landsdele</NuxtLink
          >
        </div>
      </div>

      <NuxtLink to="/om-os">Om os</NuxtLink>
    </nav>

    <div class="cta-area">
      <NuxtLink to="/klubdanmark" class="cta-btn">KlubDanmark</NuxtLink>
    </div>

    <div class="burger" @click="toggleMenu">
      <span></span><span></span><span></span>
    </div>
  </header>

  <div
    class="menu-backdrop"
    :class="{ open: menuOpen }"
    @click="menuOpen = false"
  ></div>

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

.desktop-dropdown-btn{
  font-family: "Montserrat", sans-serif;
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

.cta-area {
  flex: 1;
  display: none;
  justify-content: flex-end;
  align-items: center;
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

.cta-btn {
  background: #d33;
  color: white !important;
  padding: 8px 18px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.18s ease;
  white-space: nowrap;
}

.cta-btn:hover {
  background: #b82828;
}

/* DESKTOP DROPDOWN */
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

.desktop-dropdown-content.open {
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

.arrow.open {
  transform: rotate(180deg);
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

/* BACKDROP */
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

/* MOBILE MENU */
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

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
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


.mobile-menu.open {
  right: 0;
}

.mobile-menu li {
  margin-bottom: 1.75rem;
}

.mobile-menu a,
.dropdown-btn {
  font-size: 1.35rem;
  font-weight: 600;
  color: #000000;
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

  .cta-area {
    display: flex;
  }
}
</style>
