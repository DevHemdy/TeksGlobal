import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  size: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  rating: number;
  reviews: number;
  inStock: boolean;
  deliveryTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Modern Office Pod',
      category: 'Office',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
      images: [
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
        'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800'
      ],
      description: 'Perfect workspace solution for your backyard',
      longDescription: 'Transform your backyard into a productive workspace with our Modern Office Pod. This compact yet spacious cabin features premium insulation, electric-ready infrastructure, and double-glazed windows for year-round comfort. The contemporary design seamlessly blends with any outdoor setting while providing a quiet, focused environment for remote work or creative projects.',
      size: '200 sq ft',
      dimensions: {
        length: '10 ft',
        width: '20 ft',
        height: '9 ft'
      },
      features: [
        'Premium insulation for year-round comfort',
        'Electric-ready with professional wiring',
        'Double-glazed windows for noise reduction',
        'Built-in desk and storage solutions',
        'Climate control system included',
        'WiFi ready with cable management'
      ],
      specifications: [
        { label: 'Floor Area', value: '200 sq ft' },
        { label: 'Wall Thickness', value: '6 inches' },
        { label: 'Insulation R-Value', value: 'R-30' },
        { label: 'Window Type', value: 'Double-glazed, Low-E' },
        { label: 'Electrical', value: '220V, 100A service' },
        { label: 'Foundation', value: 'Concrete pier or slab' },
        { label: 'Warranty', value: '5 years structural' },
        { label: 'Installation Time', value: '2-3 days' }
      ],
      rating: 4.8,
      reviews: 124,
      inStock: true,
      deliveryTime: '4-6 weeks'
    },
    {
      id: 2,
      name: 'Luxury Living Cabin',
      category: 'Living',
      price: 2800000,
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
      images: [
        'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
        'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800'
      ],
      description: 'Spacious and stylish living space',
      longDescription: 'Experience luxury outdoor living with our premium cabin designed for comfort and style. Featuring a modern kitchen unit, full bathroom, and high-end finishes throughout, this cabin provides all the amenities of a traditional home in a compact, energy-efficient package. Perfect for guest accommodation, vacation rentals, or additional living space.',
      size: '450 sq ft',
      dimensions: {
        length: '16 ft',
        width: '28 ft',
        height: '10 ft'
      },
      features: [
        'Full kitchen with modern appliances',
        'Complete bathroom with shower',
        'Premium hardwood flooring',
        'Central heating and cooling',
        'High-end interior finishes',
        'Energy-efficient LED lighting'
      ],
      specifications: [
        { label: 'Floor Area', value: '450 sq ft' },
        { label: 'Wall Thickness', value: '8 inches' },
        { label: 'Insulation R-Value', value: 'R-40' },
        { label: 'Kitchen', value: 'Full-size appliances included' },
        { label: 'Bathroom', value: 'Full bath with fixtures' },
        { label: 'Electrical', value: '220V, 200A service' },
        { label: 'Plumbing', value: 'Complete rough-in included' },
        { label: 'Warranty', value: '5 years comprehensive' }
      ],
      rating: 4.9,
      reviews: 89,
      inStock: true,
      deliveryTime: '6-8 weeks'
    },
    {
      id: 3,
      name: 'Eco Studio Retreat',
      category: 'Eco-Friendly',
      price: 2200000,
      image: 'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800',
      images: [
        'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800'
      ],
      description: 'Sustainable design with solar panels',
      longDescription: 'Embrace sustainable living with our Eco Studio Retreat, designed with the environment in mind. This cabin features solar panel integration, rainwater collection systems, and construction using recycled and sustainable materials. Reduce your carbon footprint while enjoying a comfortable, modern living space that harmonizes with nature.',
      size: '350 sq ft',
      dimensions: {
        length: '14 ft',
        width: '25 ft',
        height: '10 ft'
      },
      features: [
        'Solar panel system (3kW)',
        'Rainwater collection and filtration',
        'Recycled and sustainable materials',
        'Energy-efficient appliances',
        'Natural ventilation system',
        'Low-VOC paints and finishes'
      ],
      specifications: [
        { label: 'Floor Area', value: '350 sq ft' },
        { label: 'Solar Capacity', value: '3kW system included' },
        { label: 'Water Storage', value: '500-gallon tank' },
        { label: 'Insulation', value: 'Recycled denim, R-35' },
        { label: 'Materials', value: '80% recycled content' },
        { label: 'Energy Rating', value: 'Net-zero ready' },
        { label: 'Certifications', value: 'LEED eligible' },
        { label: 'Warranty', value: '5 years + 25yr solar' }
      ],
      rating: 4.7,
      reviews: 56,
      inStock: true,
      deliveryTime: '5-7 weeks'
    },
    {
      id: 4,
      name: 'Compact Office Cabin',
      category: 'Office',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
      images: [
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
        'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800'
      ],
      description: 'Efficient workspace for solo professionals',
      longDescription: 'Maximize your productivity in this thoughtfully designed compact office cabin. Perfect for solo professionals, this space-efficient design includes a built-in ergonomic desk, climate control, and WiFi-ready infrastructure. The compact footprint makes it ideal for smaller yards while still providing everything you need for a professional workspace.',
      size: '150 sq ft',
      dimensions: {
        length: '8 ft',
        width: '19 ft',
        height: '8.5 ft'
      },
      features: [
        'Built-in ergonomic desk',
        'WiFi ready with Ethernet ports',
        'Climate control system',
        'Sound insulation for privacy',
        'USB charging stations',
        'Cable management solutions'
      ],
      specifications: [
        { label: 'Floor Area', value: '150 sq ft' },
        { label: 'Desk Dimensions', value: '6ft x 2.5ft' },
        { label: 'Electrical Outlets', value: '8 receptacles' },
        { label: 'Climate Control', value: 'Mini-split system' },
        { label: 'Internet', value: 'Cat6 wiring included' },
        { label: 'Sound Rating', value: 'STC-50' },
        { label: 'Warranty', value: '5 years' },
        { label: 'Installation Time', value: '1-2 days' }
      ],
      rating: 4.6,
      reviews: 203,
      inStock: true,
      deliveryTime: '3-4 weeks'
    },
    {
      id: 5,
      name: 'Artist Studio',
      category: 'Studio',
      price: 2500000,
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
      images: [
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
        'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800'
      ],
      description: 'Creative space with natural lighting',
      longDescription: 'Unleash your creativity in this purpose-built artist studio featuring abundant natural light through strategically placed skylights and large windows. High ceilings create an open, inspiring atmosphere, while built-in storage units keep your materials organized. Perfect for painters, sculptors, crafters, or any creative professional seeking a dedicated workspace.',
      size: '400 sq ft',
      dimensions: {
        length: '15 ft',
        width: '27 ft',
        height: '12 ft'
      },
      features: [
        'Large skylights for natural lighting',
        'Extra-high ceilings (12ft)',
        'Built-in storage and shelving',
        'Easy-clean flooring',
        'Large sliding doors for equipment',
        'Dedicated sink area'
      ],
      specifications: [
        { label: 'Floor Area', value: '400 sq ft' },
        { label: 'Ceiling Height', value: '12 feet' },
        { label: 'Skylight Area', value: '40 sq ft' },
        { label: 'Storage', value: '80 linear feet' },
        { label: 'Flooring', value: 'Sealed concrete' },
        { label: 'Door Opening', value: '8ft wide slider' },
        { label: 'Plumbing', value: 'Utility sink included' },
        { label: 'Warranty', value: '5 years' }
      ],
      rating: 4.9,
      reviews: 67,
      inStock: false,
      deliveryTime: '8-10 weeks'
    },
    {
      id: 6,
      name: 'Garden Room',
      category: 'Living',
      price: 1800000,
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
      images: [
        'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
        'https://images.unsplash.com/photo-1506003094589-53954a26283f?w=800',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800'
      ],
      description: 'Versatile space for relaxation and entertaining',
      longDescription: 'Create the perfect indoor-outdoor living experience with our Garden Room. Featuring elegant bi-fold doors that open to your garden, premium flooring, and an attached deck, this versatile space is ideal for entertaining guests, family gatherings, or simply relaxing in comfort. The contemporary design enhances any property while providing year-round usability.',
      size: '280 sq ft',
      dimensions: {
        length: '12 ft',
        width: '23 ft',
        height: '9 ft'
      },
      features: [
        'Premium bi-fold glass doors',
        'Attached composite deck',
        'Premium vinyl plank flooring',
        'Recessed LED lighting',
        'Electrical outlets throughout',
        'Insulated for year-round use'
      ],
      specifications: [
        { label: 'Floor Area', value: '280 sq ft (interior)' },
        { label: 'Deck Area', value: '120 sq ft' },
        { label: 'Door Opening', value: '16ft bi-fold system' },
        { label: 'Flooring', value: 'Luxury vinyl plank' },
        { label: 'Lighting', value: 'LED recessed, dimmable' },
        { label: 'Insulation', value: 'R-30 walls, R-40 ceiling' },
        { label: 'Foundation', value: 'Deck on piers' },
        { label: 'Warranty', value: '5 years comprehensive' }
      ],
      rating: 4.8,
      reviews: 142,
      inStock: true,
      deliveryTime: '5-6 weeks'
    }
  ];

  constructor() { }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    if (category === 'all') {
      return this.products;
    }
    return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
}
