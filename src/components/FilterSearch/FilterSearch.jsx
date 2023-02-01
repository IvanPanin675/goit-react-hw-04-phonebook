import PropTypes from 'prop-types';
import styles from './Filter.module.css'

const FilterSearch = ({ onSearchName, filter }) => {
  return (
    <>
      <div className={styles.filter}>
      <p>Find contacts by name</p>
      <input onChange={onSearchName} type="text" name="filter" value={filter} required/>
      </div>
    </>
  );
};

FilterSearch.propTypes = {
  onSearchName: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default FilterSearch;
