import React from "react";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import List from "./pages/List"
import Success from "./pages/Success"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () =>

<Router>
	<div>
		<Nav />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/users/:id" component={List} />
			<Route exact path="/success" component={Success} />
			<Route component={NoMatch} />
		</Switch>
		<Footer />
	</div>
</Router>;

export default App;