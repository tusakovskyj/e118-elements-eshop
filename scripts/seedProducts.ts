import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKgpkjhJ3eIin7o1W_szhe2AsfvCuJJkU",
  authDomain: "e118-18f7a.firebaseapp.com",
  projectId: "e118-18f7a",
  storageBucket: "e118-18f7a.firebasestorage.app",
  messagingSenderId: "748571370978",
  appId: "1:748571370978:web:f3f7aaa803baf276ff45bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dummyProducts = [
  {
    name: "Minimalist Watch",
    description: "A sleek, all-black timepiece with no numbers and simple hands. The ultimate expression of time.",
    price: 300,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stock: 10
  },
  {
    name: "White Ceramic Mug",
    description: "A pure white ceramic mug with no logo, handle perfectly proportioned for daily coffee or tea.",
    price: 50,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stock: 50
  },
  {
    name: "Architect's Lamp",
    description: "Matte black aluminum desk lamp with articulated arm. Casts the perfect focused light.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1525381165152-78d10b06b8f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stock: 5
  },
  {
    name: "Leather Notebook",
    description: "Blank white pages encased in premium dark grey leather. For thoughts, unconstrained.",
    price: 80,
    imageUrl: "https://images.unsplash.com/photo-1533618118023-e18e6900a0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stock: 20
  },
  {
    name: "Concrete Planter",
    description: "A raw, geometric concrete pot for your favorite succulent. Brings a touch of brutalism indoors.",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stock: 12
  },
  {
    name: "Noise-Cancelling Earbuds",
    description: "Pure sound, pure silence. Matte black finish and perfectly contoured to the ear.",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stock: 8
  }
];

async function seed() {
  console.log("Seeding Database...");
  const productsRef = collection(db, "products");

  for (const product of dummyProducts) {
    try {
      const docRef = await addDoc(productsRef, product);
      console.log(`Document written with ID: ${docRef.id} - ${product.name}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  console.log("Seeding Complete!");
  process.exit(0);
}

seed();
