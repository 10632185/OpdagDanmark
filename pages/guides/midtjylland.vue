<script setup>

</script>

<template>

    <section class="nordjylland-hero">
        <img src="../../public/img/midtjylland.webp" alt="" />
        <div class="nordjylland-hero-overlay"></div>
        <h1 class="pacifico">Midtjylland</h1>
        <p>Find tusinde af oplevelser og begivenheder her!</p>
    </section>

    <section class="nordjylland-content">
        <h2>Guide til din rejse i Midtjylland</h2>

        <p>Midtjylland byder på et væld af oplevelser for både store og små! Hvad end I er til den storslået midtjyske natur eller til det pulserende byliv, så indeholder Midtjylland det hele. Vi har samlet de bedste oplevelser, spisesteder og overnatningsmuligheder i Midtjylland, så I nemt kan finde ud af, hvor turen skal gå hen næste gang. </p>

        <p>I Midtjylland har du mulighed for at slippe jeres indre barn løs, fordybe jer i både historie og kultur eller snøre vandreskoene og tag på opdagelse i den storslåede midtjyske natur. </p>

        <p>I Midtjylland kan du besøge faktastiske spisesteder og få smagsoplevelser, som du sent vil glemme. Hvad end du er til helaftensoplevelser på prisbelønnet restauranter eller blot en bid brød - Så kan Midtjylland tilbyde det hele. </p>

        <p>Midtjylland byder på et hav af overnatningsmuligheder - Er I til camping i den midtjyske natur, den autentiske stemning i storbyen, luksusferie på et lækkert hotel eller et sommerhus i første parket til vandet? </p>
    </section>

    <section class="nordjylland-image-grid">
        <img src="../../public/img/landsdele/midtjylland/midtjylland1.jpg" alt="" />
        <img src="../../public/img/landsdele/midtjylland/midtjylland2.jpg" alt="" />
        <img src="../../public/img/landsdele/midtjylland/midtjylland3.jpg" alt="" />
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
