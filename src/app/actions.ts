"use server";

import { revalidatePath } from "next/cache";

const data = [
  { name: "item 1", id: "1", isFavorite: false },
  { name: "item 2", id: "2", isFavorite: false },
  { name: "item 3", id: "3", isFavorite: false },
  { name: "item 4", id: "4", isFavorite: false },
  { name: "item 5", id: "5", isFavorite: false },
  { name: "item 6", id: "6", isFavorite: false },
  { name: "item 7", id: "7", isFavorite: false },
  { name: "item 8", id: "8", isFavorite: false },
  { name: "item 9", id: "9", isFavorite: false },
  { name: "item 10", id: "10", isFavorite: false },
  { name: "item 11", id: "11", isFavorite: false },
  { name: "item 12", id: "12", isFavorite: false },
  { name: "item 13", id: "13", isFavorite: false },
  { name: "item 14", id: "14", isFavorite: false },
  { name: "item 15", id: "15", isFavorite: false },
  { name: "item 16", id: "16", isFavorite: false },
  { name: "item 17", id: "17", isFavorite: false },
  { name: "item 18", id: "18", isFavorite: false },
  { name: "item 19", id: "19", isFavorite: false },
  { name: "item 20", id: "20", isFavorite: false },
  { name: "item 21", id: "21", isFavorite: false },
  { name: "item 22", id: "22", isFavorite: false },
  { name: "item 23", id: "23", isFavorite: false },
  { name: "item 24", id: "24", isFavorite: false },
  { name: "item 25", id: "25", isFavorite: false },
  { name: "item 26", id: "26", isFavorite: false },
  { name: "item 27", id: "27", isFavorite: false },
  { name: "item 28", id: "28", isFavorite: false },
  { name: "item 29", id: "29", isFavorite: false },
  { name: "item 30", id: "30", isFavorite: false },
  { name: "item 31", id: "31", isFavorite: false },
  { name: "item 32", id: "32", isFavorite: false },
  { name: "item 33", id: "33", isFavorite: false },
  { name: "item 34", id: "34", isFavorite: false },
  { name: "item 35", id: "35", isFavorite: false },
  { name: "item 36", id: "36", isFavorite: false },
  { name: "item 37", id: "37", isFavorite: false },
  { name: "item 38", id: "38", isFavorite: false },
  { name: "item 39", id: "39", isFavorite: false },
  { name: "item 40", id: "40", isFavorite: false },
  { name: "item 41", id: "41", isFavorite: false },
  { name: "item 42", id: "42", isFavorite: false },
  { name: "item 43", id: "43", isFavorite: false },
  { name: "item 44", id: "44", isFavorite: false },
  { name: "item 45", id: "45", isFavorite: false },
  { name: "item 46", id: "46", isFavorite: false },
  { name: "item 47", id: "47", isFavorite: false },
  { name: "item 48", id: "48", isFavorite: false },
  { name: "item 49", id: "49", isFavorite: false },
  { name: "item 50", id: "50", isFavorite: false },
  { name: "item 51", id: "51", isFavorite: false },
  { name: "item 52", id: "52", isFavorite: false },
  { name: "item 53", id: "53", isFavorite: false },
  { name: "item 54", id: "54", isFavorite: false },
  { name: "item 55", id: "55", isFavorite: false },
  { name: "item 56", id: "56", isFavorite: false },
  { name: "item 57", id: "57", isFavorite: false },
  { name: "item 58", id: "58", isFavorite: false },
  { name: "item 59", id: "59", isFavorite: false },
];

const take = 5;

export async function getData({ cursor }: { cursor?: string }) {
  const startIndex = cursor
    ? data.findIndex((item) => item.id === cursor) + 1
    : 0;

  const pageData = data.slice(startIndex, startIndex + take);

  const nextCursor =
    pageData.length > 0 ? pageData[pageData.length - 1].id : null;

  return {
    data: pageData,
    cursor: nextCursor,
  };
}

export async function toggleFavorite({ id }: { id: string }) {
  const item = data.find((item) => item.id === id);

  if (item) {
    item.isFavorite = !item.isFavorite;
  }

  revalidatePath("/");
}
