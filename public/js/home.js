console.log("hi this is home page")
document.addEventListener('DOMContentLoaded', function() {
  // Hotel data: Add as many hotel objects as you need
  const hotels = [
    {
      title: 'Luxury Stay',
      description: 'Top-rated amenities and premium comfort in prime locations.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Cozy Rooms',
      description: 'Relax in beautifully designed rooms tailored for comfort.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsfGVufDB8fDB8fHww',
    },
    {
      title: 'Resort Vibes',
      description: 'Perfect getaway spots with pools, spas, and more.',
      imageUrl: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
    },
     {
      title: 'Luxury Stay',
      description: 'Top-rated amenities and premium comfort in prime locations.',
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
    }
    // You can add more hotels here
  ];

  const hotelCardsContainer = document.getElementById('hotel-cards-container');

  // Render hotel cards dynamically
  hotels.forEach(hotel => {
    const hotelCard = document.createElement('div');
    hotelCard.classList.add('col-md-4', 'mb-4');

    hotelCard.innerHTML = `
      <div class="card shadow-sm">
        <img src="${hotel.imageUrl}" class="card-img-top" alt="${hotel.title}">
        <div class="card-body">
          <h5 class="card-title">${hotel.title}</h5>
          <p class="card-text">${hotel.description}</p>
        </div>
      </div>
    `;

    hotelCardsContainer.appendChild(hotelCard);
  });
});
