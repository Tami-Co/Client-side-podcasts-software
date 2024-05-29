import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ManagerArea() {
  return (
    <div style={{marginTop:'20%'}}>
      <Link underline={false} to={ '/managerArea/addCategory'}>
        <Button >
          add category
        </Button>
      </Link>
      <Link underline={false} to={ '/managerArea/addLecturer'}>
        <Button >
          add lecturer
        </Button>
      </Link>


    </div>

  )
}

export default ManagerArea