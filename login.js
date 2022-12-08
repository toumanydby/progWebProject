//JavaScript pour le login


class User{
	constructor(idU,mdpU, roleU) {
            this.idU = idU;
            this.mdpU = mdpU;
            this.roleU = roleU;
        }
        get idUser() {
            return this.idU;
        }
        get mdpUser() {
            return this.mdpU;
        }
        get roleUser() {
            return this.roleU;
        }
}

function distruiberPage(name){
    if(Object.keys(name).roleUser=="ADMIN"){
        location.href="./main.html";
    }
}

function login(){
	var login=document.getElementById("idUser").value;
	var mdp=document.getElementById("mdpUser").value;

	if(login=="123" && mdp =="123"){
		location.href="./main.html";
	}
	else{
		alert("wrongggggggggggggggggggggggggggggggg");
	}
}

