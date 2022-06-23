import './result.less'
import React from 'react'
import classNames from 'classnames'
import checkCircleFill from './checkCircleFill.svg';
import closeCircleFill from './closeCircleFill.svg';
import informationCircleFill from './informationCircleFill.svg';
import clockCircleFill from './clockCircleFill.svg';
import exclamationCircleFill from './exclamationCircleFill.svg';
import withNativeProps from '../../utils/native-props'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-result`

const iconRecord = {
  success: checkCircleFill,
  error: closeCircleFill,
  info: informationCircleFill,
  waiting: clockCircleFill,
  warning: exclamationCircleFill,
}

const Result = props => {
  const {status, title, description, icon} = props
  if (!status) return null
  const resultIcon = icon || <Image src={iconRecord[status]}/>

  return withNativeProps(
    props,
    <View className={classNames(classPrefix, `${classPrefix}-${status}`)}>
      <View className={`${classPrefix}-icon`}>{resultIcon}</View>
      <View className={`${classPrefix}-title`}>{title}</View>
      {description ? (
        <View className={`${classPrefix}-description`}>{description}</View>
      ) : null}
    </View>
  )
}

export default Result;
