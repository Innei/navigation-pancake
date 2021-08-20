import { FC } from 'react'
import React from 'react'

export const SearchLayout: FC = (props) => {
  return (
    <main className="pt-[4rem] max-w-[60rem] m-auto">{props.children}</main>
  )
}
