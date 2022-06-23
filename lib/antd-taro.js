var React = require('react');
var classNames = require('classnames');
var assign = require('lodash/assign');
var assignWith = require('lodash/assignWith');
var isUndefined = require('lodash/isUndefined');
var components = require('@tarojs/components');
var loadingWhite = require('./loading-white.svg');
var emptyIcon = require('./empty-icon.svg');
var rightOutline = require('./right-outline.svg');
var ahooks = require('ahooks');
var reactSpring = require('@tarojsx/library/dist/react-spring');
var closeOutline = require('./closeOutline.svg');
var checkCircleFill = require('./checkCircleFill.svg');
var closeCircleFill = require('./closeCircleFill.svg');
var informationCircleFill = require('./informationCircleFill.svg');
var clockCircleFill = require('./clockCircleFill.svg');
var exclamationCircleFill = require('./exclamationCircleFill.svg');
var searchOutline = require('./searchOutline.svg');
var checkMark = require('./check-mark.svg');
var reactIs = require('react-is');
var corner = require('./corner.svg');
var fallback = require('./fallback.svg');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
var assign__default = /*#__PURE__*/_interopDefaultLegacy(assign);
var assignWith__default = /*#__PURE__*/_interopDefaultLegacy(assignWith);
var isUndefined__default = /*#__PURE__*/_interopDefaultLegacy(isUndefined);
var loadingWhite__default = /*#__PURE__*/_interopDefaultLegacy(loadingWhite);
var emptyIcon__default = /*#__PURE__*/_interopDefaultLegacy(emptyIcon);
var rightOutline__default = /*#__PURE__*/_interopDefaultLegacy(rightOutline);
var closeOutline__default = /*#__PURE__*/_interopDefaultLegacy(closeOutline);
var checkCircleFill__default = /*#__PURE__*/_interopDefaultLegacy(checkCircleFill);
var closeCircleFill__default = /*#__PURE__*/_interopDefaultLegacy(closeCircleFill);
var informationCircleFill__default = /*#__PURE__*/_interopDefaultLegacy(informationCircleFill);
var clockCircleFill__default = /*#__PURE__*/_interopDefaultLegacy(clockCircleFill);
var exclamationCircleFill__default = /*#__PURE__*/_interopDefaultLegacy(exclamationCircleFill);
var searchOutline__default = /*#__PURE__*/_interopDefaultLegacy(searchOutline);
var checkMark__default = /*#__PURE__*/_interopDefaultLegacy(checkMark);
var corner__default = /*#__PURE__*/_interopDefaultLegacy(corner);
var fallback__default = /*#__PURE__*/_interopDefaultLegacy(fallback);

var mergeProps = function mergeProps() {
  var items = [].slice.call(arguments);

  var customizer = function customizer(objValue, srcValue) {
    return isUndefined__default["default"](srcValue) ? objValue : srcValue;
  };

  var ret = assign__default["default"]({}, items[0]);

  for (var i = 1; i < items.length; i++) {
    ret = assignWith__default["default"](ret, items[i], customizer);
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var withNativeProps = function withNativeProps(props, element) {
  var p = _extends({}, element.props);

  if (props.className) {
    p.className = classNames__default["default"](element.props.className, props.className);
  }

  if (props.style) {
    p.style = _extends({}, p.style, props.style);
  }

  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }

  for (var key in props) {
    if (!props.hasOwnProperty(key)) continue;

    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }

  return React__default["default"].cloneElement(element, p);
};

var classPrefix$i = "adm-dot-loading";
var defaultProps$c = {
  color: 'default'
};
var DotLoading = React.memo(function (p) {
  var props = mergeProps(defaultProps$c, p);
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    style: props.hasOwnProperty('color') ? {
      color: props.color
    } : {},
    className: classNames__default["default"]('adm-loading', classPrefix$i)
  }, /*#__PURE__*/React__default["default"].createElement(components.Image, {
    className: "adm-dot-loading-image",
    src: loadingWhite__default["default"]
  })));
});

function isPromise(obj) {
  return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var classPrefix$h = "adm-button";
var defaultProps$b = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  loadingIcon: /*#__PURE__*/React__default["default"].createElement(DotLoading, null),
  type: 'button',
  shape: 'default',
  size: 'middle'
};
var Button = React.forwardRef(function (p, ref) {
  var _classNames;

  var props = mergeProps(defaultProps$b, p);

  var _useState = React.useState(false),
      innerLoading = _useState[0],
      setInnerLoading = _useState[1];

  var nativeButtonRef = React.useRef(null);
  var loading = props.loading === 'auto' ? innerLoading : props.loading;
  var disabled = props.disabled || loading;
  React.useImperativeHandle(ref, function () {
    return {
      get nativeElement() {
        return nativeButtonRef.current;
      }

    };
  });

  var handleClick = function handleClick(e) {
    try {
      if (!props.onClick) return Promise.resolve();
      var promise = props.onClick(e);
      return Promise.resolve(function () {
        if (isPromise(promise)) {
          return _catch(function () {
            setInnerLoading(true);
            return Promise.resolve(promise).then(function () {
              setInnerLoading(false);
            });
          }, function (e) {
            setInnerLoading(false);
            throw e;
          });
        }
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    ref: nativeButtonRef,
    type: props.type,
    onClick: handleClick,
    className: classNames__default["default"](classPrefix$h, props.color ? classPrefix$h + "-" + props.color : null, (_classNames = {}, _classNames[classPrefix$h + "-block"] = props.block, _classNames[classPrefix$h + "-disabled"] = disabled, _classNames[classPrefix$h + "-fill-outline"] = props.fill === 'outline', _classNames[classPrefix$h + "-fill-none"] = props.fill === 'none', _classNames[classPrefix$h + "-mini"] = props.size === 'mini', _classNames[classPrefix$h + "-small"] = props.size === 'small', _classNames[classPrefix$h + "-large"] = props.size === 'large', _classNames[classPrefix$h + "-loading"] = loading, _classNames), classPrefix$h + "-shape-" + props.shape),
    disabled: disabled,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onTouchStart: props.onTouchStart,
    onTouchEnd: props.onTouchEnd
  }, loading ? /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$h + "-loading-wrapper"
  }, props.loadingIcon, props.loadingText) : props.children));
});

var classPrefix$g = "adm-space";
var defaultProps$a = {
  direction: 'horizontal'
};

var Space = function Space(p) {
  var _classNames;

  var props = mergeProps(defaultProps$a, p);
  var direction = props.direction,
      onClick = props.onClick;
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$g, (_classNames = {}, _classNames[classPrefix$g + "-wrap"] = props.wrap, _classNames[classPrefix$g + "-block"] = props.block, _classNames[classPrefix$g + "-" + direction] = true, _classNames[classPrefix$g + "-align-" + props.align] = !!props.align, _classNames[classPrefix$g + "-justify-" + props.justify] = !!props.justify, _classNames)),
    onClick: onClick
  }, React__default["default"].Children.map(props.children, function (child) {
    return child !== null && child !== undefined && /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$g + "-item"
    }, child);
  })));
};

var classPrefix$f = "adm-divider";
var defaultProps$9 = {
  contentPosition: 'center',
  direction: 'horizontal'
};

var Divider = function Divider(p) {
  var props = mergeProps(defaultProps$9, p);
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$f, classPrefix$f + "-" + props.direction, classPrefix$f + "-" + props.contentPosition)
  }, props.children && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$f + "-content"
  }, props.children)));
};

var classPrefix$e = "adm-empty";

var Empty = function Empty(props) {
  function renderImageNode() {
    var image = props.image;

    if (image === undefined) {
      return /*#__PURE__*/React__default["default"].createElement(components.Image, {
        className: classPrefix$e + "-image",
        style: props.imageStyle,
        src: emptyIcon__default["default"],
        alt: "empty"
      });
    }

    if (typeof image === 'string') {
      return /*#__PURE__*/React__default["default"].createElement(components.Image, {
        className: classPrefix$e + "-image",
        style: props.imageStyle,
        src: image,
        alt: "empty"
      });
    }

    return image;
  }

  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$e
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$e + "-image-container"
  }, renderImageNode()), props.description && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$e + "-description")
  }, props.description)));
};

var toCSSLength = function toCSSLength(val) {
  return typeof val === 'number' ? val + "px" : val;
};

var classPrefix$d = "adm-grid";

var Grid = function Grid(props) {
  var style = {
    '--columns': props.columns.toString()
  };
  var gap = props.gap;

  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0]);
      style['--gap-vertical'] = toCSSLength(gap[1]);
    } else {
      style['--gap'] = toCSSLength(gap);
    }
  }

  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$d,
    style: style
  }, props.children));
};

var GridItem = function GridItem(p) {
  var props = mergeProps({
    span: 1
  }, p);
  var itemStyle = {
    '--item-span': props.span
  };
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$d + "-item",
    style: itemStyle,
    onClick: props.onClick
  }, props.children));
};

Grid.Item = GridItem;

var isNodeWithContent = function isNodeWithContent(node) {
  return node !== undefined && node !== null && node !== false;
};

var classPrefix$c = "adm-list-item";

var ListItem = function ListItem(props) {
  var _props$clickable;

  var clickable = (_props$clickable = props.clickable) != null ? _props$clickable : !!props.onClick;
  var arrow = props.arrow === undefined ? clickable : props.arrow;
  var content = /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-content"
  }, isNodeWithContent(props.prefix) && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-content-prefix"
  }, props.prefix), /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-content-main"
  }, isNodeWithContent(props.title) && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-title"
  }, props.title), props.children, isNodeWithContent(props.description) && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-description"
  }, props.description)), isNodeWithContent(props.extra) && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-content-extra"
  }, props.extra), isNodeWithContent(arrow) && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$c + "-content-arrow"
  }, arrow === true ? /*#__PURE__*/React__default["default"].createElement(components.Image, {
    src: rightOutline__default["default"]
  }) : arrow));
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"]("" + classPrefix$c, clickable ? ['adm-plain-anchor'] : [], props.disabled && classPrefix$c + "-disabled"),
    onClick: props.disabled ? undefined : props.onClick
  }, content));
};

var classPrefix$b = "adm-list";
var defaultProps$8 = {
  mode: 'default'
};

var List = function List(p) {
  var props = mergeProps(defaultProps$8, p);
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$b, classPrefix$b + "-" + props.mode)
  }, props.header && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$b + "-header"
  }, props.header), /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$b + "-body"
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$b + "-body-inner"
  }, props.children))));
};

List.Item = ListItem;

function useInitialized(check) {
  var initializedRef = React.useRef(check);

  if (check) {
    initializedRef.current = true;
  }

  return !!initializedRef.current;
}

var ShouldRender = function ShouldRender(props) {
  var shouldRender = useShouldRender(props.active, props.forceRender, props.destroyOnClose);
  return shouldRender ? props.children : null;
};
function useShouldRender(active, forceRender, destroyOnClose) {
  var initialized = useInitialized(active);
  if (forceRender) return true;
  if (active) return true;
  if (!initialized) return false;
  return !destroyOnClose;
}

var eventToPropRecord = {
  'click': 'onClick'
};

var withStopPropagation = function withStopPropagation(events, element) {
  var props = _extends({}, element.props);

  var _loop = function _loop() {
    var key = _step.value;
    var prop = eventToPropRecord[key];

    props[prop] = function (e) {
      var _element$props$prop, _element$props;

      e.stopPropagation();
      (_element$props$prop = (_element$props = element.props)[prop]) == null ? void 0 : _element$props$prop.call(_element$props, e);
    };
  };

  for (var _iterator = _createForOfIteratorHelperLoose(events), _step; !(_step = _iterator()).done;) {
    _loop();
  }

  return React__default["default"].cloneElement(element, props);
};

var classPrefix$a = "adm-mask";
var opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
};
var defaultProps$7 = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click']
};

var Mask = function Mask(p) {
  var props = mergeProps(defaultProps$7, p);
  var ref = React.useRef(null);
  var background = React.useMemo(function () {
    var opacity = opacityRecord.hasOwnProperty(props.opacity) ? opacityRecord[props.opacity] : props.opacity;
    var rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return "rgba(" + rgb + ", " + opacity + ")";
  }, [props.color, props.opacity]);

  var _useState = React.useState(props.visible),
      active = _useState[0],
      setActive = _useState[1];

  var unmountedRef = ahooks.useUnmountedRef();

  var _useSpring = reactSpring.useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 250,
      friction: 30,
      clamp: true
    },
    onStart: function onStart() {
      setActive(true);
    },
    onRest: function onRest() {
      if (unmountedRef.current) return;
      setActive(props.visible);

      if (props.visible) {
        props.afterShow && props.afterShow();
      } else {
        props.afterClose && props.afterClose();
      }
    }
  }),
      opacity = _useSpring.opacity;

  var node = withStopPropagation(props.stopPropagation, withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(reactSpring.animated.View, {
    className: classPrefix$a,
    ref: ref,
    catchMove: true,
    style: _extends({}, props.style, {
      background: background,
      opacity: opacity,
      display: active ? undefined : 'none'
    }),
    onClick: function onClick(e) {
      props.onMaskClick && props.onMaskClick(e);
    }
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$a + "-content"
  }, props.children))));
  return /*#__PURE__*/React__default["default"].createElement(ShouldRender, {
    active: active,
    forceRender: props.forceRender,
    destroyOnClose: props.destroyOnClose
  }, node);
};

var useInnerVisible = function useInnerVisible(outerVisible) {
  var _useState = React.useState(outerVisible),
      innerVisible = _useState[0],
      setInnerVisible = _useState[1];

  ahooks.useIsomorphicLayoutEffect(function () {
    setInnerVisible(outerVisible);
  }, [outerVisible]);
  return innerVisible;
};

var classPrefix$9 = "adm-popup";
var defaultPopupBaseProps = {
  closeOnMaskClick: false,
  mask: true,
  showCloseButton: false,
  stopPropagation: ['click'],
  visible: false,
  round: false
};

var defaultProps$6 = _extends({}, defaultPopupBaseProps, {
  position: 'bottom'
});

var Popup = function Popup(p) {
  var props = mergeProps(defaultProps$6, p);
  var bodyCls = classNames__default["default"](classPrefix$9 + "-body", props.bodyClassName, classPrefix$9 + "-body-position-" + props.position);
  var active = props.visible;
  var maskVisible = useInnerVisible(active && props.visible);
  return withStopPropagation(props.stopPropagation, withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.PageContainer, {
    className: classPrefix$9,
    onClick: props.onClick,
    show: active,
    overlay: maskVisible,
    round: props.round,
    position: props.position,
    onAfterLeave: function onAfterLeave() {
      props.onClose && props.onClose();
    },
    onClickOverlay: function onClickOverlay() {
      props.onMaskClick && props.onMaskClick();
      props.onClose && props.onClose();
    }
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: bodyCls,
    style: props.bodyStyle ? props.bodyStyle : {}
  }, props.showCloseButton && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$9 + "-close-icon", 'adm-plain-anchor'),
    onClick: function onClick() {
      props.onClose && props.onClose();
    }
  }, /*#__PURE__*/React__default["default"].createElement(components.Image, {
    src: closeOutline__default["default"]
  })), props.children))));
};

var classPrefix$8 = "adm-result";
var iconRecord = {
  success: checkCircleFill__default["default"],
  error: closeCircleFill__default["default"],
  info: informationCircleFill__default["default"],
  waiting: clockCircleFill__default["default"],
  warning: exclamationCircleFill__default["default"]
};

var Result = function Result(props) {
  var status = props.status,
      title = props.title,
      description = props.description,
      icon = props.icon;
  if (!status) return null;
  var resultIcon = icon || /*#__PURE__*/React__default["default"].createElement(components.Image, {
    src: iconRecord[status]
  });
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$8, classPrefix$8 + "-" + status)
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$8 + "-icon"
  }, resultIcon), /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$8 + "-title"
  }, title), description ? /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$8 + "-description"
  }, description) : null));
};

function usePropsValue(options) {
  var value = options.value,
      defaultValue = options.defaultValue,
      onChange = options.onChange;
  var update = ahooks.useUpdate();
  var stateRef = React.useRef(value !== undefined ? value : defaultValue);

  if (value !== undefined) {
    stateRef.current = value;
  }

  var setState = ahooks.useMemoizedFn(function (v) {
    var nextValue = typeof v === 'function' ? v(stateRef.current) : v;
    stateRef.current = nextValue;
    update();
    onChange && onChange(nextValue);
  });
  return [stateRef.current, setState];
}

var bound = function bound(position, min, max) {
  var ret = position;

  if (min !== undefined) {
    ret = Math.max(position, min);
  }

  if (max !== undefined) {
    ret = Math.min(ret, max);
  }

  return ret;
};

var classPrefix$7 = "adm-input";
var defaultProps$5 = {
  defaultValue: '',
  onlyShowClearWhenFocus: true
};
var Input = React.forwardRef(function (p, ref) {
  var props = mergeProps(defaultProps$5, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = React.useState(false),
      hasFocus = _useState[0],
      setHasFocus = _useState[1];

  var nativeInputRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        setValue('');
      },
      focus: function focus() {
        nativeInputRef.current && nativeInputRef.current.focus();
      },
      blur: function blur() {
        nativeInputRef.current && nativeInputRef.current.blur();
      }
    };
  });

  var shouldShowClear = function () {
    if (!props.clearable || !value || props.readOnly) return false;

    if (props.onlyShowClearWhenFocus) {
      return hasFocus;
    } else {
      return true;
    }
  }();

  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"]("" + classPrefix$7, props.disabled && classPrefix$7 + "-disabled")
  }, /*#__PURE__*/React__default["default"].createElement(components.Input, {
    controlled: true,
    ref: nativeInputRef,
    className: classPrefix$7 + "-element",
    value: value,
    onInput: function onInput(e) {
      setValue(e.detail.value);
    },
    onFocus: function onFocus(e) {
      setHasFocus(true);
      props.onFocus && props.onFocus(e);
    },
    onBlur: function onBlur(e) {
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
  }), /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$7 + "-clear", {
      'display': !shouldShowClear
    }),
    hoverStopPropagation: true,
    onClick: function onClick(e) {
      setValue('');
      props.onClear && props.onClear();
    }
  }, /*#__PURE__*/React__default["default"].createElement(components.Image, {
    src: closeCircleFill__default["default"]
  }))));
});

var classPrefix$6 = "adm-search-bar";
var defaultProps$4 = {
  clearable: true,
  onlyShowClearWhenFocus: false,
  showCancelButton: false,
  defaultValue: '',
  clearOnCancel: true,
  icon: /*#__PURE__*/React__default["default"].createElement(components.Image, {
    src: searchOutline__default["default"]
  })
};
var SearchBar = React.forwardRef(function (p, ref) {
  var _classNames, _classNames2;

  var props = mergeProps(defaultProps$4, {
    cancelText: '取消'
  }, p);

  var _usePropsValue = usePropsValue(props),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var _useState = React.useState(false),
      hasFocus = _useState[0],
      setHasFocus = _useState[1];

  var inputRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        return inputRef.current && inputRef.current.clear();
      },
      focus: function focus() {
        return inputRef.current && inputRef.current.focus();
      },
      blur: function blur() {
        return inputRef.current && inputRef.current.blur();
      }
    };
  });

  var renderCancelButton = function renderCancelButton() {
    var isShowCancel;

    if (typeof props.showCancelButton === 'function') {
      isShowCancel = props.showCancelButton(hasFocus, value);
    } else {
      isShowCancel = props.showCancelButton && hasFocus;
    }

    return isShowCancel && /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$6 + "-suffix"
    }, /*#__PURE__*/React__default["default"].createElement(Button, {
      fill: "none",
      className: classPrefix$6 + "-cancel-button",
      onClick: function onClick() {
        if (props.clearOnCancel) {
          inputRef.current && inputRef.current.clear();
        }

        inputRef.current && inputRef.current.blur();
        props.onCancel && props.onCancel();
      },
      hoverStopPropagation: true
    }, props.cancelText));
  };

  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$6, (_classNames = {}, _classNames[classPrefix$6 + "-active"] = hasFocus, _classNames))
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$6 + "-input-box"
  }, props.icon && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$6 + "-input-box-icon"
  }, props.icon), /*#__PURE__*/React__default["default"].createElement(Input, {
    ref: inputRef,
    className: classNames__default["default"](classPrefix$6 + "-input", (_classNames2 = {}, _classNames2[classPrefix$6 + "-input-without-icon"] = !props.icon, _classNames2)),
    value: value,
    onChange: setValue,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    clearable: props.clearable,
    onlyShowClearWhenFocus: props.onlyShowClearWhenFocus,
    onFocus: function onFocus(e) {
      setHasFocus(true);
      props.onFocus && props.onFocus(e);
    },
    onBlur: function onBlur(e) {
      setHasFocus(false);
      props.onBlur == null ? void 0 : props.onBlur(e);
    },
    onClear: props.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: function onEnterPress() {
      inputRef.current && inputRef.current.blur();
      props.onSearch && props.onSearch(value);
    }
  })), renderCancelButton()));
});

var classPrefix$5 = "adm-selector";
var defaultProps$3 = {
  multiple: false,
  defaultValue: [],
  showCheckMark: true
};

var Selector = function Selector(p) {
  var props = mergeProps(defaultProps$3, p);

  var _usePropsValue = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: function onChange(val) {
      var extend = {
        get items() {
          return props.options.filter(function (option) {
            return val.includes(option.value);
          });
        }

      };
      props.onChange == null ? void 0 : props.onChange(val, extend);
    }
  }),
      value = _usePropsValue[0],
      setValue = _usePropsValue[1];

  var items = props.options.map(function (option) {
    var _classNames;

    var active = (value || []).includes(option.value);
    var disabled = option.disabled || props.disabled;
    var itemCls = classNames__default["default"](classPrefix$5 + "-item", (_classNames = {}, _classNames[classPrefix$5 + "-item-active"] = active && !props.multiple, _classNames[classPrefix$5 + "-item-multiple-active"] = active && props.multiple, _classNames[classPrefix$5 + "-item-disabled"] = disabled, _classNames));
    return /*#__PURE__*/React__default["default"].createElement(components.View, {
      key: option.value,
      className: itemCls,
      onClick: function onClick() {
        if (disabled) {
          return;
        }

        if (props.multiple) {
          var val = active ? value.filter(function (v) {
            return v !== option.value;
          }) : [].concat(value, [option.value]);
          setValue(val);
        } else {
          var _val = active ? [] : [option.value];

          setValue(_val);
        }
      }
    }, option.label, option.description && /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$5 + "-item-description"
    }, option.description), active && props.showCheckMark && /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$5 + "-check-mark-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement(components.Image, {
      src: checkMark__default["default"]
    })));
  });
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$5
  }, !props.columns && /*#__PURE__*/React__default["default"].createElement(Space, {
    wrap: true
  }, items), props.columns && /*#__PURE__*/React__default["default"].createElement(Grid, {
    columns: props.columns,
    gap: 16
  }, items)));
};

var useMutationEffect = function useMutationEffect(effect, targetRef, options) {
  var fn = ahooks.useMemoizedFn(effect);
  React.useEffect(function () {
    var observer = new MutationObserver(function () {
      fn();
    });
    if (!targetRef.current) return;
    observer.observe(targetRef.current, options);
    return function () {
      observer.disconnect();
    };
  }, [targetRef]);
};

var useResizeEffect = function useResizeEffect(effect, targetRef) {
  var fn = ahooks.useMemoizedFn(effect);
  ahooks.useIsomorphicLayoutEffect(function () {
    var target = targetRef.current;
    if (!target) return;

    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        fn(target);
      });
      observer.observe(target);
      return function () {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
};

var traverseReactNode = function traverseReactNode(children, fn) {
  var i = 0;

  function handle(target) {
    React__default["default"].Children.forEach(target, function (child) {
      if (!reactIs.isFragment(child)) {
        fn(child, i);
        i += 1;
      } else {
        handle(child.props.children);
      }
    });
  }

  handle(children);
};

var classPrefix$4 = "adm-tabs";

var Tab = function Tab() {
  return null;
};

var defaultProps$2 = {
  activeLineMode: 'auto',
  stretch: true
};

var Tabs = function Tabs(p) {
  var props = mergeProps(defaultProps$2, p);
  var tabListContainerRef = React.useRef(null);
  var activeLineRef = React.useRef(null);
  var keyToIndexRecord = {};
  var firstActiveKey = null;
  var panes = [];
  traverseReactNode(props.children, function (child, index) {
    if (!React__default["default"].isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    var length = panes.push(child);
    keyToIndexRecord[key] = length - 1;
  });

  var _usePropsValue = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ? props.defaultActiveKey : firstActiveKey,
    onChange: function onChange(v) {
      if (v === null) return;
      props.onChange && props.onChange(v);
    }
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  var _useSpring = reactSpring.useSpring(function () {
    return {
      x: 0,
      width: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      _useSpring$ = _useSpring[0],
      x = _useSpring$.x,
      width = _useSpring$.width,
      api = _useSpring[1];

  var _useSpring2 = reactSpring.useSpring(function () {
    return {
      scrollLeft: 0,
      config: {
        tension: 300,
        clamp: true
      }
    };
  }),
      scrollLeft = _useSpring2[0].scrollLeft,
      scrollApi = _useSpring2[1];

  var _useSpring3 = reactSpring.useSpring(function () {
    return {
      leftMaskOpacity: 0,
      rightMaskOpacity: 0,
      config: {
        clamp: true
      }
    };
  }),
      _useSpring3$ = _useSpring3[0],
      leftMaskOpacity = _useSpring3$.leftMaskOpacity,
      rightMaskOpacity = _useSpring3$.rightMaskOpacity,
      maskApi = _useSpring3[1];

  function animate(immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = tabListContainerRef.current;
    if (!container) return;
    var activeIndex = keyToIndexRecord[activeKey];

    if (activeIndex === undefined) {
      api.start({
        x: 0,
        width: 0,
        immediate: true
      });
      return;
    }

    var activeLine = activeLineRef.current;
    if (!activeLine) return;
    var activeTabWrapper = container.children[activeIndex + 1];
    var activeTab = activeTabWrapper.children[0];
    var activeTabLeft = activeTab.offsetLeft;
    var activeTabWidth = activeTab.offsetWidth;
    var activeTabWrapperLeft = activeTabWrapper.offsetLeft;
    var activeTabWrapperWidth = activeTabWrapper.offsetWidth;
    var containerWidth = container.offsetWidth;
    var containerScrollWidth = container.scrollWidth;
    var containerScrollLeft = container.scrollLeft;
    var activeLineWidth = activeLine.offsetWidth;
    var x = 0;
    var width = 0;

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
      x: x,
      width: width,
      immediate: immediate
    });
    var maxScrollDistance = containerScrollWidth - containerWidth;
    if (maxScrollDistance <= 0) return;
    var nextScrollLeft = bound(activeTabLeft - (containerWidth - activeTabWidth) / 2, 0, containerScrollWidth - containerWidth);
    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {
        scrollLeft: containerScrollLeft
      },
      immediate: immediate
    });
  }

  useResizeEffect(function () {
    animate(!x.isAnimating);
  }, tabListContainerRef);
  useMutationEffect(function () {
    animate(!x.isAnimating);
  }, tabListContainerRef, {
    subtree: true,
    childList: true,
    characterData: true
  });

  var _useThrottleFn = ahooks.useThrottleFn(function (immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var container = tabListContainerRef.current;
    if (!container) return;
    var scrollLeft = container.scrollLeft;
    var showLeftMask = scrollLeft > 0;
    var showRightMask = scrollLeft + container.offsetWidth < container.scrollWidth;
    maskApi.start({
      leftMaskOpacity: showLeftMask ? 1 : 0,
      rightMaskOpacity: showRightMask ? 1 : 0,
      immediate: immediate
    });
  }, {
    wait: 100,
    trailing: true,
    leading: true
  }),
      updateMask = _useThrottleFn.run;

  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$4
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$4 + "-header"
  }, /*#__PURE__*/React__default["default"].createElement(reactSpring.animated.View, {
    className: classNames__default["default"](classPrefix$4 + "-header-mask", classPrefix$4 + "-header-mask-left"),
    style: {
      opacity: leftMaskOpacity
    }
  }), /*#__PURE__*/React__default["default"].createElement(reactSpring.animated.View, {
    className: classNames__default["default"](classPrefix$4 + "-header-mask", classPrefix$4 + "-header-mask-right"),
    style: {
      opacity: rightMaskOpacity
    }
  }), /*#__PURE__*/React__default["default"].createElement(reactSpring.animated.View, {
    className: classPrefix$4 + "-tab-list",
    ref: tabListContainerRef,
    scrollLeft: scrollLeft,
    onScroll: updateMask
  }, /*#__PURE__*/React__default["default"].createElement(reactSpring.animated.View, {
    ref: activeLineRef,
    className: classPrefix$4 + "-tab-line",
    style: {
      width: props.activeLineMode === 'fixed' ? 'var(--fixed-active-line-width, 60px)' : width,
      x: x
    }
  }), panes.map(function (pane) {
    var _classNames, _classNames2;

    return withNativeProps(pane.props, /*#__PURE__*/React__default["default"].createElement(components.View, {
      key: pane.key,
      className: classNames__default["default"](classPrefix$4 + "-tab-wrapper", (_classNames = {}, _classNames[classPrefix$4 + "-tab-wrapper-stretch"] = props.stretch, _classNames))
    }, /*#__PURE__*/React__default["default"].createElement(components.View, {
      onClick: function onClick() {
        var key = pane.key;
        if (pane.props.disabled) return;

        if (key === undefined || key === null) {
          return;
        }

        setActiveKey(key.toString());
      },
      className: classNames__default["default"](classPrefix$4 + "-tab", (_classNames2 = {}, _classNames2[classPrefix$4 + "-tab-active"] = pane.key === activeKey, _classNames2[classPrefix$4 + "-tab-disabled"] = pane.props.disabled, _classNames2))
    }, pane.props.title)));
  }))), panes.map(function (pane) {
    if (pane.props.children === undefined) {
      return null;
    }

    var active = pane.key === activeKey;
    return /*#__PURE__*/React__default["default"].createElement(ShouldRender, {
      key: pane.key,
      active: active,
      forceRender: pane.props.forceRender,
      destroyOnClose: pane.props.destroyOnClose
    }, /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$4 + "-content",
      style: {
        display: active ? 'block' : 'none'
      }
    }, pane.props.children));
  })));
};

Tabs.Tab = Tab;

var classPrefix$3 = "adm-badge";
var dot = /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null);

var Badge = function Badge(props) {
  var content = props.content,
      color = props.color,
      children = props.children;
  var isDot = content === dot;
  var badgeCls = classNames__default["default"](classPrefix$3, !!children && classPrefix$3 + "-fixed", isDot && classPrefix$3 + "-dot", props.bordered && classPrefix$3 + "-bordered");
  var element = content || content === 0 ? withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: badgeCls,
    style: {
      'backgroundColor': color
    }
  }, !isDot && /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$3 + "-content"
  }, content))) : null;
  return children ? /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$3 + "-wrapper", props.wrapperClassName),
    style: props.wrapperStyle
  }, children, element) : element;
};

Badge.dot = dot;

var classPrefix$2 = "adm-side-bar";
/* istanbul ignore next */

var SideBarItem = function SideBarItem() {
  return null;
};

var SideBar = function SideBar(props) {
  var _props$defaultActiveK;

  var firstActiveKey = null;
  var items = [];
  traverseReactNode(props.children, function (child, index) {
    if (!React__default["default"].isValidElement(child)) return;
    var key = child.key;
    if (typeof key !== 'string') return;

    if (index === 0) {
      firstActiveKey = key;
    }

    items.push(child);
  });

  var _usePropsValue = usePropsValue({
    value: props.activeKey,
    defaultValue: (_props$defaultActiveK = props.defaultActiveKey) != null ? _props$defaultActiveK : firstActiveKey,
    onChange: function onChange(v) {
      if (v === null) return;
      props.onChange == null ? void 0 : props.onChange(v);
    }
  }),
      activeKey = _usePropsValue[0],
      setActiveKey = _usePropsValue[1];

  var lastItem = items[items.length - 1];
  var isLastItemActive = lastItem && lastItem.key === activeKey;
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$2
  }, /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classPrefix$2 + "-items"
  }, items.map(function (item, index) {
    var _classNames;

    var active = item.key === activeKey;
    var isActiveNextSibling = items[index - 1] && items[index - 1].key === activeKey;
    var isActivePreviousSibling = items[index + 1] && items[index + 1].key === activeKey;
    return withNativeProps(item.props, /*#__PURE__*/React__default["default"].createElement(components.View, {
      key: item.key,
      onClick: function onClick() {
        var key = item.key;
        if (key === undefined || key === null || item.props.disabled) return;
        setActiveKey(key.toString());
      },
      className: classNames__default["default"](classPrefix$2 + "-item", (_classNames = {}, _classNames[classPrefix$2 + "-item-active"] = active, _classNames[classPrefix$2 + "-item-disabled"] = item.props.disabled, _classNames))
    }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, isActiveNextSibling && /*#__PURE__*/React__default["default"].createElement(components.Image, {
      className: classPrefix$2 + "-item-corner " + classPrefix$2 + "-item-corner-top",
      src: corner__default["default"]
    }), isActivePreviousSibling && /*#__PURE__*/React__default["default"].createElement(components.Image, {
      className: classPrefix$2 + "-item-corner " + classPrefix$2 + "-item-corner-bottom",
      src: corner__default["default"]
    })), /*#__PURE__*/React__default["default"].createElement(Badge, {
      content: item.props.badge,
      className: classPrefix$2 + "-badge"
    }, /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$2 + "-item-title"
    }, active && /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: classPrefix$2 + "-item-highlight"
    }), item.props.title))));
  })), /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classNames__default["default"](classPrefix$2 + "-extra-space", isLastItemActive && classPrefix$2 + "-item-active-next-sibling")
  }, isLastItemActive && /*#__PURE__*/React__default["default"].createElement(components.Image, {
    className: classPrefix$2 + "-item-corner " + classPrefix$2 + "-item-corner-top",
    src: corner__default["default"]
  }))));
};

SideBar.SideBarItem = SideBarItem;

var classPrefix$1 = "adm-tag";
var colorRecord = {
  default: '#666666',
  primary: 'var(--adm-color-primary, #1677ff)',
  success: 'var(--adm-color-success, #00b578)',
  warning: 'var(--adm-color-warning, #ff8f1f)',
  danger: 'var(--adm-color-danger, #ff3141)'
};
var defaultProps$1 = {
  color: 'default',
  fill: 'solid',
  round: false
};

var Tag = function Tag(p) {
  var _classNames;

  var props = mergeProps(defaultProps$1, p);
  var color = colorRecord[props.color] ? colorRecord[props.color] : props.color;
  var style = {
    'borderColor': color,
    'color': props.fill === 'outline' ? color : '#ffffff',
    'backgroundColor': props.fill === 'outline' ? 'transparent' : color
  };
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.View, {
    style: style,
    onClick: props.onClick,
    className: classNames__default["default"](classPrefix$1, (_classNames = {}, _classNames[classPrefix$1 + "-round"] = props.round, _classNames))
  }, props.children));
};

var classPrefix = 'adm-avatar';
var defaultProps = {};

var Avatar = function Avatar(p) {
  var props = mergeProps(defaultProps, p);
  return withNativeProps(props, /*#__PURE__*/React__default["default"].createElement(components.Image, {
    className: classPrefix,
    src: props.src || fallback__default["default"],
    alt: props.alt,
    onClick: props.onClick,
    onError: props.onError
  }));
};

exports.Avatar = Avatar;
exports.Badge = Badge;
exports.Button = Button;
exports.Divider = Divider;
exports.Empty = Empty;
exports.Grid = Grid;
exports.Input = Input;
exports.List = List;
exports.Mask = Mask;
exports.Popup = Popup;
exports.Result = Result;
exports.SearchBar = SearchBar;
exports.Selector = Selector;
exports.SideBar = SideBar;
exports.Space = Space;
exports.Tabs = Tabs;
exports.Tag = Tag;
//# sourceMappingURL=antd-taro.js.map
