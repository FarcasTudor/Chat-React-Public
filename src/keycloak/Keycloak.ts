import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:5173/auth",
  realm: "INTERNSHIP",
  clientId: "chat-client",
});

export default keycloak;