const sampleOwners = [
  {
    owner: "66af56ce1ac76b23c43d8b7b",
    name: "Eva Brown",
    image: {
      url: "https://picsum.photos/200/320",
      filename: "eva-brown.jpg",
    },
  },
  {
    owner: "66af56ce1ac76b23c43d8b7c",
    name: "Oliver White",
    image: {
      url: "https://picsum.photos/200/321",
      filename: "oliver-white.jpg",
    },
  },
  {
    owner: "66af56ce1ac76b23c43d8b7d",
    name: "Lily Davis",
    image: {
      url: "https://picsum.photos/200/322",
      filename: "lily-davis.jpg",
    },
  },
];

const sampleCertificates = [
  {
    
    image: {
      url: "https://picsum.photos/200/320",
      filename: "cloud-computing-specialist.jpg",
    },
    name: "Cloud Computing Specialist",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
  {
    
    image: {
      url: "https://picsum.photos/200/326",
      filename: "artificial-intelligence-engineer.jpg",
    },
    name: "Artificial Intelligence Engineer",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
  {
    
    image: {
      url: "https://picsum.photos/200/327",
      filename: "cybersecurity-architect.jpg",
    },
    name: "Cybersecurity Architect",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
  {
    
    image: {
      url: "https://picsum.photos/200/328",
      filename: "data-scientist.jpg",
    },
    name: "Data Scientist",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
  {
    
    image: {
      url: "https://picsum.photos/200/329",
      filename: "devops-engineer.jpg",
    },
    name: "DevOps Engineer",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
  {
    
    image: {
      url: "https://picsum.photos/200/330",
      filename: "full-stack-developer.jpg",
    },
    name: "Full Stack Developer",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
  {
    
    image: {
      url: "https://picsum.photos/200/331",
      filename: "machine-learning-engineer.jpg",
    },
    name: "Machine Learning Engineer",
    owner: "66af56ce1ac76b23c43d8b7b",
  },
];

const sampleProducts = [
  {
    owner: "66af56ce1ac76b23c43d8b7b",
    name: "Gaming Laptop",
    description: "A high-performance gaming laptop with NVIDIA graphics.",
    price: 1299.99,
    image: {
      url: "https://images.pexels.com/photos/6917790/pexels-photo-6917790.jpeg",
      filename: "productimage",
    },
  },
  {
    owner: "66af56ce1ac76b23c43d8b7b",
    name: "Smart TV",
    description: "A 55-inch 4K smart TV with HDR and Wi-Fi connectivity.",
    price: 799.99,
    image: {
      url: "https://images.pexels.com/photos/6917791/pexels-photo-6917791.jpeg",
      filename: "productimage",
    },
  },
  {
    owner: "66af56ce1ac76b23c43d8b7b",
    name: "Wireless Earbuds",
    description:
      "True wireless earbuds with long battery life and water resistance.",
    price: 99.99,
    image: {
      url: "https://images.pexels.com/photos/6917792/pexels-photo-6917792.jpeg",
      filename: "productimage",
    },
  },
];

module.exports = {
  data: sampleOwners,
  dataCertificates: sampleCertificates,
  dataProducts: sampleProducts,
};
