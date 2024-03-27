import Graphic from "@/assets/login_graphic.svg"
import TextInput from "@/components/login/TextInput"
import EmailSVG from "@/assets/email.svg"
import LockSVG from "@/assets/lock.svg"
import UserSVG from "@/assets/user.svg"
import LoginButton from "@/components/login/LoginButton"
import PasswordInput from "@/components/login/PasswordInput"
import { validateRegister } from "@/util/login_utils"
import LogoIcon from "@/assets/new_logo.svg";

import {Flex} from "antd";

import { useNavigate } from 'react-router-dom';
import { useState } from "react"; 

function Register() {

    const EmailIcon = <img src={EmailSVG} className="h-5" />
    const LockIcon = <img src={LockSVG} className="h-5" />
    const UserIcon = <img src={UserSVG} className="h-5" />

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [err, setErr] = useState(null);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        const validationResult = validateRegister(email, password);
        setErr(validationResult);
        validationResult === null ? navigate('/home') : console.log(err);
    }

    return (
        <div className="h-screen bg-document-background flex items-center justify-center">
            <div className="flex flex-row shadow-lg h-2/3 w-[70em]">
                <div className="h-full w-2/5 bg-suggested-redaction bg-opacity-22 rounded-tl-lg rounded-bl-lg flex items-center justify-center">
                    <img src={Graphic} alt="Graphic"/>
                </div>
                <div className="h-full w-3/5 bg-white rounded-tr-lg rounded-br-lg flex flex-col items-center justify-center">
                    <div className="pb-10 flex flex-col items-center justify-center">
                        <img src={LogoIcon} alt="[X]" className="h-8 mb-3"/>
                        <p className="text-title font-bold">Welcome!</p>
                        <p className="text-description font-semibold">sign up and start redacting :)</p>
                    </div>
                    <Flex vertical gap={20} className="pb-4 w-100">
                        <TextInput 
                            icon={UserIcon}
                            text="First Name"
                            value={firstName}
                            handleValueChange = {handleFirstNameChange}
                        />
                        <TextInput 
                            icon={UserIcon}
                            text="Last Name"
                            value={lastName}
                            handleValueChange = {handleLastNameChange}
                        />
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
                        {err && <p className="text-red-500 text-center text-xs">{err}</p>}
                        <LoginButton text="register" onSubmit={handleSubmit}/>
                    </Flex>
                    <p className="text-description font-semibold" >already have an account? <a href="/login">sign in</a></p>
                </div>
            </div>
            
        </div> 
    );
  }
  
  export default Register;