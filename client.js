const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2]

const client = new todoPackage.Todo(
    `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
    grpc.credentials.createInsecure());

client.createTodo({
    "id": -1,
    "text": text
}, (err, res) => {
    if (err) {
        console.log("Error -> " + err)
    }
    console.log("createTodo: Response -> " + JSON.stringify(res));
});

/*
client.readTodos({}, (err, res) => {
    if (err) {
        console.log("Error -> " + err)
    }
    console.log("readTodos: Response -> " + JSON.stringify(res));
    if(!res.items)
        res.items.forEach(i => console.log(i.text));
});
*/

const call = client.readTodosStream();
call.on("data", item => {
    console.log("received item from server " + JSON.stringify(item))
});

call.on("end", e => console.log("server done!"));