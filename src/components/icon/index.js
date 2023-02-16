import './style.less'
import React from 'react'
import {View} from '@tarojs/components'
import classnames from 'classnames'

const classPrefix = 'adm-icon';

const Icon = ({className, type, size, color}) => {
  return <View className={classnames(classPrefix, className, `icon-${type}`)} style={{
    '--size': size, '--color': color
  }}/>
};

Icon.defaultProps = {
  size: '24px', color: 'var(--adm-color-primary)'
};

export default Icon;
