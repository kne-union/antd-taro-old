import React, {useState, useEffect} from 'react';
import mergeProps from "../../utils/with-default-props";
import Picker from '../picker';
import withNativeProps from "../../utils/native-props";
import useDateRange, {valueToDate, dateToValue, renderLabel} from '../../utils/use-date-range';
import precisionToLength from '../../utils/precision-to-length';
import useControlValue from "@kne/use-control-value";

const classPrefix = `adm-date-picker`

const defaultProps = {
  min: new Date('1949-10-01'), max: new Date(), defaultValue: [new Date(), new Date()], precision: 'month', renderLabel
};

const DatePicker = (p) => {
  const {precision, max, min, renderLabel, soFar, ...props} = mergeProps(defaultProps, p);
  const [valueProp, onChange] = useControlValue(props);
  const value = valueProp || [];
  const [innerValue, setInnerValueChange] = useState([dateToValue(value[0], precision), dateToValue(value[1]), precision]);

  useEffect(() => {
    setInnerValueChange([dateToValue(value[0], precision), dateToValue(value[1], precision)]);
  }, [value]);

  const rangeStart = useDateRange({
    precision, value: valueToDate(innerValue[0]), max, min, renderLabel
  });
  const rangeEnd = useDateRange({
    precision, value: valueToDate(innerValue[1]), max, min: valueToDate(innerValue[0]), renderLabel, soFar
  });

  const length = precisionToLength(precision);

  return withNativeProps(props, <Picker {...props} columns={[...rangeStart, ...rangeEnd]}
                                        value={[...dateToValue(value[0], precision), ...dateToValue(value[1], precision)]}
                                        onColumnChange={(value) => {
                                          setInnerValueChange([value.slice(0, length), value.slice(length)]);
                                        }} onChange={(value) => {
    onChange([valueToDate(value.slice(0, length)), valueToDate(value.slice(length))]);
  }} className={classPrefix}/>);
};

export default DatePicker;
