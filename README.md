# 🌐 Angular User Manager

**Angular User Manager** es una aplicación web desarrollada con **Angular**, diseñada para implementar un **CRUD completo** (Create, Read, Update, Delete) consumiendo una **API REST externa**.  

La aplicación sigue un **sistema de componentes y rutas funcional**, con separación lógica de vistas, servicios e interfaces, aplicando buenas prácticas de desarrollo frontend moderno.

---

## ✨ Características principales

- **Listado dinámico de usuarios**: vista en **grid** mostrando foto, nombre y acciones rápidas.
- **Detalle de usuario**: vista individual con todos los datos proporcionados por la API.
- **Formulario reutilizable** para **crear** y **actualizar** usuarios, con validaciones reactivas (email válido, campos obligatorios, etc.).
- **CRUD completo contra API externa**: integración con `https://peticiones.online/users`.
- **Eliminación con confirmación** mediante alertas (SweetAlert).
- **Sistema de rutas en Angular** (`/home`, `/user/:id`, `/newuser`, `/updateuser/:id`).
- **Comunicación entre componentes** a través de servicios e inputs/outputs.

---

## 🧱 Arquitectura y diseño

- **Angular Components & Routing**:  
  - `HomeComponent`: listado de usuarios en formato grid.  
  - `UserDetailComponent`: vista de detalle de usuario.  
  - `UserFormComponent`: formulario reutilizado para altas y actualizaciones.  
- **Servicios Angular**: `UserService` encargado de gestionar las peticiones HTTP y centralizar la lógica de negocio.  
- **Interfaces TypeScript** para tipado seguro de entidades (`User`, `ApiResponse`).  
- **Formularios con validaciones reactivas** (`ReactiveFormsModule`).  
- **Tailwind CSS** integrado para maquetación y estilos.  

---

## 🛠️ Tecnologías utilizadas

- **[Angular](https://angular.io/)** (v16+): framework principal de desarrollo.  
- **[TypeScript](https://www.typescriptlang.org/)**: tipado estático y robustez en el desarrollo.  
- **[TailwindCSS](https://tailwindcss.com/)**: estilos y componentes UI.  
- **[SweetAlert2](https://sweetalert2.github.io/)**: modales y confirmaciones de borrado.  
- **[Git](https://git-scm.com/)**: control de versiones y seguimiento del desarrollo.  

---

## 🚀 Puesta en marcha

### Requisitos
- Node.js 18+
- Angular CLI

### Clonar y ejecutar
```bash
git clone https://github.com/tu-usuario/angular-api-crud.git
cd angular-api-crud
npm install
ng serve -o

