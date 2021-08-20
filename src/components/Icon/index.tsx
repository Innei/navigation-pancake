import React, { FC } from 'react'
import { Icon as RIcon } from '@ricons/utils'
import styles from './index.module.css'
export interface IconProps {
  backgroundColor: string
  icon: string | null | JSX.Element | React.ClassType<any, any, any>
  name: string
  url: string
}

export const Icon: FC<IconProps> = (props) => {
  const { icon, backgroundColor } = props
  return (
    <a className={styles['icon-wrap']} href={props.url} target={'_blank'}>
      <div className={styles['icon-outter']} style={{ backgroundColor }}>
        {typeof icon === 'string' ? (
          <div
            className={'iconfont' + ' ' + icon + ' i-ico'}
            style={{ color: '#fff' }}
          ></div>
        ) : typeof icon === 'object' ? (
          (() => {
            // @ts-ignore
            if (icon.$$typeof) {
              return (
                <div className={styles.icon}>
                  <RIcon color="white">
                    {React.createElement(icon as any as React.ComponentClass)}
                  </RIcon>
                </div>
              )
            }

            return icon
          })()
        ) : null}
      </div>
      <div className={styles['icon-name']}>{props.name}</div>
    </a>
  )
}
