import React, {useContext} from 'react'
import List from '../list'
import withNativeProps from '../../utils/native-props'
import {CheckListContext} from './context'
import classNames from 'classnames'
import {View} from '@tarojs/components'

const classPrefix = `adm-check-list-item`

export const CheckListItem = props => {
  const context = useContext(CheckListContext)
  if (context === null) {
    return null
  }
  const active = context.value.includes(props.value)
  const readOnly = props.readOnly || context.readOnly

  const extra = (
    <View className={`${classPrefix}-extra`}>
      {active ? context.activeIcon : null}
    </View>
  )

  return withNativeProps(
    props,
    <List.Item
      title={props.title}
      className={classNames(
        classPrefix,
        readOnly && `${classPrefix}-readonly`,
        active && `${classPrefix}-active`
      )}
      description={props.description}
      prefix={props.prefix}
      onClick={e => {
        if (readOnly) return
        if (active) {
          context.uncheck(props.value)
        } else {
          context.check(props.value)
        }
        props.onClick?.(e)
      }}
      arrow={false}
      clickable={!readOnly}
      extra={extra}
      disabled={props.disabled || context.disabled}
    >
      {props.children}
    </List.Item>
  )
}
