<template>
  <footer class="footer">
    <div class="footer-container">

      <div class="footer-columns">

        <div class="col">
          <h3>Aktuelt</h3>
          <ul>
            <li><NuxtLink to="/oplevelseskort">Oplevelseskort</NuxtLink></li>
            <li><NuxtLink to="/klubdanmark">Klub Danmark</NuxtLink></li>
            <li><NuxtLink to="/danmarks-bedste">Danmarks Bedste</NuxtLink></li>
            <li><NuxtLink to="/om-os">Om os</NuxtLink></li>
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
          <a target="_blank" href="https://www.facebook.com/opdagdanmark/">
            <img src="../public/svg/square-facebook-brands-solid-full (1).svg" />
          </a>
          <a target="_blank" href="https://www.instagram.com/opdagdanmark/">
            <img src="../public/svg/square-instagram-brands-solid-full (1).svg" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/company/opdagdanmark/">
            <img src="../public/svg/linkedin-brands-solid-full.svg" />
          </a>
          <a href="mailto:info@opdagdanmark.dk">
            <img src="../public/svg/envelope-solid-full.svg" />
          </a>
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
  padding: 60px 20px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  gap: 60px;
}

.footer-columns {
  display: flex;
  gap: 60px;
  flex: 1;
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

.footer-right {
  min-width: 240px;
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
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
  opacity: 0.85;
}

.socials img:hover {
  opacity: 1;
}

@media (max-width: 1024px) {
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

@media (max-width: 768px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .footer-container {
    gap: 40px;
  }

  .socials {
    justify-content: flex-start;
  }
}
</style>