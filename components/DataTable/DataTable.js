import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { datatableActions } from "../../store/actions/datatable.actions";
import MaterialTable from 'material-table';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";



const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

// regex for email validation
// TODO: use Formik package to validate form values
const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}


const DataTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.datatable);
  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: 'NAME', field: 'name' },
    { title: 'USERNAME', field: 'username' },
    { title: 'EMAIL', field: 'email' },
    { title: 'PHONE', field: 'phone' },
    { title: 'WEBSITE', field: 'website' },
  ]

  // let data = [
  //   { name: 'robert', username: 'ryarborough', email: 'admin@robert-yarborough.com', phone: '9999999999', website: 'http://robert-yarborough.com' }
  // ]

  useEffect(() => {
    dispatch(datatableActions.getUsers());
    const payloadMap = new Map(Object.entries(users.payload));
    const getPayload = payloadMap.get('data');
    console.log('payload', getPayload);
    setUser(getPayload);
    console.log('user', {user} );
  }, []);


  //function for updating the existing row details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.name === "") {
      errorList.push("Try Again, You didn't enter the name field")
    }
    if (newData.username === "") {
      errorList.push("Try Again, You didn't enter the Username field")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Oops!!! Please enter a valid email")
    }
    if (newData.phone === "") {
      errorList.push("Try Again, Phone number field can't be blank")
    }
    if (newData.website === "") {
      errorList.push("Try Again, Enter website url before submitting")
    }

    if (errorList.length < 1) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${newData.id}`, newData)
        .then(response => {
          const updateUser = [...user];
          const index = oldData.tableData.id;
          updateUser[index] = newData;
          setUser([...updateUser]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
  }


  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${oldData.id}`)
      .then(response => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.name === "") {
      errorList.push("Try Again, You didn't enter the name field")
    }
    if (newData.username === "") {
      errorList.push("Try Again, You didn't enter the Username field")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Oops!!! Please enter a valid email")
    }
    if (newData.phone === "") {
      errorList.push("Try Again, Phone number field can't be blank")
    }
    if (newData.website === "") {
      errorList.push("Try Again, Enter website url before submitting")
    }

    if (errorList.length < 1) {
      dispatch(datatableActions.addUser(newData, resolve));
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }


  return (
    <div className="app">
      <h1>Material Table Example Using JSONPlaceholder API</h1> <br /><br />
      <MaterialTable
        title="User Details"
        columns={columns}
        data={user}
        icons={tableIcons}
        options={{
          headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' },
          actionsColumnIndex: -1
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            }),
        }}
      />

      <div>
        {iserror &&
        <Alert severity="error">
          <AlertTitle>ERROR</AlertTitle>
          {errorMessages.map((msg, i) => {
            return <div key={i}>{msg}</div>
          })}
        </Alert>
        }
      </div>
    </div>
  );
}

export default DataTable;