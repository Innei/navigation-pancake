import { FC, useEffect, useState } from 'react'
import React from 'react'
import { SearchInput } from '../components/SearchInput'
import { UrlList } from '../config'
import { Icon } from '../components/Icon'
import { SearchLayout } from '../layout/search-layout'
import styles from './Home.module.css'
import { clsx } from '../utils/clsx'
export const HomePage: FC = () => {
  const [backgroundLoad, setBgLoad] = useState(false)
  useEffect(() => {
    const image = new Image()
    image.src = 'https://api.paugram.com/wallpaper?source=gh'
    image.onload = () => {
      setBgLoad(true)
    }
  }, [])
  return (
    <SearchLayout>
      <section
        className={clsx(styles['background'])}
        style={{
          background: `url("https://api.paugram.com/wallpaper?source=gh") right bottom / 60% no-repeat`,
          opacity: backgroundLoad ? 1 : 0,
        }}
      ></section>
      <section className={styles['search']}>
        <SearchInput />
      </section>
      <div className={styles['icons-wrap']}>
        {UrlList.map((item, i) => (
          <Icon
            {...{
              key: i,
              icon: item.icon,
              name: item.name,
              backgroundColor: item.backgroundColor,
              url: item.url,
            }}
          />
        ))}
      </div>
    </SearchLayout>
  )
}
