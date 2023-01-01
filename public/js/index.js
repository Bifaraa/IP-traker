
document.addEventListener('DOMContentLoaded', async () => {

  const map = L.map('map').setView([4.60971, -74.08175], 6);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

  // key de users
  const apiKey = 'at_QBqrUn7TA0pAuRcxav5w9dqNRkdU7';
  const botonIP = document.querySelector('.contenedor__img');
  const inputIP = document.querySelector('.input__ip');
  const spanIP = document.querySelector('.ip__address');
  const spanLocation = document.querySelector('.location')
  const spanTIME = document.querySelector('.time__zone')
  const spanISP = document.querySelector('.isp')
  
  botonIP.addEventListener('click', () => {
    peticion(inputIP.value);
  })

  const actualizarInfo = (data) => {
    spanIP.innerHTML = data.ip;
    let locationarray  = Object.values(data.location);
    spanLocation.innerHTML = locationarray[0] + ', ' + locationarray[1];
    spanTIME.innerHTML = locationarray[2];
    spanISP.innerHTML = data.isp;
    let lat = locationarray[3];
    let lng = locationarray[4];
    console.log(lat, lng);
    map.setView([lat, lng], 6);
    L.marker([lat, lng]).addTo(map);
  }

  const peticion = async (ip='') => {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`,{
      method: 'GET' 
    })
    const data = await res.json();
    actualizarInfo(data);
  }

  peticion();
})


