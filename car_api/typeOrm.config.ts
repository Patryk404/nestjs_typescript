import { DataSource } from 'typeorm';

let dataSource: DataSource;

  switch (process.env.NODE_ENV) {
    case 'development':
        dataSource = new DataSource({
        synchronize: false,
        migrations: ['migrations/*.js'],
        type: 'sqlite',
        database: 'db.sqlite',
        entities: ['**/*.entity.js'],
        });
      break;
    case 'test':
        dataSource = new DataSource({
            synchronize: false,
            migrations: ['migrations/*.js'],
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
        });
      break;
    case 'production':
      break;
    default:
      throw new Error('unknown environment');
  }
  
export default dataSource;