// Space background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("space-background"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starsVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starsVertices.push(x, y, z);
}

starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starsVertices, 3)
);
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

camera.position.z = 5;

function animateSpace() {
  requestAnimationFrame(animateSpace);
  starField.rotation.y += 0.0002;
  renderer.render(scene, camera);
}
animateSpace();

// Product data
const products = [
  {
    name: "Nebula Sofa",
    price: "$1,999",
    image: "../images/Sofa.jpg",
    description: "Relax in cosmic comfort with our flagship Nebula Sofa.",
  },
  {
    name: "Asteroid Coffee Table",
    price: "$599",
    image: "../images/CoffeeTable.jpg",
    description:
      "A unique, impact-resistant coffee table inspired by celestial bodies.",
  },
  {
    name: "Quantum Bed",
    price: "$2,499",
    image: "../images/bed.jpg",
    description: "Experience out-of-this-world comfort with our Quantum Bed.",
  },
  {
    name: "Galactic Dining Set",
    price: "$1,799",
    image: "../images/dining.jpg",
    description: "Dine among the stars with our sleek Galactic Dining Set.",
  },
  {
    name: "Lunar Lounge Chair",
    price: "$899",
    image: "../images/Product5.jpg",
    description: "Achieve weightless relaxation in our Lunar Lounge Chair.",
  },
  {
    name: "Cosmic Bookshelf",
    price: "$749",
    image: "../images/book.jpg",
    description:
      "Store your earthly possessions in our spacious Cosmic Bookshelf.",
  },
];

// Populate product grid
const productGrid = document.getElementById("product-grid");
products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">${product.price}</p>
    `;
  productCard.addEventListener("click", () => showModal(product));
  productGrid.appendChild(productCard);
});

// Modal functionality
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close-modal");

// Close modal on click of 'X' button
closeModal.addEventListener("click", () => closeModalHandler());

// New: Close modal on outside click
window.addEventListener("click", (event) => {
  if (event.target === modal) closeModalHandler();
});

function showModal(product) {
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-description").textContent =
    product.description;
  document.getElementById("modal-product-price").textContent = product.price;

  const modalImage = document.getElementById("modal-product-image");
  modalImage.src = product.image;
  modalImage.alt = product.name;

  modal.style.display = "flex";

  // Disable background scrolling when modal is open
  document.body.style.overflow = "hidden";

  // Simple 3D view (placeholder)
  const productView = new THREE.Scene();
  const productCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const productRenderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("product-3d-view"),
  });
  productRenderer.setSize(300, 300);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0x03dac6,
    wireframe: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  productView.add(cube);

  productCamera.position.z = 5;

  function animateProduct() {
    requestAnimationFrame(animateProduct);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    productRenderer.render(productView, productCamera);
  }
  animateProduct();
}

function closeModalHandler() {
  modal.style.display = "none";

  // Re-enable background scrolling when modal is closed
  document.body.style.overflow = "auto";
}

// Navigation
const homePage = document.getElementById("home-page");
const galleryPage = document.getElementById("gallery-page");
const homeLink = document.getElementById("home-link");
const galleryLink = document.getElementById("gallery-link");
const featuredImage = document.getElementById("featured-image");

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  homePage.style.display = "block";
  galleryPage.style.display = "none";
});

galleryLink.addEventListener("click", (e) => {
  e.preventDefault();
  homePage.style.display = "none";
  galleryPage.style.display = "block";
});

// Navigate to gallery when clicking on featured image
featuredImage.addEventListener("click", () => {
  homePage.style.display = "none";
  galleryPage.style.display = "block";
});

// Responsive design
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
