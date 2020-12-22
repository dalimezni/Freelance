import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api/client"
      : `http://${window.location.hostname}:5000/api/client/`,

  withCredentials: true,
});

const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};
export default {
  service: service,

  getClients() {
    return service
      .get("/")
      .then((res) => res.data)
      .catch(errHandler);
  },
  deleteClient(id) {
    return service
      .delete("/remove/" + id)
      .then((res) => res.data)
      .catch(errHandler);
  },
  getClientById(id) {
    return service
      .get("/search/" + id)
      .then((res) => res.data)
      .catch(errHandler);
  },
};
