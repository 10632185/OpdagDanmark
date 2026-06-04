<script setup>

</script>

<template>

    <section class="nordjylland-hero">
        <img src="../../public/img/sydjylland.webp" alt="" />
        <div class="nordjylland-hero-overlay"></div>
        <h1 class="pacifico">Sydjylland</h1>
        <p>Find tusinde af oplevelser og begivenheder her!</p>
    </section>

    <section class="nordjylland-content">
        <h2>Guide til din rejse i Sydjylland</h2>

        <p>Sydjylland byder på fantastisk natur og dramatisk historie, som skaber mindeværdige oplevelser for hele familien. Desuden er den sydlige del af Jylland indehaver af Danmarks ældste by Ribe og verdens mest populære stykke legetøj LEGO. </p>

        <p>Sydjylland indeholder oplevelser for alle - hvad end I kan lide den smukke natur, de historiske omgivelser eller har brug for at slippe jeres indre barn løs, så byder det sydjyske på noget for jer. </p>

        <p>I Sydjylland kan du få fantastiske smagsoplevelser - hvad end du er til en af landets bedste burgere, gastronomi på højt plan eller et lækkert traditionelt sønderjysk kaffebord. </p>

        <p>Er du til Glamping. sommerhuse ved havet eller luksuriøse hoteller, så byder det sydjyske det hele. Der er masser af muligheder for overnatning for både børnefamilier eller, hvis I blot er afsted alene. </p>
    </section>

    <section class="nordjylland-image-grid">
        <img src="../../public/img/landsdele/sydjylland/sydjylland1.jpg" alt="" />
        <img src="../../public/img/landsdele/sydjylland/sydjylland2.jpg" alt="" />
        <img src="../../public/img/landsdele/sydjylland/sydjylland3.jpg" alt="" />
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
