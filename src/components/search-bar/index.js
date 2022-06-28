import './search-bar.less'
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import Input from '../input'
import Button from '../button'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import searchOutline from './searchOutline.svg'
import {usePropsValue} from '../../utils/use-props-value'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-search-bar`

const defaultProps = {
  clearable: true,
  onlyShowClearWhenFocus: false,
  showCancelButton: false,
  defaultValue: '',
  autoFocus: false,
  clearOnCancel: true,
  icon: <Image src={searchOutline}/>,
}

const SearchBar = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps, {cancelText: '取消'}, p)
  const [value, setValue] = usePropsValue(props)
  const [hasFocus, setHasFocus] = useState(false)
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    get value() {
      return value
    },
    set value(value) {
      setValue(value);
    },
    clear: () => inputRef.current && inputRef.current.clear(),
    focus: () => inputRef.current && inputRef.current.focus(),
    blur: () => inputRef.current && inputRef.current.blur()
  }))

  const renderCancelButton = () => {
    let isShowCancel;

    if (typeof props.showCancelButton === 'function') {
      isShowCancel = props.showCancelButton(hasFocus, value)
    } else {
      isShowCancel = props.showCancelButton && hasFocus
    }

    return (
      isShowCancel && (
        <View className={`${classPrefix}-suffix`}>
          <Button
            fill='none'
            className={`${classPrefix}-cancel-button`}
            onClick={() => {
              if (props.clearOnCancel) {
                inputRef.current && inputRef.current.clear()
              }
              inputRef.current && inputRef.current.blur()
              props.onCancel && props.onCancel()
            }}
            hoverStopPropagation
          >
            {props.cancelText}
          </Button>
        </View>
      )
    )
  }

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}-active`]: hasFocus,
      })}
    >
      <View className={`${classPrefix}-input-box`}>
        {props.icon && (
          <View className={`${classPrefix}-input-box-icon`}>{props.icon}</View>
        )}
        <Input
          ref={inputRef}
          className={classNames(`${classPrefix}-input`, {
            [`${classPrefix}-input-without-icon`]: !props.icon,
          })}
          value={value}
          onChange={setValue}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          clearable={props.clearable}
          onlyShowClearWhenFocus={props.onlyShowClearWhenFocus}
          autoFocus={props.autoFocus}
          onFocus={e => {
            setHasFocus(true)
            props.onFocus && props.onFocus(e)
          }}
          onBlur={e => {
            setHasFocus(false)
            props.onBlur?.(e)
          }}
          onClear={props.onClear}
          type='search'
          confirmType='search'
          onConfirm={() => {
            inputRef.current && inputRef.current.blur()
            props.onSearch && props.onSearch(value)
          }}
        />
      </View>
      {renderCancelButton()}
    </View>
  )
})

export default SearchBar;
