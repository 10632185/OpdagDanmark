<script setup>
import { ref, onMounted } from "vue";

const visitors = ref(0);
const downloads = ref(0);
const followers = ref(0);

function count(refVar, target) {
  let current = 0;
  const step = Math.ceil(target / 100);

  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      refVar.value = target;
      clearInterval(interval);
    } else {
      refVar.value = current;
    }
  }, 20);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

onMounted(() => {
  count(visitors, 2200000);
  count(downloads, 170000);
  count(followers, 85000);
});
</script>

<template>
  <!-- FULL WIDTH HERO -->
  <div class="hero">
    <div class="hero-content"></div>
  </div>

  <!-- PAGE CONTENT -->
  <div class="om-os">

    <section class="intro">
      <h1>Om os</h1>
      <p>Vi vil gøre det nemmere at opdage alt det smukke, Danmark har at byde på.</p>
    </section>

    <section class="numbers">
      <h2>OpdagDanmark i tal</h2>

      <div class="stats">
        <div class="stat">
          <h3>{{ formatNumber(visitors) }}+</h3>
          <p>Besøgende i 2025</p>
        </div>

        <div class="stat">
          <h3>{{ formatNumber(downloads) }}+</h3>
          <p>App downloads</p>
        </div>

        <div class="stat">
          <h3>{{ formatNumber(followers) }}+</h3>
          <p>Følgere på SoMe</p>
        </div>
      </div>
    </section>

    <section class="who">
      <h2>Hvem er vi?</h2>

      <p>
        OpdagDanmark er en travel‑tech startup fra Aalborg, grundlagt i 2019.
        Vi udvikler digitale løsninger, der gør det nemmere at finde vej til alt,
        hvad Danmark har at tilbyde — fra vandrestier til cykelruter til lokale oplevelser.
      </p>

      <div class="founders">
        <div class="founder">
          <div class="img lise"></div>
          <p class="name">Lars Stenvits‑Jensen</p>
          <p class="role">Co‑founder</p>
        </div>

        <div class="founder">
          <div class="img sebastian"></div>
          <p class="name">Sebastian Søndergård</p>
          <p class="role">Co‑founder</p>
        </div>
      </div>
    </section>

    <section class="vision">
      <h2>Hvad vi tror på</h2>

      <div class="vision-grid">
        <div class="vision-box">
          <h3>Datadrevne oplevelser</h3>
          <p>Vi leverer skræddersyet information baseret på brugerens placering og interesser.</p>
        </div>

        <div class="vision-box">
          <h3>Data i danske hænder</h3>
          <p>Vi sikrer at data og værdier forbliver i Danmark.</p>
        </div>

        <div class="vision-box">
          <h3>Direkte forbindelse</h3>
          <p>Vi forbinder brugere og turisterhverv uden dyre mellemled.</p>
        </div>
      </div>
    </section>

  </div>

  <!-- FULL WIDTH CTA -->
  <section class="cta">
    <h2>Klar til at opdage Danmark?</h2>
    <p>Download appen og bliv en del af fællesskabet, der gør det nemmere at udforske Danmark.</p>
    <button>Kom i gang →</button>
  </section>

</template>

<style scoped>
html, body, .om-os {
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

/* FULL WIDTH HERO */
.hero {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  width: 100vw;
  height: 260px;
  background-image: url("../public/img/opdagDanmarkHeroimg.jpeg");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0));
}

.hero-content {
  position: relative;
  padding: 24px;
  color: white;
  text-align: center;
}

/* PAGE CONTENT */
.om-os {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 0 20px;
  font-family: system-ui, sans-serif;
}

/* INTRO */
.intro {
  text-align: center;
}

.intro h1 {
  font-size: 2.4rem;
  font-weight: 700;
}

/* NUMBERS */
.numbers {
  text-align: center;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}

.stat h3 {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
}

/* WHO */
.who {
  text-align: center;
}

/* FOUNDERS */
.founders {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
}

.founder {
  text-align: center;
}

.founder .name {
  font-weight: 700;
  margin-top: 12px;
}

.founder .role {
  color: #666;
  font-size: 0.9rem;
}

/* PERFECT ROUND IMAGES */
.img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
}

.img::before {
  content: "";
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.img.lise::before {
  background-image: url("https://thispersondoesnotexist.com/");
}

.img.sebastian::before {
  background-image: url("https://thispersondoesnotexist.com/");
}

/* VISION */
.vision {
  text-align: center;
}

.vision-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
}

.vision-box {
  width: 100%;
  max-width: 420px;
  min-height: 240px;
  background: #f3f3f3;
  padding: 28px;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* FULL WIDTH CTA */
.cta {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  width: 100vw;
  background: #111;
  color: white;
  text-align: center;

  padding: 60px 20px; /* inside spacing */

  margin-top: 30px;   /* spacing ABOVE the CTA */
}


.cta button {
  margin-top: 16px;
  padding: 12px 24px;
  background: #ff7a00;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
}

/* FULL WIDTH BOTTOM IMAGE */
.bottom-img {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  width: 100vw;
  height: 260px;
  background-image: url("https://source.unsplash.com/1600x900/?denmark,nature");
  background-size: cover;
  background-position: center;
}

/* DESKTOP */
@media (min-width: 900px) {
  .hero {
    height: 420px;
  }

  .stats {
    flex-direction: row;
    justify-content: space-between;
  }

  .founders {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }

  .vision-grid {
    flex-direction: row;
    justify-content: center;
  }

  .vision-box {
    max-width: 320px;
    min-height: 260px;
  }

  .bottom-img {
    height: 360px;
  }
}
</style>
