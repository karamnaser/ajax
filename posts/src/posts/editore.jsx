import React from 'react'

class Editore extends React.Component{

        constructor(props){

            super(props);

            this.state={

                liststatuse:false

            };

        }


        addEnter(e){
            let key=e.which || e.keyCode;
            if(key==13){
            let target=e.target;
            console.log("im clicked enter")
            target.value=target.value+"\n"
         }
        }
        

        togglelist=()=>{

            this.setState({liststatuse:!this.state.liststatuse})

        }



        render(){

            return(

                <div style={{textAlign:"center"}}>


                    <button onClick={()=>this.togglelist()}>{this.props.btn_title}
                                                 
                    </button>

                    {
                        this.state.liststatuse

                    
                            &&


                        <div style={formstyle}
                         className="form">


                            <input style={{...input}} type="text" name="title"/>


                            <textarea onKeyPress={(e)=>this.addEnter(e)} style={{...input}} name="body" cols='10' rows='8'>


                            </textarea>
                            

                            <button  onClick={()=>this.props.updateserverdata(this.props.id,1)}>


                                    {this.props.btn_title}
                                
                                
                            </button>


                    </div>
                  }

                </div>

            )

        }
    }

     let input = {

        margin:"35px 0"

     }
     let formstyle={

        display: "flex" ,

        flexDirection: "column" ,

        margin: "auto" ,

        background: "aqua" ,

        width: "auto"

     }
    export default Editore ;
