import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getfilter } from "../../redux/actions";


const Filter = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
    dispatch(getfilter(selectedValue));
  };

  return (
    <div>
      <label htmlFor="filterSelect">Filtrar:</label>
      <select
        id="filterSelect"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="">Mostrar todos</option>
        <option value="1">filtro de A a Z</option>
        <option value="2">filtro de Z a A</option>
        <option value="3">createdByDB: true</option>
        <option value="4">createdByDB: false</option>
        <option value="5">attack de mayor a menor</option>
        <option value="6">attack de menor a mayor</option>
      </select>
    </div>
  );
};

export default Filter;





