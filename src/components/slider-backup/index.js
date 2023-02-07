import './slider.less';
import React, {useMemo, useRef} from 'react'
import withNativeProps from '../../utils/native-props'
import classNames from 'classnames'
import Ticks from './ticks'
import Marks from './marks'
import getMiniDecimal, {toFixed} from '@rc-component/mini-decimal'
import Thumb from './thumb'
import mergeProps from '../../utils/with-default-props'
import {nearest} from '../../utils/nearest'
import {View} from '@tarojs/components'
import Taro from '@tarojs/taro';
import {usePropsValue} from '../../utils/use-props-value'

const classPrefix = `adm-slider`

const defaultProps = {
  min: 0, max: 100, step: 1, ticks: false, range: false, disabled: false, popover: false, residentPopover: false,
}

const Slider = p => {
  const props = mergeProps(defaultProps, p)
  const {min, max, disabled, marks, ticks, step, icon} = props

  function sortValue(val) {
    return val.sort((a, b) => a - b)
  }

  function convertValue(value) {
    return (props.range ? value : [props.min, value])
  }

  function alignValue(value, decimalLen) {
    const decimal = getMiniDecimal(value)
    const fixedStr = toFixed(decimal.toString(), '.', decimalLen)

    return getMiniDecimal(fixedStr).toNumber()
  }

  function reverseValue(value) {
    const mergedDecimalLen = Math.max(getDecimalLen(step), getDecimalLen(value[0]), getDecimalLen(value[1]))
    return props.range ? (value.map(v => alignValue(v, mergedDecimalLen))) : alignValue(value[1], mergedDecimalLen)
  }

  function getDecimalLen(n) {
    return (`${n}`.split('.')[1] || '').length
  }

  function onAfterChange(value) {
    props.onAfterChange?.(reverseValue(value))
  }

  let propsValue = props.value
  if (props.range && typeof props.value === 'number') {
    console.warn('Slider', 'When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]')
    propsValue = [0, props.value]
  }
  const [rawValue, setRawValue] = usePropsValue({
    value: propsValue, defaultValue: props.defaultValue ?? (props.range ? [min, min] : min), onChange: props.onChange,
  })

  const sliderValue = sortValue(convertValue(rawValue))

  function setSliderValue(value) {
    const next = sortValue(value)
    const current = sliderValue
    if (next[0] === current[0] && next[1] === current[1]) return
    setRawValue(reverseValue(next))
  }

  const trackRef = useRef(null)

  const fillSize = `${(100 * (sliderValue[1] - sliderValue[0])) / (max - min)}%`
  const fillStart = `${(100 * (sliderValue[0] - min)) / (max - min)}%`

  // 计算要显示的点
  const pointList = useMemo(() => {
    if (marks) {
      return Object.keys(marks)
        .map(parseFloat)
        .sort((a, b) => a - b)
    } else {
      const points = []
      for (let i = getMiniDecimal(min); i.lessEquals(getMiniDecimal(max)); i = i.add(step)) {
        points.push(i.toNumber())
      }
      return points
    }
  }, [marks, ticks, step, min, max])

  function getValueByPosition(position) {
    const newPosition = position < min ? min : position > max ? max : position

    let value = min

    // 显示了刻度点，就只能移动到点上
    if (pointList.length) {
      value = nearest(pointList, newPosition)
    } else {
      const lengthPerStep = 100 / ((max - min) / step)
      const steps = Math.round(newPosition / lengthPerStep)
      value = steps * lengthPerStep * (max - min) * 0.01 + min
    }
    return value
  }

  const dragLockRef = useRef(0)

  const onTrackClick = async (event) => {
    if (dragLockRef.current > 0) return
    event.stopPropagation()
    if (disabled) return
    const track = trackRef.current
    if (!track) return
    const miniNode = Taro.createSelectorQuery().select(`#${track.uid}`);
    const rect = await new Promise((resolve) => {
      miniNode.boundingClientRect(resolve).exec();
    });

    const size = await new Promise((resolve) => {
      miniNode.fields({
        size: true
      }, resolve).exec();
    });

    if (!rect || !size) {
      return;
    }

    const sliderOffsetLeft = rect.left
    const position = ((event.detail.x - sliderOffsetLeft) / Math.ceil(size.width)) * (max - min) + min

    const targetValue = getValueByPosition(position)
    let nextSliderValue
    if (props.range) {
      // 移动的滑块采用就近原则
      if (Math.abs(targetValue - sliderValue[0]) > Math.abs(targetValue - sliderValue[1])) {
        nextSliderValue = [sliderValue[0], targetValue]
      } else {
        nextSliderValue = [targetValue, sliderValue[1]]
      }
    } else {
      nextSliderValue = [props.min, targetValue]
    }
    setSliderValue(nextSliderValue)
    onAfterChange(nextSliderValue)
  }

  const valueBeforeDragRef = useRef()

  const renderThumb = (index) => {
    return (<Thumb
      key={index}
      value={sliderValue[index]}
      min={min}
      max={max}
      disabled={disabled}
      trackRef={trackRef}
      icon={icon}
      onDrag={(position, first, last) => {
        if (first) {
          dragLockRef.current += 1
          valueBeforeDragRef.current = sliderValue
        }
        const val = getValueByPosition(position)
        const valueBeforeDrag = valueBeforeDragRef.current
        if (!valueBeforeDrag) return
        const next = [...valueBeforeDrag]
        next[index] = val
        setSliderValue(next)
        if (last) {
          onAfterChange(next)
          window.setTimeout(() => {
            dragLockRef.current -= 1
          }, 100)
        }
      }}
      aria-label={props['aria-label']}
    />)
  }

  return withNativeProps(props, <View
    className={classNames(classPrefix, {
      [`${classPrefix}-disabled`]: disabled,
    })}
  >
    <View className={`${classPrefix}-track-container`} onClick={onTrackClick}>
      <View
        className={`${classPrefix}-track`}
        onClick={onTrackClick}
        ref={trackRef}
      >
        <View
          className={`${classPrefix}-fill`}
          style={{
            width: fillSize, left: fillStart,
          }}
        />
        {props.ticks && (<Ticks
          points={pointList}
          min={min}
          max={max}
          lowerBound={sliderValue[0]}
          upperBound={sliderValue[1]}
        />)}
        {props.range && renderThumb(0)}
        {renderThumb(1)}
      </View>
    </View>
    {marks && (<Marks
      min={min}
      max={max}
      marks={marks}
      lowerBound={sliderValue[0]}
      upperBound={sliderValue[1]}
    />)}
  </View>)
}

export default Slider;
