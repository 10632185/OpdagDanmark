<script setup>

</script>

<template>

  <footer class="footer">
    <div class="footer-container">

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
  width: 100%;
  margin: 0; 
  padding: 50px 20px;
  background: #2b2b2b;
  color: white;
}

.footer-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  gap: 40px;
}


.footer-columns {
  display: flex;
  flex-wrap: wrap; 
  gap: 40px;
  flex: 1;
  min-width: 260px;
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
  min-width: 260px;
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

@media (max-width: 900px) {

  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 40px;
  }

  .footer-columns {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
    
  }

  .col {
    width: 100%;
  }

  .col ul {
    text-align: center;
  }

  .footer-right {
    text-align: center;
  }

  .socials {
    justify-content: center;
  }
}
</style>
