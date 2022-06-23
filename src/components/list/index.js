import './list.less';
import React from 'react'
import classNames from 'classnames'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import {View} from '@tarojs/components'
import ListItem from './list-item';

const classPrefix = `adm-list`

const defaultProps = {
  mode: 'default',
}

const List = p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <View className={classNames(classPrefix, `${classPrefix}-${props.mode}`)}>
      {props.header && (
        <View className={`${classPrefix}-header`}>{props.header}</View>
      )}
      <View className={`${classPrefix}-body`}>
        <View className={`${classPrefix}-body-inner`}>{props.children}</View>
      </View>
    </View>
  )
}

List.Item = ListItem;

export default List;
