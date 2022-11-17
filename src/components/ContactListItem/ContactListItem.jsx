import React, { memo } from 'react';
import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

const ContactListItem = memo(({ id, name, number, onDelete }) => {
  return (
    <li className={css.item}>
      <span>
        {name}: {number}
      </span>
      <button className={css.deleteBtn} id={id} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
});

export default ContactListItem;

ContactListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  onDelete: PropTypes.func,
};
