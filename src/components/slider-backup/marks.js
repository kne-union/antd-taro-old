import React from 'react'
import classNames from 'classnames'
import {View} from '@tarojs/components'

const classPrefix = `adm-slider-mark`

const Marks = ({marks, upperBound, lowerBound, max, min}) => {
  const marksKeys = Object.keys(marks)

  const range = max - min
  const elements = marksKeys
    .map(parseFloat)
    .sort((a, b) => a - b)
    .filter(point => point >= min && point <= max)
    .map(point => {
      const markPoint = marks[point]
      if (!markPoint && markPoint !== 0) {
        return null
      }

      const isActive = point <= upperBound && point >= lowerBound
      const markClassName = classNames({
        [`${classPrefix}-text`]: true,
        [`${classPrefix}-text-active`]: isActive,
      })

      const style = {
        display: 'inline',
        left: `${((point - min) / range) * 100}%`,
      }
      return (
        <View className={markClassName} style={style} key={point}>
          {markPoint}
        </View>
      )
    })

  return <View className={classPrefix}>{elements}</View>
}

export default Marks
