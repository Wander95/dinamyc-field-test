import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Formik,Form,FieldArray,Field, FormikHelpers,useFormik } from 'formik';
import * as Yup from 'yup';


export interface IProcedimiento {
  procedimiento: string;
  codigo: string;
  reclamo: string;
  diferencia: string;
  autorizado: string;
}


function App() {
  const [ itemsArray,setItemsArray ] = useState([]);

  const handleSubmit = (
    values: IProcedimiento, 
    formikHelpers: FormikHelpers<IProcedimiento>
  ):void | Promise<any>=>{
    console.log(values)
    // formikHelpers.submitForm()
  }

  const initialValues = {
    autorizado: '',
    diferencia: '',
    codigo: '',
    procedimiento: '',
    reclamo: ''
  }
  
  const validationSchema =Yup.array().of( Yup.object().shape({
    autorizado: Yup.string().required('Campo requerido'),
    diferencia: Yup.string().required('Campo requerido'),
    codigo: Yup.string().required('Campo requerido'),
    procedimiento: Yup.string().required('Campo requerido'),
    reclamo: Yup.string().required('Campo requerido')
  }))

  const formik = useFormik({onSubmit:handleSubmit,initialValues});
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
          <Form>
            <VStack >
              <Text mb="8px">autorizado</Text>  
              <Field >
                {()=>(
                  <Input value={formik.values.autorizado} onChange={ formik.handleChange } name="autorizado" id="autorizado" width="50"/>
                )}
              </Field>
            </VStack>
            <Button type="submit" colorScheme="blackAlpha"> Submit </Button>
          </Form>
          {/* <HStack mb="5">
            <Input width="50"/>
            <Input width="50"/>
            <Input width="50"/>
          </HStack> */}
          {/* <HStack mb="5">
            <Input width="50"/>
            <Input width="50"/>
            <Input width="50"/>
            <Input width="50"/>
          </HStack> */}
          
        </Formik>
      </header>
    </div>
  );
}

export default App;
