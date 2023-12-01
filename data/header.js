import {
  HistoryOutlined,
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export const listHeader = [
  {
    icon: <HomeOutlined />,
    name: "Trang chủ",
    path: "/",
  },
  {
    icon: <SmileOutlined />,
    name: "Tài Khoản Của Tôi",
    path: "/info-account",
  },
  {
    icon: <HistoryOutlined />,
    name: "Lịch Sử Thuê Xe",
    path: "/history",
  },
  {
    icon: <KeyOutlined />,
    name: "Thay đổi mật khẩu",
    path: "/change-password",
  },
  {
    icon: <LogoutOutlined />,
    name: "Đăng xuất",
    path: "/login",
  },
];
