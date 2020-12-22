import React from "react";

import clients from "../../services/clients";
import { Table, Space, message } from "antd";
import { Button } from "antd";

import { Popconfirm } from "antd";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper, TableContainer } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function ClientsList() {
  const [loading, setLoading] = React.useState(true);
  const [client, setClients] = React.useState([]);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    clients
      .getClients()
      .then((client) => {
        setClients(client);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        setIsError(true);
      });
  }, []);

  function confirm(e) {
    console.log(e);
    clients.deleteClient(e._id);
    message.success({
      content: "This is a prompt message with custom className and style",
      className: "custom-class",
      style: {
        marginTop: "10ch",
      },
      duration: 2,
    });
    window.location.reload(false);
  }
  function cancel() {
    message.error({
      content: "nothing was deleted",
      className: "custom-class",
      style: {
        marginTop: "10vh",
      },
      duration: 2,
    });
  }

  const columns = [
    {
      title: "الإسم واللقب",
      dataIndex: "nom",
      key: "nom",
      render: (text) => <p style={{ fontSize: "20px" }}>{text}</p>,
    },
    {
      title: "رقم الهاتف",
      dataIndex: "numTel",
      key: "numTel",
      render: (text) => <p style={{ fontSize: "20px" }}>{text}</p>,
    },

    {
      title: "المنطقة",
      dataIndex: "ville",
      key: "ville",
      render: (text) => <p style={{ fontSize: "20px" }}>{text}</p>,
    },
    {
      title: "نوع الخدمة",
      dataIndex: "metier",
      key: "metier",
      render: (text) => <p style={{ fontSize: "20px" }}>{text}</p>,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="large">
          <Link to={`/Reclam/${record._id}`}>
            <Button type="primary">تفاصيل</Button>
          </Link>
          <Button type="primary">
            {" "}
            <Popconfirm
              title="هل أنت متأكد من حذف هذا؟"
              onConfirm={() => {
                confirm(record);
              }}
              onCancel={() => {
                cancel();
              }}
              okText="نعم"
              cancelText="لا"
            >
              حذف
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];
  if (isError) return "error";

  return (
    <div className="container">
      <div style={{ marginTop: "15px" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table
              pagination={{
                defaultPageSize: 5,
              }}
              columns={columns}
              dataSource={client.data}
            />
          </TableContainer>
        )}
      </div>
    </div>
  );
}
