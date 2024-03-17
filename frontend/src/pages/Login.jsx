import Graphic from "@/assets/login_graphic.svg"
import TextInput from "@/components/login/TextInput"
import EmailSVG from "@/assets/email.svg"
import LockSVG from "@/assets/lock.svg"
import LoginButton from "@/components/login/LoginButton"
import PasswordInput from "@/components/login/PasswordInput"
import { validateLogin } from "@/util/login_utils"

import {Flex} from "antd";

import { useNavigate } from 'react-router-dom';
import { useState } from "react"; 

function Login() {

    const EmailIcon = <img src={EmailSVG} className="h-5" />
    const LockIcon = <img src={LockSVG} className="h-5" />

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let err;

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        err = validateLogin(email, password)
        err === null ? navigate('/home') : console.log(err);
    }

    return (
        <div className="h-screen bg-document-background flex items-center justify-center">
            <div className="flex flex-row shadow-lg h-2/3 w-[70em]">
                <div className="h-full w-2/5 bg-suggested-redaction bg-opacity-22 rounded-tl-lg rounded-bl-lg flex items-center justify-center">
                    <img src={Graphic} alt="Graphic"/>
                </div>
                <div className="h-full w-3/5 bg-white rounded-tr-lg rounded-br-lg flex flex-col items-center justify-center">
                    <div className="pb-10 flex flex-col items-center justify-center">
                        <p className="text-title font-bold text-emphasis-primary" >[X]</p>
                        <p className="text-title font-bold">Welcome back :)</p>
                        <p className="text-description font-semibold">let&apos;s get back to work!</p>
                    </div>
                    <Flex vertical gap={20} className="pb-4 w-100">
                        <TextInput 
                            icon={EmailIcon}
                            text="Email"
                            value={email}
                            handleValueChange = {handleEmailChange}
                        />
                        <PasswordInput 
                            icon={LockIcon}
                            text="Password"
                            value={password}
                            handleValueChange = {handlePasswordChange}
                        />
                        <LoginButton text="login" onSubmit={handleSubmit}/>
                    </Flex>
                    {err && <p style={{ color: 'red' }}>{err}</p>}
                    <p className="text-description font-semibold" >don&apos;t have an account? <a href="/register">register</a></p>
                </div>
            </div>
            
        </div> 
    );
  
    }
  export default Login;