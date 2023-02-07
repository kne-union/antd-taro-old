import React, {FC} from 'react'
import classNames from 'classnames'
import {View} from '@tarojs/components'

const classPrefix = `adm-slider`

const Ticks = ({
                 points, max, min, upperBound, lowerBound,
               }) => {
  const range = max - min
  const elements = points.map(point => {
    const offset = `${(Math.abs(point - min) / range) * 100}%`

    const isActived = point <= upperBound && point >= lowerBound
    const style = {left: offset, display: 'inline'}

    const pointClassName = classNames({
      [`${classPrefix}-tick`]: true, [`${classPrefix}-tick-active`]: isActived,
    })

    return <View className={pointClassName} style={style} key={point}/>
  })

  return <View className={`${classPrefix}-ticks`}>{elements}</View>
}

export default Ticks
