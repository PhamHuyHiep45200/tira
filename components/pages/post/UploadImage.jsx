import React, { useContext, useState } from "react";
import { Upload } from "antd";
import { upploadImage } from "@/service/upload";
import { getImage } from "@/utils/image.util";
import { CreateContext } from "@/context/ContextProviderGlobal";

function UploadImage({ value, onChange }) {
  const { errorNoti } = useContext(CreateContext);
  const [fileList, setFileList] = useState([]);
  const onChangeFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append("folder", "product");
      formData.append("image", e.file.originFileObj);
      const response = await upploadImage(formData);
      const url = `${response.path_image}/${response.image}`;
      setFileList([
        ...fileList,
        {
          uid: Math.random(),
          name: "image.png",
          status: "done",
          url: getImage(url),
        },
      ]);
      onChange?.([...fileList.map((e) => e.url), getImage(url)]);
    } catch (error) {
      errorNoti("Vui lòng kiểm tra lại file của bạn");
    }
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChangeFile}
      >
        {fileList.length < 4 && "+ Upload"}
      </Upload>
    </div>
  );
}

export default UploadImage;
