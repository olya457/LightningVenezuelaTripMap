import {images} from '../assets/images';
import {BlogArticle} from '../types';

export const articles: BlogArticle[] = [
  {
    id: 'endless-storms-catatumbo',
    title: 'The Endless Storms of Catatumbo',
    subtitle:
      'A legendary light show where Lake Maracaibo becomes one of Earths most electric skies.',
    date: 'May 12, 2025',
    readTime: '6 min read',
    tags: ['Catatumbo', 'Natural Wonder'],
    image: images.blogStormPhoto,
    body: [
      'Catatumbo Lightning is one of the most unique natural phenomena in the world. It occurs near Lake Maracaibo in Venezuela, where warm tropical air collides with cool mountain winds and creates massive electrical storms. During active nights, lightning can flash hundreds of times every hour, illuminating the sky with powerful purple and blue flashes.',
      'For centuries, local fishermen used these storms as a natural lighthouse while navigating the lake at night. Today, storm enthusiasts and photographers travel from around the world to witness the phenomenon. The storms are most visible during rainy seasons when humidity levels are extremely high.',
      'Scientists continue studying Catatumbo Lightning because of its unusual consistency and intensity. Some researchers believe the surrounding geography and methane gases from wetlands contribute to the constant electrical activity. Regardless of the explanation, the storms remain one of Venezuelas most famous natural wonders.',
    ],
  },
  {
    id: 'why-venezuela-storms',
    title: 'Why Venezuela Has So Many Lightning Storms',
    subtitle:
      'Mountains, rivers, jungles, and tropical heat combine into a powerful storm engine.',
    date: 'Apr 28, 2025',
    readTime: '8 min read',
    tags: ['Climate', 'Storms'],
    image: images.lakeMaracaibo,
    body: [
      'Venezuelas tropical climate creates ideal conditions for frequent thunderstorms. Warm temperatures, dense humidity, large rivers, mountain ranges, and tropical forests combine to generate unstable atmospheric conditions. These conditions allow giant storm clouds to form rapidly.',
      'One major factor is the Andes Mountains. Cold air moving down from the mountains collides with warm air rising from lakes and forests. This interaction creates powerful electrical charges inside clouds, eventually releasing lightning across the sky.',
      'Storm activity is especially intense around Lake Maracaibo, but lightning storms can also appear in jungle regions and along tropical river systems. The combination of water, heat, and changing winds makes Venezuela one of the most electrically active countries on Earth.',
    ],
  },
  {
    id: 'types-of-lightning',
    title: 'The Different Types of Lightning',
    subtitle:
      'Cloud flashes, ground strikes, sprites, and jets each tell a different atmospheric story.',
    date: 'Mar 15, 2025',
    readTime: '7 min read',
    tags: ['Science', 'Lightning'],
    image: images.cloudToGroundLightning,
    body: [
      'Lightning appears in many forms, and each type behaves differently in the atmosphere. The most common type is cloud-to-ground lightning, where electricity travels directly from clouds to the Earths surface. These strikes are usually the brightest and most dangerous.',
      'Another common form is intra-cloud lightning, which happens inside storm clouds. This type creates dramatic flashes across the sky and is often seen during large tropical storms. There is also cloud-to-cloud lightning that jumps between separate storm systems.',
      'Rare forms include red sprites and blue jets, which appear high above thunderstorms in the upper atmosphere. Scientists only discovered these unusual electrical events relatively recently because they are difficult to observe from the ground.',
    ],
  },
  {
    id: 'storm-photography',
    title: 'Storm Photography in Venezuela',
    subtitle:
      'Long exposures, reflected water, and patience turn storm nights into electric images.',
    date: 'Feb 18, 2025',
    readTime: '5 min read',
    tags: ['Photography', 'Travel'],
    image: images.blogLightning,
    body: [
      'Venezuela has become a dream destination for storm photographers because of its dramatic lightning activity and tropical landscapes. Capturing lightning requires patience, timing, and the right weather conditions. Many photographers spend entire nights near Lake Maracaibo waiting for the perfect strike.',
      'The best images are often captured during heavy cloud activity when reflections appear on the surface of the water. Long exposure photography allows lightning bolts to create glowing electric patterns across the sky.',
      'Safety is extremely important during storm photography. Experts recommend photographing storms from protected areas and avoiding open fields or isolated trees. Professional photographers also use weather tracking systems to monitor storm movement in real time.',
    ],
  },
  {
    id: 'science-behind-thunder',
    title: 'The Science Behind Thunder',
    subtitle:
      'The sound after the flash is hot air expanding into a moving atmospheric shockwave.',
    date: 'Jan 27, 2025',
    readTime: '4 min read',
    tags: ['Thunder', 'Science'],
    image: images.intraCloudLightning,
    body: [
      'Thunder is created when lightning rapidly heats the air surrounding it. A lightning bolt can heat the atmosphere to temperatures hotter than the surface of the Sun for a brief moment. This sudden heat causes the air to expand explosively, creating a shockwave that becomes thunder.',
      'The sound of thunder changes depending on the distance of the storm. Sharp cracking sounds usually indicate nearby lightning strikes, while deep rolling thunder often comes from distant storms echoing through clouds and mountains.',
      'Because light travels faster than sound, people see lightning before hearing thunder. Counting the seconds between a flash and the thunder can help estimate how far away the storm is located.',
    ],
  },
  {
    id: 'wildlife-during-storms',
    title: 'Wildlife During Tropical Storms',
    subtitle:
      'Pressure, humidity, and electricity reshape the rhythm of tropical ecosystems.',
    date: 'Jan 8, 2025',
    readTime: '5 min read',
    tags: ['Wildlife', 'Jungle'],
    image: images.amazonRainforestRegion,
    body: [
      'The tropical ecosystems of Venezuela react in fascinating ways during thunderstorms. Many animals can sense pressure changes and electrical activity before storms arrive. Birds often fly lower, while jungle insects become quieter moments before heavy lightning begins.',
      'Some species become more active during storms because rain cools the environment and increases humidity. Frogs, amphibians, and nocturnal animals often emerge during tropical rainfall periods.',
      'Lightning can also affect forests directly. Powerful strikes sometimes split trees or ignite small fires in dry areas. Despite the danger, storms are an important part of tropical ecosystems because they help regulate temperatures and distribute rainfall across large regions.',
    ],
  },
  {
    id: 'chasing-storms',
    title: 'Chasing Storms Across Venezuela',
    subtitle:
      'A field guide to dramatic skies, safe observation, and unforgettable storm routes.',
    date: 'Dec 16, 2024',
    readTime: '6 min read',
    tags: ['Travel', 'Safety'],
    image: images.sheetLightning,
    body: [
      'Storm chasing has become increasingly popular among weather enthusiasts visiting Venezuela. Travelers explore lakes, jungles, and mountain regions searching for dramatic skies and lightning activity. Many tours focus on nighttime viewing experiences near Lake Maracaibo.',
      'Storm chasers often use radar systems and weather applications to predict where storms may become strongest. Tropical conditions can change rapidly, turning calm evenings into powerful electrical storms within hours.',
      'Although storm chasing is exciting, safety always comes first. Professional guides recommend observing storms from safe distances and avoiding travel during severe weather warnings. With proper preparation, Venezuela offers one of the most unforgettable storm experiences in the world.',
    ],
  },
];

export const getArticle = (id: string) =>
  articles.find(article => article.id === id);
