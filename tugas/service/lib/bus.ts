import { nats } from 'nats';
import { ConnectionOptions } from 'typeorm';

let client;

export function connect(url: any, config: ConnectionOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    client = nats.connect(url, config);
    client.on('connect', () => {
      resolve();
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

export function publish(subject: any, data: Object) {
  client.publish(subject, JSON.stringify(data));
}

export function subscribe(subject: any, callback: any) {
  return client.subscribe(subject, callback);
}

export function unsubscribe(sid: any) {
  return client.unsubscribe(sid);
}

export function close() {
  if (!client) {
    return;
  }
  client.close();
}