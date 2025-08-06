import { notification, Table, Typography, Card, Spin, Empty } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";
import type { User } from "../types/api";

const { Title } = Typography;

const UserPage = () => {
    const [dataSource, setDataSource] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
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
                    placement: "topRight",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchUsers()
    }, [])

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            width: 80,
            render: () => (
                <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <UserOutlined />
                </div>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: (a: User, b: User) => a.name.localeCompare(b.name),
            render: (text: string) => (
                <span style={{ fontWeight: 500 }}>{text}</span>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a: User, b: User) => a.email.localeCompare(b.email),
        },
        {
            title: "Role",
            dataIndex: "role",
            filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'User', value: 'user' },
            ],
            onFilter: (value: boolean | React.Key, record: User) => record.role?.indexOf(value as string) === 0,
            render: (role: string) => (
                <span style={{ 
                    background: role === 'admin' ? '#ff4d4f' : '#52c41a',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    textTransform: 'uppercase'
                }}>
                    {role || 'user'}
                </span>
            ),
        },
        {
            title: "ID",
            dataIndex: "_id",
            width: 100,
            render: (id: string) => (
                <code style={{ 
                    background: '#f5f5f5', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                }}>
                    {id.slice(-6)}
                </code>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", minHeight: "calc(100vh - 64px)" }}>
            <div className="container">
                <Card 
                    className="user-table-container"
                    style={{ 
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div style={{ marginBottom: 24, textAlign: 'center' }}>
                        <div style={{ 
                            fontSize: '48px', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: 16
                        }}>
                            <TeamOutlined />
                        </div>
                        <Title level={2} className="user-table-title" style={{ margin: 0 }}>
                            User Management
                        </Title>
                        <p style={{ color: '#666', marginTop: 8 }}>
                            Manage and view all registered users
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <Spin size="large" />
                            <p style={{ marginTop: 16, color: '#666' }}>Loading users...</p>
                        </div>
                    ) : dataSource.length === 0 ? (
                        <Empty 
                            description="No users found"
                            style={{ padding: '60px 0' }}
                        />
                    ) : (
                        <Table 
                            bordered={false}
                            dataSource={dataSource} 
                            columns={columns} 
                            rowKey={"_id"}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} of ${total} users`,
                                style: { marginTop: 16 }
                            }}
                            style={{
                                background: 'white',
                            }}
                            rowClassName={() => 'user-table-row'}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default UserPage;
