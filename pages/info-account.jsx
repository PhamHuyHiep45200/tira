import CardBase from "@/components/common/CardBase";
import AccountEdit from "@/components/pages/info-account/AccountEdit";
import AccountInfo from "@/components/pages/info-account/accountInfo";
import React, { useState } from "react";

function Page() {
  const [edit, setEdit] = useState(false);

  const editForm = (value) => {
    setEdit(value);
  };
  return (
    <div className="w-full flex justify-center mt-[100px]">
      <CardBase>
        <div>
          <h1 className="text-primary font-bold text-[20px] text-center">
            Tài Khoản Của Tôi
          </h1>
          {edit ? <AccountEdit editForm={editForm}/> : <AccountInfo editForm={editForm}/>}
        </div>
      </CardBase>
    </div>
  );
}

export default Page;