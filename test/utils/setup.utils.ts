/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";
import { Connection, getConnection, getRepository } from "typeorm";
import { Builder, fixturesIterator, IFixture, Loader, Parser, Resolver } from "typeorm-fixtures-cli/dist";

import { BaseModelEntity } from "domain/models/base.model.entity";

export class TestSetupUtils {
	static async testInitSPI(): Promise<void> {
		try {
			await TestSetupUtils.cleanFixtures("test/integrationTests/fixtures");
			await TestSetupUtils.loadFixtures("test/integrationTests/fixtures");
		} catch (err) {
			console.error(err);
			throw Error("cannot initialize test db");
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static async cleanFixtures(fixturesPath: string): Promise<void> {
		const connection: Connection = getConnection();
		//await connection.manager.
		await connection.dropDatabase();
		//await connection.synchronize();
	}
	
	/**
	 * Load fixtures into the test db
	 * Fastify starting in TEST env will sync up and create the tables.
	 * We just grab the connection that's created by fastify
	 *
	 * @param fixturesPath {string} path to the fixtures to load
	 */
	static async loadFixtures(fixturesPath: string): Promise<void> {
		const connection: Connection = getConnection();
		
		try {
			await connection.synchronize(true);
			
			const loader: Loader = new Loader();
			loader.load(path.resolve(fixturesPath));
			
			const resolver: Resolver = new Resolver();
			const fixtures: IFixture[] = resolver.resolve(loader.fixtureConfigs);
			const builder: Builder = new Builder(connection, new Parser());
			
			const uniqueEntities: Set<string> = new Set();
			
			for (const fixture of fixturesIterator(fixtures)) {
				if (!uniqueEntities.has(fixture.entity)) {
					uniqueEntities.add(fixture.entity);
					await getRepository(fixture.entity).delete({});
				}
				const entity: any = await builder.build(fixture);
				await getRepository(entity.constructor.name).insert(entity);
			}
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Helper to turn fixtures YAML into objects
	 *
	 * @param modelName {string} model name
	 * @returns {Map<string, T extends BaseModelEntity>} map
	 */
	static readFixtures<T extends BaseModelEntity>(modelName: string): Map<string, T> {
		const fixturesFile: any = fs.readFileSync(__dirname + `/integrationTests/fixtures/${modelName}.fixtures.yml`, "utf8");
		const fixtures: any = YAML.parse(fixturesFile);

		const items: any = fixtures.items;
		const ids: string[] = Object.keys(items);

		const map: Map<string, T> = new Map();

		for (const id of ids) {
			const model: T = items[id];
			map.set(id, model);
		}

		return map;
	}
}
