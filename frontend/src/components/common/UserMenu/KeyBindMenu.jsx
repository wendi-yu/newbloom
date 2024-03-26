import { Modal } from "antd";
import { KEYBIND_DESCRIPTIONS, getUserKeyBinds } from "@/util/api/user_apis";
import { useState } from "react";
import { saveUserKeyBinds } from "@/util/api/user_apis";

export const KeyBindMenu = ({ open, setOpen }) => {
  const [userKeyBinds, setUserKeyBinds] = useState(getUserKeyBinds());

  const updateOnInput = (newVal, val, key) => {
    // TODO: fix this, need custom validator for tab and whatnot
    if (newVal.length > 1) {
      return;
    }
    const newUserKeyBinds = { ...userKeyBinds };
    newUserKeyBinds[key][val.length - 1] = newVal;
    setUserKeyBinds(newUserKeyBinds);
  };

  const footer = (
    <div className="flex justify-end space-x-4">
      <button
        className="font-bold border-primary-light"
        onClick={() => setOpen(false)}
      >
        Close
      </button>
      <button
        className="bg-primary-light text-white font-bold"
        onClick={() => {
          const keyBindCopy = { ...userKeyBinds };
          Object.keys(keyBindCopy).forEach((key) => {
            const currVal = keyBindCopy[key];
            keyBindCopy[key] = currVal[currVal.length - 1];
          });
          saveUserKeyBinds(keyBindCopy);
          setOpen(false);
        }}
      >
        Save
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <div className="font-Inter text-lg my-2">Key Bind Configuration</div>
      }
      footer={footer}
      autoFocusButton="cancel"
    >
      <div className="grid grid-cols-2 m-4 px-4">
        {Object.entries(userKeyBinds).map(([key, val]) => {
          return (
            <div key={key} className="contents">
              <div className="font-Inter font-bold my-2 text-base">
                {KEYBIND_DESCRIPTIONS[key]}
              </div>
              <div className="ml-auto mr-0 w-40 my-2 rounded-lg bg-background-primary flex justify-center space-x-2">
                {val.map((v, i) => {
                  return i === val.length - 1 ? (
                    <input
                      className={`font-mono bg-suggested-redaction-darker my-1 px-1.5 w-${
                        v.length === 1 ? "5" : "8"
                      } rounded-sm text-black text-sm`}
                      key={v}
                      value={v}
                      onChange={(e) => updateOnInput(e.target.value, val, key)}
                      onFocus={(e) => {
                        e.preventDefault();
                        e.target.select();
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                    ></input>
                  ) : (
                    <div
                      className="font-mono bg-suggested-redaction-darker my-1 px-1.5 rounded-sm text-sm"
                      key={v}
                    >
                      {v}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
