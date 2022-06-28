import './input.less'
import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react'
import {usePropsValue} from '../../utils/use-props-value'
import closeCircleFill from './closeCircleFill.svg'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import classNames from 'classnames'
import bound from '../../utils/bound'
import {View, Input, Image} from '@tarojs/components'

const classPrefix = `adm-input`

const defaultProps = {
  defaultValue: '',
  onlyShowClearWhenFocus: true,
}

export default forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const [value, setValue] = usePropsValue(props)
  const [hasFocus, setHasFocus] = useState(false)
  const nativeInputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    get value() {
      return value
    },
    set value(value) {
      setValue(value);
    },
    clear: () => {
      setValue('')
    },
    focus: () => {
      nativeInputRef.current && nativeInputRef.current.focus()
    },
    blur: () => {
      nativeInputRef.current && nativeInputRef.current.blur()
    }
  }))

  const shouldShowClear = (() => {
    if (!props.clearable || !value || props.readOnly) return false
    if (props.onlyShowClearWhenFocus) {
      return hasFocus
    } else {
      return true
    }
  })()

  return withNativeProps(
    props,
    <View
      className={classNames(
        `${classPrefix}`,
        props.disabled && `${classPrefix}-disabled`
      )}
    >
      <Input
        controlled
        ref={nativeInputRef}
        className={`${classPrefix}-element`}
        value={value}
        onInput={(e) => {
          setValue(e.detail.value);
        }}
        onFocus={e => {
          setHasFocus(true)
          props.onFocus && props.onFocus(e)
        }}
        onBlur={e => {
          setHasFocus(false)
          props.onBlur && props.onBlur(e)
        }}
        id={props.id}
        placeholder={props.placeholder}
        placeholderStyle={props.placeholderStyle}
        placeholderClass={props.placeholderClass}
        placeholderTextColor={props.placeholderTextColor}
        password={props.password}
        cursorSpacing={props.cursorSpacing}
        disabled={props.disabled}
        maxLength={props.maxLength}
        focus={props.focus}
        cursor={props.cursor}
        selectionStart={props.selectionStart}
        selectionEnd={props.selectionEnd}
        adjustPosition={props.adjustPosition}
        holdKeyboard={props.holdKeyboard}
        alwaysEmbed={props.alwaysEmbed}
        safePasswordCertPath={props.safePasswordCertPath}
        safePasswordLength={props.safePasswordLength}
        safePasswordTimeStamp={props.safePasswordTimeStamp}
        safePasswordNonce={props.safePasswordNonce}
        safePasswordSalt={props.safePasswordSalt}
        safePasswordCustomHash={props.safePasswordCustomHash}
        randomNumber={props.randomNumber}
        onKeyboardHeightChange={props.onKeyboardHeightChange}
        onConfirm={props.onConfirm}
        confirmType={props.confirmType}
        nativeProps={props.nativeProps}
        type={props.type}
        name={props.name}
        onClick={props.onClick}
      />
      {(
        <View
          className={classNames(`${classPrefix}-clear`, {
            'display': !shouldShowClear
          })}
          hoverStopPropagation
          onClick={(e) => {
            setValue('')
            props.onClear && props.onClear()
          }}
        >
          <Image src={closeCircleFill}/>
        </View>
      )}
    </View>
  )
})
