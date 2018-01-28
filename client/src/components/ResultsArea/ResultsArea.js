import React from "react";
import "./ResultsArea.css";

const ResultsArea = props =>
	<div className={props.class}>{props.children}</div>;

export default ResultsArea;