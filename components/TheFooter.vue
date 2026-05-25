<script setup>

</script>

<template>

  <footer class="footer">
    <div class="footer-container">

      <!-- Aktuelt, Guides og For virksomheder er sat op i 3 columns-->
      <div class="footer-columns">
        <div class="col">
          <h3>Aktuelt</h3>
          <ul>
            <li><a href="#">Oplevelsesgaver</a></li>
            <li><a href="#">Julemarkeder</a></li>
            <li><a href="#">Halloween</a></li>
            <li><a href="#">Tilbud på hotel-ophold</a></li>
          </ul>
        </div>

        <div class="col">
          <h3>Guides</h3>
          <ul>
            <li><a href="#">Nordjylland</a></li>
            <li><a href="#">Midtjylland</a></li>
            <li><a href="#">Sydjylland</a></li>
            <li><a href="#">Fyn & øer</a></li>
            <li><a href="#">Sjælland & øer</a></li>
          </ul>

          <ul class="sub">
            <li><a href="#">Vandreruter</a></li>
            <li><a href="#">Cykelruter</a></li>
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
          <a href="#"><img src="" alt="Facebook" /></a>
          <a href="#"><img src="" alt="Instagram" /></a>
          <a href="#"><img src="" alt="LinkedIn" /></a>
          <a href="#"><img src="" alt="Email" /></a>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #2b2b2b;
  color: white;
  padding: 50px 20px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  max-width: 1400px;
  margin: auto;
}

.footer-columns {
  display: flex;
  gap: 50px;
}

.col h3 {
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
}

.col a:hover {
  opacity: 1;
}

.footer-right {
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
</style>
