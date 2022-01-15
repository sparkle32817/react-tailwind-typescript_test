import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { createImportSpecifier } from "typescript";


export const EditModal = ({ isOpen, onRequestClose, editData,data, setData }: any) => {
    const [name, setName] = useState<any>();
    const [address1, setAddress1] = useState<any>();
    const [address2, setAddress2] = useState<any>();
    const [city, setCity] = useState<any>();
    const [state, setState] = useState<any>();
    const [zip, setZip] = useState<any>();

    const submit = (e: any) => {
        e.preventDefault();
        const formData = {
            name: name,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip
        };
        fetch("https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address/" + editData.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then((result: any) => {
                setData([result, ...data])
                onRequestClose();
            });
    }

    useEffect(() => {
        setName(editData.name);
        setAddress1(editData.address1);
        setAddress2(editData.address2);
        setCity(editData.city);
        setState(editData.state);
        setZip(editData.zip);
    }, [editData])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="w-9/12 m-auto bg-black opacity-75 py-10 px-16 rounded"
            contentLabel="Example Modal">
            <form onSubmit={submit} id="submitForm" className="flex flex-col">
                <label
                    htmlFor="name"
                    className="text-white text-2xl flex justify-between mb-3">
                    Name {" "}
                    <input
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="bg-transparent border border-white rounded outline-none p-2"
                    />
                </label>
                <label
                    htmlFor="address1"
                    className="text-white text-2xl flex justify-between mb-3">
                    Address1 &nbsp;{" "}
                    <input
                        name="address1"
                        id="address1"
                        value={address1}
                        onChange={e => setAddress1(e.target.value)}
                        className="bg-transparent border border-white rounded outline-none p-2"
                    />
                </label>
                <label
                    htmlFor="address2"
                    className="text-white text-2xl flex justify-between mb-3">
                    Address2 &nbsp;{" "}
                    <input
                        name="address2"
                        id="address2"
                        value={address2}
                        onChange={e => setAddress2(e.target.value)}
                        className="bg-transparent border border-white rounded outline-none p-2"
                    />
                </label>
                <label
                    htmlFor="city"
                    className="text-white text-2xl flex justify-between mb-3">
                    City {" "}
                    <input
                        name="city"
                        id="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="bg-transparent border border-white rounded outline-none p-2"
                    />
                </label>
                <label
                    htmlFor="state"
                    className="text-white text-2xl flex justify-between mb-3">
                    State {" "}
                    <input
                        name="state"
                        id="state"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        className="bg-transparent border border-white rounded outline-none p-2"
                    />
                </label>
                <label
                    htmlFor="zip"
                    className="text-white text-2xl flex justify-between mb-3">
                    Zip {" "}
                    <input
                        name="zip"
                        id="zip"
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                        className="bg-transparent border border-white rounded outline-none p-2"
                    />
                </label>
                <button className="mt-8 w-full border border-white rounded py-3 text-2xl text-white font-semibold hover:border-blue-700 hover:text-blue-700">
                    Save
                </button>
            </form>
        </Modal>
    )
}