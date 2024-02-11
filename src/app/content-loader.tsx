"use client";

import { getData } from "./actions";
import { Item } from "./item";
import React, { useState } from "react";

type Props = {
  initialData: Awaited<ReturnType<typeof getData>>;
};

export function ContentLoader({ initialData }: Props) {
  const [data, setData] = useState(initialData);

  return (
    <div className="flex flex-col gap-4">
      {data.data?.map((item, i) => (
        <Item key={i} {...item} />
      ))}
      <button
        onClick={async () => {
          const nextCursor = data.cursor;

          if (!nextCursor) return;

          const nextData = await getData({ cursor: nextCursor });

          setData((prev) => ({
            data: [...prev.data, ...nextData.data],
            cursor: nextData.cursor,
          }));
        }}
      >
        Load more
      </button>
    </div>
  );
}
