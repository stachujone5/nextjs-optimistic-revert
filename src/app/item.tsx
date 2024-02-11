import { useOptimistic, useTransition } from "react";
import { toggleFavorite } from "./actions";

interface Props {
  name: string;
  id: string;
  isFavorite: boolean;
}

export function Item({ name, id, isFavorite }: Props) {
  const [_, startTransition] = useTransition();
  const [optimisticItem, setOptimisticItem] = useOptimistic({
    id,
    name,
    isFavorite,
  });

  const toggleFav = async (isFav: boolean) => {
    startTransition(() =>
      setOptimisticItem((prev) => {
        return { ...prev, isFavorite: !isFav };
      })
    );

    await toggleFavorite({ id, isFavorite: !isFav });
  };

  return (
    <div className="border p-2">
      <p>{name}</p>
      <p>{id}</p>
      <button onClick={() => toggleFav(optimisticItem.isFavorite)}>
        {optimisticItem.isFavorite ? "Favorite" : "Not favorite"}
      </button>
    </div>
  );
}
