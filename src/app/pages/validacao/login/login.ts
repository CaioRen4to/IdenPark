import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from "../../../ComponentsCompartilhados/form/form";
import { Button } from "../../../ComponentsCompartilhados/button/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Form, Button],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  message: string = '';
  formData: any = {};

  loginFields = [
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
    }
  ];

  constructor(private router: Router) {}

  updateFormData(data: any) {
    this.formData = data;
  }

  login() {
    this.message = '';

    
    if (!this.formData.email || !this.formData.senha) {
      this.message = "Preencha email e senha.";
      return;
    }

    const usersJson = localStorage.getItem('users');
    const users: any[] = usersJson ? JSON.parse(usersJson) : [];

    const usuario = users.find(u => 
      u.email === this.formData.email &&
      u.password === this.formData.senha
    );

    if (usuario) {

      localStorage.setItem('logadoUser', JSON.stringify(usuario));
      this.message = "Login realizado com sucesso!";

      // PERMISSÃO E REDIRECIONAMENTO
      const permissao = usuario.permissao;

      if (permissao === 'administrador') {
        this.router.navigate(['/admin']);
        return;
      }

      if (permissao === 'funcionario') {
        this.router.navigate(['/funcionario']);
        return;
      }

      if (permissao === 'aluno') {
        this.router.navigate(['/alunos']);
        return;
      }
      this.message = "Permissão inválida. Entre em contato com o suporte.";
      this.router.navigate(['/home']);
      return;

    } else {
      this.message = "Email e/ou senha incorretos. Tente novamente!";
    }
  }

  goCadastro() {
    setTimeout(() => {
      this.router.navigate(['/cadastro']);
    }, 1500);
  }
}

