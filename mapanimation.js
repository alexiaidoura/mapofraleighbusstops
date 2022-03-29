


  // DONE: add your own access token
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxleGlhcCIsImEiOiJjbDBwZGlxNm8xZHBpM2R0a2g3bXh2bmg2In0.Vwg8n-yrmyv8ZmV6WqEuWQ';
    //MAPBOX_RALEIGHMAP_SECRET; //TODO: IMPLEMENT SECRETS

  // DONE: create the map object using mapboxgl.map() function
  // satellite style: mapbox://styles/mapbox/satellite-v9 
  // street style: mapbox://styles/mapbox/streets-v11
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-78.6382, 35.7796], // Raleigh NC
    zoom: 12
  });

  // DONE: add a marker to the map
  let marker = new mapboxgl.Marker()
    .setLngLat([-78.6382, 35.7796]) // TODO: replace with first point from array 
    .addTo(map);

  // This array will contain the bus stops pulled from city of raleigh data
  let busStops = []; 
 
  // main function that calls getStops, then adds the coordinates for each stop to the busStops array
  async function run() {
   let stops = await getStops();
   //console.log(stops);
   stops.forEach(element => {
     //console.log(element.location.lng);
     busStops.push([element.location.lng,element.location.lat]);
   });
   //console.log(busStops);
   move();
 }

 async function getStops(){

   const url = 'https://transloc-api-1-2.p.rapidapi.com/stops.json?agencies=12%2C16&geo_area=35.80176%2C-78.64347%7C35.78061%2C-78.68218&callback=call'
   const response = await fetch(url, {
     "method": "GET",
     "headers": {
       "x-rapidapi-host": "transloc-api-1-2.p.rapidapi.com",
       "x-rapidapi-key": "b7171ad4d3msh01b70be2d7d502ep1ab363jsnb55cd1cacc00"
       //"x-rapidapi-key": RALEIGH_MAP_SECRET //TODO: IMPLEMENT SECRETS
     }
   });
   const json = await response.json();
   let theStops = json.data;
   //console.log(theStops);
   return theStops;
 }

 // counter here represents the index of the current bus stop
 let counter = 0;
 function move() {
   // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
   // Use counter to access bus stops in the array busStops

   setTimeout(() => {
     if (counter >= busStops.length) return;
     marker.setLngLat(busStops[counter]);
     counter++;
     move();
   }, 1000);
 }

 run();

  // Do not edit code past this point
  if (typeof module !== 'undefined') {
    module.exports = { run, move, counter, marker, busStops };
  }
