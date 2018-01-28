import React from "react";
import  "./Nav.css";
import {Link } from 'react-router-dom';

const Nav = () =>
<nav className="navbar navbar-inverse navbar-top">
	<div className="container-fluid">
		<div className="navbar-header">
			<button type="button" className="collapsed navbar-toggle">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar" /> <span className="icon-bar" />
				<span className="icon-bar" />
			</button>
			<Link to="/" className="navbar-brand">
				Silver Spoon
			</Link>
		</div>
		<div className="collapse navbar-collapse" id="myNavbar">

			<ul className="nav navbar-nav navbar-right">
				<li><Link to="#" id="btnLogin" ><span className="glyphicon glyphicon-log-in"></span> Anon LogIn</Link></li>
				<li><Link to="#" id="googleLogin" ><span className="glyphicon glyphicon-log-in"></span> Google LogIn</Link></li>
				<li><Link to="#"  className="hide" id="btnLogout" ><span className="glyphicon glyphicon-log-out"></span> LogOut</Link></li>
			</ul>
		</div>
	</div>
</nav>;

export default Nav;

