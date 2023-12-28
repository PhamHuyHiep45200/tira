import { Col, Row } from "antd";
import React from "react";

const listImage = [
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/398324449_196004303567818_172238991446465391_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_ohc=ybPY66rNQ9wAX9d9nDj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSe3x9yIZ7tDPBGyVBentWKHX2Qerxsw_jTKpjASTB0IQ&oe=65917D14",
  ];
function Collection() {
  return (
    <div className="flex justify-center">
        <Row gutter={[30, 30]} className="w-[800px]">
      {listImage.map((e) => {
        return (
          <Col span={12} lg={12} key={e} className="cursor-pointer">
            <img alt="" src={e} className="w-full h-full object-cover" />
          </Col>
        );
      })}
    </Row>
    </div>
  );
}

export default Collection;
