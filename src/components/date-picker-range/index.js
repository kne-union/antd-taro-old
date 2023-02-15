import {useState, useRef, useEffect} from 'react';
import mergeProps from "../../utils/with-default-props";
import Picker from '../picker';
import withNativeProps from "../../utils/native-props";
import useDateRange, {getMonthDayCount} from '../../utils/use-date-range';
import precisionToLength from '../../utils/precision-to-length';
import useControlValue from "@kne/use-control-value";
import dayjs from 'dayjs';

const classPrefix = `adm-date-picker`

const defaultProps = {
  min: new Date('1949-10-01'),
  max: new Date(),
  defaultValue: [new Date(), new Date()],
  precision: 'month',
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

const dateToValue = (value, precision) => {
  if (value === 'sofar') {
    return [-1];
  }
  const date = dayjs(value);
  const length = precisionToLength(precision);
  return [date.year(), date.month(), date.date(), date.hour(), date.minute()].slice(0, length);
};

const DatePicker = (p) => {
  const {precision, max, min, renderLabel, soFar, ...props} = mergeProps(defaultProps, p);
  const [value, onChange] = useControlValue(props);
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
