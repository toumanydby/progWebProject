//JavaScript pour le login


class User{
	constructor(idU,mdpU, roleU) {
            this.idU = idU;
            this.mdpU = mdpU;
            this.roleU = roleU;
        }
        getIdUser(){
            return this.idU;
        }
        getMdpUser() {
            return this.mdpU;
        }
        getRoleUser() {
            return this.roleU;
        }
}


const u1 = new User('test1', 'test1', 'ADMIN');
const u2 = new User('test2', 'test2', 'ADMIN');
const u3 = new User('test3', 'test3', 'USER');
const u4 = new User('test4', 'test4', 'USER');
const u5 = new User('test5', 'test5', 'USER');
let users=new Array(u1,u2,u3,u4,u5);


 
function distruiberPage(pfId,pfMdp){
    const result = users.find(({ idU }) => idU === pfId);
 
    if(typeof result =='undefined'){
        alert("Something wrong with your id ");
    }
    else{
        if(result.getMdpUser()!=pfMdp){
            alert("Your password is wrong");
        }
        else{
        if(result.getRoleUser()=="ADMIN"){
        location.href="./home_Admin.html";
        }
        if(result.getRoleUser()=="USER"){
        location.href="./home_User.html";
        }
    }
    }

}


function login(){
	var login=document.getElementById("idUser").value;
	var mdp=document.getElementById("mdpUser").value;

	distruiberPage(login,mdp);
}

