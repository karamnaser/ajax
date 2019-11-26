import React from 'react'
import PostAdder  from './postadder';

class Commint extends React.Component{

    constructor(props){

        super(props);
        
        this.state={
            
            activepost:-1,

                isLoaded: false,

                commints: [],

                post_value:this.props.value

            };

        }


        componentDidMount() {
            
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.state.post_value}`, {

                    method: 'GET',
            }
            ).then(response => response.json()
            ).then(success => {
            this.setState({
                commints: success,
                isLoaded: true
            })
            }
            ).catch(error => console.log(error))
        }

        sendDatatoserver= (data)=>{
            
           
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.state.post_value}`, {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
              }).then(response => response.json()
              ).then(success => {
                this.setState({
                    commints: [success,...this.state.commints],
                    isLoaded: true
                })
              }).catch(error => console.log(error))

        }

        addPost = () => {
            /// Fetch data to the server (POST)

            let title_input=document.getElementsByName("title")[1];

            let title_value=title_input.value

            let body_input=document.getElementsByName("body")[1];

            let body_value=body_input.value;
            
            this.sendDatatoserver({email:title_value,body:body_value})

     }

        showpostbody=(id)=>{
            console.log("im post number:"+id)
            this.state.activepost==id ? this.setState({activepost:-1}):this.setState({activepost:id})
    
        
    }

    render(){
        return(
            
           <div style={{margin:"40px 0"}}> 
                
               

                < h4 onClick={()=>this.showpostbody(this.state.post_value)} > {`commint ${this.state.commints.length}`} </h4>

                { this.state.activepost==this.state.post_value 
                

                        &&  
                        
                        
                <PostAdder addPost={this.addPost} 
                           btn_title="add commint"/>}



                {this.state.commints!=null && this.state.commints.map((commint,i)=>{
                
                    

                    return (




                            <div  key={i} style={{...post_style}}>

                               

                                { this.state.activepost==this.state.post_value &&
                                <div>    

                                 <p style={{...title_style}}>

                                     {commint["email"]}

                                </p>
                                
                                 <p  style={{...body_style}}>

                                    {commint["body"]}

                                </p>
                                </div>
                              }
                                
                            </div>
                        )})}
                        </div>
                    )
               }
            }


let post_style={
    margin:"60px 0",
    backgroundColor:"cornflowerblue",
    textAlign:"center"
}

let title_style={
    backgroundColor:"gray",
    border:"1px solid black",
    padding: "20px",
    margin:"0px"

}

let body_style={

    border:"1px solid gray",
    padding: "20px",
    margin:"0px",
    textAlign: "left",
    padding:"23px"

}

export default Commint;
