const listingData = [
    {
        title: "Modern Loft in Downtown",
        description: "Spacious loft with a modern design in the heart of downtown.",
        image: {
            url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
            filename: "listingImage"
        },
        price: 1500,
        location: "Downtown",
        country: "United States",
        owner: "6661bc756abd83237d00d832",
        geometry: { type: "Point", coordinates: [-77.0369, 38.9072] }  // Washington, D.C.
    },
    {
        title: "Mountain View Cabin",
        description: "Charming cabin with breathtaking mountain views for a peaceful getaway.",
        image: {
            url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
            filename: "listingImage"
        },
        price: 1200,
        location: "Mountains",
        country: "Canada",
        owner: "6661bc756abd83237d00d832",
        geometry: { type: "Point", coordinates: [-115.5719, 51.1784] }  // Canadian Rockies
    },
    {
        title: "City Skyline Penthouse",
        description: "Luxurious penthouse offering stunning views of the city skyline.",
        image: {
            url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
            filename: "listingImage"
        },
        price: 2500,
        location: "City Center",
        country: "France",
        owner: "6661bc756abd83237d00d832",
        geometry: { type: "Point", coordinates: [2.3522, 48.8566] }  // Paris
    },
    {
        title: "Seaside Cottage Retreat",
        description: "Quaint cottage by the sea, perfect for a relaxing escape.",
        image: {
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
            filename: "listingImage"
        },
        price: 1800,
        location: "Seaside",
        country: "United Kingdom",
        owner: "6661c7fba3d4db8bfc3004e3",
        geometry: { type: "Point", coordinates: [0.1398, 50.8355] }  // Seaford, England
    },
    {
        title: "Rustic Farmhouse Getaway",
        description: "Experience the charm of a rustic farmhouse surrounded by nature.",
        image: {
            url: "https://example.com/farmhouse-image.jpg",
            filename: "listingImage"
        },
        price: 1200,
        location: "Countryside",
        country: "Italy",
        owner: "6661c7fba3d4db8bfc3004e3",
        geometry: { type: "Point", coordinates: [11.2558, 43.7696] }  // Tuscany
    },
    {
        title: "Urban Studio Apartment",
        description: "Compact and stylish studio apartment in a vibrant urban setting.",
        image: {
            url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 8000,
        location: "Urban Area",
        country: "Germany",
        owner: "6661c7fba3d4db8bfc3004e3",
        geometry: { type: "Point", coordinates: [13.4050, 52.5200] }  // Berlin
    },
    {
        title: "Ski Chalet in the Alps",
        description: "Cozy chalet nestled in the snowy peaks of the Alps, perfect for winter getaways.",
        image: {
            url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 2000,
        location: "Alps",
        country: "Switzerland",
        owner: "666319ef65504c4772fe1788",
        geometry: { type: "Point", coordinates: [9.5416, 46.8182] }  // Swiss Alps
    },
    {
        title: "Historic Townhouse in Old Town",
        description: "Elegant townhouse with a touch of history in the charming Old Town district.",
        image: {
            url: "https://images.unsplash.com/photo-1595243643203-06ba168495ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 1800,
        location: "Old Town",
        country: "Spain",
        owner: "666319ef65504c4772fe1788",
        geometry: { type: "Point", coordinates: [-3.7038, 40.4168] }  // Madrid
    },
    {
        title: "Lakeside Retreat with Private Dock",
        description: "Relaxing lakeside retreat with a private dock for a serene waterfront experience.",
        image: {
            url: "https://images.unsplash.com/photo-1593714604578-d9e41b00c6c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 2200,
        location: "Lakeside",
        country: "Canada",
        owner: "666319ef65504c4772fe1788",
        geometry: { type: "Point", coordinates: [-79.3832, 43.6532] }  // Toronto
    },
    {
        title: "Artistic Loft with Gallery Vibes",
        description: "A loft designed for art enthusiasts, featuring gallery vibes and creative spaces.",
        image: {
            url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 1600,
        location: "Art District",
        country: "United States",
        owner: "666319ef65504c4772fe1788",
        geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }  // Los Angeles
    },
    {
        title: "Tropical Paradise Villa",
        description: "Escape to a tropical paradise with this luxurious villa surrounded by lush greenery.",
        image: {
            url: "https://media.istockphoto.com/id/1424381465/photo/modern-villa-with-two-floors-overlooking-sea.webp?b=1&s=170667a&w=0&k=20&c=oPQRapBLjh4TWOyDgUlO_V9CxTBGDaHyCaz97pIC5H0=",
            filename: "listingImage"
        },
        price: 3000,
        location: "Tropical Oasis",
        country: "Malaysia",
        owner: "666364e86094925cb8e8f908",
        geometry: { type: "Point", coordinates: [101.9758, 4.2105] }  // Malaysia
    },
    {
        title: "Riverside Cabin in the Woods",
        description: "Charming cabin nestled by a tranquil riverside, surrounded by nature's beauty.",
        image: {
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 1300,
        location: "Riverside",
        country: "Norway",
        owner: "666364e86094925cb8e8f908",
        geometry: { type: "Point", coordinates: [10.7579, 59.9111] }  // Oslo
    },
    {
        title: "Eco-Friendly Treehouse Experience",
        description: "Embrace nature with a unique eco-friendly treehouse experience in the forest canopy.",
        image: {
            url: "https://images.unsplash.com/photo-1594479125841-ff7800c6afcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 1100,
        location: "Forest",
        country: "Costa Rica",
        owner: "666364e86094925cb8e8f908",
        geometry: { type: "Point", coordinates: [-84.0739, 9.7489] }  // Costa Rican rainforest
    },
    {
        title: "Beachfront Paradise Villa",
        description: "Experience the ultimate luxury with this stunning beachfront villa, complete with panoramic ocean views.",
        image: {
            url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbGxhfGVufDB8fDB8fHww",
            filename: "listingImage"
        },
        price: 4000,
        location: "Beachfront",
        country: "Bahamas",
        owner: "666364e86094925cb8e8f908",
        geometry: { type: "Point", coordinates: [-77.3963, 25.0343] }  // Nassau
    },
    {
        title: "Historic Castle Retreat",
        description: "Step back in time with a stay in a beautifully restored historic castle surrounded by lush gardens.",
        image: {
            url: "https://plus.unsplash.com/premium_photo-1661963657305-f52dcaeef418?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
            filename: "listingImage"
        },
        price: 3500,
        location: "Countryside",
        country: "Scotland",
        owner: "666364e86094925cb8e8f908",
        geometry: { type: "Point", coordinates: [-4.2026, 56.4907] }  // Scottish Highlands
    }
];

module.exports = { data: listingData };
