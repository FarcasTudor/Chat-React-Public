import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

const Nav = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    console.log("Keycloakkkkk: " + keycloak.authenticated);
    if (keycloak.authenticated) {
      console.log("Redirecting to /secured");
      redirect("/secured");
    }
  }, [keycloak]);
  console.log("Keycloak: " + keycloak.authenticated);
  return (
    <div>
      <div >
        <section >
          <nav >
            <div >
              <h1 >
                Keycloak React AUTH.
              </h1>
              <ul >
                <li>
                  <a  href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a  href="/secured">
                    Secured Page
                  </a>
                </li>
              </ul>
              <div >
                <div >
                  {!keycloak.authenticated && (
                    <button
                      type="button"
                      onClick={() => {
                        keycloak.login().then(() => {
                          keycloak.redirectUri = window.location.origin + "/home";
                        });
                      }}>
                      Login
                    </button>
                  )}

                  {!!keycloak.authenticated && (
                    <button
                      type="button"
                      onClick={() => keycloak.logout()}
                    >
                      Logout ({keycloak.tokenParsed?.preferred_username})
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Nav;
