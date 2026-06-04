<script setup>

</script>

<template>

    <section class="nordjylland-hero">
        <img src="../../public/img/landsdele/sjaelland/sjaelland3.jpg" alt="" />
        <div class="nordjylland-hero-overlay"></div>
        <h1 class="pacifico">Sjælland</h1>
        <p>Find tusinde af oplevelser og begivenheder her!</p>
    </section>

    <section class="nordjylland-content">
        <h2>Guide til din rejse på Sjælland</h2>

        <p>Sjælland byder på fantastiske oplevelser for både store og små. Vi har samlet en guide over alt det, som gør dit besøg på Sjælland til en mindeværdig oplevelse. </p>

        <p>Uanset om I gerne vil opleve natur, kultur, historie eller forlystelsesparker - så rummer Sjælland det hele. Nedenunder kan I få et overblik over de bedste oplevelser på Sjælland. </p>

        <p>Sjælland er en skattekiste med gode spisesteder og smagsoplevelser. Hvad end du er på udkig efter et hurtigt måltid eller den helt store gourmetoplevelse, er det hele at finde på Sjælland.</p>

        <p>En god nattesøvn skal der til, når du skal ud på oplevelse på Sjælland. Camping, badehoteller eller en tur på luksushotel er blot nogle af de muligheder, som du har på Sjælland.</p>
    </section>

    <section class="nordjylland-image-grid">
        <img src="../../public/img/landsdele/sjaelland/sjaelland1.jpg" alt="" />
        <img src="../../public/img/landsdele/sjaelland/sjaelland2.jpg" alt="" />
        <img src="../../public/img/landsdele/sjaelland/sjaelland3.jpg" alt="" />
    </section>

</template>

<style scoped>

.nordjylland-hero {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.nordjylland-hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nordjylland-hero-overlay {
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

.nordjylland-hero h1,
.nordjylland-hero p {
  position: relative;
  z-index: 2;
  color: white;
  margin-left: 80px;
}

.nordjylland-hero h1 {
  position: absolute;
  bottom: 70px;
  font-size: 4rem;
  font-weight: 700;
}

.nordjylland-hero p {
  position: absolute;
  bottom: 35px;
  font-size: 1.5rem;
  font-weight: 400;
}

.nordjylland-content {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
}

.nordjylland-content h2 {
  font-size: 2.4rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.nordjylland-content p {
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 18px;
}

.nordjylland-image-grid {
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.nordjylland-image-grid img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
}

@media (max-width: 768px) {
.nordjylland-hero h1{
  margin-left: 1rem;
  font-weight: 200;
  margin-bottom: 0.8rem;
}

.nordjylland-hero p {
  margin-left: 1.2rem;
  font-size: 1rem;
  margin-top: 2rem;
}
}
</style>
