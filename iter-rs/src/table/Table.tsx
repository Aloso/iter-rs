import React, { ReactNode } from 'react'
import { cls } from '../util'
import * as s from './Table.module.scss'

interface Schema<K extends string> {
  name: K
  align?: 'start' | 'center' | 'end'
  transform?(s: ReactNode): ReactNode
}

interface Args<D extends Record<string, ReactNode>, K extends keyof D, G extends keyof D> {
  schema: Schema<keyof D & string>[]
  groups: G[]
  data: D[]
  keyColumn: K
}

export default function Table<
  D extends Record<string, ReactNode> & { [keyColumn in K]: string },
  K extends keyof D,
  G extends keyof D & string
>({ schema, groups, data, keyColumn }: Args<D, K, G>) {
  const groupData = {} as Record<string, number[]>

  for (const groupCol of groups) {
    const arr = [] as number[]
    let curGroup = null as null | D[G]

    data.forEach((val, i) => {
      if (val[groupCol] !== curGroup) {
        arr.push(i)
        curGroup = val[groupCol]
      }
    })

    if (curGroup != null) {
      groupData[groupCol] = arr
    }
  }

  return (
    <table className={s.table}>
      <thead>
        <tr>
          {schema.map((column) => (
            <th key={column.name} className={s[column.align ?? 'start']}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((entry, i) => (
          <tr key={entry[keyColumn]}>
            {schema.map((col) => {
              if (col.name in groupData) {
                const colData = groupData[col.name]
                const idx = colData.indexOf(i)
                if (idx !== -1) {
                  const rowSpan = (colData[idx + 1] ?? data.length) - colData[idx]
                  return (
                    <td key={col.name} className={cls(s, col.align, 'rowspan')} rowSpan={rowSpan}>
                      {col.transform ? col.transform(entry[col.name]) : entry[col.name]}
                    </td>
                  )
                } else {
                  return <></>
                }
              }
              return (
                <td key={col.name} className={s[col.align ?? 'start']}>
                  {col.transform ? col.transform(entry[col.name]) : entry[col.name]}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
