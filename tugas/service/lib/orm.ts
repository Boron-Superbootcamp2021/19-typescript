import { createConnection } from 'typeorm';


export function connect(entities:string[], config:any) {
  return createConnection({
    ...config,
    synchronize: true,
    timezone: 'Asia/Jakarta',
    entities,
  });
}

