import React, { FC, ReactNode } from 'react'

const ClientWrapper:FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className='red'>{children}</div>
  )
}

export default ClientWrapper