# Área privada com Google

Esta área usa Firebase Authentication e pode ser hospedada normalmente no GitHub Pages.

1. Crie um projeto em [Firebase Console](https://console.firebase.google.com/) e registre uma aplicação **Web**.
2. Em **Authentication > Sign-in method**, habilite o provedor **Google**.
3. Em **Authentication > Settings > Authorized domains**, adicione o domínio publicado pelo GitHub Pages: `SEU_USUARIO.github.io` (ou seu domínio próprio).
4. Copie o objeto `firebaseConfig` da aplicação Web para [admin-config.js](./admin-config.js) e troque `allowedEmail` pelo seu e-mail Google, em minúsculas.
5. Publique todos os arquivos no GitHub Pages e abra a raiz do site. O `index.html` encaminha automaticamente para o portfólio. O login do Google não funciona ao abrir o arquivo diretamente pelo Explorador de Arquivos.

O `firebaseConfig` é identificação pública da aplicação; a proteção é feita pelo Firebase e pela comparação com o e-mail autorizado. Não adicione senha, chave privada ou credenciais de serviço a este repositório.
