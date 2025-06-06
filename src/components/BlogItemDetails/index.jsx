import {Component} from 'react'

import { useParams } from 'react-router-dom'

import './index.css'

// const blogData = {
//   title: 'Blog Name',
//   imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
//   avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//   author: 'Author Name',
//   content:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// }


function BlogItemDetailsWrapper() {
    const { id } = useParams()
    return <BlogItemDetails blogId={id} />
  }


class BlogItemDetails extends Component {
     
    state={blogData:[]}

    componentDidMount(){
        this.getBlogsItemData();
    }

    getBlogsItemData=async()=>{
     
        const {blogId}=this.props;
        console.log(blogId);

        const response=await fetch(`https://apis.ccbp.in/blogs/${blogId}`);
        const data=await response.json();
        console.log(data);

        const updateData={
            imageUrl:data.image_url,
            title:data.title,
            author:data.author,
            avatarUrl:data.avatar_url,
            content:data.content,
            blogId:data.id,
            topic:data.topic
        }
       this.setState({
         blogData:updateData
       })
    }


  renderBlogItemDetails = () => {   
     const {blogData}=this.state;
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetailsWrapper
