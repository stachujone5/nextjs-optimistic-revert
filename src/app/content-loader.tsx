"use client";

import { getData } from "./actions";
import { Item } from "./item";
import React, { useOptimistic, useTransition } from "react";

type Props = {
  initialData: Awaited<ReturnType<typeof getData>>;
};

export function ContentLoader({ initialData }: Props) {
  const [optimisticData, setOptimisticData] = useOptimistic(initialData);
  const [_, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-4">
      {optimisticData.data?.map((item, i) => (
        <Item key={i} {...item} setOptimisticData={setOptimisticData} />
      ))}
      <button
        onClick={async () => {
          const nextCursor = optimisticData.cursor;

          if (!nextCursor) return;

          const nextData = await getData({ cursor: nextCursor });

          startTransition(() =>
            setOptimisticData((prev) => ({
              data: [...prev.data, ...nextData.data],
              cursor: nextData.cursor,
            }))
          );
        }}
      >
        Load more
      </button>
    </div>
  );
}
