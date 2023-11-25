import { create } from "zustand";

const useFavoritesStore = create((set) => ({
  favorites: [],
  toggleFavorite: (item) =>
    set((state) => {
      const isFavorite = state.favorites.some((fav) => fav.id === item.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((fav) => fav.id !== item.id)
          : [...state.favorites, item],
      };
    }),
}));

export default useFavoritesStore;
