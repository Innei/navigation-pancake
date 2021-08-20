import { FC } from 'react'
import React from 'react'
import { SearchInput } from '../components/SearchInput'
import { UrlList } from '../config'
import { Icon } from '../components/Icon'
import { SearchLayout } from '../layout/search-layout'
import styles from './Home.module.css'
export const HomePage: FC = () => {
  return (
    <SearchLayout>
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
