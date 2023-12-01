import {
  EyeOutlined,
  RadarChartOutlined,
  SketchOutlined,
  StarOutlined,
} from "@ant-design/icons";
import React, { useMemo } from "react";

function Title({ title, icon, type }) {
  const icons = useMemo(() => {
    switch (type) {
      case "star":
        return <StarOutlined className="text-[#ffb341] text-[20px]" />;
      case "rent":
        return <SketchOutlined className="text-[#9d34ff] text-[20px]" />;
      default:
        return <EyeOutlined className="text-primary text-[20px]" />;
    }
  }, [type]);
  const color = useMemo(() => {
    switch (type) {
      case "star":
        return "#ffb341";
      case "rent":
        return "#9d34ff";
      default:
        return "#07c2b2";
    }
  }, [type]);
  return (
    <div className="w-full rounded-[4px] bg-[#eee] flex items-center h-[40px] px-[10px] mb-5" style={{borderLeft:`5px solid ${color}`}}>
      <span style={{ color: color }}>{icons}</span>
      <span className="font-medium text-[18px] ml-[15px] truncate" style={{color:color}}>
        {title}
      </span>
    </div>
  );
}

export default Title;
