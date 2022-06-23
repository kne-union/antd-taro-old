import './empty.less'
import React from 'react'
import classNames from 'classnames'
import withNativeProps from '../../utils/native-props'
import emptyIcon from './empty-icon.svg'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-empty`

const Empty = props => {
  function renderImageNode() {
    const {image} = props
    if (image === undefined) {
      return (
        <Image
          className={`${classPrefix}-image`}
          style={props.imageStyle}
          src={emptyIcon}
          alt='empty'
        />
      )
    }
    if (typeof image === 'string') {
      return (
        <Image
          className={`${classPrefix}-image`}
          style={props.imageStyle}
          src={image}
          alt='empty'
        />
      )
    }
    return image
  }

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-image-container`}>
        {renderImageNode()}
      </View>
      {props.description && (
        <View className={classNames(`${classPrefix}-description`)}>
          {props.description}
        </View>
      )}
    </View>
  )
}

export default Empty;
