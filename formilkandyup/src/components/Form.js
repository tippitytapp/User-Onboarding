import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
    pword: yup.string().required("Password Required"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms and conditions to continue")
})

function SignUpForm(props){
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] = useState({
        fname: "",
        lname: "",
        email: "",
        pword: "",
        terms: ""
      });
    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        email: "",
        pword: "",
        terms: ""
    });
    const [post, setPost] = useState([]);

    useEffect(()=> {
        schema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    },[formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
            setPost(res.data);
            console.log("success", post);
            setFormState({
                fname: "",
                lname: "",
                email: "",
                pword: "",
                terms: ""
            })
        })
        .catch(err => console.log(err.response));
    };

    const validateChange = e => {
        yup
        .reach(schema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
                ...errors, [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors, [e.target.name]: err.errors[0]
            });
        });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);

    }


    return (
<form onSubmit={formSubmit}>
    <label htmlFor="fname">First Name: </label>
    <input 
    type="text" 
    name="fname" 
    id="fname"
    value={formState.fname}
    onChange={inputChange}
    placeholder="First Name" 
    />
    {errors.fname.length > 0 ? <p className="error">{errors.fname}</p> : null}
    <br />
    <label htmlFor="lname">Last Name: </label>
    <input 
    type="text" 
    name="lname" 
    id="lname" 
    value={formState.lname}
    onChange={inputChange} 
    placeholder="Last Name" />
     {errors.lname.length > 0 ? <p className="error">{errors.lname}</p> : null}
    <br />
    <label htmlFor="email">Email: </label>
    <input 
    type="email" 
    name="email" 
    id="email" 
    value={formState.email}
    onChange={inputChange} 
    placeholder="Email" />
     {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
    <br />
    <label htmlFor="pword">Password: </label>
    <input 
    type="password" 
    name="pword" 
    id="pword" 
    value={formState.pword}
    onChange={inputChange} 
    placeholder="Password" 
    />
     {errors.pword.length > 0 ? <p className="error">{errors.pword}</p> : null}
    <br />
    <label htmlFor="terms">Clicking "Submit" means that you agree to the terms and conditions of use.</label>
    <input 
    type="checkbox"
    name="terms"
    checked={formState.terms}
    onChange={inputChange}
    />
    <br />
    <pre>{JSON.stringify(post, null, 2)}</pre>
    <button disabled={buttonDisabled}>Submit</button>

</form>
    )
}


export default SignUpForm;