import React, {useRef, useEffect} from 'react'
import thumbIcon from './thumb-icon.svg';
import {View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro';

const classPrefix = `adm-slider`

const useDrag = (callback) => {
  useEffect(() => {
    const miniNode = Taro.createSelectorQuery().select('page');
    console.log(miniNode.addEventListener);
  }, []);
  return () => {
    return {
      onTouchStart: (e) => {
        console.log(e);
      }
    };
  };
};

const Thumb = props => {
  const {value, min, max, disabled, icon, onDrag} = props
  const prevValue = useRef(value)

  const currentPosition = () => {
    return {
      left: `${((value - min) / (max - min)) * 100}%`, right: 'auto',
    }
  }

  const bind = useDrag(state => {
    if (disabled) return
    if (state.first) {
      prevValue.current = value
    }
    const x = state.xy[0] - state.initial[0]
    const sliderOffsetWith = props.trackRef.current?.offsetWidth
    if (!sliderOffsetWith) return
    const diff = (x / Math.ceil(sliderOffsetWith)) * (max - min)
    onDrag(prevValue.current + diff, state.first, state.last)
  })

  return (<View
    className={`${classPrefix}-thumb-container`}
    style={currentPosition()}
    {...bind()}
  >
    <View className={`${classPrefix}-thumb`}>
      {icon ? icon : <View className={`${classPrefix}-thumb-icon`}><Image src={thumbIcon} className="svg"/></View>}
    </View>
  </View>)
}

export default Thumb
