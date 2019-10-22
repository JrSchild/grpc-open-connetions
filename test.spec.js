const { Server, ServerCredentials } = require('@grpc/grpc-js');

const PORT = 50051;
const CREDENTIALS = ServerCredentials.createInsecure();

let server1;
let server2;

beforeAll(done => {
  server1 = new Server();
  server2 = new Server();
  server1.bindAsync(`localhost:${PORT}`, CREDENTIALS, (_, _port) => {
    server1.start();
    done();
  });
});

afterAll(function() {
  server1.forceShutdown();
  server2.forceShutdown();
});

it('should shut the server down', (done) => {
  server1.tryShutdown(() => {
    server2.bindAsync(`localhost:${PORT}`, CREDENTIALS, (_) => {
      server2.start();
      done();
    });
  });
});
