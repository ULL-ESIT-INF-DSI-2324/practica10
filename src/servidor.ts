import * as net from 'net';
import { exec } from 'child_process'; //ejecutar comandos del sistema


const server = net.createServer((connection) => {
  console.log('Cliente conectado.');

  /**
   * Evento 'data': Se activa cuando el cliente envía datos.
   * 
   * @param data - Datos recibidos del cliente.
   */
  connection.on('data', (data) => {
    const command = data.toString().trim(); //convierte los datos recibidos(buffer)

    /**
     * Ejecuta el comando recibido del cliente.
     * 
     * @param command - Comando a ejecutar.
     * @param callback - Callback para manejar la respuesta del comando.
     */
    exec(command, (error, stdout, stderr) => {
      if (error) {
        connection.write(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        connection.write(`Stderr: ${stderr}`);
        return;
      }
      connection.write(`Salida: ${stdout}`);
    });
  });

  /**
   * Evento 'close': Se activa cuando un cliente se desconecta.
   */
  connection.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

/**
 * El servidor empieza a escuchar en el puerto especificado.
 */
server.listen(60300, () => {
  console.log('Servidor escuchando en el puerto 60300.');
});
