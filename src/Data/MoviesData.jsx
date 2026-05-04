export const allMovies = [
  { id: 1, title: "Stranger Things", genre: "Sci-Fi", rating: 8.7, img: "https://picsum.photos/seed/stranger/300/450" },
  { id: 2, title: "Money Heist", genre: "Crime", rating: 8.3, img: "https://picsum.photos/seed/money/300/450" },
  { id: 3, title: "Dark", genre: "Thriller", rating: 8.8, img: "https://picsum.photos/seed/dark99/300/450" },
  { id: 4, title: "Squid Game", genre: "Drama", rating: 8.0, img: "https://picsum.photos/seed/squid/300/450" },
  { id: 5, title: "Extraction", genre: "Action", rating: 6.7, img: "https://picsum.photos/seed/extract/300/450" },
  { id: 6, title: "The Gray Man", genre: "Action", rating: 6.5, img: "https://picsum.photos/seed/grayman/300/450" },
  { id: 7, title: "Red Notice", genre: "Action", rating: 6.3, img: "https://picsum.photos/seed/rednotice/300/450" },
  { id: 8, title: "Never Have I Ever", genre: "Comedy", rating: 7.8, img: "https://picsum.photos/seed/nhie/300/450" },
  { id: 9, title: "Emily in Paris", genre: "Romance", rating: 6.9, img: "https://picsum.photos/seed/emily/300/450" },
  { id: 10, title: "Breaking Bad", genre: "Thriller", rating: 9.5, img: "https://picsum.photos/seed/breaking/300/450" },
  { id: 11, title: "Game of Thrones", genre: "Drama", rating: 9.2, img: "https://picsum.photos/seed/got/300/450" },
  { id: 12, title: "The Crown", genre: "Drama", rating: 8.6, img: "https://picsum.photos/seed/crown/300/450" },
  { id: 13, title: "Peaky Blinders", genre: "Crime", rating: 8.8, img: "https://picsum.photos/seed/peaky/300/450" },
  { id: 14, title: "The Witcher", genre: "Sci-Fi", rating: 8.2, img: "https://picsum.photos/seed/witcher/300/450" },
  { id: 15, title: "Ozark", genre: "Thriller", rating: 8.4, img: "https://picsum.photos/seed/ozark/300/450" },
  { id: 16, title: "The Office", genre: "Comedy", rating: 8.9, img: "https://picsum.photos/seed/office/300/450" },
  { id: 17, title: "Friends", genre: "Comedy", rating: 8.9, img: "https://picsum.photos/seed/friends/300/450" },
  { id: 18, title: "The Boys", genre: "Action", rating: 8.7, img: "https://picsum.photos/seed/theboys/300/450" },
  { id: 19, title: "Narcos", genre: "Crime", rating: 8.8, img: "https://picsum.photos/seed/narcos/300/450" },
  { id: 20, title: "Wednesday", genre: "Drama", rating: 8.1, img: "https://picsum.photos/seed/wednesday/300/450" },
];

export const profiles = [
  { id: 1, name: "Rahul", avatar: "🎮", color: "#e50914" },
  { id: 2, name: "Priya", avatar: "🌸", color: "#0071eb" },
  { id: 3, name: "Kids", avatar: "🧸", color: "#f5a623" },
  { id: 4, name: "+ Add", avatar: "➕", color: "#555" },
];

export const fetchTrending = async () => allMovies.slice(0, 10);
export const fetchByGenre = async (genre) => {
  if (genre === "All" || genre === "popular") return allMovies;
  return allMovies.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
};
export const searchMovies = async (query) => {
  return allMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
};