import React from "react";






function SignUpForm(props){
    return (
<form>
    <label htmlFor="fname">First Name: </label>
    <input type="text" name="fname" id="fname" placeholder="First Name" />
    <br />
    <label htmlFor="lname">Last Name: </label>
    <input type="text" name="lname" id="lname" placeholder="Last Name" />
    <br />
    <label htmlFor="email">Email: </label>
    <input type="text" name="email" id="email" placeholder="Email" />
    <br />
    <label htmlFor="pword">Password: </label>
    <input type="password" name="pword" id="pword" placeholder="Password" />
    <br />
    <label htmlFor="terms">Clicking "Submit" means that you agree to the terms and conditions of use.</label>
    <input type="checkbox" />
    <br />
    <button>Submit</button>

</form>
    )
}


export default SignUpForm;