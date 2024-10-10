import AppTable from "@/component/AppTable";
import logger from "@/component/HOCs/logger";
import TestComponent from "@/component/TestComponent";
import { axiosClient, host } from "@/constant";

export default async function Home() {

  // const { data } = await axiosClient.get(`/san-pham`, { params: { page: 1, limit: 100 } });

  // const res = await fetch(`${host}/san-pham`, { next: { revalidate: 1200 } });

  const res = await fetch(`${host}/san-pham`, { cache: "force-cache" });

  const data = await res.json()

  const EnhancedComponent = logger(TestComponent);

  return (
    <div className="flex flex-col">
      <AppTable
        data={data.results}
      />
      <EnhancedComponent name="Minh Tri" age={30} />
    </div>
  );
}
