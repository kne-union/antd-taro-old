import { useMemo } from 'react';

export function withCache(generate) {
  let cache;
  return () => {
    if (cache === null) {
      cache = generate()
    }
    return cache
  }
}


export function generateColumnsExtend(
  rawColumns,
  val
) {
  const columns = withCache(() => {
    const c = typeof rawColumns === 'function' ? rawColumns(val) : rawColumns
    return c.map(column =>
      column.map(item =>
        typeof item === 'string'
          ? {
            label: item,
            value: item,
          }
          : item
      )
    )
  })
  const items = withCache(() => {
    return val.map((v, index) => {
      const column = columns()[index]
      if (!column) return null
      return column.find(item => item.value === v) ?? null
    })
  })
  const extend = {
    get columns() {
      return columns()
    },
    get items() {
      return items()
    },
  }
  return extend
}

export function useColumnsExtend(
  rawColumns,
  value
) {
  return useMemo(
    () => generateColumnsExtend(rawColumns, value),
    [rawColumns, value]
  )
}
