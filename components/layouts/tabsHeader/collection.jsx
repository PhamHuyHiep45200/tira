import { getAllCollection } from "@/service/category";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Collection({closeMenu}) {
  const [collection, setCollection] = useState([]);
  const router = useRouter()

  const getAllDataCollection = async () => {
    try {
      const { collections } = await getAllCollection();
      setCollection(collections.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDataCollection();
  }, []);

  const searchCollection = (id)=>{
    router.push({
      pathname: '/search',
      query: {
        collection: id
      }
    })
    closeMenu()
  }
  return (
    <div className="flex justify-center">
      <Row gutter={[30, 30]} className="w-[800px]">
        {collection.map((e) => {
          return (
            <Col
              span={12}
              lg={12}
              key={e}
              className="cursor-pointer"
              onClick={() => searchCollection(e.id)}
            >
              <img
                alt=""
                src={e.image}
                className="w-full h-[200px] rounded-lg object-cover"
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Collection;
