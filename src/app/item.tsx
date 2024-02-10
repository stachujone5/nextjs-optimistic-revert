import { useTransition } from "react";
import { toggleFavorite } from "./actions";

interface Props {
  name: string;
  id: string;
  isFavorite: boolean;
  setOptimisticData: (data: any) => void;
}

export function Item({ name, id, isFavorite, setOptimisticData }: Props) {
  const [_, startTransition] = useTransition();

  return (
    <div className="border p-2">
      <p>{name}</p>
      <p>{id}</p>
      <button
        onClick={async () => {
          startTransition(() =>
            setOptimisticData((prev: any) => {
              const nextData = prev.data.map((item: any) => {
                if (item.id === id) {
                  return {
                    ...item,
                    isFavorite: !item.isFavorite,
                  };
                }
                return item;
              });
              return {
                ...prev,
                data: nextData,
              };
            })
          );

          await toggleFavorite({ id });
        }}
      >
        {isFavorite ? "Favorite" : "Not favorite"}
      </button>
    </div>
  );
}
