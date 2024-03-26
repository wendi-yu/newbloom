import SignoutSVG from "@/assets/signout.svg";
import CustomizeSVG from "@/assets/customize_bindings.svg";
import SettingsSVG from "@/assets/settings.svg";

import UserMenuItem from "@/components/common/UserMenu/UserMenuItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { KeyBindMenu } from "./KeyBindMenu";

//add width prop
function UserMenu() {
  const navigate = useNavigate();

  const signout = () => {
    navigate("/login");
  };

  const [keyModalOpen, setKeyModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col ">
        <UserMenuItem icon={<img src={SettingsSVG} />} text="Settings" />
        <UserMenuItem
          icon={<img src={CustomizeSVG} />}
          text="Customize Bindings"
          onClick={() => setKeyModalOpen(true)}
        />
        <UserMenuItem
          icon={<img src={SignoutSVG} />}
          text="Sign Out"
          onClick={signout}
        />
      </div>
      <KeyBindMenu open={keyModalOpen} setOpen={setKeyModalOpen} />
    </div>
  );
}

export default UserMenu;
