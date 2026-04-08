/**
 * Sectors Data Configuration
 * 
 * This file contains all 24 industry sectors with their leaders.
 * Replace placeholder images with real photos later.
 * 
 * @data Structure:
 * - key: Sector name (unique identifier)
 * - title: Display title
 * - subtitle: Brief tagline
 * - description: Detailed description
 * - leader: { name, role, image }
 * - stats: { members, gdp, growth, active }
 * - benefits: Array of member benefits
 * - theme: Tailwind gradient class
 * 
 * Placeholder images:
 * - Leader photos: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400 (generic male)
 * - Leader photos: https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400 (generic female)
 * - Sector background: https://images.unsplash.com/photo-...
 */

import {
  Factory, Sprout, Zap, Monitor, HardHat, Landmark,
  Palmtree, ShoppingCart, Plane, Package, Heart, BookOpen,
  Dumbbell, Car, Coffee, Phone, Palette, Leaf, Droplet,
  TreePine, Wheat, Cpu, Building2, Waves
} from 'lucide-react';

export const sectorsData = {
  Manufacturing: {
    title: "The Manufacturing Engine",
    subtitle: "Empowering Industrial Growth",
    icon: <Factory size={48} />,
    theme: "from-teal-600 to-emerald-800",
    description: "The Manufacturing sector is a cornerstone of AGI. We represent a diverse range of industries from food processing to heavy industrial machinery, advocating for energy efficiency and competitive trade practices.",
    leader: {
      name: "Dr. Kwame Asante",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "1,200+", gdp: "11.5%", growth: "+8.4%", active: "14" },
    benefits: ["Quarterly industrial surveys", "Trade delegation invitations", "ISO certification support", "Regulatory advocacy"]
  },
  "Agri-Business": {
    title: "Feeding the Nation",
    subtitle: "Modernizing Agriculture",
    icon: <Sprout size={48} />,
    theme: "from-orange-500 to-red-700",
    description: "Modernizing agriculture through processing and value addition. We support members in scaling from primary production to global export-ready industrial processing.",
    leader: {
      name: "Mrs. Abena Manu",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "950+", gdp: "18.2%", growth: "+5.1%", active: "8" },
    benefits: ["Market linkage programs", "Land tenure advocacy", "Value-chain optimization", "Export financing info"]
  },
  "Energy & Oil": {
    title: "Powering Industry",
    subtitle: "Sustainable Energy Solutions",
    icon: <Zap size={48} />,
    theme: "from-yellow-500 to-orange-600",
    description: "Focused on ensuring stable and affordable power for industrial growth while leading the transition to sustainable and renewable energy sources for Ghanaian factories.",
    leader: {
      name: "Ing. Solomon Doe",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "300+", gdp: "7.4%", growth: "+12.1%", active: "5" },
    benefits: ["Utility pricing negotiation", "Renewable energy grants", "Technical policy workshops", "Efficiency auditing"]
  },
  "IT & Digital": {
    title: "Digital Transformation",
    subtitle: "The Tech Revolution",
    icon: <Monitor size={48} />,
    theme: "from-blue-600 to-indigo-800",
    description: "Leading Ghana's digital industrial revolution. We support tech startups and established firms in software development, AI integration, and digital infrastructure.",
    leader: {
      name: "Mr. Kojo Bennett",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc4aac0a4?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "450+", gdp: "4.8%", growth: "+15.6%", active: "10" },
    benefits: ["Tech hub networking", "Software export support", "Cybersecurity frameworks", "Innovation grants access"]
  },
  "Construction & Real Estate": {
    title: "Building the Future",
    subtitle: "Sustainable Infrastructure",
    icon: <HardHat size={48} />,
    theme: "from-zinc-600 to-black",
    description: "Representing the builders of Ghana. From residential developers to industrial infrastructure specialists, we advocate for local content and quality standards.",
    leader: {
      name: "Architect Elaine Ampofo",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "500+", gdp: "9.1%", growth: "+6.8%", active: "7" },
    benefits: ["Local content advocacy", "Standardized procurement", "Safety certification training", "Project bidding alerts"]
  },
  "Financial Services": {
    title: "Capital for Growth",
    subtitle: "Fiscal Advisory & Support",
    icon: <Landmark size={48} />,
    theme: "from-red-800 to-black",
    description: "Bridging the gap between industry and finance. We work with banks and fintechs to create tailored financial products for Ghanaian manufacturers.",
    leader: {
      name: "Mrs. Sarah Osei",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "150+", gdp: "5.2%", growth: "+4.2%", active: "4" },
    benefits: ["SME loan facilitation", "Investment matchmaking", "Tax policy advocacy", "Financial literacy programs"]
  },
  "Hospitality & Tourism": {
    title: "Premium Service",
    subtitle: "Tourism & Leisure Industry",
    icon: <Palmtree size={48} />,
    theme: "from-orange-400 to-orange-700",
    description: "Promoting excellence in Ghana's service sector. We represent hotels, resorts, and tourism service providers in creating a world-class hospitality environment.",
    leader: {
      name: "Mr. James Kofi",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "400+", gdp: "6.5%", growth: "+9.2%", active: "6" },
    benefits: ["Tourism policy advocacy", "Service quality training", "International marketing", "Regulatory compliance support"]
  },
  "Retail & Wholesale": {
    title: "Consumer Connection",
    subtitle: "Trade & Distribution",
    icon: <ShoppingCart size={48} />,
    theme: "from-purple-500 to-pink-700",
    description: "Connecting manufacturers to consumers through organized retail networks. We support both traditional markets and modern retail outlets.",
    leader: {
      name: "Mrs. Grace Mensah",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "800+", gdp: "8.3%", growth: "+5.7%", active: "9" },
    benefits: ["Market access programs", "Supply chain optimization", "Retail technology adoption", "Consumer insights"]
  },
  "Transport & Logistics": {
    title: "Moving Ghana Forward",
    subtitle: "Freight & Mobility",
    icon: <Plane size={48} />,
    theme: "from-sky-500 to-blue-700",
    description: "Ensuring efficient movement of goods and people across Ghana. We advocate for improved infrastructure, logistics technology, and sustainable transport solutions.",
    leader: {
      name: "Mr. Francis Tetteh",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "350+", gdp: "4.1%", growth: "+7.3%", active: "5" },
    benefits: ["Fleet management training", "Route optimization support", "Fuel efficiency programs", "Regulatory compliance"]
  },
  "Packaging & Labeling": {
    title: "The Face of Products",
    subtitle: "Packaging Solutions",
    icon: <Package size={48} />,
    theme: "from-amber-500 to-yellow-700",
    description: "Supporting the packaging industry with sustainable and innovative solutions. From food packaging to industrial containers, we drive the packaging sector forward.",
    leader: {
      name: "Dr. Michael Kwakye",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "200+", gdp: "2.8%", growth: "+9.5%", active: "4" },
    benefits: ["Sustainable packaging workshops", "Material sourcing network", "Quality certification", "Export packaging standards"]
  },
  "Healthcare & Pharmaceuticals": {
    title: "Health for All",
    subtitle: "Medical Excellence",
    icon: <Heart size={48} />,
    theme: "from-rose-500 to-red-700",
    description: "Promoting healthcare innovation and pharmaceutical manufacturing in Ghana. We support local production of essential medicines and medical devices.",
    leader: {
      name: "Dr. Lisa Nunoo",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "280+", gdp: "3.9%", growth: "+11.2%", active: "6" },
    benefits: ["Regulatory advocacy", "Research partnerships", "Medical device importation", "Pharma distribution networks"]
  },
  "Education & Training": {
    title: "Building Human Capital",
    subtitle: "Skills Development",
    icon: <BookOpen size={48} />,
    theme: "from-indigo-500 to-purple-800",
    description: "Developing Ghana's workforce through vocational and technical training. We partner with educational institutions to ensure industry-relevant skills.",
    leader: {
      name: "Prof. Adjoa Sarpong",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "180+", gdp: "2.1%", growth: "+8.8%", active: "5" },
    benefits: ["Curriculum development", "Internship programs", "Certification support", "Industry-academia linkages"]
  },
  "Sports & Fitness": {
    title: "Active Ghana",
    subtitle: "Wellness Industry",
    icon: <Dumbbell size={48} />,
    theme: "from-green-500 to-emerald-700",
    description: "Growing the sports and fitness industry in Ghana. From gym chains to sports clubs, we promote healthy lifestyles and sports development.",
    leader: {
      name: "Mr. Emmanuel Okoe",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "150+", gdp: "1.8%", growth: "+12.4%", active: "4" },
    benefits: ["Sports facility standards", "Event sponsorship", "Athletic development programs", "Health tourism"]
  },
  "Automotive": {
    title: "Driving Innovation",
    subtitle: "Vehicle Industry",
    icon: <Car size={48} />,
    theme: "from-slate-500 to-gray-800",
    description: "Representing vehicle manufacturers, distributors, and service providers. We advocate for automotive policy that supports local assembly and maintenance.",
    leader: {
      name: "Ing. Daniel Owusu",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "220+", gdp: "3.2%", growth: "+6.5%", active: "5" },
    benefits: ["Import policy advocacy", "Local assembly support", "Technical training", "Spare parts distribution"]
  },
  "Food & Beverage": {
    title: "Taste of Ghana",
    subtitle: "Food Processing",
    icon: <Coffee size={48} />,
    theme: "from-amber-600 to-orange-800",
    description: "Promoting Ghana's food and beverage industry from local delicacies to processed exports. We support food safety standards and export readiness.",
    leader: {
      name: "Mrs. Comfort Agyeman",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "600+", gdp: "7.8%", growth: "+7.2%", active: "11" },
    benefits: ["Food safety certification", "Export market access", "Recipe commercialization", "Ingredient sourcing"]
  },
  "Telecommunications": {
    title: "Connected Nation",
    subtitle: "Digital Connectivity",
    icon: <Phone size={48} />,
    theme: "from-cyan-500 to-blue-700",
    description: "Supporting Ghana's telecom infrastructure and digital connectivity. We work with operators to expand coverage and reduce data costs for businesses.",
    leader: {
      name: "Mr. Richard Mills",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "90+", gdp: "5.5%", growth: "+10.1%", active: "3" },
    benefits: ["Infrastructure advocacy", "Business solutions", "IoT integration", "Data cost reduction"]
  },
  "Arts & Culture": {
    title: "Creative Economy",
    subtitle: "Cultural Industries",
    icon: <Palette size={48} />,
    theme: "from-pink-500 to-rose-800",
    description: "Promoting Ghana's creative arts and cultural industries. From visual arts to performing arts, we support creative entrepreneurs and cultural tourism.",
    leader: {
      name: "Ms. Akosua Busia",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "400+", gdp: "3.5%", growth: "+14.2%", active: "8" },
    benefits: ["Art market access", "Cultural export support", "Festival partnerships", "Creative workspaces"]
  },
  "Mining & Minerals": {
    title: "Resource Wealth",
    subtitle: "Extractive Industries",
    icon: <Package size={48} />,
    theme: "from-yellow-600 to-amber-900",
    description: "Supporting responsible mining and mineral processing in Ghana. We advocate for local content and sustainable extraction practices.",
    leader: {
      name: "Dr. Kwabena Frimpong",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "180+", gdp: "8.9%", growth: "+4.8%", active: "6" },
    benefits: ["Local content compliance", "Environmental standards", "Community relations", "Supply chain integration"]
  },
  "Water & Sanitation": {
    title: "Clean Water Access",
    subtitle: "WASH Sector",
    icon: <Droplet size={48} />,
    theme: "from-blue-400 to-cyan-700",
    description: "Promoting access to clean water and proper sanitation across Ghana. We support water treatment, distribution, and hygiene education initiatives.",
    leader: {
      name: "Eng. Ruth Akosua",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "120+", gdp: "1.5%", growth: "+9.3%", active: "4" },
    benefits: ["Infrastructure projects", "Treatment solutions", "Policy advocacy", "Sanitation training"]
  },
  "Forestry & Logging": {
    title: "Green Resources",
    subtitle: "Forest Management",
    icon: <TreePine size={48} />,
    theme: "from-green-600 to-emerald-900",
    description: "Ensuring sustainable forest management and timber processing. We advocate for reforestation and sustainable logging practices in Ghana.",
    leader: {
      name: "Mr. Peter Kofi",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "95+", gdp: "1.2%", growth: "+3.5%", active: "3" },
    benefits: ["Sustainability certification", "Timber trade facilitation", "Reforestation programs", "Land tenure support"]
  },
  "Agro-Processing": {
    title: "Value Addition",
    subtitle: "Post-Harvest",
    icon: <Wheat size={48} />,
    theme: "from-yellow-500 to-orange-700",
    description: "Transforming raw agricultural produce into finished goods. We support agro-processing enterprises in technology adoption and market access.",
    leader: {
      name: "Mrs. Matilda Serwaa",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "380+", gdp: "4.6%", growth: "+8.9%", active: "7" },
    benefits: ["Processing technology", "Export certification", "Raw material sourcing", "Quality management"]
  },
  "Technology Hardware": {
    title: "Hardware Innovation",
    subtitle: "Electronics Manufacturing",
    icon: <Cpu size={48} />,
    theme: "from-slate-600 to-blue-900",
    description: "Supporting local assembly and manufacturing of electronic devices and components. We promote electronics manufacturing for domestic and export markets.",
    leader: {
      name: "Mr. David Akwaboah",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc4aac0a4?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "140+", gdp: "2.4%", growth: "+11.5%", active: "4" },
    benefits: ["Component sourcing", "Assembly training", "Quality standards", "Export market access"]
  },
  "Housing & Urban Development": {
    title: "Habitat Ghana",
    subtitle: "Affordable Housing",
    icon: <Building2 size={48} />,
    theme: "from-indigo-500 to-slate-800",
    description: "Promoting affordable housing and urban development across Ghana. We work with developers, contractors, and government to address housing deficits.",
    leader: {
      name: "Architect Nana Yaw",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "250+", gdp: "3.8%", growth: "+7.1%", active: "5" },
    benefits: ["Policy advocacy", "Financing access", "Urban planning", "Affordable housing projects"]
  },
  "Blue Economy": {
    title: "Ocean Resources",
    subtitle: "Maritime Industries",
    icon: <Waves size={48} />,
    theme: "from-teal-500 to-blue-900",
    description: "Harnessing Ghana's marine and coastal resources sustainably. From fishing to maritime transport, we support the blue economy growth.",
    leader: {
      name: "Capt. Joseph Mensah",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "170+", gdp: "2.9%", growth: "+5.4%", active: "4" },
    benefits: ["Maritime training", "Fishing industry support", "Coastal management", "Export certification"]
  }
};

export default sectorsData;