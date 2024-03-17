import Moment from "moment";
import { getUsersByIds } from "@/util/api/user_apis";
import { Table } from "antd";
import DocumentIcon from "@/assets/home_doc_file_icon.svg";
import PfpIcon from "@/assets/pfp.svg";
import TimeIcon from "@/assets/time.svg";
import { useNavigate } from "react-router-dom";

const ListSelector = ({ docInfos }) => {
  const userIds = docInfos.map((di) => di.owner);
  const users = getUsersByIds(userIds);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Document Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex flex-row items-center space-x-2">
          <img src={DocumentIcon} className="w-6" />
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (text) => (
        <div className="flex flex-row items-center space-x-2">
          <img src={PfpIcon} className="w-6" />
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Date Last Modified",
      dataIndex: "dateLastModified",
      key: "dateLastModified",
      render: (text) => (
        <div className="flex flex-row items-center space-x-2">
          <img src={TimeIcon} className="w-6" />
          <div>{text}</div>
        </div>
      ),
    },
  ];

  const dataSource = docInfos.map((di) => ({
    key: di.id,
    id: di.id,
    name: di.name,
    owner: users.find((u) => u.id === di.id).name,
    dateLastModified: Moment(di.dateLastModified).format("MMM D, YYYY"),
  }));
  const navigateToDoc = (record) => {
    return {
      onClick: () => navigate({ pathname: `/document/${record.id}` }),
    };
  };

  return (
    <Table dataSource={dataSource} columns={columns} onRow={navigateToDoc} />
  );
};

export default ListSelector;
