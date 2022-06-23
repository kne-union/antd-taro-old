import {useRef} from 'react'
import {useMemoizedFn, useUpdate} from 'ahooks'

export function usePropsValue(options) {
  const {value, defaultValue, onChange} = options

  const update = useUpdate()

  const stateRef = useRef(value !== undefined ? value : defaultValue)
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useMemoizedFn((v) => {
    const nextValue = typeof v === 'function' ? v(stateRef.current) : v
    stateRef.current = nextValue
    update()
    onChange && onChange(nextValue)
  })
  return [stateRef.current, setState];
}
