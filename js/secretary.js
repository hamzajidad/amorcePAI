function XHR(method, ad, params) {
		// method	: GET or POST
		// ad		: adress of the ressource to be loaded
		// params : An object containing two possible parameters.
		//		- onload	: a function taking no argument, response will be contains in object this.
		//		- variables : an object containing a set of attribute<->value
		//		- form 		: a reference to a HTML form node
		var P = new Promise( function(resolve, reject) {
			 var xhr = new XMLHttpRequest();
			 params = params || {};
			 xhr.onload = function() {if(this.status >= 400) {reject(this);} else {resolve(this);}};
			 xhr.open(method, ad, true);
			 if(params.form || params.variables) {
				 var F;
				 if(params.form) F= new FormData( params.form );
					else F = new FormData();
				 for(var i in params.variables) {
					 F.append(i, params.variables[i]);
					}
				 xhr.send( F );
				} else {xhr.send();}
			} );
		return P;
	};
	
function addAffecte(patient,patients){
            var t = {
                nom: patient.getElementsByTagName("nom")[0].textContent,
                prenom: patient.getElementsByTagName("prénom")[0].textContent,
                sexe: patient.getElementsByTagName("sexe")[0].textContent,
                naissance: patient.getElementsByTagName("naissance")[0].textContent,
                numero: patient.getElementsByTagName("numéro")[0].textContent,
                adresse: patient.getElementsByTagName("adresse")[0].textContent,
                visite: patient.getElementsByTagName("visite")[0].getAttribute("intervenant"),
                intervenant: patient.getElementsByTagName("visite")[0].getAttribute("date")
            }
            patients.push(t);
}  

var app = angular.module('secretaryApplication', []);

app.controller('secretaryController', function($scope) {
  $scope.patients = [
  ];
 
    $scope.notification = { level:"green", message:"" };
 
      var data=XHR("GET","/data/cabinetInfirmier.xml", onload);
    data.then(function(data){
        var XMLDocument = data.responseXML;
        var nodes = XMLDocument.getElementsByTagName("patient");
   
        for(var i=0;i<nodes.length;i++){
            console.log("nodes");
            addAffecte(nodes[i], $scope.patients);
        }
        console.log("A LA FIN DE CHARGEMENT",$scope.patients);
        $scope.notification = { level:"green", message:"Changement OK" };

        $scope.$apply();
    }).catch(function(err){
        console.log("ERRREUR DE CHARGEMENT");
        $scope.notification = { level:"red", message:"Changement KO : "+err };
        $scope.$apply();
    });

    console.log("A LA FIN DE CONTROLLER",$scope.patients);
    $scope.notification = { level:"blue", message:"Changement en cours ... " };

});
   
function addpatient(){
    
    document.getElementById("addPatient").style.display ='block';       
}
	
function confirmPatient(){
    
    document.getElementById("btAddPatient").style.display ='none';       
}


