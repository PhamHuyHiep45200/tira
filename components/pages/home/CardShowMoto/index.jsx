import React from 'react'
import Title from './Title'
import ListMoto from './ListMoto'

function CardShowMoto({type,title,icon, listMoto}) {
  return (
    <div>
        <Title title={title} type={type}/>
        <ListMoto listMoto={listMoto} type={type}/>
    </div>
  )
}

export default CardShowMoto