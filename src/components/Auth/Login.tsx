import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent  } from 'react';

import './login.scss';
import { handleLoginApi } from '../../apis/login';
import { redirect, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errMessage, setErrMessage] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>()

    const handleOnChangeemail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    

    const handleLogin = async (email: string | undefined, password: string | undefined) => {
        try {
            if (!email || !password) {
                setErrMessage('Missing required email or password')
                return;
            }
    
            let data = await handleLoginApi(email, password);
            if (data.token) {   
                localStorage.setItem('token', data.token);
                navigate('/homepage')
            }

        } catch (e: any) {
            if (e.response) {
                if (e.response.data) {
                    setErrMessage(e.response.data.message)
                }
            }
            console.log('error message', e.response);
        }
    }

    return (    
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center login-title">Login</div>
                    <div className="col-12 form-group">
                        <label>email: </label>
                        <input
                            type="text"
                            className="form-control login-input"
                            placeholder="Enter your user name"
                            value={email}
                            onChange={handleOnChangeemail}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label>Password: </label>
                        <div className="login-password">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control login-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handleOnChangePassword}

                            />
                            <span onClick={handleShowHidePassword}>
                                <i className={showPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-12" style={{ color: 'red' }}>
                        {errMessage}
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-login"
                            onClick={() => handleLogin(email, password)}
                        >Login</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password?</span>
                    </div>
                    <div className="col-12 text-center login-with mt-3">
                        <span className="">Or login with:</span>
                    </div>
                    <div className="col-12 social-login">
                        <i className="fab fa-facebook social-icon fb"></i>
                        <i className="fab fa-google-plus social-icon gg"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login