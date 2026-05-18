/* Renders the visited-places map using Leaflet + OSM tiles.
   Reads assets/data/places.json. */

(async function () {
  const res = await fetch('assets/data/places.json');
  const data = await res.json();

  const map = L.map('map', {
    center: [35.4, 137.0],
    zoom: 6,
    scrollWheelZoom: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors · &copy; CARTO',
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(map);

  const catLabel = {
    stay: 'Stay',
    see: 'See',
    eat: 'Eat',
    do: 'Do',
    drink: 'Drink',
    neighborhood: 'Neighborhood'
  };

  // SVG icon factory — colored dot per city.
  function makeIcon(color) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="8" fill="${color}" stroke="#fff" stroke-width="2"/>
        <circle cx="11" cy="11" r="2.5" fill="#fff" opacity="0.9"/>
      </svg>`;
    return L.divIcon({
      html: svg,
      className: 'place-pin',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -11]
    });
  }

  const cityLayers = {};
  Object.keys(data.cities).forEach(key => {
    cityLayers[key] = L.layerGroup().addTo(map);
  });

  const bounds = [];

  data.places.forEach(place => {
    const city = data.cities[place.city];
    if (!city) return;
    const icon = makeIcon(city.color);
    const marker = L.marker([place.lat, place.lon], { icon });
    const cat = catLabel[place.category] || place.category;
    marker.bindPopup(
      `<span class="cat-tag" style="color:${city.color};">${city.name} · ${cat}</span>
       <b>${place.name}</b>
       ${place.note || ''}`
    );
    marker.addTo(cityLayers[place.city]);
    bounds.push([place.lat, place.lon]);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  // Legend with toggleable city layers.
  const legendEl = document.getElementById('legend');
  if (legendEl) {
    Object.entries(data.cities).forEach(([key, city]) => {
      const btn = document.createElement('button');
      btn.className = 'legend-btn';
      btn.dataset.city = key;
      btn.dataset.active = 'true';
      btn.innerHTML = `<span class="dot" style="background:${city.color};"></span>${city.name}`;
      btn.style.cssText = `
        background: #fff;
        border: 1px solid var(--rule);
        color: var(--ink);
        padding: 6px 12px;
        border-radius: 100px;
        font: inherit;
        font-size: 0.88rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      `;
      btn.addEventListener('click', () => {
        const isActive = btn.dataset.active === 'true';
        if (isActive) {
          map.removeLayer(cityLayers[key]);
          btn.style.opacity = '0.4';
          btn.dataset.active = 'false';
        } else {
          map.addLayer(cityLayers[key]);
          btn.style.opacity = '1';
          btn.dataset.active = 'true';
        }
      });
      legendEl.appendChild(btn);
    });
  }
})();
