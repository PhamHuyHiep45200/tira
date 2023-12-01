'use client'
import React from 'react'
import CardBase from '@/components/common/CardBase'
import FormChangePass from '@/components/pages/change-password/FormChangePass'

function page() {
  return (
    <div className="w-full flex justify-center mt-[100px]">
      <CardBase>
        <div>
          <h1 className="text-primary font-bold text-[20px] text-center">
            Thay Đổi Mật Khẩu
          </h1>
          <FormChangePass/>
        </div>
      </CardBase>
    </div>
  )
}

export default page