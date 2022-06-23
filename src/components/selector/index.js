import './selector.less'
import classNames from 'classnames'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import Space from '../space'
import Grid from '../grid'
import {usePropsValue} from '../../utils/use-props-value'
import checkMark from './check-mark.svg'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-selector`

const defaultProps = {
  multiple: false,
  defaultValue: [],
  showCheckMark: true,
}

const Selector = (p) => {
  const props = mergeProps(defaultProps, p)
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: val => {
      const extend = {
        get items() {
          return props.options.filter(option => val.includes(option.value))
        },
      }
      props.onChange?.(val, extend)
    },
  })

  const items = props.options.map(option => {
    const active = (value || []).includes(option.value)
    const disabled = option.disabled || props.disabled
    const itemCls = classNames(`${classPrefix}-item`, {
      [`${classPrefix}-item-active`]: active && !props.multiple,
      [`${classPrefix}-item-multiple-active`]: active && props.multiple,
      [`${classPrefix}-item-disabled`]: disabled,
    })

    return (
      <View
        key={option.value}
        className={itemCls}
        onClick={() => {
          if (disabled) {
            return
          }
          if (props.multiple) {
            const val = active
              ? value.filter(v => v !== option.value)
              : [...value, option.value]
            setValue(val)
          } else {
            const val = active ? [] : [option.value]
            setValue(val)
          }
        }}
      >
        {option.label}
        {option.description && (
          <View className={`${classPrefix}-item-description`}>
            {option.description}
          </View>
        )}
        {active && props.showCheckMark && (
          <View className={`${classPrefix}-check-mark-wrapper`}>
            <Image src={checkMark}/>
          </View>
        )}
      </View>
    )
  })

  return withNativeProps(
    props,
    <View className={classPrefix}>
      {!props.columns && <Space wrap>{items}</Space>}
      {props.columns && (
        <Grid columns={props.columns} gap={16}>
          {items}
        </Grid>
      )}
    </View>
  )
}

export default Selector;
