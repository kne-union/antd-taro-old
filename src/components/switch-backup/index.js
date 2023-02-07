import './switch.less'
import classNames from 'classnames'
import {View} from '@tarojs/components'
import React, {useState} from 'react'
import withNativeProps from '../../utils/native-props'
import {usePropsValue} from '../../utils/use-props-value'
import mergeProps from '../../utils/with-default-props'
import {SpinIcon} from './spin-icon'
import {isPromise} from '../../utils/validate'

const classPrefix = `adm-switch`

const defaultProps = {
  defaultChecked: false,
}

const Switch = p => {
  const props = mergeProps(defaultProps, p)
  const disabled = props.disabled || props.loading || false
  const [changing, setChanging] = useState(false)

  const [checked, setChecked] = usePropsValue({
    value: props.checked, defaultValue: props.defaultChecked, onChange: props.onChange,
  })

  async function onClick() {
    if (disabled || props.loading || changing) {
      return
    }
    const nextChecked = !checked
    if (props.beforeChange) {
      setChanging(true)
      try {
        await props.beforeChange(nextChecked)
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    }
    const result = setChecked(nextChecked)
    if (isPromise(result)) {
      setChanging(true)
      try {
        await result
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    }
  }

  return withNativeProps(props, <View
    onClick={onClick}
    className={classNames(classPrefix, {
      [`${classPrefix}-checked`]: checked, [`${classPrefix}-disabled`]: disabled || changing,
    })}
  >
    <View className={`${classPrefix}-checkbox`}>
      <View className={`${classPrefix}-handle`}>
        {(props.loading || changing) && (<SpinIcon className={`${classPrefix}-spin-icon`}/>)}
      </View>
      <View className={`${classPrefix}-inner`}>
        {checked ? props.checkedText : props.uncheckedText}
      </View>
    </View>
  </View>)
}

export default Switch;
