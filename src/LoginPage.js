import React, {useState} from "react";
import './LoginPage.css'
import { useNavigate } from 'react-router-dom';
import gql from "graphql-tag";
import {useMutation } from "@apollo/react-hooks";

const AUTH_TOKEN = 'auth_token';

export default function LoginPage(props) {
  const navigate = useNavigate();

  let [data, setData] = useState([]);

  const LOGIN_MUTATION = gql`
    mutation LoginMutation(
      $username: String!
      $password: String!
    ) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: data.username,
      password: data.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/dashboard');
    }
  });

  const onFinish = (event) => {
    event.preventDefault();
    console.log({data});
    login();
  };

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(values => ({...values, [name]: value}));
  };

  return (
    <React.Fragment>
      <div className="layout">
          <form
            name="layout__form"
            className="layout__form"
            onSubmit={onFinish}
          >
            <h3 style={{textAlign: "center"}}>Вход</h3>
            <p style={{textAlign: "center"}}>Уникальная технология доступная для вашего бизнеса уже сейчас!</p>
            <input
              className="layout__input"
              name="username"
              placeholder="Логин"
              onChange={onInputChange}
            />
            <input
              className="layout__input"
              name="password"
              placeholder="Пароль"
              onChange={onInputChange}
            />
            <button type="primary" htmlType="submit" className="layout__button">
              Войти
            </button>
          </form>
      </div>
    </React.Fragment>
  );
}
