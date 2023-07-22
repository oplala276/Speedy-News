import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const captialFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateComponent = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // setState({ loading: true })
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(() => {
        document.title = `${captialFirst(props.category)}-SpeedyNews`;
        updateComponent();
    }, [])
    // const handlePrevious = async () => {
    // console.log("handle prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed125db020924e3b9ec11c51f088a15e&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    // })
    // this.setState({ page: this.state.page - 1 });
    //     setPage(page - 1)
    //     updateComponent();
    // }
    // const handleNext = async () => {
    // console.log("handle next");
    // if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / props.pageSize)) {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ed125db020924e3b9ec11c51f088a15e&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData)
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    //     setPage(page + 1)
    //     // setState({ page: this.state.page + 1 });
    //     updateComponent();
    // }
    const fetchMoreData = async () => {
        // setState({ page: state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)  
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults);

    };



    return (
        <>
            <h2 className='text-center' style={{ margin: '35px', marginTop: '90px' }}>Speedy News-Top {captialFirst(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 160) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className="btn btn-success" onClick={this.handlePrevious}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / props.pageSize)} type='button' className="btn btn-success" onClick={this.handleNext}>Next &raquo;</button>
                </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News
