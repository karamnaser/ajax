import React from 'react'
import PostAdder  from './postadder';
import Commint from './commint'
import Editore from './editore'

class Post extends React.Component{

        constructor(props){

            super(props);
            
            this.state={
                activepost:-1,

                isLoaded: false,

                posts: [],

                post_param:this.props.param,

                post_value:this.props.value

            };

        }


        componentDidMount() {
            fetch(`https://jsonplaceholder.typicode.com/posts?${this.state.post_param}=${this.state.post_value}`, {

                    method: 'GET',
            }
            ).then(response => response.json()
            ).then(success => {
            this.setState({
                posts: success,
                isLoaded: true
            })
            }
            ).catch(error => console.log(error))
        }

        
        sendDatatoserver= (data)=>{
            
           
            fetch(`https://jsonplaceholder.typicode.com/posts`, {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
              }).then(response => response.json()
              ).then(success => {
                this.setState({
                    posts: [success,...this.state.posts],
                    isLoaded: true
                })
              }).catch(error => console.log(error))

        }


        editPost = (i,inpute_index) => {
            /// Fetch data to the server (POST)
            if(!document.getElementsByName("title")[inpute_index]){

                inpute_index=0

            }
            let title_input=document.getElementsByName("title")[inpute_index];

            let title_value=title_input.value

            let body_input=document.getElementsByName("body")[inpute_index];

            let body_value=body_input.value.replace(/\r?\n/g, '<br />');

            fetch(`https://jsonplaceholder.typicode.com/posts/${i+1}`, {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({title:title_value,body:body_value})
              }).then(response => response.json()
              ).then(success => {
                this.setState({
                    posts: [success,...this.state.posts],
                    isLoaded: true
                })
              }).catch(error => console.log(error))
            
     }
        



        addPost = () => {
            /// Fetch data to the server (POST)

            let title_input=document.getElementsByName("title")[0];

            let title_value=title_input.value

            let body_input=document.getElementsByName("body")[0];

            let body_value=body_input.value.replace(/\r?\n/g, '<br />');

           
            
            this.sendDatatoserver({title:title_value,body:body_value})

     }

    


    showpostbody=(i)=>{
        console.log("im post number:"+i)
        this.state.activepost==i ? this.setState({activepost:-1}):this.setState({activepost:i})

}
        

        render(){
            return(
                
               <div style={{background:"dodgerblue"}}>
                   <PostAdder addPost={this.addPost} btn_title="add post"/>
                    {this.state.posts!=null && this.state.posts.map((post,i)=>{


                        return (
                            

                                <div key={i} style={{...post_style}}>

                                    {this.state.isLoaded ?     

                                     <p onClick={()=>this.showpostbody(i)} style={{...title_style}}>

                                         {post["title"]}

                                    </p>
                                    :"loading"}
                                    { this.state.activepost==i &&

                                     <div  style={body_style}>
                                         
                                         
                                            <p style={{textAlign: "left",padding:"23px"}} 
                                               dangerouslySetInnerHTML={{__html: post["body"]}}/>

                                            
                                            <Editore id={i} 
                                                     updateserverdata={this.editPost}
                                                     btn_title="edit post"/>


                                            <Commint  value={this.state.posts[i]["id"]}/>


                                        
                                    </div>
                                    
                                    }
                                

                                </div>

                            )

                        })
                   }


               </div>

            )

}
}

let post_style = {
    margin:"21px 0",
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
    margin:"0px"

}
export default Post;