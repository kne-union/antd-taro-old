import './badge.less'
import classNames from 'classnames'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import {View} from "@tarojs/components"

const classPrefix = `adm-badge`

const dot = <React.Fragment/>

const Badge = props => {
  const {content, color, children} = props

  const isDot = content === dot

  const badgeCls = classNames(
    classPrefix,
    !!children && `${classPrefix}-fixed`,
    isDot && `${classPrefix}-dot`,
    props.bordered && `${classPrefix}-bordered`
  )

  const element =
    content || content === 0
      ? withNativeProps(
        props,
        <View className={badgeCls} style={{
          'backgroundColor': color
        }}>
          {!isDot && (
            <View className={`${classPrefix}-content`}>{content}</View>
          )}
        </View>
      )
      : null
  return children ? (
    <View className={classNames(`${classPrefix}-wrapper`, props.wrapperClassName)} style={props.wrapperStyle}>
      {children}
      {element}
    </View>
  ) : (
    element
  )
}

Badge.dot = dot

export default Badge
