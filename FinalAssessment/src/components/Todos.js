import React,{useState, useEffect} from 'react';
import MaterialTable from 'material-table';

function Todos() {

  const [data, setData] = useState([])
  const columns = [
    { title: "UserId", field: "userId" },
    { title: "Id", field: "id" },
    { title: "Name", field: "title" },
    { title: "Email", field: "completed" },
   
    { title: "Web Link", field: 'website' }
  ]
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
      })
  }, [])

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Material Table with CRUD operation</h4>
      <MaterialTable
        title="Todos Data"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
        />
    </div>
  );
}

export default Todos;
