import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/productSlice";
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const saveData = async (e) => {
    e.preventDefault()
    await dispatch(createProduct({title,price}))
    navigate('/')
  }

  return (
    <form onSubmit={saveData} className="box mt-5">
      <div className="field">
        <label htmlFor="" className="label">
          Title
        </label>
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="" className="label">
          Price
        </label>
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-success">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
