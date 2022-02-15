import Fastify, { FastifyInstance, } from 'fastify'
import {createStore, Table} from 'tinybase';

const store = createStore();

const initialData: Table = {
  'sample_1': {
    title: 'Computer',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    photoUrl: 'https://picsum.photos/id/0/400'
  },
  'sample_2': {
    title: 'Bible',
    comment: 'Curabitur ut ullamcorper erat, eget vulputate mi. Vestibulum.',
    photoUrl: 'https://picsum.photos/id/1010/400'
  },
  'sample_3': {
    title: 'Fall',
    comment: 'Phasellus a elit sem. Donec sed lacus magna.',
    photoUrl: 'https://picsum.photos/id/1035/400'
  },
}

const server: FastifyInstance = Fastify({
  logger: true
})

server.options('/*', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', request.headers.origin);
  reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  return {};
});

server.get('/auth', async (request, reply) => {
  const table = store.getTable('users/1');

  if(Object.keys(table).length === 0) {
    store.setTable('users/1', initialData);
  }

  reply.header('Access-Control-Allow-Origin', request.headers.origin);
  reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

  reply.status(200).send({
    id: '1',
    name: '渋井丸拓男',
    avatarUrl: '/avatar.png'
  });
});

type GetPostListParams = {
  userid: string;
}

type GetPostListReply = {
  posts: {
    id: string;
  }[]
}

server.get<{Params: GetPostListParams, Reply: GetPostListReply}>('/user/:userid/post/list', async (request, reply) => {
  const table = store.getTable(`users/${request.params.userid}`);
  const list = Object.entries(table).map(([rowId, row]) => ({ id: rowId, ...row} ));

  reply.header('Access-Control-Allow-Origin', request.headers.origin);
  reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

  return {
    posts: list
  };
})

type PostBody = {
  userId: string;
  post: {
    title: string;
    comment: string;
  }
}

server.post<{Body: PostBody}>('/post', {}, (request, reply) => {
  reply.header('Access-Control-Allow-Origin', request.headers.origin);
  reply.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

  store.addRow(`users/${request.body.userId}`, request.body.post);
  
  reply.status(200).send();
});

server.post('/reset', async () => {
  store.setTable('users/1', initialData);
  return {};
});

const start = async () => {
  try {
    await server.listen(process.env.PORT || 5500)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log('server listening on port ' + port)

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await server.close();
  process.exit(0);
});

start();