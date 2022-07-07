const Schema = require("./employees_pb");
const fs = require("fs");

const rahul = new Schema.Employee();
rahul.setId(1001);
rahul.setName("Rahul");
rahul.setSalary(1001);

const ahmed = new Schema.Employee();
ahmed.setId(1002);
ahmed.setName("ahmed");
ahmed.setSalary(9000);

const rick = new Schema.Employee();
rick.setId(1002);
rick.setName("rick");
rick.setSalary(1500);

const employees = new Schema.Employees();
employees.addEmployees(rahul);
employees.addEmployees(ahmed);
employees.addEmployees(rick);

const bytes = employees.serializeBinary();
// console.log("je m'appelle " + rahul.getName());
console.log("binary -> " + bytes);
fs.writeFileSync("employeesbinary", bytes);

const employees2 = Schema.Employees.deserializeBinary(bytes);

console.log("employees2 -> " + employees2);