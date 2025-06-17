import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';

// Load environment variables
dotenv.config();

// Sample book data
const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "9780525559474",
    genre: "Fiction",
    summary: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "9780593135204",
    genre: "Science Fiction",
    summary: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9780441172719",
    genre: "Science Fiction",
    summary: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the melange.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "9781250301697",
    genre: "Thriller",
    summary: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn: "9780399590504",
    genre: "Biography",
    summary: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780062315007",
    genre: "Fiction",
    summary: "The mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg"
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isbn: "9780735219090",
    genre: "Fiction",
    summary: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    genre: "Self-Help",
    summary: "No matter your goals, Atomic Habits offers a proven framework for improving—every day.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg"
  },
  {
    title: "The Song of Achilles",
    author: "Madeline Miller",
    isbn: "9780062060624",
    genre: "Historical Fiction",
    summary: "A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1331154660i/13623848.jpg"
  },
  {
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    isbn: "9781635575569",
    genre: "Fantasy",
    summary: "When nineteen-year-old huntress Feyre kills a wolf in the woods, a beast-like creature arrives to demand retribution.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620324329i/16096824.jpg"
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    isbn: "9781501139239",
    genre: "Fiction",
    summary: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664458703i/32620332.jpg"
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    isbn: "9780316556347",
    genre: "Fantasy",
    summary: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    genre: "Classics",
    summary: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780060935467",
    genre: "Classics",
    summary: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    genre: "Fantasy",
    summary: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg"
  },
  {
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    isbn: "9780241425459",
    genre: "Mystery",
    summary: "In a peaceful retirement village, four unlikely friends meet weekly in the Jigsaw Room to discuss unsolved crimes.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1591548683i/46000520.jpg"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    genre: "History",
    summary: "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595674533i/23692271.jpg"
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    isbn: "9781984822178",
    genre: "Fiction",
    summary: "At school Connell and Marianne pretend not to know each other. He's popular and well-adjusted, star of the school soccer team while she is lonely, proud, and intensely private.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1571423190i/41057294.jpg"
  },
  {
    title: "The Vanishing Half",
    author: "Brit Bennett",
    isbn: "9780525536291",
    genre: "Fiction",
    summary: "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577090827i/51791252.jpg"
  },
  {
    title: "A Promised Land",
    author: "Barack Obama",
    isbn: "9781524763169",
    genre: "Autobiography",
    summary: "A riveting, deeply personal account of history in the making—from the president who inspired us to believe in the power of democracy.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1604435002i/55361205.jpg"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "9781524763138",
    genre: "Autobiography",
    summary: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg"
  },
  {
    title: "The Testaments",
    author: "Margaret Atwood",
    isbn: "9780385543781",
    genre: "Science Fiction",
    summary: "More than fifteen years after the events of The Handmaid's Tale, the theocratic regime of the Republic of Gilead maintains its grip on power, but there are signs it is beginning to rot from within.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1549475402i/42975172.jpg"
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    isbn: "9780571364879",
    genre: "Science Fiction",
    summary: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg"
  },
  {
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    isbn: "9780765387561",
    genre: "Fantasy",
    summary: "A Life No One Will Remember. A Story You Will Never Forget.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1584633432i/50623864.jpg"
  },
  {
    title: "Little Fires Everywhere",
    author: "Celeste Ng",
    isbn: "9780735224292",
    genre: "Fiction",
    summary: "Everyone in Shaker Heights was talking about it that summer: how Isabelle, the last of the Richardson children, had finally gone around the bend and burned the house down.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522684533i/34273236.jpg"
  },
  {
    title: "The Guest List",
    author: "Lucy Foley",
    isbn: "9780062868930",
    genre: "Mystery",
    summary: "On an island off the coast of Ireland, guests gather to celebrate two people joining their lives together as one.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1587498839i/52656911.jpg"
  },
  {
    title: "The Dutch House",
    author: "Ann Patchett",
    isbn: "9780062963673",
    genre: "Fiction",
    summary: "At the end of the Second World War, Cyril Conroy combines luck and a single canny investment to begin an enormous real estate empire, propelling his family from poverty to enormous wealth.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1552334367i/44318414.jpg"
  },
  {
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    isbn: "9780525620785",
    genre: "Horror",
    summary: "After receiving a frantic letter from her newly-wed cousin begging for someone to save her from a mysterious doom, Noemí Taboada heads to High Place, a distant house in the Mexican countryside.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1607462569i/53152636.jpg"
  },
  {
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    isbn: "9781250217288",
    genre: "Fantasy",
    summary: "A magical island. A dangerous task. A burning secret.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569514285i/45047384.jpg"
  },
  {
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    isbn: "9781571313560",
    genre: "Nature",
    summary: "As a botanist, Robin Wall Kimmerer has been trained to ask questions of nature with the tools of science. As a member of the Citizen Potawatomi Nation, she embraces the notion that plants and animals are our oldest teachers.",
    coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655605174i/17465709.jpg"
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log('MongoDB Connected');
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('Existing books removed');
    
    // Insert new books
    const createdBooks = await Book.insertMany(books);
    console.log(`${createdBooks.length} books inserted`);
    
    console.log('Data import complete!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();