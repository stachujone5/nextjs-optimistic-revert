import { getData } from "./actions";
import { ContentLoader } from "./content-loader";

export default async function Home() {
  const initialData = await getData({ cursor: undefined });

  return (
    <div>
      <h1>Infinite scroll</h1>
      <ContentLoader initialData={initialData} />
    </div>
  );
}
