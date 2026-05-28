import {images} from '../assets/images';
import {LocationCategory, StormLocation} from '../types';

export const categories: LocationCategory[] = [
  {
    id: 'storm-spots',
    title: 'Storm & Lightning Spots',
    eyebrow: 'Venezuela Storm Atlas',
    emoji: '⚡',
    gradient: ['#11245a', '#2545a8'],
  },
  {
    id: 'thunder-waters',
    title: 'Thunder Lakes & Rivers',
    eyebrow: 'Thunder Waters',
    emoji: '🌊',
    gradient: ['#053345', '#126174'],
  },
  {
    id: 'electric-jungle',
    title: 'Electric Jungle Adventures',
    eyebrow: 'Jungle Current',
    emoji: '🌴',
    gradient: ['#22104b', '#5c1db0'],
  },
];

export const locations: StormLocation[] = [
  {
    id: 'lake-maracaibo',
    categoryId: 'storm-spots',
    title: 'Lake Maracaibo',
    place: 'Lake Maracaibo Basin',
    coordinates: {latitude: 9.8, longitude: -71.5667},
    tag: 'Legendary storm',
    markerType: 'lake',
    image: images.lakeMaracaibo,
    description:
      'Lake Maracaibo is the most famous lightning location in Venezuela and the home of the legendary Catatumbo Lightning phenomenon. Warm tropical air collides with cooler mountain winds around the lake, creating nearly continuous nighttime electrical storms during certain seasons. The area is considered one of the most active lightning zones in the world and attracts photographers, scientists, and storm enthusiasts from many countries.',
  },
  {
    id: 'catatumbo-river-mouth',
    categoryId: 'storm-spots',
    title: 'Catatumbo River Mouth',
    place: 'Zulia Wetlands',
    coordinates: {latitude: 9.3035, longitude: -71.9582},
    tag: 'Observation point',
    markerType: 'lightning',
    image: images.catatumboRiverMouth,
    description:
      'The mouth of the Catatumbo River is one of the main observation points for Catatumbo Lightning. Massive storm clouds form above the wetlands and surrounding waters, producing intense lightning flashes across the night sky. Local fishing communities often witness storms lasting for several hours with constant electrical activity reflecting across the water.',
  },
  {
    id: 'ologa-village',
    categoryId: 'storm-spots',
    title: 'Ologa Village',
    place: 'Lake Maracaibo Wetlands',
    coordinates: {latitude: 9.0708, longitude: -71.7315},
    tag: 'Stilt village',
    markerType: 'lightning',
    image: images.ologaVillage,
    description:
      'Ologa is a small stilt village located near Lake Maracaibo and is one of the best places for nighttime lightning observation tours. Visitors travel by boat through dark waterways while watching storms illuminate the sky around the lake. The village is surrounded by tropical wetlands and offers a unique atmosphere during storm season.',
  },
  {
    id: 'congo-mirador',
    categoryId: 'storm-spots',
    title: 'Congo Mirador',
    place: 'Lake Maracaibo Floating Village',
    coordinates: {latitude: 9.1234, longitude: -71.756},
    tag: 'Night reflections',
    markerType: 'lightning',
    image: images.congoMirador,
    description:
      'Congo Mirador is a floating village built on wooden platforms over the waters near Lake Maracaibo. The region is known for dramatic tropical weather and powerful nighttime lightning storms. Reflections of electrical flashes across the water create one of the most atmospheric storm-viewing experiences in Venezuela.',
  },
  {
    id: 'sierra-de-perija',
    categoryId: 'storm-spots',
    title: 'Sierra de Perija National Park',
    place: 'Colombian Border Mountains',
    coordinates: {latitude: 10.0667, longitude: -72.6667},
    tag: 'Mountain storm',
    markerType: 'jungle',
    image: images.sierraDePerijaNationalPark,
    description:
      'This mountainous national park near the Colombian border experiences frequent tropical storms due to changing mountain winds and dense humidity. Thick clouds often gather above the forested mountains, producing dramatic lightning activity during rainy periods. The area is rich in wildlife and dense jungle landscapes.',
  },
  {
    id: 'merida-andes',
    categoryId: 'storm-spots',
    title: 'Merida Andes Region',
    place: 'Venezuelan Andes',
    coordinates: {latitude: 8.5989, longitude: -71.1449},
    tag: 'Andes thunderwall',
    markerType: 'lightning',
    image: images.meridaAndesRegion,
    description:
      'The Venezuelan Andes around Merida frequently experience powerful thunderstorms caused by collisions between warm tropical air and cooler mountain temperatures. Storm clouds often form rapidly over the mountains, creating bright lightning displays above valleys and peaks. The region is also popular for scenic viewpoints and dramatic weather photography.',
  },
  {
    id: 'henri-pittier-storm',
    categoryId: 'storm-spots',
    title: 'Henri Pittier National Park',
    place: 'Coastal Mountains',
    coordinates: {latitude: 10.35, longitude: -67.6833},
    tag: 'Coastal storm',
    markerType: 'jungle',
    image: images.henriPittierNationalPark,
    description:
      'Henri Pittier National Park combines tropical rainforest, coastal mountains, and humid Caribbean air, creating conditions for heavy rainstorms and lightning activity. Dense fog, dark clouds, and tropical rainfall frequently cover the park during storm seasons. The region is known for its lush vegetation and atmospheric jungle landscapes.',
  },
  {
    id: 'orinoco-river',
    categoryId: 'thunder-waters',
    title: 'Orinoco River',
    place: 'Eastern Venezuela',
    coordinates: {latitude: 8.3167, longitude: -62.6333},
    tag: 'Giant river',
    markerType: 'lake',
    image: images.orinocoRiver,
    description:
      'The Orinoco River is one of the largest rivers in South America and flows across a massive part of Venezuela. The tropical climate around the river creates frequent thunderstorms, especially during the rainy season. Dark storm clouds, heavy rainfall, and distant lightning are common sights along many sections of the river.',
  },
  {
    id: 'lake-maracaibo-water',
    categoryId: 'thunder-waters',
    title: 'Lake Maracaibo',
    place: 'Northwestern Venezuela',
    coordinates: {latitude: 9.8, longitude: -71.5667},
    tag: 'Electric lake',
    markerType: 'lake',
    image: images.lakeMaracaiboStorm,
    description:
      'Lake Maracaibo is internationally known for the Catatumbo Lightning phenomenon. The combination of warm lake waters and humid tropical air creates nearly constant electrical storms during active periods. Lightning reflections across the water make the lake one of the most atmospheric nighttime destinations in Venezuela.',
  },
  {
    id: 'canaima-lagoon',
    categoryId: 'thunder-waters',
    title: 'Canaima Lagoon',
    place: 'Canaima National Park',
    coordinates: {latitude: 6.2414, longitude: -62.8544},
    tag: 'Lagoon storm',
    markerType: 'lake',
    image: images.canaimaLagoon,
    description:
      'Located inside Canaima National Park, Canaima Lagoon is surrounded by waterfalls, jungle cliffs, and tropical forests. Storms frequently develop above the region due to high humidity and warm temperatures. During rainy weather, dark clouds and distant lightning create dramatic scenery across the lagoon.',
  },
  {
    id: 'caroni-river',
    categoryId: 'thunder-waters',
    title: 'Caroni River',
    place: 'Southeastern Venezuela',
    coordinates: {latitude: 8.1, longitude: -63.55},
    tag: 'River basin',
    markerType: 'lake',
    image: images.caroniRiver,
    description:
      'The Caroni River flows through southeastern Venezuela and is surrounded by tropical forests and rocky landscapes. Thunderstorms regularly form over the river basin, especially during humid summer periods. The region is also famous for strong river currents and nearby waterfalls.',
  },
  {
    id: 'catatumbo-river',
    categoryId: 'thunder-waters',
    title: 'Catatumbo River',
    place: 'Lake Maracaibo Drainage',
    coordinates: {latitude: 9.32, longitude: -72.08},
    tag: 'Lightning river',
    markerType: 'lightning',
    image: images.catatumboRiver,
    description:
      'The Catatumbo River flows into Lake Maracaibo and plays a major role in the formation of Catatumbo Lightning storms. Warm moisture rising from wetlands and riverbanks helps generate powerful nighttime electrical activity above the region.',
  },
  {
    id: 'laguna-de-sinamaica',
    categoryId: 'thunder-waters',
    title: 'Laguna de Sinamaica',
    place: 'Zulia Lagoon System',
    coordinates: {latitude: 10.55, longitude: -71.7167},
    tag: 'Lagoon villages',
    markerType: 'lake',
    image: images.lagunaDeSinamaica,
    description:
      'Laguna de Sinamaica is a large lagoon system in northwestern Venezuela with traditional stilt villages built above the water. Tropical humidity and nearby storm systems frequently create atmospheric skies with distant lightning activity over the lagoon.',
  },
  {
    id: 'chama-river',
    categoryId: 'thunder-waters',
    title: 'Chama River',
    place: 'Merida Andes Valley',
    coordinates: {latitude: 8.5931, longitude: -71.156},
    tag: 'Mountain river',
    markerType: 'lightning',
    image: images.chamaRiver,
    description:
      'The Chama River flows through the Andes region near Merida. Mountain weather conditions often produce sudden thunderstorms above the river valleys. During rainy periods, clouds and lightning frequently surround the surrounding mountains, creating dramatic landscapes.',
  },
  {
    id: 'canaima-national-park',
    categoryId: 'electric-jungle',
    title: 'Canaima National Park',
    place: 'Bolivar State',
    coordinates: {latitude: 6.231, longitude: -62.8544},
    tag: 'Tepui weather',
    markerType: 'jungle',
    image: images.canaimaNationalPark,
    description:
      'Canaima National Park is one of the most famous natural destinations in Venezuela and is known for its massive tepui mountains, dense tropical jungles, and dramatic weather conditions. Thunderstorms frequently form above the park due to the combination of humidity, heat, and elevated landscapes. The region is also home to Angel Falls, the tallest waterfall in the world.',
  },
  {
    id: 'amazon-rainforest',
    categoryId: 'electric-jungle',
    title: 'Amazon Rainforest Region',
    place: 'Southern Venezuela',
    coordinates: {latitude: 3.4167, longitude: -65.8333},
    tag: 'Remote jungle',
    markerType: 'jungle',
    image: images.amazonRainforestRegion,
    description:
      'The Venezuelan Amazon is filled with dense jungle vegetation, winding rivers, and constant tropical humidity. Storm clouds regularly develop above the rainforest, producing heavy rain and lightning activity. The area contains rich biodiversity and remote wilderness landscapes rarely touched by modern development.',
  },
  {
    id: 'henri-pittier-jungle',
    categoryId: 'electric-jungle',
    title: 'Henri Pittier National Park',
    place: 'Aragua Coast',
    coordinates: {latitude: 10.35, longitude: -67.6833},
    tag: 'Cloud forest',
    markerType: 'jungle',
    image: images.henriPittierCoast,
    description:
      'Henri Pittier National Park combines coastal mountains, cloud forests, and tropical jungle environments. Warm Caribbean air and humid forest conditions create frequent rainstorms and dramatic cloudy skies. The park is famous for its dense vegetation, waterfalls, and exotic wildlife.',
  },
  {
    id: 'sierra-nevada',
    categoryId: 'electric-jungle',
    title: 'Sierra Nevada National Park',
    place: 'Venezuelan Andes',
    coordinates: {latitude: 8.5364, longitude: -70.8467},
    tag: 'Mist valleys',
    markerType: 'jungle',
    image: images.sierraNevadaNationalPark,
    description:
      'Located in the Venezuelan Andes, Sierra Nevada National Park features mountain forests, mist-covered valleys, and changing tropical weather. Thunderstorms often move rapidly through the mountains, producing lightning above the jungle-covered slopes. The area is known for hiking routes and panoramic viewpoints.',
  },
  {
    id: 'yapacana-national-park',
    categoryId: 'electric-jungle',
    title: 'Yapacana National Park',
    place: 'Amazonas State',
    coordinates: {latitude: 3.95, longitude: -66.8333},
    tag: 'Remote tepui',
    markerType: 'jungle',
    image: images.yapacanaNationalPark,
    description:
      'Yapacana National Park is a remote jungle region in southern Venezuela known for its isolated flat-topped mountain called Cerro Yapacana. The tropical environment creates frequent rainfall and electrical storms above the dense rainforest canopy. The park contains unique ecosystems and rare plant species.',
  },
  {
    id: 'el-avila',
    categoryId: 'electric-jungle',
    title: 'El Avila National Park',
    place: 'Caracas Mountain Wall',
    coordinates: {latitude: 10.55, longitude: -66.8833},
    tag: 'City overlook',
    markerType: 'jungle',
    image: images.elAvilaNationalPark,
    description:
      'El Avila National Park rises above Caracas and contains lush forests, mountain trails, and cloudy tropical landscapes. During storm seasons, lightning and heavy clouds often appear above the mountains overlooking the city. The park is popular for hiking and panoramic observation points.',
  },
  {
    id: 'mochima-national-park',
    categoryId: 'electric-jungle',
    title: 'Mochima National Park',
    place: 'Caribbean Coast',
    coordinates: {latitude: 10.3667, longitude: -64.3167},
    tag: 'Coastal jungle',
    markerType: 'jungle',
    image: images.mochimaNationalPark,
    description:
      'Mochima National Park is known for its tropical coastline, jungle-covered hills, and humid weather conditions. Afternoon thunderstorms are common during rainy periods, especially above the forested mountains near the coast. The region combines beaches, islands, and tropical vegetation with dramatic stormy skies.',
  },
];

export const getCategory = (id: string) =>
  categories.find(category => category.id === id);

export const getLocation = (id: string) =>
  locations.find(location => location.id === id);

export const getLocationsByCategory = (categoryId: string) =>
  locations.filter(location => location.categoryId === categoryId);
