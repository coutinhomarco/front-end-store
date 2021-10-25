import React from 'react';
import PropTypes from 'prop-types';

function Categories({ id, name }) {
  return (
    <div className="form-check">
      <label className="form-check-label" htmlFor={ id }>
        <input
          className="form-check-input"
          type="radio"
          name="categories"
          id={ id }
          value={ id }
          data-testid="category"
        />
        { name }
      </label>
    </div>
  );
}

Categories.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Categories;
