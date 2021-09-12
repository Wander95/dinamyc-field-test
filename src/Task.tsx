import { Button, IconButton } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import { DeleteIcon } from '@chakra-ui/icons';

import { io } from 'socket.io-client';



interface ITask {
  task_name: string;
  task_title: string;
}


const socket = io("http://d5a6-148-103-70-55.ngrok.io")
const Task = () => {
  
  // socket.on("ping",(data)=>{
  //   console.log('here we have it',data)
  // })

  // socket.emit('pong')
  const [ list,setList ] = useState([])
  useEffect(()=>{
    socket.connect();
    socket.on('get:task',(data)=>{
      setList(data)
    })

    return ()=>{
      socket.off('get:task',(data)=>{
        setList(data)
      })
    }
  },[])

  const initialValues = {
    task_name:'',
    task_title:''
  }

  const handleSubmit = (
    values: any, 
    formikHelpers: FormikHelpers<ITask>
  ):void | Promise<ITask>=>{
    console.log(values)
    // formikHelpers.submitForm()
    socket.emit('new:task',values)
    // socket.emit('new:task',values)
    formikHelpers.resetForm()
  }
  return (
    <div>
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
        <Formik 
          onSubmit={handleSubmit} 
          initialValues={initialValues}>
            {({values})=>(
              <Form>
                <Field name="task_name">
                  {(fieldProps:FieldProps)=>(
                    <Input {...fieldProps.field} mb="3"/>
                  )}
                </Field>
                <Field name="task_title">
                  {(fieldProps:FieldProps)=>(
                    <Input {...fieldProps.field} mb="3"/>
                  )}
                </Field>
                <Button colorScheme="blackAlpha" type="submit"> Submit</Button>
              </Form>
            )}
        </Formik>

        <Table variant="simple" colorScheme="telegram" width="50%">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th>info</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((listItem:ITask,index)=>(
              <Tr key={index}>
                <Td>{listItem.task_name}</Td>
                <Td>{listItem.task_title}</Td>
                <Td>
                  <IconButton
                    onClick={()=>{
                      socket.emit('delete:task',listItem)
                    }}
                    colorScheme="blue" 
                    aria-label="delete-icon" 
                    icon={<DeleteIcon />} />
                </Td>
              </Tr>
            ))}

          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
            </Tr>
          </Tfoot>
        </Table>
      </header>
    </div>
 
    </div>
  )
}

export default Task
