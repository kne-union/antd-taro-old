import React, {useState, useRef, useEffect} from 'react';
import mergeProps from "../../utils/with-default-props";
import Picker from '../picker';
import withNativeProps from "../../utils/native-props";
import useDateRange, {valueToDate, dateToValue, renderLabel} from '../../utils/use-date-range';
import useControlValue from "@kne/use-control-value";

const classPrefix = `adm-date-picker`

const defaultProps = {
  min: new Date('1949-10-01'), max: new Date(), defaultValue: new Date(), precision: 'day', renderLabel
};

const DatePicker = (p) => {
  const {precision, max, min, renderLabel, soFar, ...props} = mergeProps(defaultProps, p);
  const [value, onChange] = useControlValue(props);
  const [innerValue, setInnerValueChange] = useState(dateToValue(value));

  useEffect(() => {
    setInnerValueChange(dateToValue(value));
  }, [value]);

  const range = useDateRange({
    precision, value: valueToDate(innerValue), max, min, renderLabel, soFar
  });

  const rangeRef = useRef([]);
  rangeRef.current = range;

  return withNativeProps(props, <Picker {...props} columns={range} value={dateToValue(value)}
                                        onColumnChange={(value) => {
                                          setInnerValueChange(value);
                                        }} onChange={(value) => {
    onChange(valueToDate(value));
  }} className={classPrefix}/>);
};

export default DatePicker;
