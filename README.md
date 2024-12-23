# pokemon
## Descripción
Esta aplicación permite visualizar una lista de Pokémon favoritos usando la API de PokeAPI. Los datos se almacenan en el Vuex Store y se consumen mediante axios.

## Estructura del Proyecto
- **src/**: Contiene la lógica principal de la aplicación.
  - **assets/**: Imágenes como la del logo de la pokebola.
  - **components/**: Componentes reutilizables como `PokemonCard` y `Loading`.
  - **store/**: Almacenamiento centralizado con Vuex.
  - **views/**: Vistas principales como `Home` y `PokemonList`.

## Dependencias
- `axios` para realizar peticiones HTTP.
- `vuex` para manejar el estado global.

## Características Principales
- **Listar Pokémon**: Obtiene la lista de Pokémon usando la API de PokeAPI.
- **Pantalla de carga**: Se muestra un efecto CSS sobre una imagen de pokebola mientras se cargan los datos.
- **Funcionalidad de compartir**: Copia el nombre del Pokémon y sus atributos al portapapeles.

## Tecnologías Usadas
- Vue.js
- Vuex
- PokeAPI
- Axios

## Nota
Esta aplicación no persiste los datos en una base de datos, todos los datos se manejan en el **store** de Vue.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
