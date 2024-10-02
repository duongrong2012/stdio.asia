import AppTable from "@/component/AppTable";
import { axiosClient } from "@/constant";
import { AutoComplete, Button } from "antd";

export default async function Home() {

  const { data } = await axiosClient.get(`/san-pham`, { params: { page: 1, limit: 100 } });

  // const onClickEdit = (item) => () => {

  // }

  // const renderId = (text, item, index) => () => {
  //   return index + 1
  // }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div>Quản lý kho</div>
        <div className="flex gap-1">
          <Button type="primary">Thêm sản phẩm</Button>
          <AutoComplete
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>
      </div>
      <AppTable
        data={data.results}
      />
    </div>
  );
}
