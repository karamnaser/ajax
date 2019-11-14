import React from 'react'

class PostAdder extends React.Component{

        constructor(props){

            super(props);

            this.state={


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
        

        render(){

            return(

                <div style={{display:"flex",flexDirection:"column",margin:"auto",background:"aqua",width:"auto"}}>


                    <input style={{...input}} type="text" name="title"/>


                    <textarea onKeyPress={(e)=>this.addEnter(e)} style={{...input}} name="body" cols='10' rows='8'></textarea>


                    <button onClick={()=>this.props.addPost()}> add {this.props.btn_title}</button>
                    

                </div>

            )

        }
    }

     let input = {

        margin:"35px 0"

     }
    export default PostAdder ;
