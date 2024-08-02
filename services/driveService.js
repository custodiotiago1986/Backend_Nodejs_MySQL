const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuração do cliente OAuth2
const credentials = require('../credentials.json'); // Verifique o caminho para o arquivo de credenciais

const TOKEN_PATH = 'token.json';
const FILE_ID = '1a9clPs_3kJ95l6Ez12do6bcZVZUydyvI'; // ID do arquivo no Google Drive

const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  'http://localhost' // URL de redirecionamento, ajuste conforme necessário
);

// Função para carregar o token
const loadToken = () => {
  try {
    const token = fs.readFileSync(TOKEN_PATH, 'utf8');
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    console.error('Erro ao carregar o token:', err);
  }
};

// Função para obter o serviço do Google Drive
const getDriveService = () => {
  return google.drive({ version: 'v3', auth: oAuth2Client });
};

// Função para obter dados do arquivo no Google Drive
const getFileData = async () => {
  const drive = getDriveService();
  try {
    const response = await drive.files.get({
      fileId: FILE_ID,
      alt: 'media'
    });
    return response.data;
  } catch (err) {
    console.error('Erro ao obter o arquivo do Google Drive:', err);
  }
};

// Inicializar o carregamento do token
loadToken();

module.exports = {
  getFileData
};