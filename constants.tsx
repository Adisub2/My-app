
import { District, Post } from './types';

export const DISTRICTS: District[] = [
  {
    id: 'rudraprayag',
    name: 'Rudraprayag',
    hindiName: 'रुद्रप्रयाग',
    description: 'The sacred land of Kedarnath, located at the confluence of Alaknanda and Mandakini. A spiritual powerhouse.',
    culture: 'Deeply spiritual, home to the Panch Kedar and ancient Shaivite traditions dating back to the Mahabharata.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    landmarks: ['Kedarnath Temple', 'Chopta (Mini Switzerland)', 'Tungnath Temple', 'Koteshwar Mahadev']
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    hindiName: 'हरिद्वार',
    description: 'The Gateway to God. One of the seven holiest places in Hinduism where the holy Ganges enters the plains.',
    culture: 'Vibrant Vedic culture, world-famous for the evening Ganga Aarti and the massive Kumbh Mela festival.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200',
    landmarks: ['Har Ki Pauri', 'Mansa Devi', 'Chandi Devi', 'Shanti Kunj']
  },
  {
    id: 'chamoli',
    name: 'Chamoli',
    hindiName: 'चमोली',
    description: 'The Abode of Gods, containing the sacred Badrinath Shrine and the ethereal UNESCO Valley of Flowers.',
    culture: 'Rich in Himalayan folk dance and deep-rooted spiritual lore. Home to the legendary Bhotia communities.',
    image: 'https://images.unsplash.com/photo-1622610574161-006263b62417?auto=format&fit=crop&q=80&w=1200',
    landmarks: ['Badrinath Shrine', 'Valley of Flowers', 'Hemkund Sahib', 'Auli Ski Resort']
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    hindiName: 'देहरादून',
    description: 'The beautiful capital in the Doon Valley, famous for its elite schools, research institutions, and scenic hills.',
    culture: 'A cosmopolitan blend of Garhwali traditions and modern urban lifestyle at the foothills of the Shivaliks.',
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1200',
    landmarks: ['Robber\'s Cave', 'Sahastradhara', 'Mindrolling Monastery', 'Tapkeshwar Temple']
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: 'Aditya Shukla',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQF5hJoKc6ia5Q/profile-displayphoto-scale_400_400/B56ZsTVf0aJAAg-/0/1765555962234?e=1770249600&v=beta&t=HCQZYn-1R00pFtKJCq-PuKz-RG3DxZqJXgjeXflw3mY',
    content: 'Just deployed the Search Grounding for Teerthlok! Now anyone can get live updates about Uttarakhand sites directly from our homepage search. Experience Devbhoomi digitally.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    likes: 512,
    comments: 89,
    location: 'Teerthlok HQ',
    timestamp: 'Just now'
  }
];
