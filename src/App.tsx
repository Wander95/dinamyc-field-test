import React, { Fragment, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Formik,Form,FieldArray,Field, FormikHelpers,useFormik, FieldProps } from 'formik';
import * as Yup from 'yup';

import { io } from 'socket.io-client';

const socket = io("http://localhost:4000")

interface testI {
  procedimiento: string;
  codigo: string;
  reclamo: string;
  diferencia: string;
  autorizado: string;
}
export interface IProcedimiento {
  procedimientos: testI[];
  procedimiento: string;
  codigo: string;
  reclamo: string;
  diferencia: string;
  autorizado: string;
}


function App() {
  

  useEffect(()=>{
    socket.connect();
    socket.on("ping",(data)=>{
      console.log('here we have it',data)
    })

    socket.emit('pong')
  },[])

  const [ itemsArray,setItemsArray ] = useState([]);

  const handleSubmit = (
    values: any, 
    formikHelpers: FormikHelpers<IProcedimiento>
  ):void | Promise<any>=>{
    console.log(values)
    // formikHelpers.submitForm()
  }

  const initialValues = {
    procedimientos:[
      {
        autorizado: '',
        diferencia: 'asd',
        codigo: '',
        procedimiento: '',
        reclamo: ''
      },
    ],
    // autorizado: '',
    // diferencia: '',
    // codigo: '',
    // procedimiento: '',
    // reclamo: ''
  }
  
  const validationSchema =Yup.array().of( Yup.object().shape({
    autorizado: Yup.string().required('Campo requerido'),
    diferencia: Yup.string().required('Campo requerido'),
    codigo: Yup.string().required('Campo requerido'),
    procedimiento: Yup.string().required('Campo requerido'),
    reclamo: Yup.string().required('Campo requerido')
  }))


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
          {({values})=>(
            <Form>
              <FieldArray name="procedimientos">
                {({ insert, remove, push })=>(
                  
                  <div>
                    {values.procedimientos.length > 0 && 
                    values.procedimientos.map((procedure,index)=>(
                      <Fragment key={index}>
                        <HStack mb="5" >
                          {values.procedimientos[index].hasOwnProperty('diferencia') && 
                          <VStack >
                            <Text mb="8px">Diferencia</Text>  
                            {/* {console.log(`object`, values.procedimientos)} */}
                            <Field name={`procedimientos.${index}.diferencia`}>
                              {(fieldProps:FieldProps)=>(
                                <Input {...fieldProps.field}  width="50"/>
                              )}
                            </Field>
                          </VStack>
                          } 
                          <VStack >
                            <Text mb="8px">Codigo</Text>  
                            {/* {console.log(`object`, values.procedimientos)} */}
                            <Field name={`procedimientos[${index}].codigo`}>
                              {(fieldProps:FieldProps)=>(
                                <Input {...fieldProps.field}  width="50"/>
                              )}
                            </Field>
                          </VStack>
                          <VStack >
                            <Text mb="8px">Procedimiento</Text>  
                            {/* {console.log(`object`, values.procedimientos)} */}
                            <Field name={`procedimientos[${index}].procedimiento`}>
                              {(fieldProps:FieldProps)=>(
                                <Input {...fieldProps.field}  width="50"/>
                              )}
                            </Field>
                          </VStack>
                          <VStack >
                            <Text mb="8px">Reclamo</Text>  
                            {/* {console.log(`object`, values.procedimientos)} */}
                            <Field name={`procedimientos[${index}].reclamo`}>
                              {(fieldProps:FieldProps)=>(
                                <Input {...fieldProps.field}  width="50"/>
                              )}
                            </Field>
                          </VStack>
                          <VStack >
                            <Text mb="8px">autorizado</Text>  
                            {/* {console.log(`object`, values.procedimientos)} */}
                            <Field name={`procedimientos[${index}].autorizado`}>
                              {(fieldProps:FieldProps)=>(
                                <Input {...fieldProps.field}  width="50"/>
                              )}
                            </Field>
                          </VStack>
                        </HStack>   
                       
                      </Fragment>
                    ))}
                     <Button colorScheme="blackAlpha" onClick={()=>{push({
                      autorizado: '',
                      diferencia: '',
                      codigo: '',
                      procedimiento: '',
                    })}} > Add procedimiento </Button>
                  </div>
                )}
              </FieldArray>

              <Button type="submit" colorScheme="blackAlpha"> Submit </Button>
            </Form>
          )}
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
