const User = require('./models/User');
const Trip = require('./models/Trip');
const Hotel = require('./models/Hotel');
const Transport = require('./models/Transport');

const seedFunc = async () => {
    try {
        console.log('Clearing existing data from memory...');
        await User.deleteMany({});
        await Trip.deleteMany({});
        await Hotel.deleteMany({});
        await Transport.deleteMany({});

        // Create Users
        const planner = await User.create({
            name: 'Raj Sharma', email: 'planner@demo.com', password: 'demo1234',
            role: 'planner', phone: '+91 9876543210'
        });
        const traveler = await User.create({
            name: 'Priya Mehta', email: 'traveler@demo.com', password: 'demo1234',
            role: 'traveler', phone: '+91 9123456789'
        });

        // Create Trips
        const trips = await Trip.insertMany([
            {
            title: 'Goa Beach Paradise Getaway',
            destination: 'Goa',
            description: 'Experience the ultimate beach vacation in Goa with pristine beaches, vibrant nightlife, Portuguese heritage, and delicious seafood. Perfect for all types of travelers.',
            days: 5, budgetMin: 12000, budgetMax: 35000, budgetCategory: 'mid-range',
            travelType: ['solo', 'friends', 'couple'], foodPreference: ['non-veg', 'any'],
            category: 'beach', rating: 4.7, totalBookings: 234, bestTimeToVisit: 'November to February',
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
            destination: 'Rajasthan', description: 'Journey through the land of kings\\u2014explore majestic forts, royal palaces, colorful bazaars, and experience the rich culture of Rajasthan across Jaipur, Jodhpur, and Udaipur.',
            days: 8, budgetMin: 25000, budgetMax: 75000, budgetCategory: 'mid-range',
            travelType: ['family', 'couple', 'friends'], foodPreference: ['veg', 'any'], category: 'heritage', rating: 4.8, totalBookings: 189, bestTimeToVisit: 'October to March',
            highlights: ['Amber Fort Jaipur', 'Mehrangarh Fort Jodhpur', 'Lake Pichola Udaipur', 'Camel Safari Jaisalmer', 'Hawa Mahal Pink City'],
            image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
            itinerary: [
                { day: 1, title: 'Arrival in Jaipur – Pink City', activities: ['Check-in at heritage hotel', 'City Palace visit'], meals: 'Dal Baati Churma dinner' }
            ], createdBy: planner._id
            },
            {
            title: 'Manali Snow & Adventure Escape',
            destination: 'Manali', description: 'Discover the snow-capped Himalayas, thrilling adventure sports, ancient monasteries, and serene valleys.',
            days: 6, budgetMin: 18000, budgetMax: 45000, budgetCategory: 'mid-range', travelType: ['solo', 'friends', 'couple'], foodPreference: ['any'], category: 'adventure', rating: 4.9, totalBookings: 312, bestTimeToVisit: 'October to June', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
            itinerary: [{ day: 1, title: 'Arrival in Manali', activities: ['Overnight bus from Delhi'], meals: 'Maggie' }], createdBy: planner._id
            },
            {
            title: 'Kerala Backwaters & Nature Trail',
            destination: 'Kerala', description: 'Experience God\'s Own Country—float through backwaters on a houseboat.',
            days: 7, budgetMin: 22000, budgetMax: 60000, budgetCategory: 'mid-range', travelType: ['family', 'couple', 'solo'], foodPreference: ['any', 'veg'], category: 'nature', rating: 4.8, totalBookings: 267, bestTimeToVisit: 'September to March', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
            itinerary: [{ day: 1, title: 'Arrival in Kochi', activities: ['Fort Kochi heritage walk'], meals: 'Appam' }], createdBy: planner._id
            },
            {
            title: 'Andaman Islands – Tropical Paradise',
            destination: 'Andaman', description: 'Escape to the crystal-clear waters of the Andaman Islands.',
            days: 7, budgetMin: 35000, budgetMax: 90000, budgetCategory: 'luxury', travelType: ['couple', 'friends', 'family'], foodPreference: ['non-veg', 'any'], category: 'beach', rating: 4.9, totalBookings: 156, bestTimeToVisit: 'October to May', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
            itinerary: [{ day: 1, title: 'Arrival in Port Blair', activities: ['Fly to Port Blair', 'Cellular Jail visit'], meals: 'Seafood dinner' }], createdBy: planner._id
            }
        ]);

        await Hotel.insertMany([
            { name: 'The Baga Beach Resort', location: 'Baga Beach, Goa', destination: 'Goa', description: 'Beachfront resort with stunning ocean views', pricePerNight: 3500, category: 'mid-range', rating: 4.3, amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'AC', 'Beach Access', 'Bar'], contactNumber: '+91 832 2279001', createdBy: planner._id },
            { name: 'Goa Budget Hostel', location: 'Calangute, Goa', destination: 'Goa', description: 'Affordable dorm & private rooms near beach', pricePerNight: 800, category: 'budget', rating: 3.9, amenities: ['Free WiFi', 'Common Kitchen', 'Lockers', 'AC'], contactNumber: '+91 832 2278500', createdBy: planner._id },
            { name: 'The Leela Goa', location: 'Cavelossim Beach, Goa', destination: 'Goa', description: '5-star luxury resort on Cavelossim Beach', pricePerNight: 18000, category: 'luxury', rating: 4.9, amenities: ['Private Pool', 'Spa', 'Multiple Restaurants', 'Concierge', 'Golf Course', 'Beach Butler'], contactNumber: '+91 832 6621234', createdBy: planner._id },
            { name: 'Jaipur Heritage Haveli', location: 'Old City, Jaipur', destination: 'Rajasthan', pricePerNight: 5500, category: 'luxury', rating: 4.7, amenities: ['Free WiFi', 'Rooftop Restaurant', 'Courtyard Pool', 'AC'], createdBy: planner._id },
            { name: 'Manali Backpackers Inn', location: 'Old Manali', destination: 'Manali', pricePerNight: 600, category: 'budget', rating: 4.1, amenities: ['Free WiFi', 'Hot Water'], createdBy: planner._id },
            { name: 'Snow Valley Resort Manali', location: 'Solang Valley, Manali', destination: 'Manali', pricePerNight: 6500, category: 'mid-range', rating: 4.5, amenities: ['Free WiFi', 'HP Views'], createdBy: planner._id },
            { name: 'Kerala Houseboat Luxury', location: 'Alleppey Backwaters', destination: 'Kerala', pricePerNight: 12000, category: 'luxury', rating: 4.8, amenities: ['AC Bedrooms', 'All Meals'], createdBy: planner._id },
            { name: 'Munnar Tea Estate Bungalow', location: 'Tea Estates, Munnar', destination: 'Kerala', pricePerNight: 4500, category: 'mid-range', rating: 4.6, amenities: ['Plantation Views'], createdBy: planner._id },
            { name: 'Andaman Beachside Cottages', location: 'Radhanagar Beach', destination: 'Andaman', pricePerNight: 8500, category: 'mid-range', rating: 4.7, amenities: ['Beach Access'], createdBy: planner._id },
            { name: 'Barefoot at Havelock', location: 'Havelock Island', destination: 'Andaman', pricePerNight: 22000, category: 'luxury', rating: 4.9, amenities: ['Private Beach'], createdBy: planner._id },
        ]);

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

        console.log('🎉 Data successfully seeded into memory!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Planner Login: planner@demo.com / demo1234');
        console.log('📧 Traveler Login: traveler@demo.com / demo1234');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } catch (err) {
        console.error('Seed Error:', err);
    }
}

module.exports = seedFunc;
