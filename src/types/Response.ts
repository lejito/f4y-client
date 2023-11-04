/*
En este archivo se define el formato de respuestas JSON proporcionado por el backend.

Una respuesta contiene las siguientes propiedades.
- type (string): Puede ser "success" si la respuesta es satisfactoria, "warning" si no hubo error pero no se obtuvo la respuesta esperada,
    y "error" si ocurrió un error al intentar procesar la respuesta.

- message (string): Es un string con una explicación básica de la respuesta obtenida.

- body (object/array): Contiene un objeto (o listas de objetos) dependiendo de la respuesta dada.

- error (boolean): Es "true" o "false" dependiendo de si al procesar la respuesta hubo un error.

Adicionalmente, también se define una función que sirve para verificar si los parámetros de una petición son los requeridos.
*/

export type Response = {
  type: 'success' | 'warning' | 'error';
  message: string;
  body: object | object[];
  error: boolean;
}