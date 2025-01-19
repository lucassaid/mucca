import { StrayedPetPost } from '~/types/StrayedPet'

const img =
  'https://h4zw8tks2a3nqz6m.public.blob.vercel-storage.com/articles/WhatsApp%20Image%202025-01-17%20at%2019.03.23-tIEcF6VOYdGqq2cfcSdxia8NjkLp32.jpeg'

export const mockPosts: StrayedPetPost[] = [
  {
    kind: 'dog',
    title: 'Lost Golden Retriever in Central Park',
    image: img,
    description:
      'Max is a friendly 3-year-old golden retriever who went missing during our evening walk. He has a blue collar with ID tags and is microchipped. Very friendly and responds to his name.',
    date: new Date('2025-01-15T14:30:00'),
    tags: ['golden retriever', 'male', 'friendly', 'microchipped'],
    contact: '+1 (212) 555-0123',
    location: [40.7829, -73.9654],
    postedByOwner: true,
    reuniteDate: null,
  },
  {
    kind: 'cat',
    title: 'Found Siamese Cat near Brooklyn Bridge',
    image: img,
    description:
      "Found this beautiful Siamese cat wandering near Brooklyn Bridge Park. Very well-groomed, must be someone's pet. Has a distinctive black collar but no tag.",
    date: new Date('2025-01-16T09:15:00'),
    tags: ['siamese', 'female', 'found', 'collar'],
    contact: '+1 (718) 555-0456',
    location: [40.7026, -73.9965],
    postedByOwner: false,
    reuniteDate: new Date('2025-01-17T16:20:00'),
  },
  {
    kind: 'dog',
    title: 'Missing Corgi - Battery Park Area',
    image: img,
    description:
      "Our corgi Winston escaped through an open gate. He's wearing a red harness and has a distinctive white patch on his chest. Last seen near Battery Park.",
    date: new Date('2025-01-17T16:45:00'),
    tags: ['corgi', 'male', 'red harness', 'microchipped'],
    contact: '+1 (646) 555-0789',
    location: [40.7033, -74.017],
    postedByOwner: true,
    reuniteDate: null,
  },
  {
    kind: 'cat',
    title: 'Orange Tabby Found in Queens',
    image: img,
    description:
      "Found this friendly orange tabby in Astoria. Very affectionate and well-fed, clearly someone's pet. Has a small scar near left ear.",
    date: new Date('2025-01-16T11:20:00'),
    tags: ['tabby', 'orange', 'male', 'friendly'],
    contact: '+1 (347) 555-0321',
    location: [40.7644, -73.9235],
    postedByOwner: false,
    reuniteDate: null,
  },
  {
    kind: 'dog',
    title: 'Lost Poodle Mix - Upper East Side',
    image: img,
    description:
      "Lucy, our toy poodle mix, slipped out during a delivery. She's cream colored with recently groomed fur. Very timid and may not approach strangers.",
    date: new Date('2025-01-18T08:30:00'),
    tags: ['poodle', 'female', 'cream', 'timid'],
    contact: '+1 (917) 555-0147',
    location: [40.7736, -73.9566],
    postedByOwner: true,
    reuniteDate: null,
  },
  {
    kind: 'cat',
    title: 'Black Cat Found - Times Square Area',
    image: img,
    description:
      'Found this beautiful black cat near Times Square. Has white paws and a purple collar with a bell. Very friendly and seems well-cared for.',
    date: new Date('2025-01-17T21:15:00'),
    tags: ['black', 'female', 'collar', 'friendly'],
    contact: '+1 (212) 555-9876',
    location: [40.758, -73.9855],
    postedByOwner: false,
    reuniteDate: null,
  },
  {
    kind: 'dog',
    title: 'Missing Husky - Prospect Park',
    image: img,
    description:
      'Our husky Luna ran off during a thunderstorm. She has one blue and one brown eye, wearing a green collar with tags. May be scared but friendly.',
    date: new Date('2025-01-15T23:40:00'),
    tags: ['husky', 'female', 'heterochromia', 'microchipped'],
    contact: '+1 (718) 555-4321',
    location: [40.6602, -73.969],
    postedByOwner: true,
    reuniteDate: new Date('2025-01-18T10:15:00'),
  },
  {
    kind: 'cat',
    title: 'Grey Persian Cat - Lower East Side',
    image: img,
    description:
      "Missing our beloved Persian cat Shadow. He's fully grey with long fur and copper eyes. Indoor cat, may be scared. Has a microchip.",
    date: new Date('2025-01-18T07:10:00'),
    tags: ['persian', 'male', 'grey', 'microchipped'],
    contact: '+1 (646) 555-1234',
    location: [40.7168, -73.9861],
    postedByOwner: true,
    reuniteDate: null,
  },
  {
    kind: 'dog',
    title: "Found Chihuahua Mix - Hell's Kitchen",
    image: img,
    description:
      'Found small Chihuahua mix wandering on 9th Ave. Tan colored, wearing a pink sweater. Seems anxious but not aggressive. No visible tags.',
    date: new Date('2025-01-17T15:50:00'),
    tags: ['chihuahua', 'female', 'small', 'sweater'],
    contact: '+1 (917) 555-5678',
    location: [40.763, -73.9917],
    postedByOwner: false,
    reuniteDate: null,
  },
  {
    kind: 'cat',
    title: 'Maine Coon Missing - Staten Island',
    image: img,
    description:
      'Large Maine Coon cat missing from St. George area. Brown tabby pattern, very large and fluffy. Responds to name "King". Has orange collar with ID tag.',
    date: new Date('2025-01-16T18:25:00'),
    tags: ['maine coon', 'male', 'large', 'collar'],
    contact: '+1 (718) 555-8901',
    location: [40.6445, -74.0779],
    postedByOwner: true,
    reuniteDate: null,
  },
]
