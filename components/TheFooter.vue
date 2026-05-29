<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-container">

      <!-- LEFT COLUMNS -->
      <div class="footer-columns">

        <div class="col">
          <h3>Aktuelt</h3>
          <ul>
            <li><a href="#">Oplevelseskort</a></li>
            <li><a href="#">KlubDanmark</a></li>
            <li><a href="#">Danmarks Bedste</a></li>
            <li><a href="#">Om os</a></li>
          </ul>
        </div>

        <div class="col">
          <h3>Guides</h3>
          <ul>
            <li><a href="#">Nordjylland</a></li>
            <li><a href="#">Midtjylland</a></li>
            <li><a href="#">Sydjylland</a></li>
            <li><a href="#">Fyn</a></li>
            <li><a href="#">Sjælland</a></li>
          </ul>   
        </div>

        <div class="col">
          <h3>For virksomheder</h3>
          <ul>
            <li><a href="#">Kom på OpdagDanmark</a></li>
            <li><a href="#">Partner login</a></li>
          </ul>

          <h4>Muligheder:</h4>
          <ul>
            <li><a href="#">Få din egen shop</a></li>
            <li><a href="#">Sælg gavekort online</a></li>
          </ul>
        </div>

      </div>

      <!-- RIGHT SIDE -->
      <div class="footer-right">
        <div class="company-info">
          <p><strong>OpdagDanmark ApS</strong></p>
          <p>Østre Alle 102<br />9000 Aalborg</p>
          <p>CVR: 40523162</p>
          <p>Tlf: 70 60 53 32</p>
          <p>Telefontid:<br />Man–tors 9–15.30<br />Fredag 9–14</p>
          <p>Mail: info@opdagdanmark.dk</p>
        </div>

        <div class="socials">
          <a target="_blank" href="https://www.facebook.com/opdagdanmark/"><img src="../public/svg/square-facebook-brands-solid-full (1).svg" alt="Facebook" /></a>
          <a target="_blank" href="https://www.instagram.com/opdagdanmark/"><img src="../public/svg/square-instagram-brands-solid-full (1).svg" alt="Instagram" /></a>
          <a target="_blank" href="https://www.linkedin.com/company/opdagdanmark/"><img src="../public/svg/linkedin-brands-solid-full.svg" alt="LinkedIn" /></a>
          <a href="mailto:info@opdagdanmark.dk"><img src="../public/svg/envelope-solid-full.svg" alt="Email" /></a>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>



.footer {
  width: 100%;
  background: #2b2b2b;
  color: white;
  padding: 50px 20px;
  box-sizing: border-box;
}

/* MAIN CONTAINER */
.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
}

/* DESKTOP — 4 columns */
.footer-columns {
  display: flex;
  flex: 1;
  gap: 60px;
  min-width: 600px;
}

.col h3,
.col h4 {
  margin-bottom: 10px;
}

.col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.col ul li {
  margin-bottom: 6px;
}

.col a {
  color: white;
  opacity: 0.8;
  text-decoration: none;
}

.col a:hover {
  opacity: 1;
}

/* RIGHT SIDE */
.footer-right {
  min-width: 260px;
  text-align: right;
}

.company-info p {
  margin: 4px 0;
}

.socials {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.socials img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.socials img:hover {
  opacity: 1;
}

.socials img {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
}

/* TABLET — 2 columns */
@media (max-width: 900px) {
  .footer-container {
    flex-direction: column;
    gap: 50px;
  }

  .footer-columns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .footer-right {
    text-align: left;
  }
}

/* MOBILE — 1 column */
@media (max-width: 600px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .footer-right {
    text-align: left;
  }

  .socials {
    justify-content: flex-start;
  }
}


</style>
