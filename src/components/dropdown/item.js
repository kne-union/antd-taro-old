import classNames from 'classnames'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import {useShouldRender} from '../../utils/should-render'
import downFill from './down-fill.svg'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-dropdown-item`

const Item = props => {
  const cls = classNames(classPrefix, {
    [`${classPrefix}-active`]: props.active,
    [`${classPrefix}-highlight`]: props.highlight ?? props.active,
  })

  return withNativeProps(
    props,
    <View className={cls} onClick={props.onClick}>
      <View className={`${classPrefix}-title`}>
        <View className={`${classPrefix}-title-text`}>{props.title}</View>
        <View
          className={classNames(`${classPrefix}-title-arrow`, {
            [`${classPrefix}-title-arrow-active`]: props.active,
          })}
        >
          {props.arrow === undefined ? <Image src={downFill}/> : props.arrow}
        </View>
      </View>
    </View>
  )
}

export default Item

export const ItemChildrenWrap = props => {
  const {active = false} = props
  const shouldRender = useShouldRender(
    active,
    props.forceRender,
    props.destroyOnClose
  )
  const cls = classNames(`${classPrefix}-content`, {
    [`${classPrefix}-content-hidden`]: !active,
  })

  return shouldRender ? (
    <div className={cls} onClick={props.onClick}>
      {props.children}
    </div>
  ) : null
}
