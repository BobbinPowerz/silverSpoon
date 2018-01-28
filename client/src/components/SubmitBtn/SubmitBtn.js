import React from "react";

export const SubmitBtn = props => 
<form>
<button type="submit" className="btn btn-primary" onClick={props.handleSubmit}>
	<i className="fa fa-search"> &nbsp; </i>
	{props.children}
</button>
</form>
export default SubmitBtn;