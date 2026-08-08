const { spawn } = require('child_process');
const path = require('path');

function isServerAvailable() {
  return new Promise((resolve) => {
    const http = require('http');
    const req = http.get('http://127.0.0.1:3000/api/produtos', (res) => {
      res.resume();
      resolve(true);
    });

    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function waitForServer(serverProcess) {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const available = await isServerAvailable();

      if (available) {
        clearInterval(interval);
        resolve(true);
        return;
      }

      if (serverProcess && serverProcess.exitCode !== null) {
        clearInterval(interval);
        resolve(false);
      }
    }, 1000);
  });
}

// Função genérica para executar comandos no terminal e esperar o resultado.
// Serve para rodar tanto o servidor quanto o Cypress sem precisar repetir código.
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit', // mostra a saída do comando no terminal
      shell: true,      // permite executar em ambientes Windows/Unix sem problema
      ...options,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
  });
}

async function main() {
  // Caminho da raiz do projeto para rodar os comandos no diretório correto.
  const projectRoot = path.resolve(__dirname, '..');
  // Usa npm.cmd no Windows e npm no Linux/Mac, para funcionar em qualquer sistema.
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  // Verifica primeiro se a aplicação já está respondendo na porta 3000.
  // Isso evita o erro EADDRINUSE quando algum servidor anterior ainda estiver rodando.
  const serverAlreadyRunning = await isServerAvailable();

  let server = null;

  if (!serverAlreadyRunning) {
    // Inicia a aplicação com o comando npm start.
    // Isso sobe a API antes dos testes começarem.
    server = spawn(npmCommand, ['start'], {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_COLOR: '0' },
    });
  }

  // Espera até a API responder na porta 3000.
  // Isso evita que o Cypress tente rodar antes da aplicação estar disponível.
  const ready = await waitForServer(server);

  if (!ready) {
    console.error('O servidor não ficou disponível para os testes.');
    process.exit(1);
  }

  try {
    // Executa o Cypress apontando para o arquivo de feature desejado.
    // Isso roda os cenários de API após a aplicação já estar no ar.
    await runCommand(npmCommand, ['run', 'cypress:run', '--', '--spec', 'cypress/e2e/features/api_autenticacao.feature', '--browser', 'electron'], { cwd: projectRoot });
  } finally {
    // Garante que o servidor seja encerrado ao final da execução dos testes.
    // Se já existia um servidor externo, não tentamos encerrá-lo.
    if (server && !server.killed) {
      server.kill('SIGTERM');
    }
  }
}

// Ponto de entrada do script.
main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});