import classnames from 'classnames'
import React from 'react'
import { Slider as TaroSlider } from '@tarojs/components'

const Slider = (props)=>{
  return <TaroSlider {...props} backgroundColor="var(--adm-color-box)" activeColor="var(--adm-color-primary)"/>
}

export default Slider;
