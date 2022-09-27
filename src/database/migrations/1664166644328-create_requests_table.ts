import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRequestTable1664166644328 implements MigrationInterface {
  private tableName = 'requests';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'division',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'request_type',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'item_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'purpose',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'priority',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamp(6)',
            default: 'CURRENT_TIMESTAMP(6)',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp(6)',
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp(6)',
            default: 'null',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${this.tableName}`);
  }
}
