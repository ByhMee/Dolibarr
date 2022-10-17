                function LOGIN(){
                  //on défini les variables
                    var name = document.getElementById("name").value;
                    var mdp = document.getElementById("password").value;
                    // le name et le password sont remplacé dans la varaibles url
                    var url = `http://localhost/dolibarr/api/index.php/login?login=${name}&password=${mdp}`
                    var IP = document.getElementById("adresse_ip").value

                    localStorage.setItem('IP', IP);
                  
                  fetch(url)
                    .then(res => {
                      if(res.ok){
                        const uData = res.json()
                        uData.then((reponse => {
                          tokenId = reponse["success"]["token"];
                          // si "success" alors ça envoi l'utilisateur vers la page acceuil
                          location.replace("acccueil.html");
                          //on stock le token dans le local storage
                          localStorage.setItem('token', tokenId);
                        }))
                    }else{
                      console.log("Erreur")
                    }
                    })
                  }
