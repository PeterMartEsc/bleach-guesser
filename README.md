# Trabajo final: Bleach Guesser

__Autores: Alejandro Tomás Pacheco Rodríguez, Melissa Ruiz González, Pedro Martín Escuela__

<div align=center>
    <img src="./resources/portada.jpg">
</div>

## Índice

- [Introducción](#intro)

- [Diseño Previo](#diseño)

    - [Wireframe]()

    - [Mockup]()

- [Pasos del codigo](#code)

- [Lógica del código](#logic)

- [Uso del router](#router)

- [Documentación con VueDoc](#vdoc)

### Introducción <a name="intro"></a>

En este repositorio realizaremos el trabajo final para la asignatura de __Desarrollo de Interfaces (DAD)__. La temática del trabajo será un guesser de anime. Se irán mostrando __imágenes aleatorias__ de las carteleras y se deberá acertar que anime es.

### Diseño Previo <a name="diseño"></a>

Nuestro concepto inicial era hacerlo unicamente de personajes de _Bleach_, pero más adelante decidimos modificarlo a __animes__ en general.

El __primer diseño__ de la aplicación que hicimos fue el siguiente wireframe:

<div align=center>
    <img src="./resources/wireframe-simple.png" width=500>
</div>

Y el mockup:

<div align=center>
    <img src="./resources/Mockup.png" width=500>
</div>

Podemos ver una imagen que muestra el __personaje a acertar__. Al empezar a introducir un _nombre_, mostrará la lista de nombres que __coinciden con lo introducido__ y se podrá seleccionar la opción que se desee. Como el concepto se cambió a acertar el anime, se muestran imagenes de la cartelera y no de personajes, pero mantuvimos el formato de __imagen-input-opciones__.

### Codigo <a name="code"></a>

En `App.vue` cargamos el componente principal. En el, tenemos realizada toda la lógica del guesser. Más adelante crearemos un home donde se pueda [elegir las diferentes versiones del juego](). 

<div align=center>
    <img src="./resources/capturas-doc/html.png" width=500>
</div>

En el componente lo que se carga siempre es un encabezado con el titulo, un `v-if/else` para mostrar la imagen solo cuando esté cargada, si no lo está, mostrará _Cargando animes..._

<div align=center>
    <img src="./resources/capturas-doc/html-1.png" width=500>
</div>

<div align=center>
    <img src="./resources/capturas-doc/html-2.png" width=500>
</div>

Debajo de la imagen tenemos el __input__ que muestra las opciones parecidas a lo introducido para que puedas marcarlo desde ahí.

<div align=center>
    <img src="./resources/capturas-doc/html-3.png" width=600>
</div>

Y por ultimo un botón para __adivinar__ y un `<p>` que muestra el __resultado__. Si has acertado, muestra que es correcto y se __cambia el anime__ a otro para seguir jugando.

<div align=center>
    <img src="./resources/capturas-doc/html-4.png" width=500>
</div>

### Lógica <a name="logic"></a>

El funcionamiento de los __juegos__ va a ser __el mismo__ en general. Lo unico que se modificará será el __endpoint de la api__, para obtener los __elementos que queramos__ para los diferentes juegos (personajes, mangas, animes, etc).

Al __cargar__ el componente, se hace `get` a la api para obtener la imagen y el nombre, junto con otros 30 __nombres aleatorios__ de otros animes, por que obtener todos sería mucha carga. 

Luego se almacena la imagen y se carga en el template. El array de nombres se usará para mostrar las opciones al comenzar a escribir. 

Al escribir el usuario en el input, se muestran las opciones coincidentes. El usuario puede __hacer click__ en las opciones para que se intente acertar con esa opción, o a __enter/botón de adivinar__ para intentarlo con lo escrito. 

Ese intento se comprueba, y si es igual al nombre del anime, muestra un mensaje de _¡Correcto! 🎉_, luego hace otra __llamada a la api__ de otro elemento random, y repite el mismo proceso con otro anime. En el caso de fallar el intento, se muestra un mensaje de _Incorrecto, intenta otra vez. ❌_ y permite volver a intentar acertar.

### Router <a name="router"></a>

Finalmente, hemos organizado todos los modos de juego en un router para poder acceder al que se desee pulsando en el elemento indicado. Están disponible:

- Home

- Acertar Personaje 

- Acertar ANime

- Acertar Manga

### VueDoc <a name="vdoc"></a>

A continuación se explicará como se generó la documentación con __VueDoc__. 

Primero tenemos que instalar el __DocGen__:

```bash
    npm i vue-docgen-api
    npm i vue-docgen-cli
```

Luego hay que comentar el código siguiendo la siguiente sintaxis:

- Componentes

```code
    /**
     * Explicación
     * @name nombreDelComponente
     * @description descripcción del componente
     */
```

- Métodos

```code
    /**
     * Explicación
     * @method nombreDeLaFuncion
     */
```

- Parámetro

```code
    /**
     * Explicación
     * @param {type} nombreDeLaFuncion
     */
```

- Elemento del Template

```html
    <!-- Explicación del elemento -->
```

- Estilos

```css
    /* Estilos específicos para este componente */
```

A continuación, configuramos el scrpit para generar la documentación:

```json
    "scripts": {
        "generate-docs": "vue-docgen src/components docs/components"
    }
```

Esto indicará a __VueDoc__ que debe generar la documentación a partir del código fuente en la carpeta `src/components` en la carpeta `docs/components`.

Finalmente, solo queda generar la __documentación__ con:

```bash
    npm run generate-docs
```

Una vez generada la __documentación__, se almacenará en una carpeta llamada docs. Podemos abrir el archivo `index.html` en el navegador para __ver la documentación generada__.

_Nota: por alguna razón, no nos genera correctamente la documentación_

