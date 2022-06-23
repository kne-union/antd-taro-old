import './avatar.less'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import fallback from './fallback.svg'
import {Image} from '@tarojs/components'

const classPrefix = 'adm-avatar'

const defaultProps = {}

const Avatar = p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <Image
      className={classPrefix}
      src={props.src || fallback}
      alt={props.alt}
      onClick={props.onClick}
      onError={props.onError}
    />
  )
}

export default Avatar;
