const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server =  new grpc.Server();

server.bindAsync(
    `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        server.start();
        if (err) {
            console.log("Error -> " + err)
        }
    console.log(`listening on port ${port}`)
});

server.addService(todoPackage.Todo.service,
{
    "createTodo": createTodo,
    "readTodos": readTodos,
    "readTodosStream": readTodosStream
});

const todos = [];

function createTodo (call, callback) {
    const todoItem = {
        "id": todos.length + 1,
        "text": call.request?.text
    }
    todos.push(todoItem);
    // console.log("call -> ", call)
    callback(null, todoItem);
}

function readTodosStream(call, callback) {
    todos.forEach(t => call.write(t));
    call.end();
}

function readTodos(call, callback) {
    callback(null, {"items": todos})
}