import PropTypes from 'prop-types';
import styles from './Form.module.css';

const FormAddContact = ({ onHandleSubmit }) => {
  const values = {
    name: '',
    number: '',
  };

  const onChanges = e => {
    values[e.target.name] = e.target.value;
    return;
  };

  const cleanValues = e => {
    e.target.elements.name.value = '';
    e.target.elements.number.value = '';
  };

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        onHandleSubmit(values);
        cleanValues(e);
      }}
    >
      <label htmlFor="">Name</label>
      <input
        onChange={onChanges}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="">Number</label>
      <input
        onChange={onChanges}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

FormAddContact.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default FormAddContact;
