import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Auth from "./Component/Auth";
import Contact from "./Component/Conatct";
import Profile from "./Component/Profile";
import Plan from "./Component/Plan";
import Team from "./Component/Team";
import Service from "./Component/Service";
import Main from "./Component/Main";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/userProfile" component={Profile} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/plans" component={Plan}/>
        <Route exact path="/team" component={Team}/>
        <Route exact path="/services" component={Service}/>
        <Route exact path="/main" component={Main}/>
      </Switch>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
