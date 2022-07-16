import { OrientationEntity } from "domain/entities/orientation.entity";

export interface AbstractOrientationRepository {
	getOrientation(): Promise<OrientationEntity[]>;
	getById(id: string): Promise<OrientationEntity>;
}
