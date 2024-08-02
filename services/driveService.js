const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const credentials = require('../credentials.json'); // Arquivo baixado do Google Cloud Console

const TOKEN_PATH = 'token.json';
const FILE_ID = 'your-file-id'; // Substitua pelo ID do arquivo no Google Drive

// Carrega as credenciais do cliente do Google
const oAuth2Client = new google.auth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);

// Recupera o token de autenticação do arquivo token.json
const getToken = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return reject(err);
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve();
    });
  });
};

// Salva um novo token de autenticação
const saveToken = (token) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return reject(err);
      console.log('Token de autenticação salvo.');
      resolve();
    });
  });
};

// Obtém a autenticação do Google Drive
const authenticate = async () => {
  await getToken();
};

// Obtém todos os usuários do arquivo JSON no Google Drive
const getUsers = async () => {
  await authenticate();
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const file = await drive.files.get({ fileId: FILE_ID, alt: 'media' });
  return JSON.parse(file.data);
};

// Obtém um usuário específico do arquivo JSON
const getUserById = async (id) => {
  const users = await getUsers();
  return users.find(user => user.id === id);
};

// Cria um novo usuário no arquivo JSON
const createUser = async (newUser) => {
  const users = await getUsers();
  users.push(newUser);
  await updateFile(users);
  return newUser;
};

// Remove um usuário do arquivo JSON
const deleteUser = async (id) => {
  let users = await getUsers();
  users = users.filter(user => user.id !== id);
  await updateFile(users);
};

// Atualiza o arquivo JSON no Google Drive
const updateFile = async (users) => {
  await authenticate();
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const fileMetadata = {
    name: 'users.json',
    mimeType: 'application/json',
  };
  const media = {
    mimeType: 'application/json',
    body: JSON.stringify(users),
  };
  await drive.files.update({
    fileId: FILE_ID,
    resource: fileMetadata,
    media: media,
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
};