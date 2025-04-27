# practica3_ecommerce

**Screenshots**

Creación de usuario Admin:

<img width="603" alt="image" src="https://github.com/user-attachments/assets/eef972a6-9f9b-4a56-8959-320765d5152d" />

Login de Admin:

<img width="603" alt="image" src="https://github.com/user-attachments/assets/fa5c33d6-becb-4652-9bd6-94fe0714944a" />

Login de Usuario:

<img width="610" alt="image" src="https://github.com/user-attachments/assets/8ed4587b-130c-49f7-8c0d-95e426dca8d5" />

Crear producto como admin:

<img width="611" alt="image" src="https://github.com/user-attachments/assets/c6fd1ca5-00f5-4a16-bddb-963f32d0583b" />

Crear producto como usuario (no permitido):

<img width="610" alt="image" src="https://github.com/user-attachments/assets/2133c3f5-cef6-4fee-8eda-bd009cb26cea" />

Crear orden como usuario:

<img width="609" alt="image" src="https://github.com/user-attachments/assets/c5233411-86b6-4548-938f-904344165ee8" />

Documentación con Swagger:

![image](https://github.com/user-attachments/assets/2bd75093-4c3d-4896-8799-80519c49668d)

## 📦 Instalación

### Requisitos previos
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local o Atlas)
- [Git](https://git-scm.com/) (opcional)

### 1. Clonar repositorio
```bash
git clone https://github.com/daduke1/practica3_ecommerce.git
cd practica3_ecommerce
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Configurar env
1. Copiar y configurar variables de entorno
```bash
cp .env.example .env
```
2. Editar con credenciales
```bash
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_clave_secreta_aqui
PORT=3000
```
### 4. Base de datos
```bash
mongod --dbpath ./data/db
```

## Documentación de API
+ http://localhost:3000/api-docs

**Conclusión:**
Implementar los endpoints y las operaciones CRUD fue un desafío, ya que javascript es un programa que no manejo al 100, pero fue una práctica que me ayudó a entenderlo más y servirá para el proyecto final. 
La autenticación con JWT fue interesante y me gustó bastante entenderla e implementarla. Nunca había documentado una API con swagger, así que también fue un aprendizaje bueno.
