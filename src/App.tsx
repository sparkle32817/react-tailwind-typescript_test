import React, { useEffect, useState } from "react";
import { MainModal, ConfirmModal, EditModal } from "./components/modal/index";
import "./styles/index.css";
import Table from "./components/table/index";

const App = () => {
  const [data, setData] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>();
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Address1',
      accessor: 'address1',
    },
    {
      Header: 'Address2',
      accessor: 'address2',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Zip',
      accessor: 'zip',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props: any) => <div className="flex justify-between p-4">
        <button className="bg-green-600 hover:bg-green-500 mr-4 p-2 outline-none text-white" onClick={(e) => handleEdit(props.row.original)}>Edit</button>
        <button className="bg-red-600 hover:bg-red-500 p-2 outline-none text-white" onClick={(e) => handleDelete(props.row.original.id)}>Delete</button>
      </div>
    }
  ];


  useEffect(() => {
    fetch("https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(result => {
        setData(result);
      });
  }, []);


  const handleEdit = (row: any) => {
    console.log(row)
    setEditData(row);
    setEditModalIsOpen(true)
  }

  const handleDelete = (id: number) => {
    fetch(
      "https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address/" + id,
      {
        method: "delete"
      }
    )
    const removedData = data.filter((item: any) => item.id !== id);
    setData(removedData)
  };

  return (
    <div className="App p-5">
      <div className="w-10/12 mr-auto ml-auto my-1 top-bar flex justify-start">
        <button
          className="btn-create rounded bg-blue-700 hover:bg-blue-600 text-gray-100 px-3 py-2"
          onClick={() => setModalIsOpen(true)}
        >
          Create
        </button>
      </div>

      <Table
        data={data}
        columns={columns}
      />
      <MainModal
        isOpen={modalIsOpen}
        data={data}
        setData={setData}
        onRequestClose={() => setModalIsOpen(false)}
      />
      {
        editData &&
        <EditModal
          editData={editData}
          isOpen={editModalIsOpen}
          data={data}
          setData={setData}
          onRequestClose={() => setEditModalIsOpen(false)}
        />
      }
    </div>
  );
};

export default App;
