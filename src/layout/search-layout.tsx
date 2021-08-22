import { FC, Fragment } from 'react'
import React from 'react'
import styles from './layout.module.css'
export const SearchLayout: FC = (props) => {
  return (
    <Fragment>
      <main className="py-[4rem] max-w-[60rem] m-auto">{props.children}</main>
      <footer className={styles.copyright}>
        © 2021{' '}
        <a href="https://innei.ren" target="_blank">
          Innei
        </a>{' '}
        |{' '}
        <a href="https://paul.ren" target="_blank">
          奇趣保罗
        </a>
      </footer>
    </Fragment>
  )
}
