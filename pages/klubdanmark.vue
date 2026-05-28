<template>
    <section class="hero-banner">
    <img src="../public/img/klubdanmark.webp" alt="">

    <div class="hero-banner-overlay"></div>

    <h1 class="pacifico">Klub Danmark</h1>
    <p>Få fordele og besparelser!</p>
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

    background:
        linear-gradient(
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
}
</style>