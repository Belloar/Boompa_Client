function User(userName,email,password){
    this.userName = userName;
    this.email=email;
    this.password=password;
}

function Learner(fullname){
    this.Fullname = fullname;
}

const user = new User("bello_zk","zikhrullahbello2011@gmail.com","0000");
const learner = new Learner("bello dynasty");

console.log("Email address:"+ learner.Fullname);

localStorage