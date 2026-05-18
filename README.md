# Japan, a friend's guide

A small static site with recommendations from 16 days in Japan
(Nov–Dec 2018) — Tokyo, Hakone, Kyoto, Nara, Osaka, Koyasan.

Live: <https://lucymeadow.github.io/japan/>

## What's here

- `index.html` — overview and city cards
- `cities/` — one page per city (Tokyo, Kyoto, Osaka, Hakone, Nara, Koyasan)
- `itinerary.html` — day-by-day pacing reference
- `map.html` — interactive Leaflet map of every visited place
- `logistics.html` — JR Pass, SIM, hotels, and rough budget
- `assets/` — CSS, the map JS, and the curated places JSON

No build step. It's plain HTML, CSS, and one small JS file. Edit any
page in place and push to update.

## Editing places on the map

All map pins are sourced from `assets/data/places.json`. Add, edit, or
remove an entry there and the map updates on next page load. Each
place has:

```json
{
  "city":     "tokyo",                 // matches a key under "cities"
  "category": "eat",                   // stay | see | eat | do | drink | neighborhood
  "name":     "Sushi Bar Yasuda",
  "lat":      35.6659245,
  "lon":      139.7204101,
  "note":     "Optional one-line note shown in the popup."
}
```

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Credit

- Map tiles: [Carto Voyager](https://carto.com/attributions)
- Map data: [OpenStreetMap](https://www.openstreetmap.org/copyright)
- Map library: [Leaflet](https://leafletjs.com)
- Fonts: DM Serif Display, Inter, Noto Serif JP (Google Fonts)
