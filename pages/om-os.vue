<script setup>

useHead({
  title: 'Om Os - OpdagDanmark'
})

import { ref, onMounted } from "vue";

// Definerer variabler som skal holde styr på vores tal for besøgende, downloads og følgere, som vi vil animere op til deres respektive mål.
const visitors = ref(0);
const downloads = ref(0);
const followers = ref(0);

// Her er vores funktion der laver en "tælle" animation. Den starter fra 0, og tæller op imod det bestemte target (kommer senere).
function count(refVar, target) {
  let current = 0;
  // Her siger vi hvor meget tallet skal øges med hver gang.
  const step = Math.ceil(target / 100);

  // Bestemmer hvor hurtigt tallet skal tælle op ved at sætte et interval, som kører hver 20 millisekund.
  const interval = setInterval(() => {
    current += step;
    // Hvis vi når målet stopper vi og sætter værdien præcist til det.
    if (current >= target) {
      refVar.value = target;
      clearInterval(interval);
    } else {
      // Hvis ikke opdaterer vi igen og animationen fortsætter.
      refVar.value = current;
    }
  }, 20);
}
// Her er en funktion der formaterer vores tal med punktum som sepererer ved tusinder, så det er nemmere at læse for brugeren. F.eks. vil 2200000 blive vist som 2.200.000.
// Da vi havde problemer med hvordan vi kunne det, er nedenstående funktion inspireret af denne StackOverflow tråd: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators-in-javascript
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// onMounted betyder her at koden først kører når komponentet er loadet. Ved det undgår vi at en person med langsomt net kommer ind hvor den allerede er hel eller halvejs færdig med animationen.
onMounted(() => {
  // Definerer vores tre count funktioner for hver af vores tal, hvor vi sætter det endelige mål for hver. Altså siger vi den skal tælle, samt hvad den skal tælle til. I dette tilfælde tæller vi op til 2.200.000 for besøgende, 170.000 for downloads og 85.000 for følgere.
  count(visitors, 2200000);
  count(downloads, 170000);
  count(followers, 85000);
});
</script>

<template>
<section class="hero-banner">
  <img src="../public/img/opdagDanmarkHeroimg.jpeg" alt="">
  <div class="hero-banner-overlay"></div>
  <h1 class="pacifico">Om os</h1>
  <p>Hvem er vi, og hvad er vores mål?</p>
</section>

<div class="om-os">
  <section class="numbers">
    <div class="numbers-inner">
      <div class="numbers-left">
        <h2>OpdagDanmark i tal</h2>
      </div>
      <div class="numbers-right">
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
    </div>
  </section>

  <section class="who">
    <div class="who-inner">
      <div class="who-left">
        <h2>Hvem er vi?</h2>
        <p>
          OpdagDanmark er en travel-tech startup fra Aalborg, grundlagt i 2019. Vi
          udvikler digitale løsninger, der gør det nemmere at finde vej til alt,
          hvad Danmark har at tilbyde - fra vandrestier til cykelruter til lokale
          oplevelser.
        </p>
      </div>

      <div class="who-right">
        <div class="founders">
          <div class="founder">
            <div class="img">
              <img src="../public/img/OpdagDanmarkMedlemmer/LauOpdagDanmark.png" alt="Lau Stacke-Jensen">
            </div>
            <p class="name">Lau Stacke-Jensen</p>
            <p class="role">Founder</p>
          </div>

          <div class="founder">
            <div class="img">
              <img src="../public/img/OpdagDanmarkMedlemmer/SebastianOpdagDanmark.png" alt="Sebastian Søndergård">
            </div>
            <p class="name">Sebastian Søndergård</p>
            <p class="role">Co-founder</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="vision">
    <div class="vision-inner">
      <h2>Hvad vi tror på</h2>
      <div class="vision-grid">
        <div class="vision-box">
          <div class="icon-box">
            <span class="icon"><img src="/svg/chart-line-solid-full.svg" alt=""></span>
          </div>
          <h3>Datadrevne oplevelser</h3>
          <p>Vi leverer skræddersyet information baseret på brugerens placering og interesser.</p>
        </div>

        <div class="vision-box">
          <div class="icon-box">
            <span class="icon"><img src="/svg/server-solid-full.svg" alt=""></span>
          </div>
          <h3>Data i danske hænder</h3>
          <p>Vi sikrer at data og værdier forbliver i Danmark.</p>
        </div>

        <div class="vision-box">
          <div class="icon-box">
            <span class="icon"><img src="/svg/link-solid-full.svg" alt=""></span>
          </div>
          <h3>Direkte forbindelse</h3>
          <p>Vi forbinder brugere og turisterhverv uden dyre mellemled.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<section class="cta">
  <div class="cta-container">
    <div class="cta-video">
      <iframe
        src="https://www.youtube.com/embed/Lc_TUZdbRp0"
        title="YouTube video"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <div class="cta-content">
      <h2>Klar til at opdage Danmark?</h2>
      <p>Download appen og bliv en del af fællesskabet, der gør det nemmere at udforske Danmark.</p>
      <button>Kom i gang →</button>
    </div>
  </div>
</section>
</template>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.1) 100%);
  box-shadow: inset 0 -120px 120px rgba(0,0,0,0.45), inset 0 40px 60px rgba(0,0,0,0.15);
  z-index: 1;
}

.hero-banner h1,
.hero-banner p {
  position: relative;
  z-index: 2;
  color: white;
  margin-left: 80px;
}

.hero-banner h1 {
  position: absolute;
  bottom: 70px;
  font-size: 4rem;
  font-weight: 700;
}

.hero-banner p {
  position: absolute;
  bottom: 35px;
  font-size: 1.5rem;
  font-weight: 400;
}



.om-os {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 0 20px;
}

.om-os h2 {
  color: #0F172A;
}

.numbers {
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  padding: 60px 24px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  margin-top: 2rem;
  width: 1200px;
}

.numbers-inner {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.numbers-left h2 {
  font-size: 1.75rem;
  font-weight: 700;
}

.numbers-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stat {
  text-align: left;
}

.stat h3 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
}

.stat p {
  margin: 4px 0 0;
  font-size: 0.85rem;
}

.who {
  background: #FFFFFF;
  display: flex;
  justify-content: center;
}

.who-inner {
  width: 100%;
  max-width: 900px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: center;
}

.who-left h2 {
  font-size: 1.75rem;
  margin-bottom: 12px;
}

.who-left p {
  font-size: 0.95rem;
  line-height: 1.7;
}

.who-right {
  display: flex;
  justify-content: center;
}

.founders {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.founder {
  text-align: center;
}

.founder .name {
  font-weight: 600;
  margin-top: 10px;
  font-size: 0.9rem;
}

.founder .role {
  font-size: 0.75rem;
  margin-top: 2px;
}

.img {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  overflow: hidden;
  margin: 0 auto;
  border: 2px solid #d33;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vision {
  background: #FFFFFF;
  display: flex;
  justify-content: center;
}

.vision-inner {
  width: 100%;
  max-width: 900px;
}

.vision-inner h2 {
  font-size: 1.75rem;
  margin-bottom: 24px;
  text-align: left;
}

.vision-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

.vision-box {
  text-align: left;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  background: #EEF2FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.icon img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: brightness(0) saturate(100%);
}

.vision-box h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 600;
}

.vision-box p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748B;
}

.cta {
  margin-left: calc(50% - 50vw);
  background: #111;
  color: white;
  padding: 60px 20px;
  margin-top: 2rem;
}

.cta-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cta-video iframe {
  width: 100%;
  height: 240px;
  border-radius: 12px;
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  margin-bottom: 10px;
}

.cta-content button {
  margin-top: 16px;
  padding: 12px 24px;
  background: #DD3333;
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 1rem;
}

.cta-content button:hover{
background-color: #932626;
cursor: pointer;
}


@media (min-width: 900px) {
  .numbers-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .numbers-right {
    flex-direction: row;
    gap: 40px;
  }

  .stat {
    text-align: right;
  }

  .who-inner {
    grid-template-columns: 1.4fr 1fr;
  }

  .vision-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .cta-container {
    flex-direction: row;
    align-items: center;
    gap: 5rem;
  }

  .cta-video {
    flex: 2;
  }

  .cta-content {
    flex: 1;
    text-align: left;
  }

  .cta-video iframe {
    height: 360px;
  }
}

@media (max-width: 1024px) {
  .om-os {
    gap: 60px;
  }

  .numbers {
    width: 100%;
    margin-top: 2rem;
    padding: 50px 30px;
    text-align: center;
  }

  .numbers-inner {
    max-width: 100%;
  }

  .numbers-inner h3,
  .numbers-inner p {
    max-width: 100%;
    text-align: center;
  }

  .numbers-right {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .who-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .vision-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-container {
    gap: 40px;
  }

  .cta-video iframe {
    height: 320px;
  }
}

@media (max-width: 768px) {

  .hero-banner {
    height: 350px;
  }

  .hero-banner h1,
  .hero-banner p {
    margin-left: 25px;
  }

  .hero-banner h1 {
    font-size: 2.5rem;
    bottom: 65px;
  }

  .hero-banner p {
    font-size: 1rem;
    bottom: 35px;
  }

  .om-os {
    gap: 50px;
    padding: 0 16px;
  }

  .numbers {
    width: 100%;
    padding: 40px 20px;
    border-radius: 16px;
    text-align: center;
  }

  .numbers-left h2 {
    font-size: 1.5rem;
  }

  .numbers-right {
    flex-direction: column;
    gap: 24px;
  }

  .stat {
    text-align: left;
  }

  .stat h3 {
    font-size: 2rem;
  }

  .who-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .who-right {
    justify-content: center;
  }

  .vision-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .vision-inner h2,
  .who-left h2 {
    font-size: 1.5rem;
  }

  .cta {
    padding: 50px 20px;
  }

  .cta-video iframe {
    height: 220px;
  }

  .cta-content h2 {
    font-size: 1.5rem;
  }
}
</style>