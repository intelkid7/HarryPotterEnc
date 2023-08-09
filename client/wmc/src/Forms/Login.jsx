import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/auth';

export default function ForgotPass() {

    const { auth, setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    async function handleLoginSubmit(e) {
        e.preventDefault();
        const user = { email, password };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/login`,
                user
            );
            if (res && res.data.success) {
                console.log(res)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                alert(res.data.message);
                navigate("/home");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went worng");
        }

        setEmail("");
        setPassword("");

    }

    return (
        <div>
            <div id='ldiv' className="text-light d-flex align-items-center justify-content-center" style={{ padding: "5% 17%" }}>
                <form id='loginf' style={{ width: "500px" }}>
                    <h1 id='loghead'>Login</h1>
                    <div id="regiterDiv">
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                id='linput'
                            />
                        </div>
                        <br />
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                id='linput'
                            />
                        </div>
                        <br />
                        <div id='lbutdiv'>
                            <button
                                onClick={handleLoginSubmit}
                                type="submit"
                                className="btn btn-danger btn-lg"
                                id='lbut'
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}