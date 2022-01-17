import React, { ReactNode, useMemo } from 'react'
import { cls } from '../util'
import * as s from './Code.module.scss'

interface Args {
  children: string
  pre?: boolean
  block?: boolean
}

export default function Code({ children, pre, block }: Args) {
  const parsed = useMemo(() => parseRust(children), [children])

  return <code className={cls(s, pre && 'pre', block && 'block')}>{parsed}</code>
}

function parseRust(code: string) {
  const matches = code.matchAll(
    /(\/\/.*)|(\/\*.*?\*\/)|("(?:[^"\\]|\\.)*")|('.')|('[\w\d]+)|(#\[.*?\])|([+\-*/><=%~|&!@.:,;()[\]{}]+)|\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|box|macro|yield|union)\b|(\d[\d_]*(?:\.[\d_]+)?(?:[ui](?:8|16|32|64|128)|f32|f64)?)|([\w\d]+(?=\())|\b(bool|i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|isize|usize|f32|f64|str|char|Option|Result|Box|Ordering)\b/g
  )
  const result = [] as ReactNode[]

  const classes = ['', s.lc, s.bc, s.str, s.char, s.lt, s.attr, s.punct, s.kw, s.num, s.fn, s.ty]

  let i = 0
  for (const match of matches) {
    result.push(code.substring(i, match.index))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    i = match.index! + match[0].length

    let matchClass = 1
    while (match[matchClass] == null) matchClass++

    result.push(
      <i key={i} className={`${classes[matchClass]} ${s.c}`}>
        {match[0]}
      </i>
    )
  }

  result.push(code.substring(i))

  return result
}
