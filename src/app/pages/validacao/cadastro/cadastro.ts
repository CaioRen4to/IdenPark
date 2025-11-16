import { Component } from '@angular/core';
import { Button } from "../../../ComponentsCompartilhados/button/button";
import { Form } from "../../../ComponentsCompartilhados/form/form";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [Button, Form],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  message: string = '';
  formData: any = {};

  cadastroFields = [
    { 
      label: 'Nome', 
      type: 'text', 
      name: 'nome', 
      placeholder: 'Digite seu nome' 
    },
    { 
      label: 'Email', 
      type: 'email', 
      name: 'email', 
      placeholder: 'Digite seu email' 
    },
    { 
      label: 'Senha', 
      type: 'password', 
      name: 'senha', 
      placeholder: 'Digite sua senha' 
    },
  ];

  constructor(private router: Router) {}

  updateFormData(data: any) {
    this.formData = data;
  }

  cadastrar() {
    if (!this.formData.nome || !this.formData.email || !this.formData.senha) {
      this.message = 'Por favor, preencha todos os campos.';
      return;
    }

    const newUser = {
      nome: this.formData.nome,
      email: this.formData.email,
      senha: this.formData.senha,
    };

    const userJson = localStorage.getItem('users');
    let users = userJson ? JSON.parse(userJson) : [];

    const userExists = users.some((user: any) => user.email === newUser.email);
    if (userExists) {
      this.message = 'Este email já está cadastrado. Tente Fazer o Login';
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.message = 'Cadastro realizado com sucesso! Redirecionando para o login...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}