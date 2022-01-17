import React, { ReactNode } from 'react'
import * as s from './Tabbar.module.scss'
import { cls } from '../util'

interface Args<K extends string> {
  active: K | null
  tabs: TabArgs<K>[]
  onChange(value: K): void
}

interface TabArgs<K extends string> {
  name: K
  disabled?: boolean
  render(): ReactNode
}

export default function TabBar<K extends string>({ active, tabs, onChange }: Args<K>) {
  let activeChild = null as TabArgs<K> | null

  return (
    <div>
      <div className={s.tabbar}>
        {tabs.map((tab) => {
          if (tab.name === active) {
            activeChild = tab
          }
          return (
            <button
              className={cls(s, 'tab', active === tab.name && 'active')}
              key={tab.name}
              disabled={tab.disabled}
              onClick={() => onChange(tab.name)}
            >
              {tab.name}
            </button>
          )
        })}
      </div>
      <div className="tabcontent">{activeChild != null ? activeChild.render() : null}</div>
    </div>
  )
}
