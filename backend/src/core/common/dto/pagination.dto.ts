// src/core/common/dto/pagination.dto.ts
export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
  offset?: number; // Agregado para compatibilidad con diferentes estilos de paginación
}