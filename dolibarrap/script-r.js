function img() {
  const file = document.querySelector('#file');
file.addEventListener('change', (e) => {
  // Get the selected file
  const [file] = e.target.files;
  // Get the file name and size
  const { name: fileName, size } = file;
  // Convert size in bytes to kilo bytes
  const fileSize = (size / 1000).toFixed(2);
  // Set the text content
  const fileNameAndSize = `${fileName} - ${fileSize}KB`;
  document.querySelector('.file-name').textContent = fileNameAndSize;
});

}
// Fonction "store" appelé quand le bouton : accpeter, est cliqué
async function store(){
//On défini les variables
    var euro= document.getElementById("euro");
    //ON les stock dans le local
    localStorage.setItem("euro", euro.value);

    var libelle= document.getElementById("libelle");
    localStorage.setItem("libelle", libelle.value);
// création des date timestamps
    var date1 = new Date(document.getElementById("date1").value).getTime();

    var date2 = new Date(document.getElementById("date2").value).getTime();
//url de l'api
  var url1 ="http://localhost/dolibarr/api/index.php/users/info";
//on recup le token
  let API_KEY = localStorage.getItem('token');
  // remplacement des variables dans les input dans dolibarr
 await fetch(url1, {
    headers: {
        "Accept": "application/json",
        "DOLAPIKEY": `${API_KEY}`
            },
  method: 'GET'
              })
//condition si le json a les bonne infos il le stock           
      .then(res => {
          if(res.ok){
            const Udata =res.json()
              Udata.then(response => {
              userID = response['id'];
              console.log(userID);
              localStorage.setItem('userID', userID);
                  })
      }
      else {
        console.log("Erreur indentifiant ou mot de passe")
            }
              })
        let U_ID = localStorage.getItem('userID');
      
        await fetch('http://localhost/dolibarr/api/index.php/expensereports',{
                      method: 'POST',
                      headers:{
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                        "DOLAPIKEY":`${API_KEY}`,
                      },
                      body: JSON.stringify(
                        {
                          'fk_user_author':`${U_ID}`,
                          'date_debut':`${date1/1000}`,
                          'date_fin': `${date2/1000}`
                        }
                      )
                    })
                    .then((response)=>response.json())
                    .then((data) =>{
                      console.log('Success', data);
                      localStorage.setItem("idnote",data);
                    })
                    .catch((error) => {
                      console.error('Error:', error)
                    })
                  let note_id = localStorage.getItem('idnote');
                  let euros = localStorage.getItem('euro');
                  let libelles = localStorage.getItem('libelle');
 await fetch(`http://localhost/dolibarr/api/index.php/expensereports/${note_id}`,{
    method: 'PUT',
    body : JSON.stringify({
     "id": `${note_id}`,
      "total_ttc": `${euros}`,
      "note_public": `${libelles}`
   }),
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
      "DOLAPIKEY":`${API_KEY}`   
     }
   })
      .then((response)=>response.json())
      .then((data) =>{
        console.log('Success', data);
      }) 
      .catch((error) => {
        console.error('Error:', error)
      })
  }