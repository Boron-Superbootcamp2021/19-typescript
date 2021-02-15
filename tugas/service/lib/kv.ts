import { redis } from 'redis';
import { promisify } from 'util';

let client;

export function connect(options:any): Promise<void> {
  return new Promise((resolve, reject) => {
    client = redis.createClient(options);
    client.on('connect', () => {
      resolve();
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

export function save(db:Object, data: Object){
  const setAsync = promisify(client.set).bind(client);
  return setAsync(db, data);
}

export async function read(db:Object) {
  const getAsync = promisify(client.get).bind(client);
  const val = await getAsync(db);
  return JSON.parse(val);
}

function drop(db: Object) {
  const delAsync = promisify(client.del).bind(client);
  return delAsync(db);
}

function close() {
  if (!client) {
    return;
  }
  if (client.connected) {
    client.end(true);
  }
}

