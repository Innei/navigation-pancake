import React, { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@ricons/utils'
import IosSearch from '@ricons/ionicons4/IosSearch'
import styles from './index.module.css'
import { clsx } from '../../utils/clsx'
import { useLocalStorage } from 'react-use'
export enum SearchEngine {
  Google = 'Google',
  Bing = 'Bing',
  '360Search' = '360',
  Baidu = '百度',
  DuckDuckGo = 'DuckDuckGo',
}
const STORAGE_PREFIX_KEY = 'pancake-'
export const SearchInput: FC = (props) => {
  const [value, setValue] = useState('')

  const [engine, setEngine] = useLocalStorage(
    STORAGE_PREFIX_KEY + 'engine',
    SearchEngine.Google,
  )
  const renderPrefixIcon = () => {
    switch (engine as SearchEngine) {
      case SearchEngine.Bing: {
        return <i className="iconfont icon-bing"></i>
      }
      case SearchEngine.Google: {
        return <i className="iconfont icon-google"></i>
      }
      case SearchEngine.Baidu: {
        return <i className="iconfont icon-baidu" />
      }
      case SearchEngine.DuckDuckGo: {
        return <i className="iconfont icon-duckduckgo" />
      }
      case SearchEngine['360Search']: {
        return <i className="iconfont icon-360so" />
      }
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!inputRef.current) {
        return
      }
      const $ = e.target as HTMLElement
      const $active = document.activeElement
      if (
        $active &&
        (['INPUT', 'TEXTAREA'].includes($active.tagName) ||
          $active.getAttribute('contenteditable'))
      ) {
        if (e.key === 'Escape' && $active === $) {
          $.blur()
        }
        return
      }

      inputRef.current.focus()
      e.preventDefault()
    }
    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const getSearchUrl = (keyword: string) => {
    switch (engine as SearchEngine) {
      case SearchEngine.Bing: {
        return `https://cn.bing.com/search?q=${keyword}`
      }
      case SearchEngine.Google: {
        return `https://google.com/?q=${keyword}`
      }
      case SearchEngine['360Search']: {
        return `https://www.so.com/s?q=${keyword}`
      }
      case SearchEngine.DuckDuckGo: {
        return `https://duckduckgo.com/?q=${keyword}`
      }
      case SearchEngine.Baidu: {
        return `https://www.baidu.com/s?wd=${keyword}`
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

  const [selectorOpen, setSelectorOpen] = useState(false)

  return (
    <div className={styles['input-bar-wrap']}>
      <button
        className={styles['prefix-icon']}
        onClick={() => {
          setSelectorOpen((o) => !o)
        }}
      >
        {renderPrefixIcon()}
      </button>
      <div
        className={clsx(styles['selector'], selectorOpen && styles['active'])}
      >
        {/* @ts-ignore */}
        {Object.keys(SearchEngine).map((key: keyof typeof SearchEngine) => {
          return (
            <div
              className={styles['item']}
              key={key}
              onClick={() => {
                setEngine(SearchEngine[key])
                setSelectorOpen(false)
              }}
            >
              {SearchEngine[key]}
            </div>
          )
        })}
      </div>
      <input
        ref={inputRef}
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
