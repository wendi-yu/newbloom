import Graphic from "@/assets/login_graphic.svg"
import TextInput from "@/components/login/TextInput"
import EmailSVG from "@/assets/email.svg"
import LockSVG from "@/assets/lock.svg"
import LoginButton from "@/components/login/LoginButton"
import PasswordInput from "@/components/login/PasswordInput"

import {Flex} from "antd";

function Login() {

    const EmailIcon = <img src={EmailSVG} className="h-5" />
    const LockIcon = <img src={LockSVG} className="h-5" />

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
                        />
                        <PasswordInput 
                            icon={LockIcon}
                            text="Password"
                        />
                        <LoginButton text="login"/>
                    </Flex>
                    <p className="text-description font-semibold" >don&apos;t have an account? <a href="/register">register</a></p>
                </div>
            </div>
            
        </div> 
    );
  }
  
  export default Login;