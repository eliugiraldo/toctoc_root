## 🔌 Endpoints Principales

### Módulo de Autenticación
| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| POST   | /auth/register     | Registro de usuario          |
| POST   | /auth/login        | Inicio de sesión (JWT)       |
| POST   | /auth/refresh      | Refrescar token de acceso    |

### Módulo de Pedidos
| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| POST   | /orders            | Crear nuevo pedido           |
| GET    | /orders/{id}       | Obtener detalles de pedido   |
| PATCH  | /orders/{id}/status| Actualizar estado del pedido |

### Módulo de Pagos
| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| POST   | /payments/intent   | Crear intención de pago      |
| POST   | /payments/webhook  | Webhook para notificaciones  |