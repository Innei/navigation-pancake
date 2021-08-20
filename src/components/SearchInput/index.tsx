import React, { FC, useState } from 'react'
import { Icon } from '@ricons/utils'
import IosSearch from '@ricons/ionicons4/IosSearch'
import styles from './index.module.css'
export enum SearchEngine {
  Google,
  Bing,
}

export const SearchInput: FC = (props) => {
  const [value, setValue] = useState('')
  const [engine, setEngine] = useState<SearchEngine>(SearchEngine.Google)
  const renderPrefixIcon = () => {
    switch (engine) {
      case SearchEngine.Bing: {
        return <i className="iconfont icon-bing"></i>
      }
      case SearchEngine.Google: {
        return <i className="iconfont icon-google"></i>
      }
    }
  }

  const getSearchUrl = (keyword: string) => {
    switch (engine) {
      case SearchEngine.Bing: {
      }
      case SearchEngine.Google: {
        return `https://google.com/?q=${keyword}`
      }
    }
  }
  const openSearch = () => {
    const $a = document.createElement('a')
    $a.href = getSearchUrl(value)
    $a.target = '_blank'
    $a.click()
    $a.remove()
  }
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = e.keyCode
    if (keycode === 13 || e.key === 'Enter') {
      openSearch()
    }
  }

  return (
    <div className={styles['input-bar-wrap']}>
      <div className={styles['prefix-icon']}>{renderPrefixIcon()}</div>

      <input
        type={'text'}
        placeholder={'搜索...'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles['input-bar']}
        onKeyDown={handleSearch}
      />
      <div
        className={styles['search-icon']}
        onClick={() => {
          openSearch()
        }}
      >
        <Icon>
          <IosSearch />
        </Icon>
      </div>
    </div>
  )
}
