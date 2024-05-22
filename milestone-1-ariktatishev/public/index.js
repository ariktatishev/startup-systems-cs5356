document.addEventListener('DOMContentLoaded', () => {
  let productsData = [];
  let currentlyDisplayedProductNumber = 0;

  function updateCarousel() {
    const imageDiv = document.getElementById('product-image');
    const contentDiv = document.getElementById('display-product-content');
    const title = contentDiv.querySelector('.content .title');
    const price = contentDiv.querySelector('.content .price');
    const descriptionParagraph = contentDiv.querySelector('.content p');
    const featuresList = contentDiv.querySelector('.content ul');
    const product = productsData[currentlyDisplayedProductNumber];

    // Update image
    imageDiv.src = product.imageUrl;

    // Update title
    title.textContent = product.title;

    // Update description
    descriptionParagraph.innerHTML = `${product.description}`;

    // Update features
    featuresList.innerHTML = ''; // Clear current list
    product.highlighted_features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    // Update price
    price.textContent = `Price: $${product.price}`;

    // Update button
    const buyButton = contentDiv.querySelector('.button');
    buyButton.addEventListener('click', () => {
      window.location.href = product.paymentLink;
    });
  }

  function fetchProductsAndSetupCarousel() {
    fetch('data/products.json')
      .then(response => response.json())
      .then(products => {
        productsData = products.filter(product => product.active); // Store and filter active products
        console.log(productsData);
        updateCarousel(); // Initialize carousel with the first product
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  fetchProductsAndSetupCarousel(); // Call the function to setup the carousel

  const nextButton = document.getElementById('next-button');
  const previousButton = document.getElementById('previous-button');

  nextButton.addEventListener('click', () => {
    currentlyDisplayedProductNumber = (currentlyDisplayedProductNumber + 1) % productsData.length;
    updateCarousel();
  });

  previousButton.addEventListener('click', () => {
    currentlyDisplayedProductNumber = (currentlyDisplayedProductNumber - 1 + productsData.length) % productsData.length;
    updateCarousel();
  });
});
