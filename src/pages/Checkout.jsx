import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default class Checkout extends Component {
  render() {
    return (
      <Form>
        <Row className="mb-1">
          <Form.Group as={ Col } controlId="checkout-fullName">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              data-testid="checkout-fullname"
              type="text"
              placeholder="Nome"
            />
          </Form.Group>

          <Form.Group as={ Col } controlId="checkout-cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control data-testid="checkout-cpf" type="text" placeholder="CPF" />
          </Form.Group>
        </Row>

        <Row className="mb-1">
          <Form.Group as={ Col } controlId="checkout-email">
            <Form.Label>Email</Form.Label>
            <Form.Control data-testid="checkout-email" type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group as={ Col } controlId="checkout-phone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              data-testid="checkout-phone"
              type="text"
              placeholder="Telefone"
            />
          </Form.Group>
        </Row>

        <Row className="mb-1">
          <Form.Group as={ Col } controlId="checkout-cep">
            <Form.Label>Cep</Form.Label>
            <Form.Control data-testid="checkout-cep" type="text" placeholder="Cep" />
          </Form.Group>

        </Row>

        <Form.Group className="mb-3" controlId="checkout-adress">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
          />
        </Form.Group>

        <Row className="mb-1">
          <Form.Group as={ Col } controlId="checkout-adress-complement">
            <Form.Label>Complemento</Form.Label>
            <Form.Control data-testid type="text" placeholder="Complemento" />
          </Form.Group>

          <Form.Group as={ Col } controlId="checkout-adress-number">
            <Form.Label>Número</Form.Label>
            <Form.Control data-testid type="text" placeholder="Number" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={ Col } controlId="checkout-city">
            <Form.Label>Cidade</Form.Label>
            <Form.Control data-testid type="text" placeholder="Cidade" />
          </Form.Group>

          <Form.Group as={ Col } controlId="checkout-state">
            <Form.Label>Estado</Form.Label>
            <Form.Select data-testid defaultValue="Escolha...">
              <option>Escolha...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Check
          inline
          label="Boleto"
          name="pay-method"
          type="radio"
          data-testid

        />
        <Form.Check
          inline
          label="Visa"
          name="pay-method"
          type="radio"
          data-testid

        />

        <Form.Check
          inline
          label="Master Card"
          name="pay-method"
          type="radio"
          data-testid

        />

        <Form.Check
          inline
          label="Elo"
          name="pay-method"
          type="radio"
          data-testid

        />
        <Button variant="primary" type="submit">
          Comprar
        </Button>
      </Form>
    );
  }
}
