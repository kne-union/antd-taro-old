import React, {useState, useEffect, useMemo} from 'react';
import Picker from '../picker';
import withNativeProps from "../../utils/native-props";
import useControlValue from "@kne/use-control-value";

const classPrefix = `adm-date-picker`

const SalaryRangePicker = (props) => {
  const { max=500 } = props;
  const [valueProp, onChange] = useControlValue(props);
  const value = valueProp || [1,2];
  const [innerValue, setInnerValueChange] = useState(value);

  useEffect(() => {
    if(value && Array.isArray(value) && value.length>1){
      setInnerValueChange(value);
    }
  }, [value]);

  const columns=useMemo(()=>{
    const salary_start = Array.from(new Array(max).keys()).slice(1)
      .map(item=>({label:`${item}K`,value:item}));

    const salary_end = Array.from(new Array(max).keys()).slice(innerValue[1])
      .map(item=>({label:`${item}K`,value:item}));

    return [salary_start,salary_end]
  },[innerValue])

  return withNativeProps(props, <Picker {...props} value={innerValue} onColumnChange={(value) => {
    if(value[0]){
      setInnerValueChange([value[0],value[0]+1])
    }
  }}  onChange={onChange}  columns={columns} className={classPrefix}/>);
};

export default SalaryRangePicker;
