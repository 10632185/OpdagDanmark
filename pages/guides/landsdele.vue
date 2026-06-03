<script setup>
import { onMounted } from "vue";

// onMounted for at lave en reveal effekt på vores landsdele kort, hvor vi bruger IntersectionObserver API til at tjekke om kortet er i viewporten, og hvis det er, så tilføjer vi en class der laver en animation på kortet.
onMounted(() => {
  //Finder alle elementer med klassen "landsdele-reveal", som er dem vi gerne vil lave effekten på.
  const cards = document.querySelectorAll(".landsdele-reveal");
  // Nu bruger vi intersectionobserver til at opdage når voes elementer kommer ind i viewporten. Altså når brugeren scroller ned forbi.
  const observer = new IntersectionObserver(
    (entries) => {
      //For hver entry (element) tjekker vi om den er i viewporten, hvis den så er det, så giver vi den classen "landsdele-active", som så laver animationen.
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("landsdele-active");
        }
      });
    },
    {
      // threshhold bestemmer hvor meget af elementet der skal være synligt for animationen aktiverer.
      threshold: 0.2,
    },
  );
    //Her starter vi observationen på hvert card.
  cards.forEach((card) => {
    observer.observe(card);
  });
});
</script>

<template>
  <section class="landsdele-hero">
    <img src="../../public/img/opdagDanmarkHeroimg.jpeg" alt="" />

    <div class="landsdele-hero-overlay"></div>

    <h1 class="pacifico">Guides - Landsdele</h1>
    <p>Find tusinde af oplevelser og begivenheder her!</p>
  </section>

  <section class="landsdele-wrapper">
    <div class="landsdele-card landsdele-reveal">
      <div class="landsdele-content">
        <h2>Nordjylland</h2>

        <p>
          Nordjylland byder på alt fra gastronomiske oplevelser til enestående
          naturoplevelser i den rå og til tider barske nordjyske natur.
        </p>

        <button>Gå til</button>
      </div>

      <div class="landsdele-image">
        <img src="../../public/img/nordjylland.webp" alt="" />
      </div>
    </div>

    <div class="landsdele-card landsdele-reverse landsdele-reveal">
      <div class="landsdele-content">
        <h2>Sjælland</h2>

        <p>Sjælland byder på fantastiske oplevelser for både store og små.</p>

        <button>Gå til</button>
      </div>

      <div class="landsdele-image">
        <img src="../../public/img/sjaelland.webp" alt="" />
      </div>
    </div>

    <div class="landsdele-card landsdele-reveal">
      <div class="landsdele-content">
        <h2>Fyn</h2>

        <p>På Fyn kan du opleve alt lige fra betagende naturoplevelser.</p>

        <button>Gå til</button>
      </div>

      <div class="landsdele-image">
        <img src="../../public/img/fyn.webp" alt="" />
      </div>
    </div>

    <div class="landsdele-card landsdele-reverse landsdele-reveal">
      <div class="landsdele-content">
        <h2>Midtjylland</h2>

        <p>Midtjylland byder på et væld af oplevelser for både store og små.</p>

        <button>Gå til</button>
      </div>

      <div class="landsdele-image">
        <img src="../../public/img/midtjylland.webp" alt="" />
      </div>
    </div>

    <div class="landsdele-card landsdele-reveal">
      <div class="landsdele-content">
        <h2>Sydjylland</h2>

        <p>Sydjylland byder på fantastisk natur og dramatisk historie.</p>

        <button>Gå til</button>
      </div>

      <div class="landsdele-image">
        <img src="../../public/img/sydjylland.webp" alt="" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.landsdele-hero {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;

  display: flex;
  align-items: flex-end;
}

.landsdele-hero img {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
  object-fit: cover;
}

.landsdele-hero-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.1) 100%
  );

  box-shadow:
    inset 0 -120px 120px rgba(0, 0, 0, 0.45),
    inset 0 40px 60px rgba(0, 0, 0, 0.15);

  z-index: 1;
}

.landsdele-hero h1,
.landsdele-hero p {
  position: relative;
  z-index: 2;

  color: white;
  margin-left: 80px;
}

.landsdele-hero h1 {
  position: absolute;
  bottom: 70px;

  font-size: 4rem;
  font-weight: 700;
}

.landsdele-hero p {
  position: absolute;
  bottom: 35px;

  font-size: 1.5rem;
  font-weight: 400;
}

.landsdele-wrapper {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 40px;
  display: flex;
  flex-direction: column;
  gap: 140px;
}

.landsdele-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;

  opacity: 0;
  transform: translateY(100px) scale(0.95);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.landsdele-card.landsdele-active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.landsdele-reverse {
  flex-direction: row-reverse;
}

.landsdele-content {
  flex: 1;
}

.landsdele-image {
  flex: 1;
}

.landsdele-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 30px;
  display: block;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
}

.landsdele-content button {
  margin-top: 30px;
  padding: 14px 32px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  color: #f9f9f9;
  background-color: #dd3333;

  backdrop-filter: blur(10px);

  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.landsdele-content button:hover {
  transform: translateY(-3px);
  opacity: 0.9;
}

@media (max-width: 900px) {
  .landsdele-card,
  .landsdele-reverse {
    flex-direction: column;
  }

  .landsdele-image img {
    height: 350px;
  }

  .landsdele-wrapper {
    padding: 80px 20px;
    gap: 100px;
  }

  .landsdele-hero {
    height: 350px;
  }

  .landsdele-hero h1,
  .landsdele-hero p {
    margin-left: 25px;
  }

  .landsdele-hero h1 {
    font-size: 2.5rem;
    bottom: 65px;
  }

  .landsdele-hero p {
    font-size: 1rem;
    bottom: 35px;
  }
}
</style>
