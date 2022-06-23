import './tag.less'
import React from 'react'
import mergeProps from '../../utils/with-default-props'
import withNativeProps from '../../utils/native-props'
import classNames from 'classnames'
import {View} from '@tarojs/components'

const classPrefix = `adm-tag`

const colorRecord = {
  default: '#666666',
  primary: 'var(--adm-color-primary, #1677ff)',
  success: 'var(--adm-color-success, #00b578)',
  warning: 'var(--adm-color-warning, #ff8f1f)',
  danger: 'var(--adm-color-danger, #ff3141)',
}

const defaultProps = {
  color: 'default',
  fill: 'solid',
  round: false,
}

const Tag = p => {
  const props = mergeProps(defaultProps, p)
  const color = colorRecord[props.color] ? colorRecord[props.color] : props.color

  const style = {
    'borderColor': color,
    'color': props.fill === 'outline' ? color : '#ffffff',
    'backgroundColor': props.fill === 'outline' ? 'transparent' : color,
  }
  return withNativeProps(
    props,
    <View
      style={style}
      onClick={props.onClick}
      className={classNames(classPrefix, {
        [`${classPrefix}-round`]: props.round,
      })}
    >
      {props.children}
    </View>
  )
}

export default Tag
