import './App.css'
import { Chat } from './components/Chat'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Nav from './navigation/Nav'
import Home from './navigation/Home';
import Secured from './navigation/Secured';
import keycloak from './keycloak/Keycloak';
import PrivateRoute from './helpers/PrivateRoute';

function App() {

  return (
    <>
      <div id="app">
        <ReactKeycloakProvider authClient={keycloak}>
          <Nav />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/secured" 
                element={
                  <PrivateRoute>
                    <Secured />
                  </PrivateRoute>
                } />
            </Routes>
          </BrowserRouter>
        </ReactKeycloakProvider>
      </div>
    </>
  );
}

export default App
