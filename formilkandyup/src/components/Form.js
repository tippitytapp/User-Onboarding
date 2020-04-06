import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import "./Form.css"

const schema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    roles: yup.string().required("Please Choose a Role"),
    email: yup.string().required("Email is required"),
    pword: yup.string().required("Password Required").min(6, "At Least 6 characters required"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms and conditions to continue")
})

function SignUpForm(props){
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] = useState({fname: "", lname: "", roles: "", email: "", pword: "", terms: ""});
    const [errors, setErrors] = useState({fname: "", lname: "",  roles: "", email: "", pword: "", terms: ""});
    const [post, setPost] = useState([]);
    const [users, setUsers] =useState([]);
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
            setUsers([...users, res.data])

            setFormState({fname: "", lname: "", roles: "", email: "", pword: "", terms: "" })

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
        <>
        <form onSubmit={formSubmit}>
            <label htmlFor="fname">First Name: 
            <br/>
                <input type="text" name="fname" id="fname" value={formState.fname} onChange={inputChange} placeholder="First Name" />
                {errors.fname.length > 0 ? <p data-cy="fname" className="error">{errors.fname}</p> : null}
            </label>
            <br />
            <label htmlFor="lname">Last Name:
            <br/>
                <input type="text" name="lname" id="lname" value={formState.lname} onChange={inputChange} placeholder="Last Name" />
                {errors.lname.length > 0 ? <p data-cy="lname" className="error">{errors.lname}</p> : null}
            </label>
            <br />
            <label htmlFor="roles">Role:
            <br/>
                <select id="roles" name="roles" onChange={inputChange}>
                    <option value="Web UI Developer">Web User Interface Developer</option>
                    <option value="Jr Frontend Developer">Jr. Frontend Developer</option>
                    <option value="Sr Frontend Developer">Sr. Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                </select>
            </label>
            <br />
            <label htmlFor="email">Email:
            <br/>
                <input type="email" name="email" id="email" value={formState.email} onChange={inputChange} placeholder="Email" />
                {errors.email.length > 0 ? <p data-cy="email"className="error">{errors.email}</p> : null}
            </label>
            <br />
            <label htmlFor="pword">Password:
                        <br/>
                <input type="password" name="pword" id="pword" value={formState.pword} onChange={inputChange} placeholder="Password" />
                {errors.pword.length > 0 ? <p data-cy="pword" className="error">{errors.pword}</p> : null }
            </label>
            <br />
            <label htmlFor="terms">Clicking "Submit" means that you agree to the terms and conditions of use.
                <input type="checkbox" name="terms" checked={formState.terms} onChange={inputChange} />
            </label>
            <br />
            <button type="submit" disabled={buttonDisabled}>Submit</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>

        </form>

        <div>
                        {users.map(item => {
                return (
                    <div>{item.fname}  {item.lname}</div>
                )
            })}
        </div>
        </>
    )
}


export default SignUpForm;