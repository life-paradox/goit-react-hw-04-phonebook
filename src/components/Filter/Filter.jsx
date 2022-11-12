import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={css.filterInput}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
};
