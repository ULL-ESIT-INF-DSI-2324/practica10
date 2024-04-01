import * as net from 'net';
import { argv } from 'process'; //acceder a los argumentos de la linea de comandos

/**
 * Establece una conexión con el puerto especificado.
 */
const client = net.connect({ port: 60300 }, () => {
  console.log('Conectado al servidor.');

  /**
   * Envía un comando al servidor si se proporcionan argumentos adicionales.
   */
  if (argv.length > 2) { //node nombrearchivo.txt mascomandos
    const command = argv.slice(2).join(' ');
    client.write(command);
  }
});

/**
 * Evento 'data': Se activa cuando el servidor envía una respuesta.
 * 
 * @param data - Respuesta del servidor.
 */
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

/**
 * Evento 'end': Se activa cuando la conexión con el servidor termina.
 */
client.on('end', () => {
  console.log('Desconectado del servidor.');
});

/**
 * Evento 'error': Se activa si hay un error al conectar con el servidor.
 */
client.on('error', (error) => {
    console.error(`Error de conexión: ${error.message}`);
  });
