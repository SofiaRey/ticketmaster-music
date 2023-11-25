import useFavoritesStore from "../stores/favoritesStore";
import ItemCard from "./ItemCard";
import emptyStateImg from "../assets/empty_state_illustration.svg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

/// Favorites page, displays all favorite attractions
function Favorites() {
  const navigate = useNavigate();

  /// Favorites store
  const favorites = useFavoritesStore((state) => state.favorites);

  /// Toggle favorite
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const goHome = () => navigate("/");

  return (
    <div className="p-4 ">
      {favorites.length === 0 ? (
        // Empty State
        <div className="flex flex-col justify-center items-center w-full mt-32">
          <img src={emptyStateImg} className="w-6/12" />
          <p className="text-xl mt-4">You have no favorites yet...</p>
          <Button type="primary" onClick={goHome} className="mt-4 bg-tmBlue">
            Continue Exploring
          </Button>
        </div>
      ) : (
        // Favorites
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20">
          {favorites.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
