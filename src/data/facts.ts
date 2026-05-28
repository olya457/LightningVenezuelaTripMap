import {Fact, FactCategory} from '../types';

export const factCategories: FactCategory[] = [
  {id: 'lightning', title: 'Lightning', emoji: '⚡'},
  {id: 'venezuela', title: 'Venezuela', emoji: '🌎'},
  {id: 'science', title: 'Science', emoji: '🔬'},
];

export const facts: Fact[] = [
  {
    id: 'catatumbo-never-sleeps',
    categoryId: 'lightning',
    title: 'Catatumbo Never Sleeps',
    body:
      'Catatumbo Lightning can appear for up to 200 nights per year near Lake Maracaibo in Venezuela. During intense storms, the sky may flash continuously for several hours without stopping.',
  },
  {
    id: 'hotter-than-fire',
    categoryId: 'lightning',
    title: 'Lightning Can Heat Air Faster Than Fire',
    body:
      'A lightning bolt can heat the surrounding air to temperatures around 30,000C in less than a second. This is several times hotter than the surface of the Sun.',
  },
  {
    id: 'invisible-lightning',
    categoryId: 'lightning',
    title: 'Some Lightning Is Invisible',
    body:
      'Not all lightning reaches the ground. Many electrical discharges occur inside clouds or between clouds, creating flashes that only illuminate the sky.',
  },
  {
    id: 'purple-lightning',
    categoryId: 'lightning',
    title: 'Purple Lightning Exists',
    body:
      'Lightning can appear white, blue, purple, or even red depending on humidity, dust, and atmospheric conditions during the storm.',
  },
  {
    id: 'fast-lightning',
    categoryId: 'lightning',
    title: 'Lightning Travels Extremely Fast',
    body:
      'A lightning discharge can travel through the atmosphere at speeds exceeding hundreds of thousands of kilometers per hour.',
  },
  {
    id: 'electric-smell',
    categoryId: 'lightning',
    title: 'Thunderstorms Create Electric Smells',
    body:
      'After a storm, people sometimes notice a fresh metallic smell in the air. This happens because lightning creates ozone molecules in the atmosphere.',
  },
  {
    id: 'large-lake',
    categoryId: 'venezuela',
    title: 'Lake Maracaibo Is One of South Americas Largest Lakes',
    body:
      'Lake Maracaibo is connected to the Caribbean Sea and is famous for producing some of the worlds most active lightning storms.',
  },
  {
    id: 'tropical-jungles',
    categoryId: 'venezuela',
    title: 'Venezuela Has Massive Tropical Jungles',
    body:
      'Large parts of Venezuela are covered by rainforests filled with rivers, waterfalls, and dense vegetation that help create humid storm conditions.',
  },
  {
    id: 'angel-falls',
    categoryId: 'venezuela',
    title: 'Angel Falls Is the Worlds Tallest Waterfall',
    body:
      'Located in Venezuela, Angel Falls reaches a height of nearly 1,000 meters and is often surrounded by clouds and tropical mist.',
  },
  {
    id: 'storm-ecosystem',
    categoryId: 'venezuela',
    title: 'Tropical Storms Help the Ecosystem',
    body:
      'Heavy rainstorms distribute water across forests and rivers, helping plants and animals survive in tropical regions.',
  },
  {
    id: 'tepuis',
    categoryId: 'venezuela',
    title: 'Venezuela Has Unique Table Mountains',
    body:
      'The country is known for tepuis, giant flat-topped mountains that rise dramatically above the jungle landscape and create unusual weather patterns.',
  },
  {
    id: 'animals-before-storms',
    categoryId: 'venezuela',
    title: 'Many Animals React Before Storms',
    body:
      'Birds, frogs, and insects often change their behavior shortly before thunderstorms arrive because they can sense pressure and humidity changes.',
  },
  {
    id: 'ice-collisions',
    categoryId: 'science',
    title: 'Lightning Forms From Ice Collisions',
    body:
      'Inside storm clouds, ice particles collide and create electrical charges. Eventually the energy becomes strong enough to produce lightning.',
  },
  {
    id: 'thunder-shockwave',
    categoryId: 'science',
    title: 'Thunder Is a Shockwave',
    body:
      'Thunder is not created by sound directly from lightning. It is caused by rapidly expanding hot air that creates a powerful atmospheric shockwave.',
  },
  {
    id: 'cloud-height',
    categoryId: 'science',
    title: 'Storm Clouds Can Reach Extreme Heights',
    body:
      'Large thunderstorm clouds can rise more than 15 kilometers into the atmosphere during powerful tropical storms.',
  },
  {
    id: 'repeat-strikes',
    categoryId: 'science',
    title: 'Lightning Can Strike the Same Place Many Times',
    body:
      'Tall buildings, towers, and isolated objects are often hit repeatedly during storms because they provide an easier path for electricity.',
  },
  {
    id: 'space-lightning',
    categoryId: 'science',
    title: 'Scientists Study Lightning From Space',
    body:
      'Modern satellites can detect lightning flashes across entire continents and help scientists track global storm activity.',
  },
  {
    id: 'heat-humidity',
    categoryId: 'science',
    title: 'Heat and Humidity Fuel Storms',
    body:
      'Warm temperatures and high humidity provide energy for storm systems, which is why tropical regions experience frequent lightning activity.',
  },
];

export const getFactsByCategory = (categoryId: string) =>
  facts.filter(fact => fact.categoryId === categoryId);
