import Layout from "@/components/layouts";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { userGetMe } from "@/service/user";
import "@/styles/globals.css";
import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      getMe();
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleStartRouter);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStartRouter);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, router.events]);
  const handleStartRouter = () => {
    setLoading(true);
  };

  const handleComplete = () => {
    setLoading(false);
  };
  const getMe = async () => {
    try {
      const response = await userGetMe(localStorage.getItem("userId"));
      if (response.data && response.data.status === 200) {
        setUser(response.data.data);
        router.push("/");
      } else {
        // router.push("/");
      }
    } catch (error) {
      // router.push("/login");
    }
  };
  const setUserData = (data) => {
    setUser(data);
  };
  const successNoti = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const errorNoti = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const data = useMemo(() => {
    return {
      user,
      setUserData,
      successNoti,
      errorNoti,
    };
  }, [user]);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <CreateContext.Provider value={data}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#07c2b2",
          },
        }}
      >
        <Spin spinning={loading}  indicator={antIcon}>
          {contextHolder}
          {getLayout(<Component {...pageProps} />)}
        </Spin>
      </ConfigProvider>
    </CreateContext.Provider>
  );
}