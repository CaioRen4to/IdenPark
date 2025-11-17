import { Component } from '@angular/core';
import { Button } from "../../../ComponentsCompartilhados/button/button";
import { Form } from "../../../ComponentsCompartilhados/form/form";
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [Button, Form, RouterLink],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'], 
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
    {
      label: 'Aluno, Funcionário ou Administrador?',
      type: 'radio',
      name: 'usuarioTipo', 
      options: [
        { label: 'Aluno', value: 'aluno' },
        { label: 'Funcionário', value: 'funcionario' },
        { label: 'Administrador', value: 'administrador' }
      ]
    }
  ];

  constructor(private router: Router) {}

  updateFormData(data: any) {
    this.formData = data;
  }

  cadastrar() {
    this.message = '';

    if (!this.formData.nome || 
        !this.formData.email || 
        !this.formData.senha || 
        !this.formData.usuarioTipo
    ) {
        this.message = "Por favor, preencha todos os campos.";
        return;
    }

    const newUser = {
        nome: this.formData.nome,
        email: this.formData.email,
        password: this.formData.senha,
        permissao: this.formData.usuarioTipo 
    };

    const usersJson = localStorage.getItem('users');
    const users: any[] = usersJson ? JSON.parse(usersJson) : [];
    
    const userExist = users.some(user => user.email === newUser.email);

    if (userExist) {
        this.message = 'Email já está cadastrado. Tente fazer o Login!';
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.message = "Cadastro realizado com sucesso! Redirecionando...";

    setTimeout(() => {
        this.router.navigate(['/login']); 
    }, 1000);
  }
  
}
