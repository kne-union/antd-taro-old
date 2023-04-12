import './text-area.less'
import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import withNativeProps from '../../utils/native-props'
import {usePropsValue} from '../../utils/use-props-value'
import mergeProps from '../../utils/with-default-props'
import {View, Textarea} from '@tarojs/components'

const classPrefix = 'adm-text-area'

const defaultProps = {
  showCount: true, autoSize: true, defaultValue: '', maxLength: 100,
}

const TextArea = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const {showCount, maxLength} = props
  const [value, setValue] = usePropsValue({
    ...props, value: props.value === null ? '' : props.value,
  })
  const nativeTextAreaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    get value() {
      return value
    }, set value(value) {
      setValue(value);
    }, clear: () => {
      setValue('')
    }, focus: () => {
      nativeTextAreaRef.current && nativeTextAreaRef.current.focus()
    }, blur: () => {
      nativeTextAreaRef.current && nativeTextAreaRef.current.blur()
    }
  }))

  let count
  const valueLength = value ? value.length : 0
  if (typeof showCount === 'function') {
    count = showCount(valueLength, maxLength)
  } else if (showCount) {
    count = (<View className={`${classPrefix}-count`}>
      {maxLength === undefined ? valueLength : valueLength + '/' + maxLength}
    </View>)
  }

  return withNativeProps(props, <View className={classPrefix}>
    <Textarea
      controlled
      ref={nativeTextAreaRef}
      className={`${classPrefix}-element`}
      value={value}
      onInput={(e) => {
        setValue(e.detail.value);
      }}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      id={props.id}
      placeholder={props.placeholder}
      placeholderStyle={props.placeholderStyle}
      placeholderClass={props.placeholderClass}
      placeholderTextColor={props.placeholderTextColor}
      disabled={props.disabled}
      maxlength={props.maxLength}
      focus={props.focus}
      cursor={props.cursor}
      autoHeight={true}
      fixed={props.fixed}
      cursorSpacing={props.cursorSpacing}
      selectionStart={props.selectionStart}
      selectionEnd={props.selectionEnd}
      showConfirmBar={props.showConfirmBar}
      adjustPosition={props.adjustPosition}
      holdKeyboard={props.holdKeyboard}
      nativeProps={props.nativeProps}
      confirmType={props.confirmType}
      confirmHold={props.confirmHold}
      onConfirm={props.onConfirm}
      onLineChange={props.onLineChange}
      onKeyboardHeightChange={props.onKeyboardHeightChange}
    />
    {count}
  </View>)
})

TextArea.defaultProps = defaultProps

export default TextArea;
