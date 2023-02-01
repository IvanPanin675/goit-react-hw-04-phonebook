import PropTypes from 'prop-types';
import styles from './ItemContacts.module.css';

const ItemContactsList = ({ name, number, onDelete, deleteId }) => {
  return (
    <li className={styles.item}>
      {name}: {number}
      <button className={styles.btn} onClick={() => onDelete(deleteId)}>
        Delete
      </button>
    </li>
  );
};

ItemContactsList.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleteId: PropTypes.string.isRequired,
};

export default ItemContactsList;
