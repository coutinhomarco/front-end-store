import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

class FormReview extends Component {
  render() {
    const { handleButtonSubmit } = this.props;
    return (
      <Form onSubmit={ handleButtonSubmit }>
        <div>
          Avaliação do produto
          <Form.Check
            inline
            label="1"
            name="avaliator"
            type="radio"
            id="one"
          />
          <Form.Check
            inline
            label="2"
            name="avaliator"
            type="radio"
            id="two"
          />
          <Form.Check
            inline
            label="3"
            name="avaliator"
            type="radio"
            id="three"
          />
          <Form.Check
            inline
            label="4"
            name="avaliator"
            type="radio"
            id="four"
          />
          <Form.Check
            inline
            label="5"
            name="avaliator"
            type="radio"
            id="five"
          />
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="nome@exemplo.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comentários</Form.Label>
          <Form.Control
            data-testid="product-detail-evaluation"
            as="textarea"
            rows={ 3 }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Avaliar
        </Button>
      </Form>
    );
  }
}

FormReview.propTypes = {
  handleButtonSubmit: PropTypes.func.isRequired,
};

export default FormReview;
