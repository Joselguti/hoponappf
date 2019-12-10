## Descripción
EL proyecto consta de la creación de una conexión entre un end device, un servidor y posteriormente transmitir esa información a una entidad de seguridad (carabineros, bomberos, ambulancia, etc). Se recibe un sms, iMessage o mensaje de Hangouts y la información contenida en el mensaje se envía a un servidor para que esta a su vez sea enviada a la entidad de seguridad.
Para el manejo de recepción de información se está trabajando con Twilio y el servidor que recibe la info está en Firebase.
Adicionalmente se está creando una pagina web, la cual tiene como objetivo poder generar una alerta sin tener el end device (celular) a mano. Está página se está creando con Node.
De manera alternativa, se está trabajando con WhatsApp, ya que esta app tiene un nivel de penetración muy alto dentro del mercado chileno.

## Futuro iMessage
iMessage es solo gratis entre iPhones, cuando se mandan mensajes desde un iPhone a otro celular no iPhone es un simple sms. Su implementación requiere de una app nativa, por lo que se vuelve más compleja la implementación.

## Sobre Hangouts
Para poder tener correctamente un bot funcional sobre la plataforma de Hangouts, es necesario tener una cuenta "Google Suite"
Dado que hangouts está en proceso de cambio hacia google chat, se modificará el bot hacia esa plataforma.

## Instalaciones necesarias
- Node: [Node.js](https://nodejs.org/en/)
- Npm: [npm | build amazing things](https://www.npmjs.com/)

## Como editar?
1. Instalar Node y Npm en el ordenador
2. Iniciar el Npm, utilizando un terminal abierto en la carpeta del proyecto. Utilizar el comando `npm start`
3. Acceder a la dirección localhost:3000
4. En esta página se pueden ver los mensajes recibidos y emitidos al número de emergencia

## Descripción de las carpetas y archivos en el proyecto
![Express](https://mdn.mozillademos.org/files/14456/MVC%20Express.png)

### Controllers
Consta de los controladores necesarios para manejar los request cuando se quiere acceder a una  de las páginas que se encuentran en la carpeta views o a alguno de los models. Manejan la lectura/escritura de info en los modelos y  el acceso al archivo de views correcto, enviado todo en una respuesta  HTTP
#### authController.js
Es uno de los controladores fundaméntales para el el sistema de login de la página, ya que se encarga de la autorización y validación del usuario.
#### dashboardController.js
Solicita la info de los mensajes recibidos en Twillio y en WhatsApp, también se asegura de que la persona esté autenticada. Adicionalmente tiene un control de errores en caso de no poder obtener alguno de los mensajes.
#### errorController.js
No está en uso actualmente
#### homeController.js
Toma el request para la página home e indica el view a mostrar correspondiente
#### smsController.js
Hace la solicitud de información al modelo de Twilio, Firebase para mostrar la info de los mensajes recibidos. Adicionalmente envía un correo con la información del mensaje recibido.
#### whatsappController.js
Hace la solicitud de información al modelo de WhatsApp, Firebase para mostrar la info de los mensajes recibidos. Adicionalmente envía un correo con la información del mensaje recibido.
#### hangoutsController.js
Hace la solicitud de información al modelo de Hangouts, recibe y manda mensajes al usuario

### Models
Acá se encuentran los puentes hacia las BD, manejan el envío y recepción de información hacia y desde la BD
#### smsNexmoModel.js
Define el esquema con el cual se maneja la información de la BD en Nexmo, actualmente no se usa Nexmo.
#### smsTwilioModel.js
Define el esquema de los datos a recibir o enviar a la BD de Twilio.
#### userModel.js
Define el esquema de datos para trabajar el sistema de usuarios.
#### whatsappModel.js
Define el esquema de los datos a recibir o enviar a la BD de WhatsApp.
#### hangoutsModel.js
Define el esquema de los datos a recibir o enviar a la BD de Hangouts.

### Public
Elementos a los cuales acceden las distintas views, sea imágenes, favicons y el CSS
#### CSS
##### main.css
Actualmente vacío.
#### images
Contiene diversas imágenes, iconos y favicon utilizados a lo largo de la página web.

### Routes
Las rutas lo que hacen es recibir el request de HTTP y lo envían al controlador correspondiente, cerciorando un buen flujo de la información
#### auth.js
Se encarga de enviar el request al controlador authController
#### error.js
No está en uso actualmente
#### home.js
Se encarga de enviar el request al controlador homeController en caso de una solicitud de la página Home o de About Us. Este controlador se encarga de ambas páginas
#### sms.js
Se encarga de enviar el request al controlador smsController, con la función respectiva que se hará cargo de la solicitud
#### users.js
Se encarga de enviar el request al controlador dashboardController, con la función respectiva que se hará cargo de la solicitud
#### whatsapp.js
Se encarga de enviar el request al controlador whatsappController, con la función respectiva que se hará cargo de la solicitud
#### hangouts.js
Se encarga de enviar el request al controlador hangoutsController, con la función respectiva que se hará cargo de la solicitud

### Views
Acá se encuentra la parte visual de cada página, se puede ver el HTML que compone cada página y por lo tanto, editar el front end que ve el usuario
#### auth
##### login.ejs
Esta página muestra la forma en la cual el usuario puede acceder con su usuario y clave
##### register.ejs
Esta página muestra la forma en la cual un nuevo usuario se puede registrar, ingresando todos los datos pertinentes
#### includes
##### footer.ejs
El footer es transversal en las views, está incluido en todas las views. Se encarga de mostrar al final de la página un conjunto de información constante
##### header.ejs
El header es transversal en las views, incluido en todas las views. Se encarga de tener los links a recursos necesarios, como lo es Bootstrap (encargado del CSS), por ejemplo.
##### nav.ejs
El nav es transversal en las views, incluido en todas las views. Es la barra superior en donde se desplegan  los menús y distintas opciones. Es dinámico, ya que cambia dependiendo de si hay un usuario autorizado o no.
#### 404.ejs
Página desplegada cuando no se encuentra la página indicada.
#### aboutUs.ejs
Muestra una breve descripción de lo que se quiere lograr con la implementación de todo el sistema, además de los aliados y cómo funciona.
#### dashboard.ejs
Se muestran los distintos mensajes recibidos, ya sea por sms, Hangouts o WhatsApp, en una lista ordenada con la información que contiene cada uno.
#### home.ejs
Primera página mostrada cuando se ingresa la URL, contiene una breve descripción de lo que somos.
#### sms.ejs
Página en desarrollo.
### app.js
Define el uso de sesiones, las rutas y los puertos para conectarse al servidor.

### Package.json
Define las versiones en uso de diversas plataformas.

### serviceAccountKey.json
Define los parámetros necesarios para acceder a Firebase.

## Proyecto de SMS, iMessages y Hangouts  
 - Servidor: Heroku
 - Website: https://smsprojectuai.herokuapp.com/

## Tecnologias:
 - Node.js
 - Express.js
 - EJS
 - Firebase
 - Twillio
 - Mongoose (Temporal)

## Versiones
- 0.1: Login + Registro
- 0.2: Integración SMS
- 0.3: Transmisión de info via email
- 0.4: Integración Whatsapp
- 0.5: Compatibilización con Firebase
- 0.6: Integración Google Hangouts