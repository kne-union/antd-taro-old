import React, { memo, forwardRef, useState, useRef, useImperativeHandle, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import assign from 'lodash/assign';
import assignWith from 'lodash/assignWith';
import isUndefined from 'lodash/isUndefined';
import { View, Image, PageContainer, Input as Input$1 } from '@tarojs/components';
import loadingWhite from './loading-white.svg';
import emptyIcon from './empty-icon.svg';
import rightOutline from './right-outline.svg';
import { useUnmountedRef, useIsomorphicLayoutEffect, useUpdate, useMemoizedFn, useThrottleFn } from 'ahooks';
import { useSpring, animated } from '@tarojsx/library/dist/react-spring';
import closeOutline from './closeOutline.svg';
import checkCircleFill from './checkCircleFill.svg';
import closeCircleFill from './closeCircleFill.svg';
import informationCircleFill from './informationCircleFill.svg';
import clockCircleFill from './clockCircleFill.svg';
import exclamationCircleFill from './exclamationCircleFill.svg';
import searchOutline from './searchOutline.svg';
import checkMark from './check-mark.svg';
import { isFragment } from 'react-is';
import corner from './corner.svg';
import fallback from './fallback.svg';

const mergeProps = (...items) => {
  const customizer = (objValue, srcValue) => {
    return isUndefined(srcValue) ? objValue : srcValue;
  };

  let ret = assign({}, items[0]);

  for (let i = 1; i < items.length; i++) {
    ret = assignWith(ret, items[i], customizer);
  }

  return ret;
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

const withNativeProps = (props, element) => {
  const p = _extends({}, element.props);

  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }

  if (props.style) {
    p.style = _extends({}, p.style, props.style);
  }

  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }

  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue;

    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }

  return React.cloneElement(element, p);
};

const classPrefix$i = `adm-dot-loading`;
const defaultProps$c = {
  color: 'default'
};
const DotLoading = memo(p => {
  const props = mergeProps(defaultProps$c, p);
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    style: props.hasOwnProperty('color') ? {
      color: props.color
    } : {},
    className: classNames('adm-loading', classPrefix$i)
  }, /*#__PURE__*/React.createElement(Image, {
    className: "adm-dot-loading-image",
    src: loadingWhite
  })));
});

function isPromise(obj) {
  return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
}

const classPrefix$h = `adm-button`;
const defaultProps$b = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  loadingIcon: /*#__PURE__*/React.createElement(DotLoading, null),
  type: 'button',
  shape: 'default',
  size: 'middle'
};
var Button = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$b, p);
  const [innerLoading, setInnerLoading] = useState(false);
  const nativeButtonRef = useRef(null);
  const loading = props.loading === 'auto' ? innerLoading : props.loading;
  const disabled = props.disabled || loading;
  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current;
    }

  }));

  const handleClick = async e => {
    if (!props.onClick) return;
    const promise = props.onClick(e);

    if (isPromise(promise)) {
      try {
        setInnerLoading(true);
        await promise;
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    }
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    ref: nativeButtonRef,
    type: props.type,
    onClick: handleClick,
    className: classNames(classPrefix$h, props.color ? `${classPrefix$h}-${props.color}` : null, {
      [`${classPrefix$h}-block`]: props.block,
      [`${classPrefix$h}-disabled`]: disabled,
      [`${classPrefix$h}-fill-outline`]: props.fill === 'outline',
      [`${classPrefix$h}-fill-none`]: props.fill === 'none',
      [`${classPrefix$h}-mini`]: props.size === 'mini',
      [`${classPrefix$h}-small`]: props.size === 'small',
      [`${classPrefix$h}-large`]: props.size === 'large',
      [`${classPrefix$h}-loading`]: loading
    }, `${classPrefix$h}-shape-${props.shape}`),
    disabled: disabled,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onTouchStart: props.onTouchStart,
    onTouchEnd: props.onTouchEnd
  }, loading ? /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$h}-loading-wrapper`
  }, props.loadingIcon, props.loadingText) : props.children));
});

const classPrefix$g = `adm-space`;
const defaultProps$a = {
  direction: 'horizontal'
};

const Space = p => {
  const props = mergeProps(defaultProps$a, p);
  const {
    direction,
    onClick
  } = props;
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(classPrefix$g, {
      [`${classPrefix$g}-wrap`]: props.wrap,
      [`${classPrefix$g}-block`]: props.block,
      [`${classPrefix$g}-${direction}`]: true,
      [`${classPrefix$g}-align-${props.align}`]: !!props.align,
      [`${classPrefix$g}-justify-${props.justify}`]: !!props.justify
    }),
    onClick: onClick
  }, React.Children.map(props.children, child => {
    return child !== null && child !== undefined && /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$g}-item`
    }, child);
  })));
};

const classPrefix$f = `adm-divider`;
const defaultProps$9 = {
  contentPosition: 'center',
  direction: 'horizontal'
};

const Divider = p => {
  const props = mergeProps(defaultProps$9, p);
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(classPrefix$f, `${classPrefix$f}-${props.direction}`, `${classPrefix$f}-${props.contentPosition}`)
  }, props.children && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$f}-content`
  }, props.children)));
};

const classPrefix$e = `adm-empty`;

const Empty = props => {
  function renderImageNode() {
    const {
      image
    } = props;

    if (image === undefined) {
      return /*#__PURE__*/React.createElement(Image, {
        className: `${classPrefix$e}-image`,
        style: props.imageStyle,
        src: emptyIcon,
        alt: "empty"
      });
    }

    if (typeof image === 'string') {
      return /*#__PURE__*/React.createElement(Image, {
        className: `${classPrefix$e}-image`,
        style: props.imageStyle,
        src: image,
        alt: "empty"
      });
    }

    return image;
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classPrefix$e
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$e}-image-container`
  }, renderImageNode()), props.description && /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$e}-description`)
  }, props.description)));
};

const toCSSLength = val => {
  return typeof val === 'number' ? `${val}px` : val;
};

const classPrefix$d = `adm-grid`;

const Grid = props => {
  const style = {
    '--columns': props.columns.toString()
  };
  const {
    gap
  } = props;

  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0]);
      style['--gap-vertical'] = toCSSLength(gap[1]);
    } else {
      style['--gap'] = toCSSLength(gap);
    }
  }

  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classPrefix$d,
    style: style
  }, props.children));
};

const GridItem = p => {
  const props = mergeProps({
    span: 1
  }, p);
  const itemStyle = {
    '--item-span': props.span
  };
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$d}-item`,
    style: itemStyle,
    onClick: props.onClick
  }, props.children));
};

Grid.Item = GridItem;

const isNodeWithContent = node => {
  return node !== undefined && node !== null && node !== false;
};

const classPrefix$c = `adm-list-item`;

const ListItem = props => {
  var _props$clickable;

  const clickable = (_props$clickable = props.clickable) != null ? _props$clickable : !!props.onClick;
  const arrow = props.arrow === undefined ? clickable : props.arrow;
  const content = /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-content`
  }, isNodeWithContent(props.prefix) && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-content-prefix`
  }, props.prefix), /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-content-main`
  }, isNodeWithContent(props.title) && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-title`
  }, props.title), props.children, isNodeWithContent(props.description) && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-description`
  }, props.description)), isNodeWithContent(props.extra) && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-content-extra`
  }, props.extra), isNodeWithContent(arrow) && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$c}-content-arrow`
  }, arrow === true ? /*#__PURE__*/React.createElement(Image, {
    src: rightOutline
  }) : arrow));
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$c}`, clickable ? ['adm-plain-anchor'] : [], props.disabled && `${classPrefix$c}-disabled`),
    onClick: props.disabled ? undefined : props.onClick
  }, content));
};

const classPrefix$b = `adm-list`;
const defaultProps$8 = {
  mode: 'default'
};

const List = p => {
  const props = mergeProps(defaultProps$8, p);
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(classPrefix$b, `${classPrefix$b}-${props.mode}`)
  }, props.header && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$b}-header`
  }, props.header), /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$b}-body`
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$b}-body-inner`
  }, props.children))));
};

List.Item = ListItem;

function useInitialized(check) {
  const initializedRef = useRef(check);

  if (check) {
    initializedRef.current = true;
  }

  return !!initializedRef.current;
}

const ShouldRender = props => {
  const shouldRender = useShouldRender(props.active, props.forceRender, props.destroyOnClose);
  return shouldRender ? props.children : null;
};
function useShouldRender(active, forceRender, destroyOnClose) {
  const initialized = useInitialized(active);
  if (forceRender) return true;
  if (active) return true;
  if (!initialized) return false;
  return !destroyOnClose;
}

const eventToPropRecord = {
  'click': 'onClick'
};

const withStopPropagation = (events, element) => {
  const props = _extends({}, element.props);

  for (const key of events) {
    const prop = eventToPropRecord[key];

    props[prop] = function (e) {
      var _element$props$prop, _element$props;

      e.stopPropagation();
      (_element$props$prop = (_element$props = element.props)[prop]) == null ? void 0 : _element$props$prop.call(_element$props, e);
    };
  }

  return React.cloneElement(element, props);
};

const classPrefix$a = `adm-mask`;
const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
};
const defaultProps$7 = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click']
};

const Mask = p => {
  const props = mergeProps(defaultProps$7, p);
  const ref = useRef(null);
  const background = useMemo(() => {
    const opacity = opacityRecord.hasOwnProperty(props.opacity) ? opacityRecord[props.opacity] : props.opacity;
    const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return `rgba(${rgb}, ${opacity})`;
  }, [props.color, props.opacity]);
  const [active, setActive] = useState(props.visible);
  const unmountedRef = useUnmountedRef();
  const {
    opacity
  } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 250,
      friction: 30,
      clamp: true
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        props.afterShow && props.afterShow();
      } else {
        props.afterClose && props.afterClose();
      }
    }
  });
  const node = withStopPropagation(props.stopPropagation, withNativeProps(props, /*#__PURE__*/React.createElement(animated.View, {
    className: classPrefix$a,
    ref: ref,
    catchMove: true,
    style: _extends({}, props.style, {
      background,
      opacity,
      display: active ? undefined : 'none'
    }),
    onClick: e => {
      props.onMaskClick && props.onMaskClick(e);
    }
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$a}-content`
  }, props.children))));
  return /*#__PURE__*/React.createElement(ShouldRender, {
    active: active,
    forceRender: props.forceRender,
    destroyOnClose: props.destroyOnClose
  }, node);
};

const useInnerVisible = outerVisible => {
  const [innerVisible, setInnerVisible] = useState(outerVisible);
  useIsomorphicLayoutEffect(() => {
    setInnerVisible(outerVisible);
  }, [outerVisible]);
  return innerVisible;
};

const classPrefix$9 = `adm-popup`;
const defaultPopupBaseProps = {
  closeOnMaskClick: false,
  mask: true,
  showCloseButton: false,
  stopPropagation: ['click'],
  visible: false,
  round: false
};

const defaultProps$6 = _extends({}, defaultPopupBaseProps, {
  position: 'bottom'
});

const Popup = p => {
  const props = mergeProps(defaultProps$6, p);
  const bodyCls = classNames(`${classPrefix$9}-body`, props.bodyClassName, `${classPrefix$9}-body-position-${props.position}`);
  const active = props.visible;
  const maskVisible = useInnerVisible(active && props.visible);
  return withStopPropagation(props.stopPropagation, withNativeProps(props, /*#__PURE__*/React.createElement(PageContainer, {
    className: classPrefix$9,
    onClick: props.onClick,
    show: active,
    overlay: maskVisible,
    round: props.round,
    position: props.position,
    onAfterLeave: () => {
      props.onClose && props.onClose();
    },
    onClickOverlay: () => {
      props.onMaskClick && props.onMaskClick();
      props.onClose && props.onClose();
    }
  }, /*#__PURE__*/React.createElement(View, {
    className: bodyCls,
    style: props.bodyStyle ? props.bodyStyle : {}
  }, props.showCloseButton && /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$9}-close-icon`, 'adm-plain-anchor'),
    onClick: () => {
      props.onClose && props.onClose();
    }
  }, /*#__PURE__*/React.createElement(Image, {
    src: closeOutline
  })), props.children))));
};

const classPrefix$8 = `adm-result`;
const iconRecord = {
  success: checkCircleFill,
  error: closeCircleFill,
  info: informationCircleFill,
  waiting: clockCircleFill,
  warning: exclamationCircleFill
};

const Result = props => {
  const {
    status,
    title,
    description,
    icon
  } = props;
  if (!status) return null;
  const resultIcon = icon || /*#__PURE__*/React.createElement(Image, {
    src: iconRecord[status]
  });
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(classPrefix$8, `${classPrefix$8}-${status}`)
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$8}-icon`
  }, resultIcon), /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$8}-title`
  }, title), description ? /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$8}-description`
  }, description) : null));
};

function usePropsValue(options) {
  const {
    value,
    defaultValue,
    onChange
  } = options;
  const update = useUpdate();
  const stateRef = useRef(value !== undefined ? value : defaultValue);

  if (value !== undefined) {
    stateRef.current = value;
  }

  const setState = useMemoizedFn(v => {
    const nextValue = typeof v === 'function' ? v(stateRef.current) : v;
    stateRef.current = nextValue;
    update();
    onChange && onChange(nextValue);
  });
  return [stateRef.current, setState];
}

const bound = (position, min, max) => {
  let ret = position;

  if (min !== undefined) {
    ret = Math.max(position, min);
  }

  if (max !== undefined) {
    ret = Math.min(ret, max);
  }

  return ret;
};

const classPrefix$7 = `adm-input`;
const defaultProps$5 = {
  defaultValue: '',
  onlyShowClearWhenFocus: true
};
var Input = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$5, p);
  const [value, setValue] = usePropsValue(props);
  const [hasFocus, setHasFocus] = useState(false);
  const nativeInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('');
    },
    focus: () => {
      nativeInputRef.current && nativeInputRef.current.focus();
    },
    blur: () => {
      nativeInputRef.current && nativeInputRef.current.blur();
    }
  }));

  const shouldShowClear = (() => {
    if (!props.clearable || !value || props.readOnly) return false;

    if (props.onlyShowClearWhenFocus) {
      return hasFocus;
    } else {
      return true;
    }
  })();

  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$7}`, props.disabled && `${classPrefix$7}-disabled`)
  }, /*#__PURE__*/React.createElement(Input$1, {
    controlled: true,
    ref: nativeInputRef,
    className: `${classPrefix$7}-element`,
    value: value,
    onInput: e => {
      setValue(e.detail.value);
    },
    onFocus: e => {
      setHasFocus(true);
      props.onFocus && props.onFocus(e);
    },
    onBlur: e => {
      setHasFocus(false);
      props.onBlur && props.onBlur(e);
    },
    id: props.id,
    placeholder: props.placeholder,
    placeholderStyle: props.placeholderStyle,
    placeholderClass: props.placeholderClass,
    placeholderTextColor: props.placeholderTextColor,
    password: props.password,
    cursorSpacing: props.cursorSpacing,
    disabled: props.disabled,
    maxLength: props.maxLength,
    focus: props.focus,
    cursor: props.cursor,
    selectionStart: props.selectionStart,
    selectionEnd: props.selectionEnd,
    adjustPosition: props.adjustPosition,
    holdKeyboard: props.holdKeyboard,
    alwaysEmbed: props.alwaysEmbed,
    safePasswordCertPath: props.safePasswordCertPath,
    safePasswordLength: props.safePasswordLength,
    safePasswordTimeStamp: props.safePasswordTimeStamp,
    safePasswordNonce: props.safePasswordNonce,
    safePasswordSalt: props.safePasswordSalt,
    safePasswordCustomHash: props.safePasswordCustomHash,
    randomNumber: props.randomNumber,
    onKeyboardHeightChange: props.onKeyboardHeightChange,
    nativeProps: props.nativeProps,
    type: props.type,
    name: props.name,
    onClick: props.onClick
  }), /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$7}-clear`, {
      'display': !shouldShowClear
    }),
    hoverStopPropagation: true,
    onClick: e => {
      setValue('');
      props.onClear && props.onClear();
    }
  }, /*#__PURE__*/React.createElement(Image, {
    src: closeCircleFill
  }))));
});

const classPrefix$6 = `adm-search-bar`;
const defaultProps$4 = {
  clearable: true,
  onlyShowClearWhenFocus: false,
  showCancelButton: false,
  defaultValue: '',
  clearOnCancel: true,
  icon: /*#__PURE__*/React.createElement(Image, {
    src: searchOutline
  })
};
const SearchBar = forwardRef((p, ref) => {
  const props = mergeProps(defaultProps$4, {
    cancelText: '取消'
  }, p);
  const [value, setValue] = usePropsValue(props);
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    clear: () => inputRef.current && inputRef.current.clear(),
    focus: () => inputRef.current && inputRef.current.focus(),
    blur: () => inputRef.current && inputRef.current.blur()
  }));

  const renderCancelButton = () => {
    let isShowCancel;

    if (typeof props.showCancelButton === 'function') {
      isShowCancel = props.showCancelButton(hasFocus, value);
    } else {
      isShowCancel = props.showCancelButton && hasFocus;
    }

    return isShowCancel && /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$6}-suffix`
    }, /*#__PURE__*/React.createElement(Button, {
      fill: "none",
      className: `${classPrefix$6}-cancel-button`,
      onClick: () => {
        if (props.clearOnCancel) {
          inputRef.current && inputRef.current.clear();
        }

        inputRef.current && inputRef.current.blur();
        props.onCancel && props.onCancel();
      },
      hoverStopPropagation: true
    }, props.cancelText));
  };

  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classNames(classPrefix$6, {
      [`${classPrefix$6}-active`]: hasFocus
    })
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$6}-input-box`
  }, props.icon && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$6}-input-box-icon`
  }, props.icon), /*#__PURE__*/React.createElement(Input, {
    ref: inputRef,
    className: classNames(`${classPrefix$6}-input`, {
      [`${classPrefix$6}-input-without-icon`]: !props.icon
    }),
    value: value,
    onChange: setValue,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    clearable: props.clearable,
    onlyShowClearWhenFocus: props.onlyShowClearWhenFocus,
    onFocus: e => {
      setHasFocus(true);
      props.onFocus && props.onFocus(e);
    },
    onBlur: e => {
      setHasFocus(false);
      props.onBlur == null ? void 0 : props.onBlur(e);
    },
    onClear: props.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: () => {
      inputRef.current && inputRef.current.blur();
      props.onSearch && props.onSearch(value);
    }
  })), renderCancelButton()));
});

const classPrefix$5 = `adm-selector`;
const defaultProps$3 = {
  multiple: false,
  defaultValue: [],
  showCheckMark: true
};

const Selector = p => {
  const props = mergeProps(defaultProps$3, p);
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: val => {
      const extend = {
        get items() {
          return props.options.filter(option => val.includes(option.value));
        }

      };
      props.onChange == null ? void 0 : props.onChange(val, extend);
    }
  });
  const items = props.options.map(option => {
    const active = (value || []).includes(option.value);
    const disabled = option.disabled || props.disabled;
    const itemCls = classNames(`${classPrefix$5}-item`, {
      [`${classPrefix$5}-item-active`]: active && !props.multiple,
      [`${classPrefix$5}-item-multiple-active`]: active && props.multiple,
      [`${classPrefix$5}-item-disabled`]: disabled
    });
    return /*#__PURE__*/React.createElement(View, {
      key: option.value,
      className: itemCls,
      onClick: () => {
        if (disabled) {
          return;
        }

        if (props.multiple) {
          const val = active ? value.filter(v => v !== option.value) : [...value, option.value];
          setValue(val);
        } else {
          const val = active ? [] : [option.value];
          setValue(val);
        }
      }
    }, option.label, option.description && /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$5}-item-description`
    }, option.description), active && props.showCheckMark && /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$5}-check-mark-wrapper`
    }, /*#__PURE__*/React.createElement(Image, {
      src: checkMark
    })));
  });
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classPrefix$5
  }, !props.columns && /*#__PURE__*/React.createElement(Space, {
    wrap: true
  }, items), props.columns && /*#__PURE__*/React.createElement(Grid, {
    columns: props.columns,
    gap: 16
  }, items)));
};

const useMutationEffect = (effect, targetRef, options) => {
  const fn = useMemoizedFn(effect);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      fn();
    });
    if (!targetRef.current) return;
    observer.observe(targetRef.current, options);
    return () => {
      observer.disconnect();
    };
  }, [targetRef]);
};

const useResizeEffect = (effect, targetRef) => {
  const fn = useMemoizedFn(effect);
  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        fn(target);
      });
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
};

const traverseReactNode = (children, fn) => {
  let i = 0;

  function handle(target) {
    React.Children.forEach(target, child => {
      if (!isFragment(child)) {
        fn(child, i);
        i += 1;
      } else {
        handle(child.props.children);
      }
    });
  }

  handle(children);
};

const classPrefix$4 = `adm-tabs`;

const Tab = () => {
  return null;
};

const defaultProps$2 = {
  activeLineMode: 'auto',
  stretch: true
};

const Tabs = p => {
  const props = mergeProps(defaultProps$2, p);
  const tabListContainerRef = useRef(null);
  const activeLineRef = useRef(null);
  const keyToIndexRecord = {};
  let firstActiveKey = null;
  const panes = [];
  traverseReactNode(props.children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    const length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ? props.defaultActiveKey : firstActiveKey,
    onChange: v => {
      if (v === null) return;
      props.onChange && props.onChange(v);
    }
  });
  const [{
    x,
    width
  }, api] = useSpring(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  const [{
    scrollLeft
  }, scrollApi] = useSpring(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: true
    }
  }));
  const [{
    leftMaskOpacity,
    rightMaskOpacity
  }, maskApi] = useSpring(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: true
    }
  }));

  function animate(immediate = false) {
    const container = tabListContainerRef.current;
    if (!container) return;
    const activeIndex = keyToIndexRecord[activeKey];

    if (activeIndex === undefined) {
      api.start({
        x: 0,
        width: 0,
        immediate: true
      });
      return;
    }

    const activeLine = activeLineRef.current;
    if (!activeLine) return;
    const activeTabWrapper = container.children[activeIndex + 1];
    const activeTab = activeTabWrapper.children[0];
    const activeTabLeft = activeTab.offsetLeft;
    const activeTabWidth = activeTab.offsetWidth;
    const activeTabWrapperLeft = activeTabWrapper.offsetLeft;
    const activeTabWrapperWidth = activeTabWrapper.offsetWidth;
    const containerWidth = container.offsetWidth;
    const containerScrollWidth = container.scrollWidth;
    const containerScrollLeft = container.scrollLeft;
    const activeLineWidth = activeLine.offsetWidth;
    let x = 0;
    let width = 0;

    if (props.activeLineMode === 'auto') {
      x = activeTabLeft;
      width = activeTabWidth;
    } else if (props.activeLineMode === 'full') {
      x = activeTabWrapperLeft;
      width = activeTabWrapperWidth;
    } else {
      x = activeTabLeft + (activeTabWidth - activeLineWidth) / 2;
    }

    api.start({
      x,
      width,
      immediate
    });
    const maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    const nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate
    });
  }

  useResizeEffect(() => {
    animate(!x.isAnimating);
  }, tabListContainerRef);
  useMutationEffect(() => {
    animate(!x.isAnimating);
  }, tabListContainerRef, {
    subtree: true,
    childList: true,
    characterData: true
  });
  const {
    run: updateMask
  } = useThrottleFn((immediate = false) => {
    const container = tabListContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const showLeftMask = scrollLeft > 0;
    const showRightMask = scrollLeft + container.offsetWidth < container.scrollWidth;
    maskApi.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  });
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classPrefix$4
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$4}-header`
  }, /*#__PURE__*/React.createElement(animated.View, {
    className: classNames(`${classPrefix$4}-header-mask`, `${classPrefix$4}-header-mask-left`),
    style: {
      opacity: leftMaskOpacity
    }
  }), /*#__PURE__*/React.createElement(animated.View, {
    className: classNames(`${classPrefix$4}-header-mask`, `${classPrefix$4}-header-mask-right`),
    style: {
      opacity: rightMaskOpacity
    }
  }), /*#__PURE__*/React.createElement(animated.View, {
    className: `${classPrefix$4}-tab-list`,
    ref: tabListContainerRef,
    scrollLeft: scrollLeft,
    onScroll: updateMask
  }, /*#__PURE__*/React.createElement(animated.View, {
    ref: activeLineRef,
    className: `${classPrefix$4}-tab-line`,
    style: {
      width: props.activeLineMode === 'fixed' ? 'var(--fixed-active-line-width, 60px)' : width,
      x
    }
  }), panes.map(pane => withNativeProps(pane.props, /*#__PURE__*/React.createElement(View, {
    key: pane.key,
    className: classNames(`${classPrefix$4}-tab-wrapper`, {
      [`${classPrefix$4}-tab-wrapper-stretch`]: props.stretch
    })
  }, /*#__PURE__*/React.createElement(View, {
    onClick: () => {
      const {
        key
      } = pane;
      if (pane.props.disabled) return;

      if (key === undefined || key === null) {
        return;
      }

      setActiveKey(key.toString());
    },
    className: classNames(`${classPrefix$4}-tab`, {
      [`${classPrefix$4}-tab-active`]: pane.key === activeKey,
      [`${classPrefix$4}-tab-disabled`]: pane.props.disabled
    })
  }, pane.props.title)))))), panes.map(pane => {
    if (pane.props.children === undefined) {
      return null;
    }

    const active = pane.key === activeKey;
    return /*#__PURE__*/React.createElement(ShouldRender, {
      key: pane.key,
      active: active,
      forceRender: pane.props.forceRender,
      destroyOnClose: pane.props.destroyOnClose
    }, /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$4}-content`,
      style: {
        display: active ? 'block' : 'none'
      }
    }, pane.props.children));
  })));
};

Tabs.Tab = Tab;

const classPrefix$3 = `adm-badge`;
const dot = /*#__PURE__*/React.createElement(React.Fragment, null);

const Badge = props => {
  const {
    content,
    color,
    children
  } = props;
  const isDot = content === dot;
  const badgeCls = classNames(classPrefix$3, !!children && `${classPrefix$3}-fixed`, isDot && `${classPrefix$3}-dot`, props.bordered && `${classPrefix$3}-bordered`);
  const element = content || content === 0 ? withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: badgeCls,
    style: {
      'backgroundColor': color
    }
  }, !isDot && /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$3}-content`
  }, content))) : null;
  return children ? /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$3}-wrapper`, props.wrapperClassName),
    style: props.wrapperStyle
  }, children, element) : element;
};

Badge.dot = dot;

const classPrefix$2 = `adm-side-bar`;
/* istanbul ignore next */

const SideBarItem = () => {
  return null;
};

const SideBar = props => {
  var _props$defaultActiveK;

  let firstActiveKey = null;
  const items = [];
  traverseReactNode(props.children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    items.push(child);
  });
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: (_props$defaultActiveK = props.defaultActiveKey) != null ? _props$defaultActiveK : firstActiveKey,
    onChange: v => {
      if (v === null) return;
      props.onChange == null ? void 0 : props.onChange(v);
    }
  });
  const lastItem = items[items.length - 1];
  const isLastItemActive = lastItem && lastItem.key === activeKey;
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    className: classPrefix$2
  }, /*#__PURE__*/React.createElement(View, {
    className: `${classPrefix$2}-items`
  }, items.map((item, index) => {
    const active = item.key === activeKey;
    const isActiveNextSibling = items[index - 1] && items[index - 1].key === activeKey;
    const isActivePreviousSibling = items[index + 1] && items[index + 1].key === activeKey;
    return withNativeProps(item.props, /*#__PURE__*/React.createElement(View, {
      key: item.key,
      onClick: () => {
        const {
          key
        } = item;
        if (key === undefined || key === null || item.props.disabled) return;
        setActiveKey(key.toString());
      },
      className: classNames(`${classPrefix$2}-item`, {
        [`${classPrefix$2}-item-active`]: active,
        [`${classPrefix$2}-item-disabled`]: item.props.disabled
      })
    }, /*#__PURE__*/React.createElement(React.Fragment, null, isActiveNextSibling && /*#__PURE__*/React.createElement(Image, {
      className: `${classPrefix$2}-item-corner ${classPrefix$2}-item-corner-top`,
      src: corner
    }), isActivePreviousSibling && /*#__PURE__*/React.createElement(Image, {
      className: `${classPrefix$2}-item-corner ${classPrefix$2}-item-corner-bottom`,
      src: corner
    })), /*#__PURE__*/React.createElement(Badge, {
      content: item.props.badge,
      className: `${classPrefix$2}-badge`
    }, /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$2}-item-title`
    }, active && /*#__PURE__*/React.createElement(View, {
      className: `${classPrefix$2}-item-highlight`
    }), item.props.title))));
  })), /*#__PURE__*/React.createElement(View, {
    className: classNames(`${classPrefix$2}-extra-space`, isLastItemActive && `${classPrefix$2}-item-active-next-sibling`)
  }, isLastItemActive && /*#__PURE__*/React.createElement(Image, {
    className: `${classPrefix$2}-item-corner ${classPrefix$2}-item-corner-top`,
    src: corner
  }))));
};

SideBar.SideBarItem = SideBarItem;

const classPrefix$1 = `adm-tag`;
const colorRecord = {
  default: '#666666',
  primary: 'var(--adm-color-primary, #1677ff)',
  success: 'var(--adm-color-success, #00b578)',
  warning: 'var(--adm-color-warning, #ff8f1f)',
  danger: 'var(--adm-color-danger, #ff3141)'
};
const defaultProps$1 = {
  color: 'default',
  fill: 'solid',
  round: false
};

const Tag = p => {
  const props = mergeProps(defaultProps$1, p);
  const color = colorRecord[props.color] ? colorRecord[props.color] : props.color;
  const style = {
    'borderColor': color,
    'color': props.fill === 'outline' ? color : '#ffffff',
    'backgroundColor': props.fill === 'outline' ? 'transparent' : color
  };
  return withNativeProps(props, /*#__PURE__*/React.createElement(View, {
    style: style,
    onClick: props.onClick,
    className: classNames(classPrefix$1, {
      [`${classPrefix$1}-round`]: props.round
    })
  }, props.children));
};

const classPrefix = 'adm-avatar';
const defaultProps = {};

const Avatar = p => {
  const props = mergeProps(defaultProps, p);
  return withNativeProps(props, /*#__PURE__*/React.createElement(Image, {
    className: classPrefix,
    src: props.src || fallback,
    alt: props.alt,
    onClick: props.onClick,
    onError: props.onError
  }));
};

export { Avatar, Badge, Button, Divider, Empty, Grid, Input, List, Mask, Popup, Result, SearchBar, Selector, SideBar, Space, Tabs, Tag };
//# sourceMappingURL=antd-taro.modern.mjs.map
