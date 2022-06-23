import React from 'react'
import withNativeProps from '../../utils/native-props'
import rightOutline from './right-outline.svg';
import classNames from 'classnames'
import isNodeWithContent from '../../utils/is-node-with-content'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-list-item`

const ListItem = props => {
  const clickable = props.clickable ?? !!props.onClick
  const arrow = props.arrow === undefined ? clickable : props.arrow

  const content = (
    <View className={`${classPrefix}-content`}>
      {isNodeWithContent(props.prefix) && (
        <View className={`${classPrefix}-content-prefix`}>{props.prefix}</View>
      )}
      <View className={`${classPrefix}-content-main`}>
        {isNodeWithContent(props.title) && (
          <View className={`${classPrefix}-title`}>{props.title}</View>
        )}
        {props.children}
        {isNodeWithContent(props.description) && (
          <View className={`${classPrefix}-description`}>
            {props.description}
          </View>
        )}
      </View>
      {isNodeWithContent(props.extra) && (
        <View className={`${classPrefix}-content-extra`}>{props.extra}</View>
      )}
      {isNodeWithContent(arrow) && (
        <View className={`${classPrefix}-content-arrow`}>
          {arrow === true ? <Image src={rightOutline}/> : arrow}
        </View>
      )}
    </View>
  )

  return withNativeProps(
    props,
    <View className={classNames(
      `${classPrefix}`,
      clickable ? ['adm-plain-anchor'] : [],
      props.disabled && `${classPrefix}-disabled`
    )} onClick={props.disabled ? undefined : props.onClick}>{content}</View>
  )
}

export default ListItem;
