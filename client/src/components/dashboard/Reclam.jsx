import React from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import clients from "../../services/clients";
import { Card, Col, Row } from "antd";
import { CircularProgress } from "@material-ui/core";
import Carousel from "react-bootstrap/Carousel";
import Map from "./GeoMap";
import GeoMap from "./GeoMap";
export default function Reclam(props) {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const { match } = props;
  const [client, setClient] = React.useState();
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsError(false);

    clients
      .getClientById(match.params.id)
      .then((client) => {
        setClient(client.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(true);
      });
  }, [match.params.id]);
  if (isError) {
    return <div>Something went wrong...</div>;
  }
  if (isLoading) {
    return (
      <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="center-screen">
        <Link style={{ marginBottom: "20px" }} to={`/dashboard`}>
          <Button type="primary" danger htmlType="submit">
            العودة إلى القائمة
          </Button>
        </Link>
        <div style={{ marginBottom: "20px" }} className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="الإسم واللقب" bordered={false}>
                {client.nom}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="رقم الهاتف	" bordered={false}>
                {client.numTel}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="نوع الخدمة	" bordered={false}>
                {client.metier}
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ marginBottom: "20px" }} className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="المنطقة" bordered={false}>
                {client.ville}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="التعليق" bordered={false}>
                {client.commentaire}
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ marginBottom: "20px" }} className="site-card-wrapper">
          <Carousel>
            {client.images.map((img) => {
              return (
                <Carousel.Item>
                  <img
                    src={"http://localhost:5000/images/" + img}
                    alt="Third slide"
                    height="150px"
                    width="150px"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div style={{ margin: "auto", width: "50%" }}>
        <GeoMap
          longitude={client.longitude}
          latitude={client.latitude}
        ></GeoMap>
      </div>
    </div>
  );
}
