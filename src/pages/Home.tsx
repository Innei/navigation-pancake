import { FC, useEffect, useState } from 'react'
import React from 'react'
import { SearchInput } from '../components/SearchInput'
import { UrlList } from '../config'
import { Icon } from '../components/Icon'
import { SearchLayout } from '../layout/search-layout'
import styles from './Home.module.css'
import { clsx } from '../utils/clsx'
import { useLocalStorage } from 'react-use'
import { STORAGE_PREFIX_KEY } from '../constants'

const UrlListMap = new Map(UrlList.map((item) => [item.name, item]))
const UrlListAllName = UrlList.map((item) => item.name)
export const HomePage: FC = () => {
  const [backgroundLoad, setBgLoad] = useState(false)
  const [urlName, setUrlName] = useLocalStorage(
    STORAGE_PREFIX_KEY + 'list',
    UrlListAllName,
  )

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
      {/* <button className={styles['winnower']}>
        <img
          src="/public/images/1.png"
          alt=""
          className="h-[150px] z-20 transform translate-y-8"
        />
      </button> */}
      <section className={styles['search']}>
        <SearchInput />
      </section>
      <div className={styles['icons-wrap']}>
        {urlName!
          .map((name) => UrlListMap.get(name)!)
          .map((item, i) => (
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
