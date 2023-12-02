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
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (auth || localStorage.getItem("token")) {
      getMe();
    } else {
      setUser(null);
    }
  }, [auth]);

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

  const userAuth = (value) => {
    setAuth(value);
  };

  const handleComplete = () => {
    setLoading(false);
  };
  const getMe = async () => {
    try {
      const { user } = await userGetMe();
      setUser(user);
    } catch (error) {
      console.log(error);
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

  const resetStore = () => {
    localStorage.removeItem("token");
    setAuth(false);
    setUser(null);
  };
  const data = useMemo(() => {
    return {
      user,
      userAuth,
      setUserData,
      successNoti,
      errorNoti,
      userAuth,
      resetStore,
    };
  }, [user, auth]);
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
        <Spin spinning={loading} indicator={antIcon}>
          {contextHolder}
          {getLayout(<Component {...pageProps} />)}
        </Spin>
      </ConfigProvider>
    </CreateContext.Provider>
  );
}
