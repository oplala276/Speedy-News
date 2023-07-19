import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props
        return (
            <div>
                <div className="card my-3">
                    <img src={!imageUrl ? "https://scitechdaily.com/images/Outer-Space-Mysteries-Concept-Art.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {author ? author : "Source"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-dark">Know more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
