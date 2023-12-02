import { CreateContext } from "@/context/ContextProviderGlobal";
import { upploadImage } from "@/service/upload";
import { LoadingOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";

function Upload({ value, onChange }) {
  const { errorNoti } = useContext(CreateContext);
  const [img, setImg] = useState(value ?? "");
  const [loading, setLoading] = useState(false);
  const changeImage = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("folder", "product");
      formData.append("image", e.target.files[0]);
      const response = await upploadImage(formData);
      const url = `${response.path_image}/${response.image}`
      setImg(url);
      onChange?.(url);
    } catch (error) {
      errorNoti("Vui lòng kiểm tra lại file của bạn");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (value) setImg(value);
  }, [value]);
  return (
    <div className="w-[500px] flex justify-start relative">
      <label htmlFor="img">
        <div className=" border-solid border-[1px] rounded-[10px] flex flex-col items-center justify-center w-[400px] h-[400px] cursor-pointer">
          {!img ? (
            <div>
              {!loading ? (
                <Fragment>
                  <Image
                    src="/image/no-image.png"
                    alt=""
                    className="max-w-[100px] max-h-[100px]"
                  />
                  <div className="text-center">Chọn Ảnh</div>
                </Fragment>
              ) : (
                <LoadingOutlined className="text-[50px]" />
              )}
            </div>
          ) : (
            <Image
              src={img}
              alt=""
              width={'100%'}
              height={'100%'}
              className="w-full h-full rounded-[8px]"
              preview={false}
            />
          )}
        </div>
      </label>
      <input
        type="file"
        className="opacity-0 absolute top-0 left-0"
        id="img"
        onChange={changeImage}
      />
    </div>
  );
}

export default Upload;
