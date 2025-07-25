import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]) 
    useEffect(()=>{
        const fetchUsers = async () =>{
            const res = await getUserApi()
            if(!res?.message){
                setDataSource(res)
            } else{
              notification.error({
                message: "Unauthorized",
              })
            }
        }
        fetchUsers()
    },[])

  const columns = [
      {
        title: "Id",
        dataIndex: "_id",
      },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Table bordered dataSource={dataSource} columns={columns} rowKey={"_id"}/>
    </div>
  );
};

export default UserPage;
