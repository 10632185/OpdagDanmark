<script setup>

</script>

<template>

    <section class="nordjylland-hero">
        <img src="../../public/img/landsdele/fyn/fyn2.jpg" alt="" />
        <div class="nordjylland-hero-overlay"></div>
        <h1 class="pacifico">Fyn</h1>
        <p>Find tusinde af oplevelser og begivenheder her!</p>
    </section>

    <section class="nordjylland-content">
        <h2>Guide til din rejse på Fyn</h2>

        <p>På Fyn kan du opleve alt lige fra betagende naturoplevelser, gode shoppingmuligheder til et rigt kulturliv. Vi guider dig til alt det bedste, som Fyn har at byde på.</p>

        <p>Fyn byder på et væld af mindeværdige oplevelser - uanset om I besøger øen med eller uden børn. Her har vi samlet en oversigt over de steder på Fyn, som klart er et besøg værd.</p>

        <p>Fyn byder på et væld af spændende gastronomiske oplevelser, og I kan opleve alt lige fra gourmet til små hyggelige caféer. Her kan du finde vores anbefalinger til spisesteder og smagsoplevelser, som fortjener et besøg.</p>

        <p>Uanset om I er til familievenlige campingpladser romantiske slotsophold eller et hyggeligt kroophold, har Fyn det hele.  </p>
    </section>

    <section class="nordjylland-image-grid">
        <img src="../../public/img/landsdele/fyn/fyn1.jpg" alt="" />
        <img src="../../public/img/landsdele/fyn/fyn2.jpg" alt="" />
        <img src="../../public/img/landsdele/fyn/fyn3.jpg" alt="" />
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

</style>
