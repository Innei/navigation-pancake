import React, { FC, useContext } from 'react'
import { Icon as RIcon } from '@ricons/utils'
import styles from './index.module.css'
import { clsx } from '../../utils/clsx'
import { HomePageContext } from '../../pages/Home'
import DividerShort24Filled from '@ricons/fluent/DividerShort24Filled'
export interface IconProps {
  backgroundColor: string
  icon: string | null | JSX.Element | React.ClassType<any, any, any>
  name: string
  url: string
}

export const Icon: FC<IconProps & { isEdit: boolean }> = (props) => {
  const { icon, backgroundColor } = props
  const { removeUrlFromList } = useContext(HomePageContext)
  return (
    <a
      className={styles['icon-wrap']}
      href={props.url}
      target={'_blank'}
      onClick={(e) => {
        if (props.isEdit) {
          e.preventDefault()
        }
      }}
    >
      {props.isEdit && (
        <button
          className={
            'transform rotate-90 h-[15px] w-[15px] absolute top-0 left-0 rounded-full bg-gray-400 bg-opacity-60 p-1 text-gray-100 box-content z-1'
          }
          onClick={(e) => {
            removeUrlFromList(props.name)
          }}
        >
          <RIcon>
            <DividerShort24Filled />
          </RIcon>
        </button>
      )}
      <div
        className={clsx(
          styles['icon-outter'],
          props.isEdit && styles['is-edit'],
        )}
        style={{ backgroundColor }}
      >
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
