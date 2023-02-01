import PropTypes from 'prop-types';
import ItemContactsList from './ItemContactsList/ItemContactsList';
import styles from './ContactList.module.css';

const ContactsList = ({ getVisibleContacts, onDelete }) => {
  return (
    <ul className={styles.ul}>
      {getVisibleContacts.map(({ id, name, number }) => {
        return (
          <ItemContactsList
            key={id}
            name={name}
            number={number}
            onDelete={onDelete}
            deleteId={id}
          />
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  getVisibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
