/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import React from 'react'
import { SearchInput } from '../components/SearchInput'
import { UrlList } from '../config'
import { Icon } from '../components/Icon'
import { SearchLayout } from '../layout/search-layout'
import styles from './Home.module.css'
import { clsx } from '../utils/clsx'
import { useLocalStorage } from 'react-use'
import { STORAGE_PREFIX_KEY } from '../constants'
import { Icon as RIcon } from '@ricons/utils'
import SettingOutlined from '@ricons/antd/es/SettingOutlined'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'

const UrlListMap = new Map(UrlList.map((item) => [item.name, item]))
const UrlListAllName = UrlList.map((item) => item.name)

export const HomePageContext = createContext({
  setUrlList(names: string[]) {},
  removeUrlFromList(name: string) {},
})
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

  const [editable, setEditable] = useState(false)
  return (
    <SearchLayout>
      <HomePageContext.Provider
        value={{
          setUrlList: setUrlName,
          removeUrlFromList: useCallback(
            (name: string) => {
              setUrlName(urlName?.filter((n) => n !== name))
            },
            [urlName],
          ),
        }}
      >
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
          <button
            className={styles['editable']}
            onClick={() => {
              setEditable((e) => !e)
            }}
          >
            <RIcon>
              <SettingOutlined />
            </RIcon>
          </button>

          <GridLayout
            className="layout"
            layout={urlName!.map((name) => ({
              i: name,
              x: 4,
              y: 0,
              w: 1,
              h: 2,
            }))}
            cols={12}
            rowHeight={30}
            width={1200}
          >
            {urlName!
              .map((name) => UrlListMap.get(name)!)
              .map((item, i) => (
                <Icon
                  key={i}
                  icon={item.icon}
                  name={item.name}
                  backgroundColor={item.backgroundColor}
                  url={item.url}
                  isEdit={editable}
                />
              ))}
          </GridLayout>
        </div>
      </HomePageContext.Provider>
    </SearchLayout>
  )
}
