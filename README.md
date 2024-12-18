# Índice

1. Descargar y configurar el proyecto.
2. Breve explicación general de las librerias complementarias usadas, lógica y estructura del proyecto.

## 1. Descargar y configurar el proyecto.

```bash
git clone https://github.com/mauro-arias/dux-challenge.git
```

Rama: master

Instalar dependencias:

```bash
npm i
```

### Configurar entorno

Crear archivo ".env" en la raíz y agregar la siguiente variable

```bash
API_BASE_URL = "https://staging.duxsoftware.com.ar"
```

### Ejecutar servidor

```bash
npm run dev
```

## 2. Breve explicación general de las librerias usadas, lógica y estructura del proyecto.

### Librerías complementarias utilizadas

1. Tanstack Query: Manejo de estado asíncrono

Ayuda simplificando lógica para realizar las peticiones al servidor y los posibles estados como: isLoading, isError, refetch, etc.
Docs: https://tanstack.com/query/latest/docs/framework/react/overview

2. React Hook Form: Manejo de estado de formularios.

Simplifica los estados y validaciones de formularios.
Docs: https://react-hook-form.com/get-started

### Lógica y estructura del proyecto

1. Estado: Se creó un Context para manejar los siguientes estados:

- user: Usuario seleccionado para editar/eliminar.
- modal: Manejar los posibles estados del modal como: isVisible y modalType
- pagination: Manejar los posibles estados de la paginación de la tabla como: rowsPerPage, currentPage, rowsPerPageOptions
- filters: Manejar los valores de los filtros: usuario y estado.

2. Componentes reutilizables: Se crearon algunos componentes genéricos reutilizables.
   Algunos son:

- Title
- Table
- TableToolbar
- SideBar
- FieldError

Hay varias cosas que se podrían haber componetizado y generalizado más como por ejemplo:

- FormFactory: Un HOC para renderizar inputs, lo que permite realizar formularios mucho más rápido. Al ser un proyecto simple con un solo formulario opté por no desarrollarlo.
- ButtonFactory: Misma idea que el FormFactory, no hay demasiados botones y el componente Botón de PrimeReact me ofrecía la funcionalidad y diseño suficiente.
- ModalForm: Un solo modal genérico con la intención de renderizar un formulario y ejecutar acciones. Opté por hacer un modal específico para el CRUD del usuario (Éste sigue siendo reutilizable para las acciones EDITAR y AGREGAR, pero tiene el formulario hard-coded de usuario)

Entre demás posibles mejoras.
¡Espero les guste mi proyecto!
