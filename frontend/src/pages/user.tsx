import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";
import type { User } from "../types/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState<User[]>([]) 
    useEffect(()=>{
        const fetchUsers = async () =>{
            try {
                const res = await getUserApi();
                setDataSource(res);
            } catch (error: unknown) {
                let errorMessage = "Failed to fetch users";
                
                if (error && typeof error === 'object' && 'response' in error) {
                    const axiosError = error as { response?: { data?: { EM?: string } } };
                    errorMessage = axiosError.response?.data?.EM || errorMessage;
                }
                
                notification.error({
                    message: "Unauthorized",
                    description: errorMessage,
                });
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
