import React from 'react'
import { useField } from 'formik';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel'; 
import FormCheck from 'react-bootstrap/FormCheck'; 


const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
//   console.log("metaaaa", meta)
  return (
 
    <FormGroup>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <FormControl className="text-input" 
      isValid={meta.touched && !meta.error} 
      isInvalid={meta.touched && meta.error} 
      {...field} {...props} />
          {/* <FormControl.Feedback>{meta.error}</FormControl.Feedback> */}
      {meta.touched && meta.error ? (
          <>
         <div className="error">{meta.error}</div>
        </>
      ) : null}
      </FormGroup>
  );
}

export default TextField
