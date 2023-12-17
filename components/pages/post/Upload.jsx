import { CreateContext } from "@/context/ContextProviderGlobal";
import { upploadImage } from "@/service/upload";
import { getImage } from "@/utils/image.util";
import { LoadingOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";

function Upload({ value, onChange, styleBody }) {
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
      setImg(getImage(url));
      onChange?.(getImage(url));
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
    <div className="w-full md:w-[500px] flex justify-center sm:justify-start relative" style={styleBody}>
      <label htmlFor="img">
        <div className=" border-solid border-[1px] rounded-[10px] flex flex-col items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] cursor-pointer">
          {!img ? (
            <div>
              {!loading ? (
                <Fragment>
                  <Image
                    src="/image/no-image.png"
                    alt=""
                    preview={false}
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
              className="w-[300px] h-[300px] sm:w-full sm:h-full rounded-[8px]"
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
