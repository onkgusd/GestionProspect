import { Observable } from 'rxjs';
import { DeleteResponseDto } from '../dto/delete-response-dto';

export interface IEntityService<T> {
  /**
   * Retrieves all entities.
   * @returns Observable of an array of entities
   */
  getAll(): Observable<T[]>;

  /**
   * Retrieves a specific entity by its identifier.
   * @param id The identifier of the entity
   * @returns Observable of the entity
   */
  get(id: number): Observable<T>;

  /**
   * Adds a new entity.
   * @param entity The entity object to add
   * @returns Observable of the added entity
   */
  add(entity: T): Observable<T>;

  /**
   * Updates an existing entity.
   * @param entity The entity object to update
   * @returns Observable of the updated entity
   */
  update(entity: T): Observable<T>;

  /**
   * Deletes an entity specified by its identifier.
   * @param idEntity The identifier of the entity to delete
   * @returns Observable of the deletion result
   */
  delete(idEntity: number): Observable<DeleteResponseDto>;
}
