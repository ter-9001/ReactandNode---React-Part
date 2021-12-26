import './App.css';
import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';









function App ()
{

   const [Users, setUsers] = useState([]);
   const [User, setUser] = useState('');
      

   const usersList = (useratual) =>
  {

    var friends = false;

    if(useratual.id == User.id)
    {
       return null;
    }

     if(User != '')
     {

        if(User.friends.includes(useratual.id))
        {
           friends = true;
        }

     }


      return(

            <li>
                <nav style={{display: "flex", flexDiretion: "row",
                justifyContent: "space-between",fontSize: "25px", margin: "0",
                padding: "0 10px 0 10px", backgroundColor: "#01cac4"
                }}>
                  
                  <p> {useratual.name} </p>
      
                  <p> {useratual.age} </p>
                
                </nav>
      
                <div style={{display: "flex", justifyContent: "center", margin: "20px"}}
                id={useratual.id}
                >
                     
                     {
                       friends?
                       <p style={{margin: "0", fontSize: "20px"}}>  
                      Vocês se conhecem!  
                      </p>
                      :
                      <button style={{
                        backgroundColor: "green", color: "white", padding: "20px", fontSize: "17px"

                      }} onClick={() => adcionarAmigo(useratual.id)}
                      >

                        Adcionar como amigo

                      </button>


                     }
                     
                    
                </div>
            
            </li>
      
      
      )
  }

  const adcionarAmigo = (id) => 
  {
      
      if((User != '') && (User != undefined) && (User != null))
      {
        var updateUser = User;

        updateUser.friends.push(id);
 
        setUser(updateUser);
        
        atualizarDados('http://localhost:5000/users/'+User.id,'PUT' ,updateUser);
        carregarDados();
      }
      else
      {
         alert("Log na conta ou cadastre-se primeiro");
      }
    
  }

  const atualizarDados = async (url, method, updateUser) =>
  {

    try
    {
      
    const requestOptions = {
      method: method,
      body: JSON.stringify(updateUser),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };
  
    const response = await fetch(url, requestOptions);
  
    const a = await response.json();

    console.log("Resposta:", a);

    }
    catch(err)
    {
        alert("Algum erro aconteçeu")
    }


  }

  const friendsList = (useratual) =>
  {

     if((User != '')  && (User.friends.includes(useratual.id)))
     {



          return(
            <li key={useratual.id}>
                <nav style={{display: "flex", flexDiretion: "row",
                justifyContent: "center",fontSize: "25px", margin: "0",
                padding: "0 10px 0 10px", backgroundColor: "#01cac4"
                }}>
                  
                  <p> {useratual.name} </p>
                </nav>
         
                
            </li>
         
           );
     }
     else
     {
        return null;

     }

  }

      const carregarDados = async () =>
      {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
      }

      useEffect(
        carregarDados, []
      )
      
     const encontrarUser = () => 
     {


              
              var userDigitado = document.getElementById("inputUser").value;

                

                
              Users.find(

                (obj) => 
                {
                    if(obj.name == userDigitado)
                    {   
                      setUser(obj)
                      alert("Usuário encontrado")
                    }
                }


              )


        
    

     }

     const criarUser = () => 
     {
        var username = document.getElementById("inputNome").value;
        var useridade = document.getElementById("inputIdade").value;

        document.getElementById("inputNome").value = '';
        document.getElementById("inputIdade").value= '';


        if(username.length <= 0)
        {
          alert("Digite um nome");
          return;
        }


        var parar = false;
        parar = 
        Users.find(
          (obj) =>
          {
              if(obj.name == username)
              {
                 alert("Nome já existe");
                 return true;
              }
          }
        )

          if(parar)
            return;

       var now = parseInt(useridade);
       console.log("Numero é", now);
          

      

      if(isNaN(now))
      {
        alert("Digite um número na idade");
        return;
      }
      



      if(now <= 0)
      {
         alert("Digite uma idade positivo");
         return;
      } 

      
      
        var maiorId = 0;

        Users.forEach( element => 
          {
              if(Number(element.id) > maiorId)
                  maiorId = Number(element.id);
                  

          })

          var newUser = {

              id: (Number(maiorId)+1).toString(),
              name: username,
              age: useridade,
              friends: []
          }

          atualizarDados("http://localhost:5000/users/", 'POST', newUser);

          setUser(newUser);
     }

     
      return (

        
          <div>

            <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      
                    <section id="logo">
      
                    <p style={{ fontSize: "150px", fontWeight: "600", border: "1px solid grey", 
                    padding: "0", margin: "0"
                        }}>
                        C
                    </p>
      
                    <h style={{ fontSize: "30px"}}>
                      onversations!
                    </h>
      
      
                    </section>
      
                    <div style={{fontFamily: "Roboto", fontSize: "80px", color: "grey",fontWeight: "600",
                    fontStyle: "italic",   margin: "30px", webkitTextStroke: "1px grey", textShadow: "0 0 12px #fff",
                    textDecoration: "none" 
                  }}>

                          {
                             ((User.name))?
                             <p> Olá, {User.name}! </p> :
                             null
                          }


                    </div>    
      
      
            </div>
      
      
      
          <div style={{ background: "#13d4cd", width: "100%", height: "100%", display: "flex", flexDiretion: "row",
          justifyContent: "space-between", marginTop:"40px"}}>
      
      
      
      
                   <section style={{border: "5px solid #f71166", width: "400px", height: "450px",
                  margin: "15px", display: "flex", flexDirection: "column" , alignItems: "center",
                  justifyContent: "start", background: "white"}}>
      
                         <div style={{display: "flex", flexDirection: "column" , alignItems: "center"}}
                         >
                         
                                        <p style={{fontSize: "30px", color: "grey", 
                                            fontStyle: "oblique", webkitTextStroke: "1px grey"}}>
                                              Log In:
                                            </p>
      
                        
                        
                                          <input id="inputUser" placeholder= "Digite seu nome"
                                          style={{width: "80%" , height: "30px", margin: "10px"}}/>
                        
                                          <button style={{border: "none", color: "white", backgroundColor: "blue", padding: "10px"}}
                                          onClick = {encontrarUser}>
                                              Entrar
                                          </button>

                          </div> 

                          <div style={{display: "flex", flexDirection: "column" , alignItems: "center"}}
                         >
                         
                                      <p style={{fontSize: "30px", color: "grey", 
                                            fontStyle: "oblique", webkitTextStroke: "1px grey"}}>
                                            Cadastrar-se:
                                      </p>
      
      
      
                                        <input id="inputNome" placeholder= "Digite seu nome"
                                        style={{width: "80%" , height: "30px", margin: "10px"}}/>
                      
                                        <input id="inputIdade" placeholder= "Digite sua idade"
                                        style={{width: "80%" , height: "30px", margin: "10px"}}/>
                      

                                        <button style={{border: "none", color: "white", backgroundColor: "blue", padding: "10px", marginBottom: "10px"}}
                                        onClick = {criarUser}>
                                            Cadastre-se
                                        </button>


                        </div>
      
      
                   </section>
      
      
      
      
                  <div style={{margin: "10px", display: "flex",flexDiretion: "row", alignItems: "start",
                justifyContent: "space-arround", margin: "30px", width: "850px", border: "1px solid #07f7ef",
                borderRadius: "5%"}}>
                  
                                  <section id="users">
      
                                        <p style={{fontSize: "30px", color: "grey", 
                                            fontStyle: "oblique", webkitTextStroke: "1px grey"}}>
                                              Users:
                                            </p>
                    
                                              <ul>
                                              
                                              {
                                                      Users.map(
                                                        usersList
                                                      )
                                                  }
                                              
                                              </ul>
      
                                </section>          
      
      
                                <section id="talks">
      
                                            <p style={{fontSize: "30px", color: "grey", 
                                            fontStyle: "oblique", webkitTextStroke: "1px grey"}}>
                                              Friends:
                                            </p>         
      
                                            <ul>

                                            {
                                                      Users.map(
                                                        friendsList
                                                      )
                                                  }
                                           </ul>
      
                                     </section>
                  
                  </div>          
      
      
              </div>
        </div>
        
        )

}

export default App;
