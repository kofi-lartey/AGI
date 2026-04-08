/**
 * Sectors Data Configuration
 * 
 * This file contains all 24+ industry sectors with their leaders.
 * Updated with exact data provided by AGI.
 * 
 * @data Structure:
 * - key: Sector name (unique identifier)
 * - title: Display title
 * - subtitle: Brief tagline
 * - description: Detailed description
 * - leader: { name, role, bio, image }
 * - stats: { members, gdp, growth, active }
 * - benefits: Array of member benefits
 * - theme: Tailwind gradient class
 */

import {
  Factory, Sprout, Zap, Monitor, HardHat, Landmark,
  Palmtree, ShoppingCart, Plane, Package, Heart, BookOpen,
  Dumbbell, Car, Coffee, Phone, Palette, Leaf, Droplet,
  TreePine, Wheat, Cpu, Building2, Waves, Megaphone,
  Truck, Briefcase, Hammer, FlaskConical, Recycle, LeafyGreen,
  UtensilsCrossed, Power, TrendingUp, Wrench, Shield
} from 'lucide-react';

export const sectorsData = {
  "Automotive & Transportation": {
    title: "Automotive & Transportation",
    subtitle: "Vehicle Industry",
    icon: <Truck size={48} />,
    theme: "from-slate-500 to-gray-800",
    description: "This sector of the Association of Ghana Industries (AGI) is into providing support for industry players who are into the sale and rental of modern cars, trucks, buses amongst other transport mediums. Ghana began its automotive industry car manufacturing with the construction of its first self-assembled automobile from Ghanaian automotive company 'Suame Industrial Development Organization' (SMIDO). Many other vehicle marketing companies including Toyota, Hyundai, Renault, just to mention a few have tangible presence in the local market. The sector comprises of various companies with varied interests and challenges. The sector membership consists of forty-six (46) strong member companies. The companies' areas of operations include automobile, vehicle accessories, transport and haulage, airlines, shipping, freight forwarding and manufacturing of vehicle components.",
    leader: {
      name: "Alhaji Abdul-Somad Alhassan Musah",
      role: "Sector Chair",
      bio: "Alhaji Abdul-Somad Alhassan Musah holds a B.A Hon (Social Science) and an EMBA (Marketing) – University of Ghana and has attended various Marketing, Engineering and Procurement courses in Ghana and abroad- Japan, Korea and China. He has been with Japan Motors over 25 years and was head of Public Relations, Tender and Fleet Sales Business for Japan Motors and its associate companies, namely Oman Forfor, Silver Star Auto and Modern Auto Service. He managed Modern Auto Service for five (5) years (from 2004 to 2008) and was involved in Negotiation to bring one of the most successful Chinese light duty trucks (Foton) to Ghana, before returning to Japan Motors as the Deputy Managing Director in 2009 and has since remained in that capacity. He set up the Marketing Department of JMTC and has been heading tender and fleet sale business of the company. He has occupied various managerial positions in corporate Ghana and has extensive business experience. He has been actively involved in charitable work and social activities such as Sister-Cities programme (Ghana and USA). He was once handling various scholarship schemes established by Japan Motors to provide funding for needy but brilliant students in tertiary institutions and has been a member of the Boards of various educational institutions. He is a member of the Managing council of Regional Institute for Population Studies (RIPS) at the University of Ghana. He is currently the sector chairman of the Automotive and Transport Service of AGI.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "46", gdp: "3.2%", growth: "+6.5%", active: "5" },
    benefits: ["Import policy advocacy", "Local assembly support", "Technical training", "Fleet management support"]
  },
  "Metals & Building Products": {
    title: "Metals & Building Products",
    subtitle: "Construction Materials",
    icon: <Hammer size={48} />,
    theme: "from-orange-600 to-red-800",
    description: "The country's capacity to fully absorb and benefit from increased investments and new technologies depends a great deal on the availability, quality and efficiency of more basic forms of infrastructure. The infrastructure sector comprises the ports, roads, rail, aviation, electricity, water supply, transportation, telecommunication sub-sectors. The metals and building sector within the bigger infrastructure industry is the foundation for a very safe country. The metals and building sector of the Association of Ghana Industries (AGI) is focused on creating an enabling environment for industries whose core business is into the production of metals and also services and products for the building industry including cement, stones, iron rods and all other building materials.",
    leader: {
      name: "Mr. Adjare Danquah",
      role: "Sector Chair",
      bio: "Mr. Danquah is an astute entrepreneur and business owner with a number of business entities in Ghana, South Africa and the USA. He is an accomplished individual and an excellent negotiator with the ability to engage and influence business at all levels. His diverse business interests include but not limited to media network, alcohol distillation, real estates and rentals. Some of the businesses are Metalex Group (a leader in the roofing sheet manufacturing industry); Obuoba Group (a radio station, distilleries, and hospitality and education concerns), New Ningo Salt Works (salt mining); All Danquah (real estate & rentals) and Comet Steel Pty (a steel company in South Africa). His first group of companies was established in the year 1987 in Accra and has increasingly been making an indelible mark on the Ghanaian and West African construction sectors over three decades now. The company offers a total building solution to companies and individuals in the region and beyond. His dedication to hard work and willingness to form strong and strategic collaborations with key industry players has made him one of West Africa's most successful entrepreneurs. His continued display of empathy cannot be overlooked. He gives back to society, by financially assisting hundreds of individuals through education from second cycle education to the tertiary level and employs a number of those children after successful completion of their education and training.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "200+", gdp: "5.5%", growth: "+8.2%", active: "8" },
    benefits: ["Local content advocacy", "Standardized procurement", "Industry networking", "Policy advocacy"]
  },
  "Beverages": {
    title: "Beverages",
    subtitle: "Food & Drink Industry",
    icon: <UtensilsCrossed size={48} />,
    theme: "from-amber-500 to-orange-700",
    description: "The beverage sector is a sector that supports a thriving business community of beverage producers and suppliers in Ghana. This sector of the Association of Ghana Industries is growing at a rather fast pace in a healthy and competitive market space. African countries spend more than USD 60 billion annually importing food for their growing populations, but the continent has a potential to become a major food exporter. A rising middle class continues to boost African demand for food products, especially for processed and packaged food, creating a continental food market that the World Bank estimates could be worth USD 1 trillion in 2030.",
    leader: {
      name: "Ms. Adwoa Aaba Arthur",
      role: "Sector Chair",
      bio: "Adwoa Aaba Arthur holds a Bachelor of Arts Degree in History and English from the University of North Carolina at Charlotte in the USA; a Juris Doctorate (J.D) Law Degree from the Michigan State University College of Law, East Lancing in the USA; and a Qualifying Certificate in Law from the Ghana School of Law. Ms. Arthur is a member of the New Jersey Bar Association and the Ghana Bar Association. She is currently the Beverage Sector Chair at the Association of Ghana Industries. She joined ABL in January 2018 as the Legal & Corporate Affairs Director. Ms. Arthur began her career in 2003 as a judicial law clerk with the First Judicial District on Pennsylvania in the USA. She then worked as a Contract Attorney and Document Review Analyst in Washington, DC in the USA. In Ghana she worked as a State Attorney with the Ministry of Justice Attorney General's Department. She moved on to work with HFC Bank 'Ebankese' as a legal officer. Prior to working with ABL she worked at Scancom PLC (MTN Ghana) as the Regulatory Affairs / Compliance Manager.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "150+", gdp: "6.5%", growth: "+7.8%", active: "6" },
    benefits: ["Market access programs", "Regulatory advocacy", "Export support", "Industry networking"]
  },
  "Garments, Textiles & Leather": {
    title: "Garments, Textiles & Leather",
    subtitle: "Fashion & Apparel",
    icon: <Briefcase size={48} />,
    theme: "from-purple-500 to-pink-700",
    description: "Garments, Textiles and Leather sector of the Association of Ghana Industries (AGI) deals with the industry along the production and life value chain of clothing, garments and leather. Textile manufacturing in Ghana is an industry consisting of ginneries and textile mills producing batik, wax cloth, fancy printed cloth and Kente cloth. The industry has shown signs of significant growth in recent years promoting high-quality traditionally designed fabrics as 'Made in Ghana' to niche markets, especially the US. The dry, savannah climate in the Northern regions of the country is ideal for the cultivation of cotton. Actors within this sector include producers of cotton, wool, fashion designers, retailers, textiles companies, shoes, bags amongst others.",
    leader: {
      name: "Mrs. Edwina Ama Assan",
      role: "Sector Chair",
      bio: "Edwina Ama Assan was born and grew up in Cape Coast as a young person with passion in creativity and design. She is the Managing Director and Creative Designer of EDTEX Ltd, a textile design & manufacturing company as well as a social enterprise engaging in advocacy, designing, producing, training and mentoring in Ghana and across borders. Edwina holds a Master of Arts (M.A.) Degree in Entrepreneurship and a Bachelor of Arts (B.A.) Degree in Textiles from the Kwame Nkrumah University of Science and Technology (KNUST). She is President of SPINnet Textiles & Garment Cluster (Ghana's Premier association of Textiles & Apparel manufacturers), President of EMPRETEC Business Women's Forum, Chairperson for National Export Development Strategy (NEDS) Creative and Industrial Arts Sector. She has received several awards including Ghana Shippers Authority-Special Recognition award and Common Objective-CO 2022 Leadership Award.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "280+", gdp: "2.8%", growth: "+9.5%", active: "7" },
    benefits: ["Industry standards", "Training programs", "Export market access", "Cluster networking"]
  },
  "Agri-Business": {
    title: "Agri-Business",
    subtitle: "Agriculture Sector",
    icon: <LeafyGreen size={48} />,
    theme: "from-green-500 to-emerald-700",
    description: "Agriculture in Ghana is recognized as the mainstay of the economy with a greater impact on poverty reduction than any other sector. It is also critical for rural development and associated cultural values, social stabilization, environmental sustainability and buffer during economic shocks. The sector currently employs about 48% of the total workforce. The country is classified into three (3) main agriculture zones: Forest Vegetation Zone, Northern Savannah Vegetation Zone, and Coastal Savannah. The Agriculture business sector of the Association of Ghana Industries (AGI) is into providing a conducive atmosphere for business/industries that are into the production of food and rearing of livestock.",
    leader: {
      name: "Ms. Fatima Alimohammed",
      role: "Sector Chair",
      bio: "Fatima Alimohammed the CEO of African Brand Warrior is an African and Kenyan. She is an advocator for Africa and African brands with a solid track record across African markets. Fatima is a thought leader in Strategy, Brand Development, Consumer Relationships Marketing, NPD, and Communication. Prior to Founding and becoming the CEO of African Brand Warrior, she was the GM for Wilmar Africa in both the Palm and Shea Industry in West Africa and has been representing the industries in various positions and boards. She has been a Governor on the Kenya Private Sector Alliance (KEPSA), been the Chair of the Marketing Society of Kenya, Founded Marketing Society of Tanzania and Uganda. She was honoured with the TOP 50 CMO's Global award in Singapore and the TOP 100 Most Talented Marketers Global Award in India. She is the current Chairperson of the Agriculture Sector in Ghana at the AGI advocating for Africa to work on the full value chain.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "950+", gdp: "18.2%", growth: "+5.1%", active: "8" },
    benefits: ["Market linkage programs", "Value-chain optimization", "Export financing", "Land tenure advocacy"]
  },
  "Hospitality & Tourism": {
    title: "Hospitality & Tourism",
    subtitle: "Tourism Industry",
    icon: <Palmtree size={48} />,
    theme: "from-orange-400 to-orange-700",
    description: "Tourism industry in Ghana has experienced a dramatic turnaround since 1996 and 2014 continued this phenomenal growth. The number of tourism visits from 2006 to 2010 has shown a steady increase with an average growth of 17%. From 497,129 international visitors in 2006 to 1,093,000 people visiting Ghana in 2014. Ghana receives the largest number of tourists visiting Africa for cultural proposes and ranked amongst the top 10 African tourism destinations in 2014. The sector was ranked as the fourth foreign exchange earner for Ghana, raking in more than $1.4 million in 2008 and contributing 6.2 % GDP. The Tourism sector's growth rate an average of 17% is one of the fastest growing sectors with huge potentials of poverty reduction and wealth creation.",
    leader: {
      name: "Mr. Sampson Kifalu Masha",
      role: "Sector Chair",
      bio: "Mr. Sampson Kifalu Masha is the General Manager of the Alisa Hotels- Swiss Spirit Hotels and Suites Alisa in Accra Ghana. He is an experienced General Manager with a demonstrated history of working in the hospitality Industry. Mr. Sampson Kifalu Masha is skilled in catering, food and beverages, Micros, front office and hospitality management. He is a Strong Professional with a diploma in Hotel management focused in Hospitality Administration/Management in 1993 to 1997 from KENYA UTALII COLLEGE. From June 2008 to April 2011, he was the food and beverage manager at the Breezes Beach club and spa in Zanzibar, Tanzania and also Dianu sea resort-Welcome inn Hotels in Ukunda, Kenya. He then moved on to become the manager of Diani Sea Resort.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "400+", gdp: "6.5%", growth: "+9.2%", active: "6" },
    benefits: ["Tourism policy advocacy", "Service quality training", "International marketing", "Regulatory compliance"]
  },
  "Oil & Gas": {
    title: "Oil & Gas",
    subtitle: "Energy Resources",
    icon: <FlaskConical size={48} />,
    theme: "from-yellow-500 to-orange-700",
    description: "In June and September 2007, a consortium of companies comprising Kosmos Energy Ghana, Tullow Ghana Limited, Anardarko Petroleum Corporation, Sabre Oil and Gas Limited, E.O. Group in conjunction with the GNPC announced discoveries of significant quantities of oil and gas in the offshore deep water Tano / Cape Three Points basins. Ghana's Oil and Gas Industry is growing at a steady pace, with a total proven reserve base as at August 2014 of approximately 883.4 million barrels of oil and 2,312.4 billion cubic feet of gas. There are four (4) major oil and gas fields in the country. The Oil and Gas sector of the Association of Ghana Industries (AGI) is assigned the responsibility of ensuring regulations and all other issues pertaining to the Oil and Gas sector creates an enabling environment for business to thrive.",
    leader: {
      name: "Mr. Kwame Jantuah",
      role: "Sector Chair",
      bio: "Mr. Kwame Jantuah is the CEO of the African Energy Consortium Ltd. He is the Vice Chairman of the Public Interest and Accountability Committee (PIAC), representing Civil Society and Community Based Organizations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "85+", gdp: "7.4%", growth: "+12.1%", active: "5" },
    benefits: ["Policy advocacy", "Industry standards", "Regulatory guidance", "Technical workshops"]
  },
  "Information & Communication Technology": {
    title: "Information & Communication Technology",
    subtitle: "Digital Sector",
    icon: <Monitor size={48} />,
    theme: "from-blue-600 to-indigo-800",
    description: "The ICT industry comprises of telecommunications operators, internet service providers, VSAT data operators, software manufacturers, broadcast institutions, ICT education providers, internet cafes, etc. Presently in place is ICT for Accelerated Development (ICT 4AD) Policy which is a long term strategy for developing the ICT Sector and expanding its role in the Ghanaian economy. The ICT4AD vision for Ghana is 'To improve the quality of life of the people of Ghana by significantly enriching their social, economic and cultural well-being through the rapid development and modernization of the economy and society using information and communication technologies as the main engine for accelerated and sustainable economic and social development.'",
    leader: {
      name: "Mrs. Nana C. A. Beecham",
      role: "Sector Chair",
      bio: "Nana studied Economics and Business and has worked in the ICT field in a marketing, administrative and project management capacity for the past nineteen years. She manages Seatec Telecom, a leading provider of enterprise communications technology solutions in Ghana which serves many key entities, including top hotels, government institutions, banks, insurance companies, NGOs, large multinationals and manufacturing firms. She is currently the Chairperson for the ICT Sector of the Association of Ghana Industries (AGI), she has a flair for sales and marketing and is very passionate about building and maintaining Customer Relationships. In 2010, with the collaboration of the Black Women's Leadership Council, Nana founded the 'Girls in Science Project' to provide support to girls and young women studying science through mentoring sessions, seminars and workshops.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "450+", gdp: "4.8%", growth: "+15.6%", active: "10" },
    benefits: ["Tech hub networking", "Software export support", "Cybersecurity frameworks", "Innovation grants"]
  },
  "Pharmaceuticals": {
    title: "Pharmaceuticals",
    subtitle: "Medical Products",
    icon: <Heart size={48} />,
    theme: "from-rose-500 to-red-700",
    description: "The Pharmaceutical Sector of the Association of Ghana Industries (AGI) ensures that producers of medicines operate a market that functions efficiently and has good supply chain through the support we provide. Ghana's health care market is one of the most attractive markets in Sub-Sahara Africa for US products and investment. The Pharmaceutical Society of Ghana is the umbrella professional association of all registered Pharmacists in Ghana. AGI is involved in the pursuit of research activities connected with the advancement of pharmaceutical knowledge and to disseminate scientific and professional information.",
    leader: {
      name: "Mr. Samuel Amo Tobbin",
      role: "Sector Chair",
      bio: "Mr. Samuel Amo Tobbin, Executive Chairman of Tobinco Pharmaceuticals LTD (TPL) has over 20 years experience in managing business. He is the Executive Chairman of The Tobinco Group of Companies which includes: Pharmaceuticals, Cosmetics, Banking, Insurance, FM station and many more. He has undergone an extensive training in Finance, Management and Strategic Planning with hands on experience to run his business efficiently. He was recently nominated for an Honorary Doctorate Degree from a University in Denmark for his experience in Business Management and Strategy. In 2008 Tobinco Pharmacy was honoured by the Ghana Private & Dental Association for the most TRUSTED brand – ALAXIN. Popular anti-malaria drug, 'Lonart,' produced by Tobinco Pharmaceuticals was adjudged The Chartered Institute of Marketing Ghana (CIMG) product of the Year, 2014. He has a passion for the vulnerable and the needy in society.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "280+", gdp: "3.9%", growth: "+11.2%", active: "6" },
    benefits: ["Regulatory advocacy", "Research partnerships", "Medical device importation", "Distribution networks"]
  },
  "Rubber & Plastics": {
    title: "Rubber & Plastics",
    subtitle: "Manufacturing Sector",
    icon: <Recycle size={48} />,
    theme: "from-teal-500 to-cyan-700",
    description: "The rubber industry of Ghana is an industry sector covering essentially all rubber and plastic related manufacturing. It is a much diversified sector with rubber and plastic products such as hoses, belts, roofing, tubes, films, polythene, containers amongst others. The industries in this sector benefits greatly from the support provided by the Rubber and Plastics sector of the Association of Ghana Industries (AGI) through the fostering of great working environment.",
    leader: {
      name: "Mr. Ishmael Quaye",
      role: "Sector Chair",
      bio: "Mr. Ishmael Quaye is the sector Chairperson of the Rubber and Plastics Sector of the Association of Ghana Industries (AGI). He works with Qualiplast Ghana Limited as the Head of Marketing & Customer Relations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "120+", gdp: "2.2%", growth: "+7.5%", active: "4" },
    benefits: ["Industry standards", "Material sourcing", "Quality certification", "Export support"]
  },
  "Toiletries & Cosmetics": {
    title: "Toiletries & Cosmetics",
    subtitle: "Beauty Products",
    icon: <Wrench size={48} />,
    theme: "from-pink-400 to-rose-600",
    description: "Major players in the global beauty and cosmetics industry are making the most of the boom projected for the sector in sub-Saharan Africa. Thanks to a burgeoning population expected to double to 2.4 billion in 2050, the rising middle class and amplified urbanization have positioned the region as the 'next frontier' in the sector. The cosmetics and personal care industry globally generates an estimated annual turnover of $400 billion. The Toiletries and Cosmetics sector focuses on creating an enabling environment for the growing toiletries and cosmetics market.",
    leader: {
      name: "Mr. Sandy Osei Agyemang",
      role: "Sector Chair",
      bio: "Mr. Sandy Osei-Agyemang is the founder and CEO of Slid Industries, a company that is into the production and marketing of hair and skin under the brand names MVP, Family Choice, Skin Fine and LaNe. He also co-founded and managed Afam Concept Inc., a leading manufacturer of VITALE, ELENTEE AND MO' BODY hair product brands in the USA. Mr. Osei-Agyemang pioneered new concepts in hair care for people of color including the now famous 'Never Greasy' and 'Moisture Retention' approach to hair care. He has also held several roles with financial and banking institutions including Credit Lyonnais, Harris Trust and Savings Bank and Continental Illinois, USA. He has won various awards including Ghana's Highest National Award 'Order of the Volta – Member' for his services to entrepreneurship and business development.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc4aac0a4?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "95+", gdp: "1.5%", growth: "+8.8%", active: "3" },
    benefits: ["Industry advocacy", "Market access", "Product development", "Export support"]
  },
  "Wood Processing": {
    title: "Wood Processing",
    subtitle: "Timber Industry",
    icon: <TreePine size={48} />,
    theme: "from-amber-600 to-yellow-900",
    description: "Ghana has a land area of 238,500km2 made up of two (2) broad ecological zones – the High Forest Zone covering much of a third of the southern part of the country (34%) and the Savannah Zone, covering two thirds of the considerably drier Northern Ghana (66%). The agriculture sector which includes wood and forestry is the largest contributor to GDP whilst forestry alone contributes an estimated 4%. The formal forestry sector employs about 120,000 Ghanaians. The timber industry is the fourth largest foreign exchange earner after minerals, cocoa and oil exports. The wood processing sector of AGI includes all industries that are into timber production, wood work factories and all industries that make use of value addition to forestry and wood products.",
    leader: {
      name: "Mr. Richard Duah Nsenkyire",
      role: "Sector Chair",
      bio: "Mr. Richard Duah Nsenkyire is a professional forester from the Kwame Nkrumah University of Science and Technology with Post Graduate career development and training in Europe, America and the Far East. He is also an expert in timber industry development and trade in Africa, Europe and the world. He has 20 years' experience in wood processing and timber trade across the world. He is the Managing Director of Samartex Wood and Plywood Company, a leading timber company in Ghana, supplying wood products globally. As chair of the wood processing sector for AGI, he has represented the Ghana Timber Industry on the multi-stakeholder implementation committee during the VPA negotiations. He led Samartex's efforts to become the first wood processing firm to attain Controlled Wood / CoC Certification in Ghana.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "180+", gdp: "4.1%", growth: "+5.2%", active: "6" },
    benefits: ["Sustainability certification", "Timber trade facilitation", "Reforestation programs", "Export certification"]
  },
  "Construction": {
    title: "Construction",
    subtitle: "Building Industry",
    icon: <HardHat size={48} />,
    theme: "from-zinc-600 to-black",
    description: "Today, 54% of the world's population lives in urban areas, a proportion that is expected to increase to 66% by 2050. The real estate and construction industry in Ghana over the past years has seen massive boom and growth. This is attributed to the rapid economic growth of the economy. The construction sector has consistently registered double digit growth bolstered by investments in real estate, improved public infrastructure, investment in the mining and the oil and gas sector. The sector is on the rise, taking advantage of increased demand for residential and office accommodation, as well as hospitality services reflecting the growth of the middle-income class.",
    leader: {
      name: "Mr. Rockson Kwesi Dogbegah",
      role: "Sector Chair",
      bio: "Mr. Rockson Kwesi Dogbegah is a Chartered Construction Manager by profession. He is the founder and Executive Chairman of Berock Ventures Limited, a chartered building and construction surveying firm in Ghana. Rockson holds an MBA in Project Management from the De Monfort University, Leicester, United Kingdom and Fellowships in many professional bodies including the Chartered Institute of Building, UK; Royal Institute of Chartered Surveyors, UK; Institute of Directors of Ghana; and Ghana Institute of Construction. He is a major advocate for construction industry development and has served as Vice President of the Chartered Institute of Building Africa and immediate past President of the Ghana Chapter. He is also the Chairman of the Association of Ghana Industries Construction Sector.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "500+", gdp: "9.1%", growth: "+6.8%", active: "7" },
    benefits: ["Local content advocacy", "Standardized procurement", "Safety certification", "Project bidding alerts"]
  },
  "Ghana Timber Millers Organization": {
    title: "Ghana Timber Millers Organization",
    subtitle: "Timber Trade",
    icon: <Building2 size={48} />,
    theme: "from-amber-700 to-yellow-900",
    description: "The Ghana Timber Millers Organization (GTMO) was founded in 1981. Until then millers were part of the Ghana Timber Association (GTA). Through the untiring efforts of its various leaders over the years, the GTMO has grown to become a viable trade organization managed by a well set-up governing structure and a permanent secretariat. Members of GTMO are engaged in a wide range of products including: Lumber, Strips, Rotary Veneer, Sliced Veneer, Plywood, Doors & Windows, Flooring, and Furniture Parts. Almost all GTMO companies have kiln drying facilities and can export products of various specifications.",
    leader: {
      name: "Dr. Kwame Asamoah Adam",
      role: "Sector Chair",
      bio: "Dr. Adam has 38 years' experience in Tropical Forest Management, Research and Teaching. He has worked in both governmental and non-governmental organizations. His expertise lies in forest ecology; forest operations planning and management; forest inventory, timber harvesting, project formulation and project management, human resources development and forestry training curricula development. He obtained a PhD in Forest Exploitation, University of Aberdeen, U.K and MSc in Forestry Management and Planning, University of Aberdeen, UK. He is currently the Chief Executive (CEO) of the Ghana Timber Millers organization. He is also Ghana's representative – FAO Advisory Committee on Sustainable Forest Industries from 2012 to date.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "85+", gdp: "2.5%", growth: "+4.2%", active: "4" },
    benefits: ["Market access", "Standards improvement", "Value addition", "Export promotion"]
  },
  "Business Promotion & Consultancy": {
    title: "Business Promotion & Consultancy",
    subtitle: "Professional Services",
    icon: <Briefcase size={48} />,
    theme: "from-blue-500 to-indigo-700",
    description: "Business Promotion and Consultancy Sector of the Association of Ghana Industries executes the mandate of providing support services through the provision of good business ideas and advisory services to enhance business sector growth. Some of the member companies in this sector include professional services companies such as law firms, car rental companies, employment agencies, etc.",
    leader: {
      name: "Mr. David Ofosu-Dorte",
      role: "Sector Chair",
      bio: "David Ofosu-Dorte is a legal and policy specialist with considerable government service and consultancy experience, spanning over twenty-five (25) years. He has extensive Africa experience in the public sector policy and regulatory reform, infrastructure development, construction/engineering assignments, land administration, town planning, development and control, local government, public procurement and Public Private Partnership (PPP). He has facilitated several projects for central and local government agencies and donor agencies including the World Bank and UNDP. He was the lead international procurement and concessions lawyer on the team that formulated the Public Procurement and Concessions Act of Liberia in 2005. He advised the Ministry of Finance on the procurement and PPP regime for the development of the Accra-Kumasi Highway project.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc4aac0a4?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "150+", gdp: "3.5%", growth: "+6.2%", active: "5" },
    benefits: ["Business advisory", "Policy guidance", "Networking", "Training programs"]
  },
  "Chemicals": {
    title: "Chemicals",
    subtitle: "Industrial Chemicals",
    icon: <FlaskConical size={48} />,
    theme: "from-purple-500 to-indigo-800",
    description: "The Chemical industry comprises of companies that produce chemicals for industrial use and affiliated products and services. The chemical sector of AGI is the key body within the Association providing support for such companies within the sector. It is also responsible for coordinating efforts aimed at strengthening the sector and creating a conducive atmosphere within which key actors can operate soundly.",
    leader: {
      name: "Mr. Emmanuel Kojo Gyimah",
      role: "Sector Chair",
      bio: "Mr. Emmanuel Gyimah is currently a Member of the Council of Association of Ghana Industries (AGI) and Managing Director of Mina Chemicals. After secondary education in 1981, Mr. Gyimah entered the School of Administration at the University of Ghana to pursue a B.Sc. in Administration (Accounting Option). He acquired the Membership of the Association of Chartered Accountants (ACCA) in 1994. He also attended GIMPA – CIM Executive School for the Professional Postgraduate Diploma in Marketing and followed it with the GIMPA – Executive Master's in Business Administration (EMBA). He has been a Council Member, Association of Ghana Industries (AGI) since 2010 and has been functioning as the Chairman, AGI Chemical Sector. He has also been a Member of the Governing Board of the Environmental Protection Agency (EPA) since 2010.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "75+", gdp: "1.8%", growth: "+5.5%", active: "3" },
    benefits: ["Regulatory advocacy", "Industry standards", "Technical support", "Environmental compliance"]
  },
  "Energy": {
    title: "Energy",
    subtitle: "Power Sector",
    icon: <Zap size={48} />,
    theme: "from-yellow-500 to-orange-600",
    description: "The Energy Sector in Ghana contributes significantly to the economy. The sector can be classified into two main sub-sectors: Petroleum Sub-sector and Power Sub-Sector. Ghana's petroleum sector involves upstream and downstream activities. The power sub-sector involves the generation, transmission and distribution of electrical energy for industrial, commercial and domestic use. The Power System of Ghana is run by three utility companies; the Volta River Authority (VRA), Ghana Grid Company Limited (GRIDCO) and the Electricity Company of Ghana (ECG). The Energy sector of AGI is poised to continue its support to sector members.",
    leader: {
      name: "Mr. Martin Olu-Davies",
      role: "Sector Chair",
      bio: "Mr. Martin Olu-Davies is currently the Head of Health, Safety and Environment of Ghana Oil Company Limited (GOIL). He had served in various capacities at GOIL before assuming his current position and has twenty-four (24) years of industry experience. He joined GOIL in 1995 as a District Sales Representative in Tema after working with reputable companies such as Africa Petroleum PLC and Elf Oil Ghana Limited. At GOIL, Mr. Olu-Davies was in charge of Consumer and Bunkering Sales in Tema from 1995 to 1999. He holds an MSc in Economics and an MBA from the University of Leicester and is also a member of the Institute of Human Resources Management Practitioners.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "300+", gdp: "7.4%", growth: "+12.1%", active: "5" },
    benefits: ["Utility pricing negotiation", "Renewable energy grants", "Technical policy workshops", "Efficiency auditing"]
  },
  "Export": {
    title: "Export",
    subtitle: "International Trade",
    icon: <TrendingUp size={48} />,
    theme: "from-green-500 to-teal-700",
    description: "The Export sector of the Association of Ghana Industries (AGI) is a critical sector catering to the provision of goods and services aimed at creating the environment for much needed foreign exchange. The export processing zones are part of wider efforts to boost industrial exports. The implementation of the National Single Window – a programme to automate and consolidate all trade processes – is a critical part of this. The country recently concluded an interim economic partnership agreement with the EU that will improve access to that trading bloc.",
    leader: {
      name: "Mr. Charles Yao Mensah",
      role: "Sector Chair",
      bio: "Mr. Charles Yao Mensah is the Executive Chairman of Myroc Group of Companies in Tema. He is also the Chairperson of the Association of Ghana Industries (AGI) Export Sector and a member of the National Council of the AGI. He is also the immediate past Chairman of the Tema Branch of the AGI. He graduated from the University of Ghana, Legon with BA Hons (Economics) and worked with former BP and ELF before resigning to set up his own company in 1993. He has a number of companies forming the Myroc Group of Companies, namely; Myroc Food Processing Company, the second largest tuna processing company located in Tema Heavy Industrial Area. He employs over 2000 workers. He is a Member of the African Tuna Producers' Association.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "220+", gdp: "8.5%", growth: "+9.8%", active: "6" },
    benefits: ["Export market access", "Trade facilitation", "Policy advocacy", "Networking"]
  },
  "Financial Services": {
    title: "Financial Services",
    subtitle: "Banking & Finance",
    icon: <Landmark size={48} />,
    theme: "from-red-800 to-black",
    description: "In Ghana, the financial services industry is dominated by the banking sector, though insurance, pension and capital markets have emerged in recent times as a result of past financial sector reforms. The implementation of the Financial Sector Strategic Plan (FINSPP) in 2003 promoted the evolution of various financial sector institutions. The operating financial intermediaries include both foreign and local major banks, Rural and Community Banks (RCBs), Savings and Loans Companies (SLCs) and other finance and leasing companies. The financial sector of AGI is a body that offers support to all finance industry players.",
    leader: {
      name: "Mr. Issah Adam",
      role: "Sector Chair",
      bio: "A Chartered Accountant with membership of the Institute of Chartered Accountants, Ghana (ICAG) and Institute of Chartered Accountants of Nigeria (ICAN). Mr. Issah Adam also holds a BSc. Administration, (Accounts option) degree from the School of Administration, University of Ghana. He has extensive work experience in various capacities in reputable organizations like Total Ghana (formerly Mobil Oil), Unilever Ghana Limited, Ghana Agro Food Company Limited in the field of Finance, Accounting and Banking spanning a period of over twenty years. He is currently the CEO of GN Bank Limited; a position he has held since January 2016.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "150+", gdp: "5.2%", growth: "+4.2%", active: "4" },
    benefits: ["SME loan facilitation", "Investment matchmaking", "Tax policy advocacy", "Financial literacy"]
  },
  "Electricals & Electronics": {
    title: "Electricals & Electronics",
    subtitle: "Power & Technology",
    icon: <Power size={48} />,
    theme: "from-cyan-500 to-blue-800",
    description: "The Electricals and Electronics sector of the AGI is a very critical part within the Industry. The sector covers the main stakeholders within the larger Electricity provision services and products as well as its associates. It can be stretched to cover manufacturing of products and accessories for production of domestic wiring, power distribution cables, transformers, household and industrial electronic products. The sector oversees players in the development, design, manufacture, marketing and distribution of copper and aluminum cables for the energy, industrial, specialty and communications markets.",
    leader: {
      name: "Mrs. Kate Quartey-Papafio",
      role: "Sector Chair",
      bio: "A courageous Ghanaian Industrialist, Mrs. Kate Quartey-Papafio is a firm proactive and resourceful leader who sees risks and challenges as opportunities for growth and development. She founded Reroy Cables Limited in 1992 to distribute high quality electrical cables. As a major player in the production and distribution of power cables, conductors, provision of electrical power distribution system and strategic contract services to the electricity sector, its business is also linked to the electricity distribution and transmission. She was crowned the Chartered Institute of Marketing Ghana (CIMG) Marketing Woman of the year 2013 and in 2014 adjudged winner in the Entrepreneurship category at the maiden edition of the Osagyefo Kwame Nkrumah African Genius Award. She was also the Ernest & Young Africa Entrepreneur of the Year Award winner.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "45+", gdp: "2.1%", growth: "+8.5%", active: "3" },
    benefits: ["Industry standards", "Technical training", "Market access", "Policy advocacy"]
  },
  "Environmental & Sanitation": {
    title: "Environmental & Sanitation",
    subtitle: "Waste Management",
    icon: <Droplet size={48} />,
    theme: "from-green-400 to-teal-600",
    description: "This sector of the Association of Ghana Industries (AGI) encompasses companies or contractors within the waste, sanitation and environmental service providers. The umbrella body for the sector, the Environmental Service Providers Association (ESPA), is committed to the needs of Ghana's Environmental Sanitation. As partners in development, ESPA has over the past several years maintained an active collaborative stakeholder relationship with the Metropolitan, Municipal and District Assemblies (MMDAs) in the delivery of solid and liquid waste management services.",
    leader: {
      name: "Dr. Joseph Siaw Agyapong",
      role: "Sector Chair",
      bio: "Dr. Joseph Siaw Agyapong is the founder and Executive Chairman of the Jospong Group Companies. Dr. Agyapong became a Chief Executive Officer at the young age of 25 when he transformed his mother's exercise book business into a printing press (Jospong Printing Press). He has over the past twenty (20) years built a conglomerate with over 40 companies operating in about 12 sectors of the Ghanaian economy and in seven different countries. His businesses put together employ over two hundred and fifty thousand (250,000) people. Ten years ago, he revolutionized waste management in Ghana with the introduction of Zoomlion Ghana Limited. Dr. Agyapong is currently the President of the Environmental Service Providers Association in Ghana and a council member of AGI.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc4aac0a4?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "85+", gdp: "1.5%", growth: "+12.5%", active: "4" },
    benefits: ["Waste management solutions", "Capacity building", "Recycling services", "Advocacy"]
  },
  "Food Sector": {
    title: "Food Sector",
    subtitle: "Food Processing",
    icon: <UtensilsCrossed size={48} />,
    theme: "from-amber-600 to-orange-800",
    description: "The government of Ghana has implemented policies such as Ghana Shared Growth and Development Agenda (GSGDA); Food and Agricultural Sector Development Policy (FASDEP II) and Medium Term Agricultural Sector Investment Plan (METASIP) with the aim of adding value to Ghana's raw agricultural products and increasing food processing. Ghana's exports of some prepared or processed foods and beverages include canned tuna, cut fruits, gin, wine, baby food, ethyl alcohol, coffee prepared, and many more. The food industry is one of the essential sectors of every economy across the world. AGI through diverse support mechanisms has helped in creating an enabling and fast-growing food industry in Ghana.",
    leader: {
      name: "Dr. Dominic Quainoo Blaise Kweku Mbro",
      role: "Sector Chair",
      bio: "Dr. Dominic Quainoo Blaise Kweku Mbro is the Managing Director of EMADOM COMPANY LTD and currently the chair person for the Food sector of the Association of Ghana Industries (AGI). He is a Ghanaian born on the 3rd of February 1953 in Saltpond. He had his elementary education at St. Peter's Roman Catholic Primary Mixed School, Osu and secondary education at Aquinas Secondary School, Osu, Achimota School and Accra Academy. He had his tertiary education at the University of Ghana Faculty of Agriculture Legon and University of Babes Bolyai, Cluj-Napoca Romania. He is an agriculturist and a veterinary surgeon by profession and worked as a customs officer and currently a manufacturer of dairy products.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "600+", gdp: "7.8%", growth: "+7.2%", active: "11" },
    benefits: ["Food safety certification", "Export market access", "Recipe commercialization", "Ingredient sourcing"]
  },
  "Manufacturing": {
    title: "The Manufacturing Engine",
    subtitle: "Industrial Production",
    icon: <Factory size={48} />,
    theme: "from-teal-600 to-emerald-800",
    description: "The Manufacturing sector is a cornerstone of AGI. We represent a diverse range of industries from food processing to heavy industrial machinery, advocating for energy efficiency and competitive trade practices. This sector provides support for industry players and drives industrial growth across Ghana.",
    leader: {
      name: "Dr. Kwame Asante",
      role: "Sector Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "1,200+", gdp: "11.5%", growth: "+8.4%", active: "14" },
    benefits: ["Quarterly industrial surveys", "Trade delegation invitations", "ISO certification support", "Regulatory advocacy"]
  },
  "Advertising": {
    title: "Advertising",
    subtitle: "Marketing & Communications",
    icon: <Megaphone size={48} />,
    theme: "from-pink-500 to-rose-700",
    description: "The Advertising Sector of the Association of Ghana Industries (AGI) is a sector that carries out proactive support services to help grow and develop the advertising industry in Ghana. The Advertising Association of Ghana (AAG) working through AGI is the Industry Body and Professional Institute for Ghana's thriving and highly potent Advertising and Marketing Communications business.",
    leader: {
      name: "Ms. Mansa Amoa-Awuah",
      role: "Sector Chair",
      bio: "Ms. Mansa Amoa-Awuah is currently the Vice President of the Advertisers Association of Ghana (AAG) and also the representative of the AAG to the AGI National Council. Mansa Amoa-Awuah is the founder and CEO of Saki Publicity, a full-service advertising agency that she has helmed for the last two decades. She began her professional career as a Barrister in the United Kingdom in the 1980's, transitioning into marketing communications in the 1990's. She was elected Vice President of AAG in 2014 after serving for eight years as an elected Executive Council Member.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "85+", gdp: "1.8%", growth: "+9.2%", active: "3" },
    benefits: ["Industry standards and best practices", "Professional development programs", "Networking with industry leaders", "Regulatory advocacy and guidance"],
    aims: [
      "To promote public confidence in the Advertising profession.",
      "To safeguard the common interests to those engaged in or using advertising for the promotion of common action and the institution of protective measures.",
      "To encourage the study of the theory and practice of advertising and the improvement of its techniques, by the institution of study, examination and award of certificates.",
      "To establish that efficient advertising in an essential factor in the marketing of goods and services and in the economic life of the country.",
      "To demonstrate the efficiency of the services, that advertising and its associated interests can give to government, industry and the public.",
      "To further the adoption of standards or practice in the business relations between media owners, advertising agencies and advertisers."
    ]
  },
  "Printing, Packaging & Stationery": {
    title: "Printing, Packaging & Stationery",
    subtitle: "Industry Solutions",
    icon: <Package size={48} />,
    theme: "from-amber-500 to-yellow-700",
    description: "Global packaging sales are projected to rise by 3% in real terms to $797 billion in 2013 and grow at an annual rate of 4% to 2018. The growth of the global packaging industry is being driven by a number of trends. Growing urbanization, investment in housing and construction, the development of retail chains and the burgeoning healthcare and cosmetics sectors are driving packaging demand. The Association of Ghana Industries (AGI)'s printing and packaging sector is assigned with the mandate of providing support to various printing and packaging industries in Ghana.",
    leader: {
      name: "Mr. James Edu Dadzie",
      role: "Sector Chair",
      bio: "James Edu Dadzie is a print administration professional with over twenty-eight years' experience in the Ghanaian and Nigerian print industry. Ten (10) of those years have been in Senior Managerial positions. His experience spans across commercial printing, labels, packaging, variable data printing, envelope manufacturing and security printing. James is currently the managing director of G-Pak limited a wholly owned subsidiary of Graphic Communications Limited. He holds a first degree in Book Industry from KNUST and an MA International Affairs – University of Ghana, Legon. James is a certified ISO Quality Auditor.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    stats: { members: "200+", gdp: "2.8%", growth: "+9.5%", active: "4" },
    benefits: ["Sustainable packaging workshops", "Material sourcing network", "Quality certification", "Export packaging standards"]
  }
};

export default sectorsData;