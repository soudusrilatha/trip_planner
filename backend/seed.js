require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Trip = require('./models/Trip');
const Hotel = require('./models/Hotel');
const Transport = require('./models/Transport');

const seed = async () => {
  await connectDB();
  console.log('✅ Connected to MongoDB via connectDB()');

  // Clear existing data
  await User.deleteMany({});
  await Trip.deleteMany({});
  await Hotel.deleteMany({});
  await Transport.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create Users
  const planner = await User.create({
    name: 'Raj Sharma', email: 'planner@demo.com', password: 'demo1234',
    role: 'planner', phone: '+91 9876543210'
  });
  await User.create({
    name: 'Priya Mehta', email: 'traveler@demo.com', password: 'demo1234',
    role: 'traveler', phone: '+91 9123456789'
  });
  console.log('👤 Created demo users');

  // Create Trips
  const trips = await Trip.insertMany([
    {
      title: 'Goa Beach Paradise Getaway',
      destination: 'Goa',
      description: 'Experience the ultimate beach vacation in Goa with pristine beaches, vibrant nightlife, Portuguese heritage, and delicious seafood. Perfect for all types of travelers.',
      days: 5,
      budgetMin: 12000,
      budgetMax: 35000,
      budgetCategory: 'mid-range',
      travelType: ['solo', 'friends', 'couple'],
      foodPreference: ['non-veg', 'any'],
      category: 'beach',
      rating: 4.7,
      totalBookings: 234,
      bestTimeToVisit: 'November to February',
      highlights: ['Sunset at Anjuna Beach', 'Dudhsagar Waterfall Trek', 'Old Goa Heritage Churches', 'Water Sports at Baga', 'Night Market at Arpora'],
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
      itinerary: [
        { day: 1, title: 'Arrival & North Goa Beaches', activities: ['Check-in at hotel', 'Visit Calangute & Baga Beach', 'Sunset at Anjuna Viewpoint', 'Dinner at beachside shack'], meals: 'Lunch at hotel, Dinner at Martin\'s Corner', notes: 'Carry sunscreen and light clothes' },
        { day: 2, title: 'South Goa & Heritage', activities: ['Colva Beach visit', 'Old Goa UNESCO Churches tour', 'Se Cathedral & Basilica of Bom Jesus', 'Panjim city walk'], meals: 'Breakfast at hotel, Local Goan Thali lunch', notes: 'Modest dress for church visits' },
        { day: 3, title: 'Dudhsagar Falls Adventure', activities: ['Morning trek to Dudhsagar Falls', 'Jungle camping area', 'Spice plantation visit', 'Evening boat cruise'], meals: 'Packed breakfast, BBQ lunch', notes: 'Wear trekking shoes, carry water' },
        { day: 4, title: 'Water Sports & Markets', activities: ['Parasailing at Baga Beach', 'Jet skiing & banana boat', 'Flea market at Mapusa', 'Saturday Night Market at Arpora'], meals: 'Breakfast, Beach cafe lunch, Market snacks', notes: 'Book water sports in advance' },
        { day: 5, title: 'Relaxation & Departure', activities: ['Morning yoga on beach', 'Last minute shopping at Panjim market', 'Check-out & departure'], meals: 'Breakfast at hotel', notes: 'Keep 3hrs buffer for airport' }
      ],
      createdBy: planner._id
    },
    {
      title: 'Royal Rajasthan Heritage Tour',
      destination: 'Rajasthan',
      description: 'Journey through the land of kings — explore majestic forts, royal palaces, colorful bazaars, and experience the rich culture of Rajasthan across Jaipur, Jodhpur, and Udaipur.',
      days: 8,
      budgetMin: 25000,
      budgetMax: 75000,
      budgetCategory: 'mid-range',
      travelType: ['family', 'couple', 'friends'],
      foodPreference: ['veg', 'any'],
      category: 'heritage',
      rating: 4.8,
      totalBookings: 189,
      bestTimeToVisit: 'October to March',
      highlights: ['Amber Fort Jaipur', 'Mehrangarh Fort Jodhpur', 'Lake Pichola Udaipur', 'Camel Safari Jaisalmer', 'Hawa Mahal Pink City'],
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
      itinerary: [
        { day: 1, title: 'Arrival in Jaipur – Pink City', activities: ['Check-in at heritage hotel', 'City Palace visit', 'Evening at Hawa Mahal', 'Johari Bazaar shopping'], meals: 'Dal Baati Churma dinner', notes: 'Jaipur is hot - carry water' },
        { day: 2, title: 'Jaipur Forts & Culture', activities: ['Amber Fort elephant ride', 'Nahargarh Fort sunset', 'Jantar Mantar astronomical park', 'Rajasthani cultural show'], meals: 'Traditional Thali lunch', notes: 'Book Amber Fort tickets online' },
        { day: 3, title: 'Jaipur to Jodhpur', activities: ['Drive to Jodhpur (5hrs)', 'Mehrangarh Fort exploration', 'Blue City walk', 'Umaid Bhawan Palace visit'], meals: 'Pyaaz Kachori breakfast, Safed Maas dinner', notes: 'Blue City is best explored on foot' },
        { day: 4, title: 'Jodhpur to Jaisalmer', activities: ['Drive to Jaisalmer', 'Golden Fort – Sonar Qila', 'Patwon Ki Haveli', 'Evening at Sam Sand Dunes'], meals: 'Desert camp dinner', notes: 'Book desert camp in advance' },
        { day: 5, title: 'Desert Safari & Dunes', activities: ['Sunrise at sand dunes', 'Camel safari', 'Kuldhara ghost village', 'Gadisar Lake sunset'], meals: 'Camp breakfast, Local thali', notes: 'Wear comfortable footwear' },
        { day: 6, title: 'Jaisalmer to Udaipur', activities: ['Drive to Udaipur (7hrs) or fly', 'City Palace arrival', 'Lake Pichola boat ride', 'Bagore Ki Haveli cultural show'], meals: 'Dinner at rooftop restaurant', notes: 'Best book flights for this leg' },
        { day: 7, title: 'Udaipur – City of Lakes', activities: ['Jag Mandir Island visit', 'Sajjangarh Monsoon Palace', 'Shilpgram craft fair walk', 'Fateh Sagar Lake'], meals: 'Breakfast, Traditional Rajasthani thali', notes: 'Hire a local guide for history' },
        { day: 8, title: 'Departure from Udaipur', activities: ['Eklingji Temple visit', 'Last minute local shopping', 'Departure from Udaipur Airport'], meals: 'Hotel breakfast', notes: 'Udaipur Airport is small - check in early' }
      ],
      createdBy: planner._id
    },
    {
      title: 'Manali Snow & Adventure Escape',
      destination: 'Manali',
      description: 'Discover the snow-capped Himalayas, thrilling adventure sports, ancient monasteries, and serene valleys in Manali. A perfect blend of adventure and tranquility.',
      days: 6,
      budgetMin: 18000,
      budgetMax: 45000,
      budgetCategory: 'mid-range',
      travelType: ['solo', 'friends', 'couple'],
      foodPreference: ['any'],
      category: 'adventure',
      rating: 4.9,
      totalBookings: 312,
      bestTimeToVisit: 'October to June',
      highlights: ['Rohtang Pass Snow Adventure', 'Solang Valley Activities', 'Old Manali Hippie Culture', 'Hadimba Devi Temple', 'Paragliding over Kullu Valley'],
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
      itinerary: [
        { day: 1, title: 'Arrival in Manali', activities: ['Overnight bus/drive from Delhi', 'Check-in & rest', 'Evening stroll on Mall Road', 'Dinner at local dhaba'], meals: 'Maggie & chai, local dinner', notes: 'Altitude adjustment day' },
        { day: 2, title: 'Old Manali & Monasteries', activities: ['Hadimba Devi Temple', 'Manu Temple trek', 'Tibetan Monastery visit', 'Old Manali café hopping'], meals: 'Israeli breakfast café, Tibetan momos', notes: 'Carry warm jacket' },
        { day: 3, title: 'Rohtang Pass Adventure', activities: ['Rohtang Pass snow play', 'Snow scooter rides', 'Photography at Beas River', 'Return via Marhi for hot maggie'], meals: 'Packed lunch, café dinner', notes: 'Carry permit from SDM office' },
        { day: 4, title: 'Solang Valley & Sports', activities: ['Paragliding over Solang Valley', 'Zorbing & ATV rides', 'Rope course adventures', 'Hot spring at Vashisht'], meals: 'Breakfast, café lunch', notes: 'Book paragliding in advance' },
        { day: 5, title: 'Kasol & Parvati Valley Day Trip', activities: ['Drive to Kasol', 'Israeli café culture', 'Kheerganga Hot Spring trek (optional)', 'Evening bonfire back in Manali'], meals: 'Israeli food, local cafe', notes: 'Full day trip - start early' },
        { day: 6, title: 'Departure', activities: ['Kullu Valley river rafting', 'Shawl & dry fruit shopping', 'Departure to Delhi'], meals: 'Breakfast, packed snacks', notes: 'Bus leaves by 5-6PM from bus stand' }
      ],
      createdBy: planner._id
    },
    {
      title: 'Kerala Backwaters & Nature Trail',
      destination: 'Kerala',
      description: 'Experience God\'s Own Country — float through backwaters on a houseboat, explore misty hill stations of Munnar, relax on palm-fringed beaches of Kovalam, and rejuvenate with Ayurveda.',
      days: 7,
      budgetMin: 22000,
      budgetMax: 60000,
      budgetCategory: 'mid-range',
      travelType: ['family', 'couple', 'solo'],
      foodPreference: ['any', 'veg'],
      category: 'nature',
      rating: 4.8,
      totalBookings: 267,
      bestTimeToVisit: 'September to March',
      highlights: ['Alleppey Houseboat Cruise', 'Munnar Tea Gardens', 'Periyar Wildlife Sanctuary', 'Kovalam Beach', 'Ayurveda Spa & Wellness'],
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
      itinerary: [
        { day: 1, title: 'Arrival in Kochi', activities: ['Kochi airport arrival', 'Fort Kochi heritage walk', 'Chinese fishing nets at sunset', 'Kathakali dance performance'], meals: 'Appam & stew dinner', notes: 'Kochi is the gateway to Kerala' },
        { day: 2, title: 'Munnar Hill Station', activities: ['Drive to Munnar (4hrs)', 'Tea museum & estate visit', 'Mattupetty Dam & lake', 'Echo Point & Top Station'], meals: 'Kerala Sadya lunch', notes: 'Munnar is misty - best mornings' },
        { day: 3, title: 'Munnar Wildlife & Waterfalls', activities: ['Eravikulam National Park', 'Attukal & Lakkam Waterfalls', 'Spice gardens tour', 'Sunset at Rajamala'], meals: 'Hotel breakfast & dinner', notes: 'Park entry may be seasonal' },
        { day: 4, title: 'Alleppey Houseboat', activities: ['Drive to Alleppey', 'Board traditional houseboat', 'Backwater cruise through villages', 'Sunset on the backwaters'], meals: 'Fresh Kerala fish curry on houseboat', notes: 'Houseboat includes all meals' },
        { day: 5, title: 'Backwaters to Kovalam', activities: ['Morning kayaking in backwaters', 'Drive to Kovalam Beach', 'Lighthouse Beach visit', 'Ayurveda massage experience'], meals: 'Karimeen fry lunch, Seafood dinner', notes: 'Ayurveda sessions need prior booking' },
        { day: 6, title: 'Kovalam & Trivandrum', activities: ['Morning beach yoga', 'Padmanabhaswamy Temple visit', 'Napier Museum', 'Shopping at Chalai Bazaar'], meals: 'Breakfast, Street food exploration', notes: 'Dress code required for temple' },
        { day: 7, title: 'Departure', activities: ['Final Ayurveda session', 'Buy banana chips & spices', 'Trivandrum airport departure'], meals: 'Farewell Kerala breakfast', notes: 'Trivandrum airport is small' }
      ],
      createdBy: planner._id
    },
    {
      title: 'Andaman Islands – Tropical Paradise',
      destination: 'Andaman',
      description: 'Escape to the crystal-clear waters of the Andaman Islands. Dive into vibrant coral reefs, relax on white sand beaches, explore limestone caves, and witness breathtaking sunsets.',
      days: 7,
      budgetMin: 35000,
      budgetMax: 90000,
      budgetCategory: 'luxury',
      travelType: ['couple', 'friends', 'family'],
      foodPreference: ['non-veg', 'any'],
      category: 'beach',
      rating: 4.9,
      totalBookings: 156,
      bestTimeToVisit: 'October to May',
      highlights: ['Radhanagar Beach – Asia\'s Best', 'Scuba Diving at Havelock', 'Cellular Jail Night Show', 'Elephant Beach Snorkeling', 'Neil Island Langkawi Tour'],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      itinerary: [
        { day: 1, title: 'Arrival in Port Blair', activities: ['Fly to Port Blair', 'Cellular Jail visit', 'Sound & Light show', 'Corbyn\'s Cove Beach'], meals: 'Seafood dinner at Port Blair', notes: 'Book Cellular Jail show in advance' },
        { day: 2, title: 'Port Blair to Havelock Island', activities: ['Ferry to Havelock (2hrs)', 'Check-in at beach resort', 'Radhanagar Beach (Asia\'s Best)', 'Sunset photography'], meals: 'Fresh coconut water, Seafood BBQ', notes: 'Book ferry tickets in advance' },
        { day: 3, title: 'Havelock Scuba & Snorkeling', activities: ['Scuba diving at Elephant Beach', 'Coral reef snorkeling', 'Sea walk experience', 'Night bioluminescence walk'], meals: 'Hotel meals, beach shack dinner', notes: 'No diving experience required for sea walk' },
        { day: 4, title: 'Neil Island Exploration', activities: ['Ferry to Neil Island', 'Natural Bridge rock formation', 'Bharatpur Beach snorkeling', 'Laxmanpur Beach sunset'], meals: 'Fresh grilled seafood', notes: 'Neil Island is very peaceful' },
        { day: 5, title: 'Water Sports & Relaxation', activities: ['Jet skiing & banana boat', 'Glass bottom boat tour', 'Lighthouse trek', 'Day at leisure on beach'], meals: 'Beachside café meals', notes: 'Carry reef-safe sunscreen' },
        { day: 6, title: 'Baratang Island Limestone Caves', activities: ['Mangrove creek boat ride', 'Limestone caves exploration', 'Mud volcano visit', 'Parrot Island sunset'], meals: 'Packed lunch, Port Blair dinner', notes: 'Earlier start recommended' },
        { day: 7, title: 'Departure Day', activities: ['Shopping at Aberdeen Bazaar', 'Samudrika Naval Marine Museum', 'Fly back to mainland'], meals: 'Last coconut punch breakfast', notes: 'Check flight timings carefully' }
      ],
      createdBy: planner._id
    }
  ]);
  console.log('✈️  Created', trips.length, 'trips');

  // Create Hotels
  await Hotel.insertMany([
    { name: 'The Baga Beach Resort', location: 'Baga Beach, Goa', destination: 'Goa', description: 'Beachfront resort with stunning ocean views', pricePerNight: 3500, category: 'mid-range', rating: 4.3, amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'AC', 'Beach Access', 'Bar'], contactNumber: '+91 832 2279001', createdBy: planner._id },
    { name: 'Goa Budget Hostel', location: 'Calangute, Goa', destination: 'Goa', description: 'Affordable dorm & private rooms near beach', pricePerNight: 800, category: 'budget', rating: 3.9, amenities: ['Free WiFi', 'Common Kitchen', 'Lockers', 'AC'], contactNumber: '+91 832 2278500', createdBy: planner._id },
    { name: 'The Leela Goa', location: 'Cavelossim Beach, Goa', destination: 'Goa', description: '5-star luxury resort on Cavelossim Beach', pricePerNight: 18000, category: 'luxury', rating: 4.9, amenities: ['Private Pool', 'Spa', 'Multiple Restaurants', 'Concierge', 'Golf Course', 'Beach Butler'], contactNumber: '+91 832 6621234', createdBy: planner._id },
    { name: 'Jaipur Heritage Haveli', location: 'Old City, Jaipur', destination: 'Rajasthan', description: '18th century restored haveli with royal ambiance', pricePerNight: 5500, category: 'luxury', rating: 4.7, amenities: ['Free WiFi', 'Rooftop Restaurant', 'Courtyard Pool', 'Cultural Performances', 'AC'], contactNumber: '+91 141 2360101', createdBy: planner._id },
    { name: 'Manali Backpackers Inn', location: 'Old Manali', destination: 'Manali', description: 'Cozy hostel in the heart of Old Manali', pricePerNight: 600, category: 'budget', rating: 4.1, amenities: ['Free WiFi', 'Common Room', 'Hot Water', 'Mountain Views', 'Kitchen'], contactNumber: '+91 1902 252150', createdBy: planner._id },
    { name: 'Snow Valley Resort Manali', location: 'Solang Valley, Manali', destination: 'Manali', description: 'Mountain resort with stunning Himalayan views', pricePerNight: 6500, category: 'mid-range', rating: 4.5, amenities: ['Free WiFi', 'HP Views', 'Restaurant', 'Bonfire', 'AC', 'Snow Activities'], contactNumber: '+91 1902 253000', createdBy: planner._id },
    { name: 'Kerala Houseboat Luxury', location: 'Alleppey Backwaters', destination: 'Kerala', description: 'Traditional kettuvallam houseboat with all meals', pricePerNight: 12000, category: 'luxury', rating: 4.8, amenities: ['AC Bedrooms', 'Sundeck', 'All Meals', 'Captain & Chef', 'AC', 'WiFi'], contactNumber: '+91 477 2251796', createdBy: planner._id },
    { name: 'Munnar Tea Estate Bungalow', location: 'Tea Estates, Munnar', destination: 'Kerala', description: 'Colonial bungalow inside tea plantations', pricePerNight: 4500, category: 'mid-range', rating: 4.6, amenities: ['Plantation Views', 'Fireplace', 'Bonfire', 'Breakfast Included', 'Nature Walks'], contactNumber: '+91 4865 232230', createdBy: planner._id },
    { name: 'Andaman Beachside Cottages', location: 'Radhanagar Beach, Havelock', destination: 'Andaman', description: 'Eco-cottages steps away from Asia\'s best beach', pricePerNight: 8500, category: 'mid-range', rating: 4.7, amenities: ['Beach Access', 'Restaurant', 'Snorkeling Gear', 'AC', 'Free WiFi'], contactNumber: '+91 3192 242217', createdBy: planner._id },
    { name: 'Barefoot at Havelock', location: 'Havelock Island', destination: 'Andaman', description: 'Award-winning eco-luxury resort', pricePerNight: 22000, category: 'luxury', rating: 4.9, amenities: ['Private Beach', 'Diving Center', 'Spa', 'Organic Restaurant', 'Nature Trails'], contactNumber: '+91 3192 282425', createdBy: planner._id },
  ]);
  console.log('🏨 Created hotels');

  // Create Transports
  await Transport.insertMany([
    { name: 'IndiGo Delhi-Goa Flight', type: 'flight', from: 'New Delhi', to: 'Goa (Dabolim)', destination: 'Goa', cost: 4500, duration: '2h 30m', departure: '06:30 AM', arrival: '09:00 AM', description: 'Direct flight, best value', features: ['Meal available', 'On-time performance', 'Check-in baggage 15kg'], createdBy: planner._id },
    { name: 'Mandovi Express Train to Goa', type: 'train', from: 'Mumbai CST', to: 'Madgaon, Goa', destination: 'Goa', cost: 850, duration: '9h 15m', departure: '07:10 AM', arrival: '04:25 PM', description: 'Scenic coastal route', features: ['AC 3-tier', 'Pantry car', 'Scenic route', 'Budget-friendly'], createdBy: planner._id },
    { name: 'Kadamba Tourist Bus to Goa', type: 'bus', from: 'Bangalore', to: 'Panaji, Goa', destination: 'Goa', cost: 650, duration: '12h', departure: '09:00 PM', arrival: '09:00 AM', description: 'Sleeper AC bus overnight', features: ['AC Sleeper', 'Phone charging', 'Water bottle', 'Budget option'], createdBy: planner._id },
    { name: 'Airport Cab to Hotel', type: 'cab', from: 'Goa Airport', to: 'North Goa Hotels', destination: 'Goa', cost: 600, duration: '45 min', description: 'Pre-booked AC cab from airport', features: ['AC', 'Door-to-door', 'Luggage space', 'Track on app'], createdBy: planner._id },
    { name: 'Bike Rental - Royal Enfield', type: 'bike-rental', from: 'Manali Town', to: 'Self-Drive', destination: 'Manali', cost: 1200, duration: 'Per Day', description: 'Royal Enfield 350cc for exploring Manali', features: ['Helmet included', 'Fuel not included', 'Insurance covered', 'Valid DL required'], createdBy: planner._id },
    { name: 'Car Rental - Innova Crysta', type: 'car-rental', from: 'Manali', to: 'Rohtang/Solang Valley', destination: 'Manali', cost: 3500, duration: 'Full Day', description: 'Comfortable 7-seater for mountain roads', features: ['AC', 'Driver included', 'Petrol included', '12hr rental'], createdBy: planner._id },
    { name: 'Vistara Delhi-Jaipur Flight', type: 'flight', from: 'New Delhi', to: 'Jaipur', destination: 'Rajasthan', cost: 3200, duration: '1h 10m', departure: '08:00 AM', arrival: '09:10 AM', description: 'Quick hop to Pink City', features: ['Snack included', 'On-time', 'Business class available'], createdBy: planner._id },
    { name: 'Kerala Government Ferry', type: 'ferry', from: 'Alleppey Jetty', to: 'Quilon', destination: 'Kerala', cost: 300, duration: '8h', departure: '10:30 AM', arrival: '06:30 PM', description: 'Backwater ferry cruise through Kerala', features: ['Open deck', 'Covered seating', 'Canteen on board', 'Best scenic ride'], createdBy: planner._id },
    { name: 'Makruzz Catamaran to Havelock', type: 'ferry', from: 'Port Blair Jetty', to: 'Havelock Island', destination: 'Andaman', cost: 1200, duration: '1h 30m', departure: '08:00 AM', arrival: '09:30 AM', description: 'Premium ferry with luxury seating', features: ['AC cabin', 'Snacks', 'Life jackets', 'Luggage storage'], createdBy: planner._id },
  ]);
  console.log('🚌 Created transport options');

  console.log('\n🎉 Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Planner Login: planner@demo.com / demo1234');
  console.log('📧 Traveler Login: traveler@demo.com / demo1234');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  process.exit(0);
};

seed().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
