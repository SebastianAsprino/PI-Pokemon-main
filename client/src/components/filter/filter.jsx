import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getfilter, getPokemons } from '../../redux/actions';

const FILTER_OPTIONS = [
  { value: '', label: 'Mostrar todos' },
  { value: '1', label: 'filtro de A a Z' },
  { value: '2', label: 'filtro de Z a A' },
  { value: '3', label: 'createdByDB: true' },
  { value: '4', label: 'createdByDB: false' },
  { value: '5', label: 'attack de mayor a menor' },
  { value: '6', label: 'attack de menor a mayor' },
];

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
    // "Mostrar todos" no es un filtro de la API: recarga la lista completa.
    const action = selectedValue ? getfilter(selectedValue) : getPokemons();
    dispatch(action).catch(() => {});
  };

  return (
    <div>
      <label htmlFor="filterSelect">Filter:</label>
      <select id="filterSelect" value={selectedFilter} onChange={handleFilterChange}>
        {FILTER_OPTIONS.map(({ value, label }) => (
          <option key={value || 'all'} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
