// src/core/common/dto/pagination.dto.ts
/**
 * DTO para paginación básica
 * FASE 0: Solo estructura simple. Sin validaciones ni lógica.
 * No se usa class-validator aún.
 */
export class PaginationDto {
  page?: number;
  limit?: number;
  total?: number;
}





// --- CÓDIGO ORIGINAL COMENTADO ---
// 
// import { IsInt, Min, Max } from 'class-validator';
// 
// export class PaginationDto {
//   @IsInt()
//   @Min(1)
//   page?: number = 1;
// 
//   @IsInt()
//   @Min(1)
//   @Max(100)
//   limit?: number = 10;
// 
//   get offset(): number {
//     const page = this.page ?? 1;
//     const limit = this.limit ?? 10;
//     return (page - 1) * limit;
//   }
// }
//
// Las validaciones y lógica de offset pertenecen a Fase 5 o Fase 21,
// cuando se configure class-validator y se defina el comportamiento real de paginación.
// En Fase 0, solo se define la estructura base.