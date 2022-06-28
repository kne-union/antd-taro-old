import './grid.less';
import mergeProps from '../../utils/with-default-props'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import toCSSLength from '../../utils/to-css-length'
import {View} from '@tarojs/components'

const classPrefix = `adm-grid`

const Grid = props => {
  const style = {
    '--columns': props.columns.toString(),
  }
  const {gap} = props
  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0])
      style['--gap-vertical'] = toCSSLength(gap[1])
    } else {
      style['--gap'] = toCSSLength(gap)
    }
  }

  return withNativeProps(
    props,
    <View className={classPrefix} style={style}>
      {props.children}
    </View>
  )
}

const GridItem = p => {
  const props = mergeProps({span: 1}, p)

  const itemStyle = {
    '--item-span': props.span.toString(),
  }
  return withNativeProps(
    props,
    <View
      className={`${classPrefix}-item`}
      style={itemStyle}
      onClick={props.onClick}
    >
      {props.children}
    </View>
  )
}

Grid.Item = GridItem;

export default Grid;
