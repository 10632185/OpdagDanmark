<script setup>
const route = useRoute();

const {
  data: post,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `danmarksbedste-${route.params.id}`,
  async () => {
    const id = route.params.id;

    const item = await $fetch(
      `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/danmarksbedste/${id}`,
    );

    let billede = null;

    if (item.acf?.billede) {
      const media = await $fetch(
        `http://xn--lynghjsolutions-9tb.dk/wp-json/wp/v2/media/${item.acf.billede}`,
      );
      billede = media.source_url;
    }

    return { ...item, billede };
  },
);

watchEffect(() => {
  console.log("brodtekst:", post.value?.acf?.brodtekst);
  console.log("full acf:", post.value?.acf);
});

const showVotePopup = ref(false);
const selectedPizza = ref("");

const pizzaPlaces = [
  "Azzurra Nordkraft",
  "SanGiovanni",
  "Fontænen",
  "Pizza Mia",
  "Mammas Pizza",
  "Gorm's Aalborg",
];

const submitVote = () => {
  if (!selectedPizza.value) return;

  window.location.reload();
};

const showNominatePopup = ref(false);
const nominatedPizza = ref("");

const submitNomination = () => {
  if (!nominatedPizza.value.trim()) return;

  window.location.reload();
};
</script>

<template>
  <section v-if="post && post.acf" class="event-wrapper">
    <div
      class="event-hero"
      :style="{ backgroundImage: 'url(' + post.billede + ')' }"
    >
      <div class="event-date-badge">
        <span>{{ post.acf.dato }}</span>
      </div>
    </div>

    <div class="event-content">
      <h1 class="event-title">{{ post.acf.titel }}</h1>

      <p class="event-subtitle">
        {{ post.acf.adresse || "Tid ikke angivet" }}
      </p>

      <div class="event-info-box">
        <p><strong>DATO:</strong> {{ post.acf.dato }}</p>
      </div>

      <p class="event-description" v-html="post.acf.brodtekst"></p>

      <div class="event-buttons">
        <button class="btn-primary" @click="showVotePopup = true">
          Stem her
        </button>

        <button class="btn-secondary" @click="showNominatePopup = true">
          Nominer
        </button>
      </div>
    </div>

    <div
      v-if="showVotePopup"
      class="vote-popup-overlay"
      @click.self="showVotePopup = false"
    >
      <div class="vote-popup">
        <h2>Stem på Danmarks bedste pizzasted</h2>

        <div
          v-for="pizza in pizzaPlaces"
          :key="pizza"
          class="vote-option"
        >
          <label>
            <input
              v-model="selectedPizza"
              type="radio"
              :value="pizza"
            />
            {{ pizza }}
          </label>
        </div>

        <div class="vote-popup-buttons">
          <button
            class="popup-cancel"
            @click="showVotePopup = false"
          >
            Luk
          </button>

          <button
            class="popup-submit"
            @click="submitVote"
          >
            Stem
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showNominatePopup"
      class="vote-popup-overlay"
      @click.self="showNominatePopup = false"
    >
      <div class="vote-popup">
        <h2>Nominer et pizzaria</h2>

        <input
          v-model="nominatedPizza"
          type="text"
          placeholder="Indtast navnet på pizzariaet"
          class="nominate-input"
        />

        <div class="vote-popup-buttons">
          <button
            class="popup-cancel"
            @click="showNominatePopup = false"
          >
            Luk
          </button>

          <button
            class="popup-submit"
            @click="submitNomination"
          >
            Nominer
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.event-hero {
  width: 100%;
  height: 380px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.event-date-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.event-content {
  margin-top: 2rem;
}

.event-title {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}

.event-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.event-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.event-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: 0.2s ease;
}

.btn-primary {
  background: #dd3333;
  color: white;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: white;
  border: 2px solid #dd3333;
  color: #dd3333;
}

.btn-secondary:hover {
  background: #dd3333;
  color: white;
}

.event-info-box {
  background: #f7f7f7;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  line-height: 1.6;
  margin-block: 1rem;
}

.vote-popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.vote-popup {
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 16px;
}

.vote-popup h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.vote-option {
  margin-bottom: 12px;
}

.vote-option label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.vote-popup-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.popup-cancel,
.popup-submit {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.popup-cancel {
  background: #f2f2f2;
}

.popup-submit {
  background: #dd3333;
  color: white;
}

.nominate-input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
}
</style>