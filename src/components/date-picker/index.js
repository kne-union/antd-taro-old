import {useState, useRef, useEffect} from 'react';
import mergeProps from "../../utils/with-default-props";
import Picker from '../picker';
import withNativeProps from "../../utils/native-props";
import useDateRange, {getMonthDayCount} from '../../utils/use-date-range';
import useControlValue from "@kne/use-control-value";
import dayjs from 'dayjs';

const classPrefix = `adm-date-picker`

const defaultProps = {
  min: new Date('1949-10-01'),
  max: new Date(),
  defaultValue: new Date(),
  precision: 'day',
  renderLabel: (type, data) => {
    if (type === 'year') {
      return `${data}年`
    }
    if (type === 'month') {
      return `${data}月`
    }
    if (type === 'day') {
      return `${data}日`
    }
    if (type === 'hour') {
      return `${data.toString().padStart(2, '0')}时`
    }
    if (type === 'minute') {
      return `${data.toString().padStart(2, '0')}分`
    }
    return data;
  }
};

const valueToDate = (value) => {
  if (value[0] === -1) {
    return 'sofar';
  }
  let output = dayjs(new Date(0));
  ['year', 'month', 'date', 'hour', 'minute'].forEach((key, index) => {
    if (value[index] !== void (0)) {
      if (key === 'date' && value[index] > getMonthDayCount(output.year(), output.month())) {
        return getMonthDayCount(output.year(), output.month());
      }
      output = output[key](value[index]);
    } else {
      return;
    }
  });
  return output.toDate();
};

const dateToValue = (value) => {
  if (value === 'sofar') {
    return [-1];
  }
  const date = dayjs(value);
  return [date.year(), date.month(), date.date(), date.hour(), date.minute()];
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
